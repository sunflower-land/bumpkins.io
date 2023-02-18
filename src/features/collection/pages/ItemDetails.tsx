import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Link, Outlet, useParams } from "react-router-dom";
import { Loading } from "components/Loading";
import { generateRandomBumpkinImage } from "features/bumpkins/lib/generateRandomBumpkinImage";
import { DETAILS } from "features/bumpkins/types/ItemDetails";
import { NotFound } from "components/NotFound";
import { useMachine } from "@xstate/react";
import { itemDetailMachine } from "../lib/itemDetailMachine";
import sunflowerLandIcon from "assets/logos/sunflower_land.png";
import brownBackground from "assets/images/brown_background.png";

import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";
import { PrimaryButton } from "components/PrimaryButton";
import { DateTime } from "luxon";
import { isCommon, isReleased } from "../lib/common";
import { Release as IRelease } from "features/bumpkins/types/Shop";
import { getReleaseSupply } from "features/upcoming-drops/UpcomingDrops";
import { CONFIG } from "lib/config";
import { Release } from "features/upcoming-drops/components/Release";
import { IMAGES } from "features/bumpkins/types/Images";

const randomBumpkin = generateRandomBumpkinImage();

type ImageType = "shopImage" | "bumpkin";

export const Releases: React.FC<{ releases: IRelease[] }> = ({ releases }) => {
  return (
    <div className="mb-2">
      {releases.length > 1 ? (
        <p className="underline mb-2 text-lg">{`${releases.length} Releases`}</p>
      ) : (
        <p className="underline mb-2 text-lg">Release</p>
      )}
      <ul>
        {releases.map((release, index) => {
          const { releaseDate, endDate, price } = release;

          const availableSupply = getReleaseSupply(releases, index);

          return (
            <Release
              key={index}
              releaseDate={DateTime.fromMillis(releaseDate)}
              endDate={DateTime.fromMillis(endDate ?? 0)}
              supply={availableSupply}
              sfl={Number(price)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const ItemDetails: React.FC = () => {
  const { id } = useParams();

  const [mainImage, setMainImage] = useState<ImageType>("shopImage");

  const [state] = useMachine(itemDetailMachine, {
    context: { itemId: Number(id) },
  });

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("scroll-position-product-id-marker", id);
    }
  }, []);

  if (state.matches("loading")) {
    return <Loading />;
  }

  if (!state.context.item) {
    return <NotFound />;
  }

  const { name, releases, tokenId } = state.context.item;
  const { part, description } = DETAILS[name];

  const handleImageClick = (image: ImageType) => {
    setMainImage(image);
  };

  const visitOpenSea = () => {
    window.open(
      `https://opensea.io/assets/matic/${CONFIG.BUMPKIN_ITEMS_CONTRACT}/${tokenId}`,
      "_blank"
    );
  };

  // const visitNiftySwap = () => {
  //   console.log("visit nifty swap");
  // };

  const canMint = isCommon(state.context.item);
  const released = isReleased(state.context.item);

  const BottomSection = () => {
    if (!released) {
      return <Releases releases={releases} />;
    }

    if (canMint) {
      const { price } = releases[0];

      return (
        <div className="mt-5">
          <Link to={{ pathname: "mint" }} state={{ price, name }}>
            <PrimaryButton title="Mint" />
          </Link>
        </div>
      );
    }

    if (!canMint) {
      return (
        <div className="space-y-3 mt-5">
          <PrimaryButton title="View on OpenSea" onClick={visitOpenSea} />
        </div>
      );
    }

    return null;
  };

  const boosts = DETAILS[name].boosts || [];

  return (
    <>
      <section className="bg-white mb-20">
        <div className="pt-12 pb-20 2xl:pb-36">
          <div className="container px-6 lg:px-10 mx-auto">
            <h2 className="mb-10 md:mb-12 font-heading font-medium text-6xl md:text-7xl xl:text-9xl text-center leading-tight">
              {`${name} #${id}`}
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="w-full md:w-1/2">
                <div className="flex flex-col items-start justify-end md:flex-row md:space-x-3">
                  <div className="hidden md:flex flex-col justify-start md:justify-center w-20 space-y-2">
                    <button
                      onClick={() => handleImageClick("shopImage")}
                      className="w-20 h-20 rounded-4xl overflow-hidden border-2 border-gray-100 flex justify-center items-center"
                    >
                      <img
                        className="w-full"
                        style={{ imageRendering: "pixelated" }}
                        src={IMAGES[name].shopImage}
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => handleImageClick("bumpkin")}
                      className="w-20 h-20 border-2 border-gray-100 rounded-4xl overflow-hidden"
                    >
                      <DynamicNFT
                        equipped={{ ...randomBumpkin, [part]: name }}
                      />
                    </button>
                  </div>
                  <div className="mb-5 relative rounded-lg overflow-hidden w-full lg:w-2/3">
                    <>
                      <img
                        src={brownBackground}
                        alt="background"
                        className="w-full"
                      />
                      {mainImage === "shopImage" && (
                        <img
                          src={IMAGES[name].shopImage}
                          alt={name}
                          className={classNames(
                            "absolute h-full w-full object-cover top-0",
                            {
                              "bumpkin-background": part === "background",
                              "mouth-eyes-shoes": part === "shoes",
                            }
                          )}
                          style={{
                            imageRendering: "pixelated",
                          }}
                        />
                      )}
                      {mainImage === "bumpkin" && (
                        <div className="absolute w-full h-full top-0 z-10">
                          <DynamicNFT
                            equipped={{ ...randomBumpkin, [part]: name }}
                          />
                        </div>
                      )}
                    </>
                  </div>
                  <div className="flex md:hidden justify-start md:justify-center w-full mt-2 mb-8 space-x-2">
                    <button
                      onClick={() => handleImageClick("shopImage")}
                      className="w-20 h-20 lg:w-1/4 lg:h-auto px-1 mb-1 md:mb-0 rounded-4xl border-2 border-gray-100 flex justify-center items-center"
                    >
                      <img
                        className="w-full"
                        style={{ imageRendering: "pixelated" }}
                        src={IMAGES[name].shopImage}
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => handleImageClick("bumpkin")}
                      className="w-20 h-20 lg:w-1/4 md:h-auto mb-1 md:mb-0 border-2 border-gray-100 rounded-4xl overflow-hidden"
                    >
                      <DynamicNFT
                        equipped={{ ...randomBumpkin, [part]: name }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:w-1/2">
                <div className="flex flex-col w-full  justify-between">
                  <div className="flex flex-col">
                    <div className="flex mb-6">
                      <img
                        src={sunflowerLandIcon}
                        alt="Sunflower land icon"
                        className="mr-2 w-5 object-contain"
                      />
                      <p className="text-lg text-gray-400">SFL Collection #1</p>
                    </div>
                    <p className="mb-8 text-lg">{description}</p>
                    {boosts.length > 0 && (
                      <div className="flex flex-col mb-6">
                        <p className="font-semibold">Boosts:</p>
                        <ul>
                          {DETAILS[name].boosts?.map((boost, index) => (
                            <li key={index} className="pl-1">{`- ${boost}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {BottomSection()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
};
