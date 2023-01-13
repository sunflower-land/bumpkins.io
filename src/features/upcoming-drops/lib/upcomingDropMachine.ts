import { ERRORS } from "lib/errors";
import {
  createMachine,
  Interpreter,
  assign,
  State,
  DoneInvokeEvent,
} from "xstate";
import { DateTime, DurationObjectUnits } from "luxon";
import {
  CurrentOrUpcomingItem,
  loadCurrentAndUpcomingDrops,
  loadTotalSupplyForCurrentItem,
} from "../actions/loadCurrentAndUpcomingDrops";
import { ITEM_IDS } from "features/bumpkins/types/Items";
import { web3 } from "lib/web3";
export interface Context {
  upcomingItems?: CurrentOrUpcomingItem[];
  currentItem?: CurrentOrUpcomingItem;
  currentPrice: number;
  currentItemTimer?: DurationObjectUnits;
  totalMinted: number;
  releaseIndex: number;
  totalReleasesForItem: number;
  lastSupplyUpdate?: DateTime;
  errorCode?: keyof typeof ERRORS;
}

export type BlockchainEvent =
  | { type: "TICK" }
  | { type: "SWITCH_NETWORK" }
  | { type: "CHAIN_CHANGED" };

export type BlockchainState = {
  value:
    | "checkChain"
    | "wrongChain"
    | "switchingNetwork"
    | "setup"
    | "loading"
    | "loaded"
    | "setUpCurrentItem"
    | "closedForMint"
    | "openForMint"
    | "updatingSupply"
    | "error";
  context: Context;
};

export type UpcomingDropMachineState = State<
  Context,
  BlockchainEvent,
  BlockchainState
>;

export type UpcomingDropMachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

export const upcomingDropMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>({
  id: "upcomingDropMachine",
  initial: "checkChain",
  states: {
    checkChain: {
      invoke: {
        src: async () => {
          await web3.setupWeb3();

          const isPolygon = await web3.connectedToPolygon();

          return { isPolygon };
        },
        onDone: [
          {
            target: "wrongChain",
            cond: (_, event) => {
              console.log({ event });
              return !event.data.isPolygon;
            },
          },
          { target: "loading" },
        ],
      },
    },
    wrongChain: {
      on: {
        SWITCH_NETWORK: {
          target: "switchingNetwork",
        },
      },
    },
    switchingNetwork: {
      id: "switchingNetwork",
      invoke: {
        src: async (): Promise<void> => {
          await web3.initialiseNetwork();
        },
        onDone: {
          target: "loading",
        },
        onError: [
          {
            cond: (_, event) => {
              return event.data.message === ERRORS.REJECTED_TRANSACTION;
            },
            target: "wrongChain",
          },
          {
            target: "error",
          },
        ],
      },
    },
    loading: {
      invoke: {
        src: async () => {
          const upcomingItems = await loadCurrentAndUpcomingDrops();

          if (upcomingItems.length === 0) {
            return {
              items: 0,
            };
          }

          const currentItem = upcomingItems[0];

          const totalMinted =
            (await loadTotalSupplyForCurrentItem(ITEM_IDS[currentItem.name])) ||
            "0";

          const { releases } = currentItem;

          // Find the first release that is active for current item ie open
          const releaseIndex = releases.findIndex(({ endDate }) => {
            return endDate > DateTime.local();
          });

          // If no valid releases for current item move to next item
          if (releaseIndex < 0) {
            const newCurrentItem = upcomingItems[1];

            if (!newCurrentItem) {
              return {
                items: 0,
              };
            }

            const currentPrice = newCurrentItem.releases[0].price;

            const totalMinted =
              (await loadTotalSupplyForCurrentItem(
                ITEM_IDS[newCurrentItem.name]
              )) || "0";

            return {
              upcomingItems,
              currentItem: { ...newCurrentItem },
              totalMinted: Number(totalMinted),
              releaseIndex: 0,
              totalReleasesForItem: newCurrentItem.releases.length,
              currentPrice,
            };
          }

          const currentPrice = currentItem.releases[releaseIndex].price;

          return {
            upcomingItems,
            currentItem,
            totalMinted: Number(totalMinted),
            releaseIndex,
            totalReleasesForItem: releases.length,
            currentPrice,
          };
        },
        onDone: [
          {
            target: "noUpcomingItems",
            cond: (_context, event) => event.data.items === 0,
          },
          {
            target: "openForMint",
            // Release time open
            cond: (_context, event: DoneInvokeEvent<Context>) => {
              const { currentItem, releaseIndex } = event.data;

              if (!currentItem) return false;

              const { releaseDate } = currentItem.releases[releaseIndex];

              return releaseDate < DateTime.local();
            },
            actions: assign({
              upcomingItems: (_, event) => event.data.upcomingItems.slice(1),
              currentItem: (_, event) => event.data.currentItem,
              releaseIndex: (_, event) => event.data.releaseIndex,
              totalReleasesForItem: (_, event) =>
                event.data.totalReleasesForItem,
              lastSupplyUpdate: (_) => DateTime.local(),
              currentPrice: (_, event) => event.data.currentPrice,
              totalMinted: (_, event) => event.data.totalMinted,
            }),
          },
          {
            target: "closedForMint",
            actions: assign({
              upcomingItems: (_context, event) =>
                event.data.upcomingItems.slice(1),
              currentItem: (_context, event) => event.data.currentItem,
              releaseIndex: (_, event) => event.data.releaseIndex,
              totalReleasesForItem: (_, event) =>
                event.data.totalReleasesForItem,
              currentPrice: (_, event) => event.data.currentPrice,
              totalMinted: (_, event) => event.data.totalMinted,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },
    noUpcomingItems: {
      type: "final",
    },
    openForMint: {
      invoke: {
        src: (_) => (cb) => {
          const interval = setInterval(() => {
            cb("TICK");
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
      always: [
        {
          target: "updatingSupply",
          cond: (context) => {
            const { totalMinted, currentItem, releaseIndex } = context;
            const supply = currentItem?.releases[releaseIndex].supply;

            if (supply && totalMinted >= supply) {
              return false;
            }

            if (!context.lastSupplyUpdate) return true;

            const diff =
              DateTime.local()
                .diff(context.lastSupplyUpdate, "seconds")
                .toObject().seconds || 0;

            return diff > 5;
          },
        },
        {
          target: "setUpNextReleaseForItem",
          cond: (context) => {
            if (!context.currentItem) return false;

            const hasAnotherRelease =
              context.releaseIndex < context.totalReleasesForItem - 1;
            const { endDate } =
              context.currentItem.releases[context.releaseIndex];
            const ended = DateTime.local() > endDate;

            return ended && hasAnotherRelease;
          },
        },
        {
          target: "loading",
          cond: (context) => {
            if (!context.currentItem) return false;

            const lastRelease =
              context.releaseIndex === context.totalReleasesForItem - 1;
            const { endDate } =
              context.currentItem.releases[context.releaseIndex];
            const ended = DateTime.local() > endDate;

            return ended && lastRelease;
          },
        },
      ],
      on: {
        TICK: {
          actions: [
            assign({
              currentItemTimer: (context) => {
                if (!context.currentItem) return undefined;

                const now = DateTime.local();
                const { endDate } =
                  context.currentItem.releases[context.releaseIndex];

                if (now.toMillis() >= endDate.toMillis()) {
                  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }

                return endDate
                  .diff(DateTime.local(), [
                    "days",
                    "hours",
                    "minutes",
                    "seconds",
                  ])
                  .toObject();
              },
            }),
          ],
        },
      },
    },
    closedForMint: {
      invoke: {
        src: (_) => (cb) => {
          const interval = setInterval(() => {
            cb("TICK");
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        },
      },
      always: [
        {
          target: "openForMint",
          cond: (context) => {
            if (!context.currentItem) return false;

            const { releaseDate } =
              context.currentItem.releases[context.releaseIndex];
            const releaseOpened = releaseDate <= DateTime.local();

            return releaseOpened;
          },
        },
      ],
      on: {
        TICK: {
          actions: [
            assign({
              currentItemTimer: (context) => {
                if (!context.currentItem) return undefined;

                const now = DateTime.local();
                const { releaseDate } =
                  context.currentItem.releases[context.releaseIndex];

                if (now.toMillis() >= releaseDate.toMillis()) {
                  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }

                return releaseDate
                  .diff(DateTime.local(), [
                    "days",
                    "hours",
                    "minutes",
                    "seconds",
                  ])
                  .toObject();
              },
            }),
          ],
        },
      },
    },
    updatingSupply: {
      invoke: {
        src: async (context) => {
          const currentItem = context.currentItem as CurrentOrUpcomingItem;
          const totalSupply = await loadTotalSupplyForCurrentItem(
            ITEM_IDS[currentItem.name]
          );

          return {
            totalMinted: Number(totalSupply),
          };
        },
        onDone: [
          {
            target: "openForMint",
            cond: (context) => {
              const currentItem = context.currentItem as CurrentOrUpcomingItem;
              const { releaseDate } =
                currentItem.releases[context.releaseIndex];
              const isOpen = releaseDate <= DateTime.local();

              return isOpen;
            },
            actions: assign({
              totalMinted: (_, event) => event.data.totalMinted,
              lastSupplyUpdate: (_) => DateTime.local(),
            }),
          },
          {
            target: "closedForMint",
            actions: assign({
              totalMinted: (_, event) => event.data.totalMinted,
              lastSupplyUpdate: (_) => undefined,
            }),
          },
        ],
        onError: {},
      },
    },
    setUpNextReleaseForItem: {
      always: [
        {
          target: "openForMint",
          cond: (context) => {
            const { currentItem, releaseIndex } = context;

            if (!currentItem) return false;

            return (
              currentItem.releases[releaseIndex + 1].releaseDate <
              DateTime.local()
            );
          },
          actions: assign((context) => {
            const nextReleaseIndex = context.releaseIndex + 1;

            return {
              releaseIndex: nextReleaseIndex,
              currentPrice:
                context.currentItem?.releases[nextReleaseIndex].price,
            };
          }),
        },
        {
          target: "closedForMint",
          actions: assign((context) => {
            const nextReleaseIndex = context.releaseIndex + 1;

            return {
              releaseIndex: nextReleaseIndex,
              currentPrice:
                context.currentItem?.releases[nextReleaseIndex].price,
            };
          }),
        },
      ],
    },
    error: {
      entry: (_, event) => {
        console.error({ event });
      },
    },
  },
  on: {
    CHAIN_CHANGED: {
      target: "checkChain",
    },
  },
});
