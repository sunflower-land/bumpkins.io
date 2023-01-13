import { ERRORS } from "lib/errors";
import { assign, createMachine } from "xstate";
import { loadSingleItem, SingleBumpkinItem } from "../actions/items";

export interface Context {
  itemId?: number;
  item?: SingleBumpkinItem;
  errorCode?: keyof typeof ERRORS;
}

export type BlockchainState = {
  value: "loading" | "ready" | "error";
  context: Context;
};

export const itemDetailMachine = createMachine<Context, any, BlockchainState>({
  id: "itemDetailMachine",
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: async (context) => {
          const item = await loadSingleItem(Number(context.itemId));

          return { item };
        },
        onDone: {
          target: "ready",
          actions: assign<Context, any>({
            item: (_context, event) => event.data.item,
          }),
        },
        onError: {
          target: "error",
          actions: assign<Context, any>({
            errorCode: (_context, event) => event.data.errorCode,
          }),
        },
      },
    },
    ready: {},
    error: {},
  },
});
