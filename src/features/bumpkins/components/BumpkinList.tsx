import React, { useContext } from "react";
import { useActor } from "@xstate/react";
import { Context } from "features/auth/lib/Provider";
import { Link, useNavigate } from "react-router-dom";
import { BumpkinMachineInterpreter } from "../lib/bumpkinMachine";
import { interpretTokenUri } from "../lib/tokenUri";
import { DynamicNFT } from "./DynamicNFT";
import { PrimaryButton } from "components/PrimaryButton";

export const BumpkinList = () => {
  const { authService } = useContext(Context);
  const [authState] = useActor(authService);
  const navigate = useNavigate();

  const bumpkinService = authState.children
    .bumpkin as BumpkinMachineInterpreter;
  const [bumpkinState] = useActor(bumpkinService);

  const { bumpkins } = bumpkinState.context;
  return (
    <section>
      <div className="pt-12 pb-24 2xl:pb-44 container mx-auto">
        <div className="px-4">
          <h2 className="mb-4 font-heading font-medium text-7xl md:text-8xl xl:text-9xl text-center leading-tight">
            My Bumpkins
          </h2>
          <p className="mb-10 px-2 font-heading text-center text-sm tracking-tight leading-2 text-darkBlueGray-400 mx-auto">
            {`Click on one of your Bumpkins to go and customise its look.`}
          </p>
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          {bumpkins.map((item) => {
            const { equipped } = interpretTokenUri(item.tokenURI);
            return (
              <Link
                key={item.tokenId}
                to={`/bumpkins/${item.tokenId}`}
                id={`bumpkins${item.tokenId}`}
                className="mx-2 md:mx-3 mb-4 md:mb-6 w-2/5 md:w-1/4"
              >
                <div className="bg-white relative rounded-lg drop-shadow overflow-hidden">
                  <div className="relative">
                    <div className="rounded-t-lg overflow-hidden z-10 m-auto">
                      <DynamicNFT equipped={equipped} />
                    </div>
                    <div className="p-2 text-center font-semibold">
                      #{item.tokenId}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="px-9 mt-4">
            <p className="mb-4 text-lg font-medium text-center">
              Would you like to mint another another Bumpkin?
            </p>
            <PrimaryButton
              title="Mint Bumpkin"
              onClick={() => navigate("/mint-bumpkin")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
