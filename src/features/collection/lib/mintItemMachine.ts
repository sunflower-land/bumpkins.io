import { BumpkinItem } from "features/bumpkins/types/Items";
import { ERRORS } from "lib/errors";
import { assign, createMachine } from "xstate";
import { mintItem } from "../actions/mintItem";
import { BumpkinShopItem } from "../actions/items";
import {
  approveSFL,
  loadAllowance,
} from "lib/web3/contracts/SunflowerLandToken";

export interface Context {
  itemName: BumpkinShopItem;
  sfl: number;
  errorCode?: keyof typeof ERRORS;
  allowance: number;
}

type ApproveEvent = {
  type: "APPROVE";
};

type MintEvent = {
  type: "MINT";
  jwt: string;
  itemName: BumpkinItem;
};

export type BlockchainEvent = MintEvent | ApproveEvent;

export type BlockchainState = {
  value:
    | "idle"
    | "approving"
    | "approved"
    | "minting"
    | "minted"
    | "error"
    | "loading";
  context: Context;
};

export const mintItemMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>({
  id: "mintItemMachine",
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: async (context, event) => {
          await new Promise((res) => setTimeout(res, 300));
          try {
            const allowance = await loadAllowance();

            return { allowance };
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
        onDone: [
          {
            target: "approved",
            cond: (context, event) => event.data.allowance > context.sfl,
          },
          {
            target: "idle",
          },
        ],
        onError: {
          target: "error",
          actions: assign<Context, any>({
            errorCode: (_context, event) => {
              return event.data.errorCode;
            },
          }),
        },
      },
    },
    idle: {
      on: {
        APPROVE: {
          target: "approving",
        },
      },
    },
    approving: {
      invoke: {
        src: async (_, event) => {
          try {
            await approveSFL();

            return { success: true };
          } catch (error) {
            return { success: false };
          }
        },
        onDone: [
          {
            target: "approved",
            cond: (_, event) => event.data.success,
          },
          { target: "error" },
        ],
        onError: {
          target: "error",
          actions: assign<Context, any>({
            errorCode: (_context, event) => {
              return event.data.errorCode;
            },
          }),
        },
      },
    },
    approved: {
      on: {
        MINT: "minting",
      },
    },
    minting: {
      invoke: {
        src: async (_, event) => {
          const { jwt, itemName } = event as MintEvent;
          await mintItem({
            token: jwt,
            item: itemName,
          });
        },
        onDone: {
          target: "minted",
        },
        onError: {
          target: "error",
          actions: assign<Context, any>({
            errorCode: (_context, event) => {
              return event.data.message;
            },
          }),
        },
      },
    },
    minted: {},
    error: {},
  },
});
