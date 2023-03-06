import React, { useContext, useEffect } from "react";
import { useActor, useMachine } from "@xstate/react";
import { Auth } from "features/auth/Auth";
import { Context } from "features/auth/lib/Provider";

import { useLocation, useNavigate } from "react-router-dom";
import { mintItemMachine } from "../lib/mintItemMachine";
import { LoadingSpinner } from "components/LoadingSpinner";
import { BumpkinItem } from "features/bumpkins/types/Items";
import { ERRORS } from "lib/errors";

import token from "assets/icons/token_2.png";
import success from "assets/icons/accept.svg";
import { Modal } from "features/components/Modal";
import { Loading } from "components/Loading";
import { getSFLBalance } from "lib/web3/contracts/SunflowerLandToken";
import Web3 from "web3";
import classNames from "classnames";

interface LocationState {
  name: BumpkinItem;
  price: number;
}

export const MintConfirmationModal: React.FC = () => {
  const { authService } = useContext(Context);
  const [authState, authSend] = useActor(authService);
  const { state } = useLocation();
  const navigate = useNavigate();

  const itemData = state as LocationState;

  const [mintMachineState, send] = useMachine(mintItemMachine, {
    context: {
      sfl: Number(itemData.price),
    },
  });

  useEffect(() => {
    const loadBalance = async () => {
      const sflBalance = await getSFLBalance();

      authSend({
        type: "UPDATE_BALANCE",
        balance: Number(Web3.utils.fromWei(sflBalance)),
      });
    };

    loadBalance();
  }, []);

  // Can you mint

  if (!state) {
    navigate("/");
  }

  const handleMint = async () => {
    send({
      type: "MINT",
      jwt: authState.context.jwt as string,
      itemName: itemData.name,
    });
  };

  const handleApprove = async () => {
    send({
      type: "APPROVE",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const errorCode = mintMachineState.context.errorCode;
  const canAfford = Number(authState.context.sflBalance) >= itemData.price;

  const Content = () => {
    if (mintMachineState.matches("loading")) {
      return <Loading />;
    }

    if (!authState.matches("authorised")) {
      return (
        <div className="px-4 py-1">
          <Auth />
        </div>
      );
    }

    if (mintMachineState.matches("minted")) {
      return (
        <section>
          <div className="z-50 p-4">
            <div className="relative">
              <div className="px-4 sm:px-5">
                <div className="relative z-10 p-8 sm:p-10 xl:px-16 xl:pb-16 xl:pt-14 w-full max-w-xl bg-white rounded-3xl">
                  <h3 className="mb-3 text-xs text-gray-300 font-heading font-medium uppercase tracking-widest">
                    Congratulations
                  </h3>
                  <h2 className="text-3xl text-body font-heading font-medium">
                    {`You minted: ${itemData.name}`}
                  </h2>
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-screen border-b border-black border-opacity-5"></div>
                </div>
                <div className="w-full">
                  <div className="pt-11 bg-white rounded-3xl">
                    <div className="">
                      {!mintMachineState.matches("minted") && (
                        <div className="px-8 pb-8">
                          <h3 className="mb-3 text-3xl text-black font-heading font-medium">
                            Totals
                          </h3>
                          <p className="flex items-center justify-between leading-8 font-heading font-medium">
                            <span className="text-black text-opacity-70 text-xs">
                              Your balance
                            </span>
                            <span className="flex items-center text-xl text-black">
                              <img
                                className="mr-3 w-4 text-base"
                                style={{
                                  imageRendering: "pixelated",
                                }}
                                src={token}
                              />
                              <span className="text-sm sm:text-base md:text-lg">
                                {Number(authState.context.sflBalance).toFixed(
                                  2
                                )}
                                SFL
                              </span>
                            </span>
                          </p>
                          <p className="flex items-center justify-between leading-8 font-heading font-medium">
                            <span className="text-black text-opacity-70">
                              Mint price
                            </span>
                            <span className="flex items-center text-xl text-black">
                              <img className="mr-3 w-4 text-base" src={token} />
                              <span className="text-sm sm:text-base md:text-lg">
                                {itemData.price} SFL
                              </span>
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    {mintMachineState.matches("minted") && (
                      <div className="w-full flex items-center justify-center mb-10">
                        <img className="h-16 w-16" src={success} alt="" />
                      </div>
                    )}
                    <div className="mb-3">
                      <button
                        onClick={handleBack}
                        className="items-center w-full justify-center flex py-5 px-7 text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    const button = () => {
      if (mintMachineState.matches("idle")) {
        return (
          <button
            onClick={handleApprove}
            className="items-center justify-center flex py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          >
            <div className="flex items-center">
              <span>Approve SFL</span>
            </div>
          </button>
        );
      }

      if (mintMachineState.matches("approved")) {
        return (
          <button
            disabled={!canAfford}
            onClick={handleMint}
            className={classNames(
              "items-center justify-center flex py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center focus:ring-opacity-50 rounded-xl",
              {
                "bg-blueGray-300 focus:ring-blueGray-500": !canAfford,
                "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500": canAfford,
              }
            )}
          >
            <div className="flex items-center">
              <span>Mint</span>
            </div>
          </button>
        );
      }

      if (mintMachineState.matches("approving")) {
        return (
          <button
            disabled
            className="items-center justify-center flex py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          >
            <div className="flex items-center">
              <div className="mr-2">
                <LoadingSpinner size={20} />
              </div>
              <span>Approving</span>
            </div>
          </button>
        );
      }

      if (mintMachineState.matches("minting")) {
        return (
          <button
            disabled
            className="items-center justify-center flex py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          >
            <div className="flex items-center">
              <div className="mr-2">
                <LoadingSpinner size={20} />
              </div>
              <span>Minting</span>
            </div>
          </button>
        );
      }

      return (
        <button
          onClick={handleBack}
          className="items-center justify-center flex py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
        >
          <div className="flex items-center">
            <span>Close</span>
          </div>
        </button>
      );
    };

    return (
      <section>
        <div className="pt-10 pb-8 bg-white overflow-hidden w-full">
          <div className="container px-4 mx-auto">
            <div className="relative pb-9 text-center">
              <h2 className="text-7xl md:text-8xl xl:text-9xl leading-normal font-heading font-medium text-center">
                Mint your item
              </h2>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-screen border-b border-black border-opacity-5"></div>
            </div>
            <div className="w-full">
              <div className="pt-11 bg-white rounded-3xl">
                <div className="">
                  <div className="px-8 pb-8">
                    <h3 className="mb-3 text-3xl text-black font-heading font-medium">
                      Totals
                    </h3>
                    <p className="flex items-center justify-between leading-8 font-heading font-medium">
                      <span className="text-black text-opacity-70">
                        Your balance
                      </span>
                      <span className="flex items-center text-xl text-black">
                        <img
                          className="mr-1 w-6 text-base pixelate"
                          src={token}
                        />
                        <span className="text-sm sm:text-base md:text-lg">
                          {Number(authState.context.sflBalance).toFixed(2)} SFL
                        </span>
                      </span>
                    </p>
                    <p className="flex items-center justify-between leading-8 font-heading font-medium">
                      <span className="text-black text-opacity-70">
                        Mint price
                      </span>
                      <span className="flex items-center text-xl text-black">
                        <img
                          className="mr-3 w-6 text-base pixelate"
                          src={token}
                        />
                        <span className="text-sm sm:text-base md:text-lg">
                          {itemData.price} SFL
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-8 mb-3">
                  {button()}
                  <div className="flex flex-col">
                    {mintMachineState.matches("error") && (
                      <span className="text-red-500 mt-1">
                        {errorCode ? ERRORS[errorCode] : `Transaction failed`}
                      </span>
                    )}
                    <a
                      className="text-gray-400 hover:text-gray-500 font-heading text-sm font-light underline"
                      href="https://docs.bumpkins.io/support/terms-of-service"
                    >
                      Terms and Conditions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Modal
      show={true}
      onHide={!mintMachineState.matches("minting") ? handleBack : undefined}
    >
      <div className="rounded-3xl overflow-hidden w-full" id="mint-modal">
        {Content()}
      </div>
    </Modal>
  );
};
