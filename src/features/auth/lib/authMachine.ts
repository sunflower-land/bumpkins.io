import { bumpkinMachine } from "features/bumpkins/lib/bumpkinMachine";
import { ERRORS } from "lib/errors";
import { web3 } from "lib/web3";
import { CONFIG } from "lib/config";
import { createMachine, Interpreter, assign } from "xstate";
import { hasValidSession, login, Token } from "../actions/auth/login";
import {
  Bumpkin,
  fetchOnChainData,
  SunflowerLandAccount,
} from "./fetchOnChainData";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { sequence } from "0xsequence";
import { SEQUENCE_CONNECT_OPTIONS } from "./sequence";

const WALLET_PROVIDER_KEY = "walletProvider";
export type Wallet = "METAMASK" | "WALLET_CONNECT" | "SEQUENCE";

export interface Context {
  errorCode?: keyof typeof ERRORS;
  address?: string;
  jwt?: string;
  user?: Token;
  bumpkins?: Bumpkin[];
  sunflowerLandAccount?: SunflowerLandAccount;
  sflBalance?: number;
  wallet?: Wallet;
  provider?: any;
}

export type BlockchainEvent =
  | {
      type: "CHAIN_CHANGED";
    }
  | {
      type: "ACCOUNT_CHANGED";
    }
  | {
      type: "REFRESH";
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SWITCH_NETWORK";
    }
  | {
      type: "CONNECT";
    }
  | {
      type: "SIGN";
    }
  | { type: "UPDATE_BALANCE"; balance: number }
  | { type: "CONNECT_TO_METAMASK" }
  | { type: "CONNECT_TO_WALLET_CONNECT" }
  | { type: "CONNECT_TO_SEQUENCE" };

export type BlockchainState = {
  value:
    | "idle"
    | "reconnecting"
    | "connectingToMetamask"
    | "connectingToWalletConnect"
    | "connectingToSequence"
    | "connectedToWallet"
    | "setupContracts"
    | "wrongChain"
    | "switchingNetwork"
    | "addingWallet"
    | "loadingOnChain"
    | "connected"
    | "signing"
    | "unauthorised"
    | "authorised";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

const getWalletProviderFromLocalStorage = (): Wallet | undefined => {
  const wallet = localStorage.getItem(WALLET_PROVIDER_KEY);

  if (wallet) return wallet as Wallet;

  return undefined;
};

const walletProvider = getWalletProviderFromLocalStorage();

export const authMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>(
  {
    id: "authMachine",
    initial: walletProvider ? "reconnecting" : "idle",
    context: {
      wallet: walletProvider,
    },
    states: {
      idle: {
        on: {
          CONNECT_TO_METAMASK: {
            target: "connectingToMetamask",
          },
          CONNECT_TO_WALLET_CONNECT: {
            target: "connectingToWalletConnect",
          },
          CONNECT_TO_SEQUENCE: {
            target: "connectingToSequence",
          },
        },
      },
      reconnecting: {
        id: "reconnecting",
        always: [
          {
            target: "connectingToMetamask",
            cond: (context) => context.wallet === "METAMASK",
          },
          {
            target: "connectingToWalletConnect",
            cond: (context) => context.wallet === "WALLET_CONNECT",
          },
          {
            target: "connectingToSequence",
            cond: (context) => context.wallet === "SEQUENCE",
          },
          { target: "idle" },
        ],
      },
      connectingToMetamask: {
        invoke: {
          src: async () => {
            const _window = window as any;

            // TODO add type support
            if (_window.ethereum) {
              const provider = _window.ethereum;

              if (provider.isPhantom) {
                throw new Error(ERRORS.PHANTOM_WALLET_NOT_SUPPORTED);
              }
              await provider.request({
                method: "eth_requestAccounts",
              });

              return { wallet: "METAMASK", provider };
            } else {
              throw new Error(ERRORS.NO_WEB3);
            }
          },
          onDone: {
            target: "setupContracts",
            actions: "assignWallet",
          },
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      connectingToWalletConnect: {
        id: "connectingToWalletConnect",
        invoke: {
          src: async () => {
            // TODO abstract RPC constants
            const provider = new WalletConnectProvider({
              rpc: {
                80001: "https://matic-mumbai.chainstacklabs.com",
                137: "https://polygon-rpc.com/",
              },
            });
            //  Enable session (triggers QR Code modal)
            await provider.enable();

            return { wallet: "WALLET_CONNECT", provider };
          },
          onDone: {
            target: "setupContracts",
            actions: "assignWallet",
          },
          onError: [
            {
              target: "idle",
              cond: (_, event) => event.data.message === "User closed modal",
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      connectingToSequence: {
        id: "connectingToSequence",
        invoke: {
          src: async () => {
            const network = CONFIG.NETWORK === "mainnet" ? "polygon" : "mumbai";

            const sequenceWallet = await sequence.initWallet(network);
            await sequenceWallet.connect(SEQUENCE_CONNECT_OPTIONS);

            if (!sequenceWallet.isConnected()) {
              throw Error(ERRORS.SEQUENCE_NOT_CONNECTED);
            }

            const provider = sequenceWallet.getProvider();

            return { wallet: "SEQUENCE", provider };
          },
          onDone: {
            target: "setupContracts",
            actions: "assignWallet",
          },
          onError: [
            {
              target: "idle",
              cond: (_, event) =>
                event.data.message === ERRORS.SEQUENCE_NOT_CONNECTED,
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      setupContracts: {
        invoke: {
          src: async (context) => {
            await web3.initialise(context.provider);
          },
          onDone: [
            {
              target: "signing",
              cond: (context) => context.wallet === "METAMASK",
            },
            {
              target: "connectedToWallet",
            },
          ],
          onError: [
            {
              target: "wrongChain",
              cond: (_, event) => event.data.message === ERRORS.WRONG_CHAIN,
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      connectedToWallet: {
        always: { target: "signing", cond: () => hasValidSession() },
        on: { SIGN: { target: "signing" } },
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
            target: "idle",
          },
          onError: [
            {
              cond: (_, event) => {
                return event.data.message === ERRORS.REJECTED_TRANSACTION;
              },
              target: "wrongChain",
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      connected: {
        on: {
          SIGN: {
            target: "signing",
          },
        },
      },
      signing: {
        invoke: {
          src: async () => {
            const { jwt, user } = await login();

            return { jwt, user };
          },
          onDone: {
            target: "loadingOnChain",
            actions: assign<Context, any>({
              jwt: (_context, event) => event.data.jwt,
              user: (_context, event) => event.data.user,
            }),
          },
          onError: [
            {
              cond: (_, event) => {
                return event.data.message === ERRORS.REJECTED_TRANSACTION;
              },
              target: "connected",
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      loadingOnChain: {
        id: "loadingOnChain",
        invoke: {
          src: async () => {
            const { bumpkins, sflBalance, sunflowerLandAccount } =
              await fetchOnChainData();
            return {
              bumpkins,
              sflBalance,
              sunflowerLandAccount,
            };
          },
          onDone: {
            target: "authorised",
            actions: assign<Context, any>({
              bumpkins: (_context, event) => event.data.bumpkins,
              sunflowerLandAccount: (_context, event) =>
                event.data.sunflowerLandAccount,
              sflBalance: (_context, event) => event.data.sflBalance,
            }),
          },
          onError: [
            {
              target: "#loadingOnChain",
              cond: () => !web3.isAlchemy,
              actions: (context) => {
                web3.overrideProvider(context.wallet!, context.provider);
              },
            },
            {
              target: "#unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      authorised: {
        entry: "setProviderInLocalStorage",
        invoke: {
          id: "bumpkin",
          autoForward: true,
          src: bumpkinMachine,
          data: {
            jwt: (context: Context) => context.jwt,
            bumpkins: (context: Context) => context.bumpkins,
            sunflowerLandAccount: (context: Context) =>
              context.sunflowerLandAccount,
          },
          onDone: {
            target: "loadingOnChain",
          },
        },
        on: {
          UPDATE_BALANCE: {
            actions: assign({
              sflBalance: (context, event) => event.balance,
            }),
          },
        },
      },
      unauthorised: {
        id: "unauthorised",
      },
    },
    on: {
      CHAIN_CHANGED: {
        target: "idle",
      },
      ACCOUNT_CHANGED: {
        target: "idle",
      },
      REFRESH: {
        target: "idle",
      },
    },
  },
  {
    actions: {
      assignErrorMessage: assign<Context, any>({
        errorCode: (_context, event) => event.data.message,
      }),
      assignWallet: assign<Context, any>({
        wallet: (_context, event) => event.data.wallet,
        provider: (_context: any, event: any) => event.data.provider,
      }),
      setProviderInLocalStorage: (context) => {
        if (!context.wallet) return;

        localStorage.setItem(WALLET_PROVIDER_KEY, context.wallet);
      },
    },
  }
);
