import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActor } from "@xstate/react";

import treasure from "assets/images/treasure.gif";
import { Context } from "features/auth/lib/Provider";
import {
  BumpkinMachineInterpreter,
  BUMPKIN_USD_PRICE,
} from "../lib/bumpkinMachine";
import { Error } from "components/Error";
import { interpretTokenUri } from "../lib/tokenUri";
import { DynamicNFT } from "./DynamicNFT";
import { PrimaryButton } from "components/PrimaryButton";

export const MintBumpkin: React.FC = () => {
  const { authService } = useContext(Context);
  const [authState] = useActor(authService);

  const bumpkinService = authState.children
    .bumpkin as BumpkinMachineInterpreter;
  const [bumpkinState, send] = useActor(bumpkinService);
  const { bumpkins } = bumpkinState.context;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      send("ACKNOWLEDGE");
    };
  }, []);

  if (bumpkinState.matches("minted")) {
    const { equipped, tokenId } = interpretTokenUri(
      bumpkins[bumpkins.length - 1].tokenURI
    );

    return (
      <section className="relative py-24 2xl:py-44 2xl:pb-48 font-heading font-medium bg-white rounded-t-10xl overflow-hidden">
        <div className="relative container px-4 mx-auto z-10">
          <div className="text-center flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="mb-4 font-heading text-7xl md:text-8xl xl:text-9xl leading-tight">
              Congratulations!
            </h2>
            <p className="font-heading mb-9 text-center text-base leading-8 text-darkBlueGray-400 max-w-lg mx-auto">
              {`You have minted Bumpkin #${tokenId}`}
            </p>
            <div className="bg-white relative mx-auto rounded-lg drop-shadow overflow-hidden w-full sm:w-128 mb-8">
              <div className="relative item-card-background">
                <div className="rounded-lg overflow-hidden z-10 m-auto">
                  <DynamicNFT equipped={equipped} />
                </div>
              </div>
            </div>
            <div className="max-w-[512px] w-full">
              <PrimaryButton
                title="Go to Bumpkin"
                onClick={() => navigate(`/bumpkins/${tokenId}`)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (bumpkinState.matches("error")) {
    return <Error />;
  }

  return (
    <section className="relative py-24 2xl:py-44 2xl:pb-48 font-heading font-medium bg-white rounded-t-10xl overflow-hidden">
      <div className="relative container px-4 mx-auto z-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col justify-center items-center">
          <>
            <h2 className="mb-1 font-heading text-9xl md:text-10xl xl:text-11xl leading-tight">
              Mint a Bumpkin
            </h2>
            <h2 className="mb-1 font-heading text-6xl md:text-7xl xl:text-8xl leading-tight">
              {`$${BUMPKIN_USD_PRICE} USD*`}
            </h2>
            <span className="text-gray-400 italic mb-8">
              *Mint fee is paid in MATIC
            </span>
          </>
          <img
            src={treasure}
            className="m-auto w-20 mb-10"
            style={{
              imageRendering: "pixelated",
            }}
          />
          <p className="mb-8 font-sans font-normal text-lg leading-6 text-darkBlueGray-400">
            A Bumpkin is an NFT that lives on Polygon Blockchain. To mint an NFT
            you must submit a transaction to the Blockchain.
          </p>
          <div className="max-w-[512px] w-full">
            <PrimaryButton
              loading={bumpkinState.matches("minting")}
              disabled={bumpkinState.matches("minting")}
              title={bumpkinState.matches("minting") ? "Minting..." : "Mint"}
              onClick={() => send("MINT")}
            />
          </div>
        </div>
      </div>
      <img
        className="absolute top-64 md:top-0 left-1/2 transform -translate-x-1/2 px-6 h-full"
        src="images/elipse.svg"
        alt=""
      />
    </section>
  );
};
