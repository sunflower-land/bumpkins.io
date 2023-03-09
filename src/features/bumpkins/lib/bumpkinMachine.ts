import { Bumpkin } from "features/auth/lib/fetchOnChainData";
import { Context } from "features/auth/lib/Provider";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { loadUSDCPrice } from "lib/web3/contracts/QuickSwap";
import { createMachine, Interpreter, assign } from "xstate";
import { equip } from "../actions/equip";
import { mintBumpkin } from "../actions/mint";
import { Equipped, Wallet } from "../types/Items";

export interface Context {
  jwt: string;
  bumpkins: Bumpkin[];
  errorCode?: keyof typeof ERRORS;
  bumpkinPrice: number;
}

type EquipEvent = {
  type: "EQUIP";
  equipment: Equipped;
  wallet: Wallet;
  tokenId: string;
};
export type BlockchainEvent =
  | {
      type: "MINT";
    }
  | EquipEvent
  | {
      type: "ACKNOWLEDGE";
    };

export type BlockchainState = {
  value:
    | "loading"
    | "noBumpkin"
    | "minting"
    | "ready"
    | "equipping"
    | "cannotEquip"
    | "error"
    | "minted";
  context: Context;
};

export type BumpkinMachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

// Make the mint fee cheap on testnet
export const BUMPKIN_USD_PRICE = CONFIG.NETWORK === "mainnet" ? 5 : 0.05;

export const bumpkinMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>({
  id: "bumpkinMachine",
  initial: "loading",
  // Injected at consumer level
  context: {
    jwt: "",
    bumpkinPrice: 5,
    bumpkins: [],
  },
  states: {
    loading: {
      invoke: {
        src: async () => {
          // Await Bumpkin Contracts
          const usdMatic = await loadUSDCPrice();

          return { price: usdMatic * BUMPKIN_USD_PRICE };
        },
        onDone: [
          {
            target: "noBumpkin",
            actions: assign({
              bumpkinPrice: (_, event) => event.data.price,
            }),
            cond: (context) => {
              return !context.bumpkins.length;
            },
          },
          {
            target: "ready",
          },
        ],
        onError: {
          target: "error",
        },
      },
    },
    noBumpkin: {
      on: {
        MINT: {
          target: "minting",
        },
      },
    },
    minting: {
      id: "minting",
      invoke: {
        src: async (context) => {
          // Await Bumpkin Contracts
          const { bumpkins } = await mintBumpkin({
            token: context.jwt,
          });

          return {
            bumpkins,
          };
        },
        onDone: {
          target: "minted",
          actions: assign<Context, any>({
            bumpkins: (_context, event) => event.data.bumpkins,
          }),
        },
        onError: {
          // Try again
          target: "loading",
        },
      },
    },
    minted: {
      on: {
        ACKNOWLEDGE: {
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        EQUIP: {
          target: "equipping",
        },
        MINT: {
          target: "minting",
        },
      },
    },
    equipping: {
      id: "equipping",
      invoke: {
        src: async (context, event) => {
          const { equipment, wallet, tokenId } = event as EquipEvent;
          const { bumpkin: updatedBumpkin } = await equip({
            bumpkinId: tokenId,
            equipment,
            wallet,
            token: context.jwt,
          });

          return {
            updatedBumpkin,
          };
        },
        onDone: {
          target: "equipped",
          actions: assign<Context, any>({
            bumpkins: (context, event) => {
              const { bumpkins } = context;

              return bumpkins.map((item) => {
                if (item.tokenId === event.data.updatedBumpkin.tokenId) {
                  return event.data.updatedBumpkin;
                }

                return item;
              });
            },
          }),
        },
        onError: [
          {
            target: "cannotEquip",
            cond: (_, event) =>
              event.data.message === ERRORS.CANNOT_EQUIP_LISTED,
          },
          { target: "loading" },
        ],
      },
    },
    equipped: {
      type: "final",
    },
    cannotEquip: {
      on: {
        ACKNOWLEDGE: {
          target: "loading",
        },
      },
    },
    error: {},
  },
});
