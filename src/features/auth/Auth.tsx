import React, { useContext } from "react";

import { Context } from "./lib/Provider";
import { useActor } from "@xstate/react";
import { Loading } from "components/Loading";
import { Error } from "components/Error";
import { WrongChain } from "components/WrongChain";

export const Auth: React.FC = () => {
  const { authService } = useContext(Context);
  const [state, send] = useActor(authService);

  const connecting =
    state.matches("connectingToMetamask") ||
    state.matches("connectingToWalletConnect") ||
    state.matches("connectingToSequence") ||
    state.matches("setupContracts");

  if (connecting || state.matches("loadingOnChain")) {
    return (
      <div className="h-[250px]">
        <Loading />
      </div>
    );
  }

  if (state.matches("wrongChain") || state.matches("switchingNetwork")) {
    return (
      <WrongChain
        isSwitching={state.matches("switchingNetwork")}
        onSwitch={() => send("SWITCH_NETWORK")}
      />
    );
  }

  if (state.matches("connectedToWallet")) {
    return (
      <section className="h-full flex-1">
        <div className="container mx-auto">
          <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl md:text-7xl font-heading font-semibold">
                Wallet Connected!
              </h2>
              <p className=" text-gray-300 font-heading font-medium">
                Your wallet has been successfully connected. Use your wallet to
                sign into Bumpkins.io.
              </p>
              <div className="sm:max-w-max mt-8">
                <button
                  className="h-12 w-full justify-center items-center px-7 flex text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  onClick={() => send("SIGN")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state.matches("connected") || state.matches("signing")) {
    return (
      <section className="h-full flex-1">
        <div className="container mx-auto">
          <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
            <div className="relative z-10">
              <h2 className="mb-4 text-6xl md:text-7xl font-heading font-semibold">
                Access Bumpkins.io
              </h2>
              <p className=" text-gray-300 font-heading font-medium">
                Sign a request to access Bumpkins.io. We will remember this
                device for 7 days.
              </p>
              <div className="sm:max-w-max mt-8">
                <button
                  className="h-12 min-w-[180px] items-center flex justify-center py-2 lg:py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  onClick={() => send("SIGN")}
                  disabled={state.matches("signing")}
                >
                  {state.matches("signing") ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing...
                    </>
                  ) : (
                    "Sign"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state.matches("idle")) {
    return (
      <section className="h-full flex-1">
        <div className="container mx-auto">
          <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl md:text-7xl font-heading font-semibold">
                Connect the wallet you want to use for Bumpkins.io
              </h2>
              <p className=" text-gray-300 font-heading font-medium">
                By adding your wallet you agree to the terms and services of
                bumpkins.io
              </p>
              <div className="sm:max-w-max mt-8 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                  className="h-12 w-full justify-center items-center px-7 flex text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  onClick={() => send("CONNECT_TO_METAMASK")}
                >
                  Metamask
                </button>
                <button
                  className="h-12 w-full whitespace-nowrap justify-center items-center px-7 flex text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  onClick={() => send("CONNECT_TO_WALLET_CONNECT")}
                >
                  Wallet Connect
                </button>
                <button
                  className="h-12 w-full justify-center items-center px-7 flex text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  onClick={() => send("CONNECT_TO_SEQUENCE")}
                >
                  Sequence
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state.matches("unauthorised")) {
    return <Error errorCode={state.context.errorCode} />;
  }

  return (
    <section className="h-full flex-1">
      <div className="container mx-auto">
        <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
          <div className="relative z-10">
            <h2 className="mb-4 text-6xl md:text-7xl font-heading font-semibold">
              Connected!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
