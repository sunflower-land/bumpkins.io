import React from "react";

import lightning from "assets/icons/lightning.png";
import { ITEM_IDS } from "features/bumpkins/types/Items";
import { Link } from "react-router-dom";
import { IMAGES } from "features/bumpkins/types/Images";

export const SFT: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto lg:pt-20 pb-24 xl:pb-44 xl:pt-[44px] overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 className="mb-6 text-6xl md:text-7xl xl:text-8xl font-heading font-medium">
          What is an SFT?
        </h2>
        <div className="flex flex-col md:flex-row   mb-14 xl:mb-24 ">
          <div>
            <p className="max-w-4xl text-xl font-heading font-medium mb-6">
              Semi-fungible tokens are a new era in Digital collectibles which
              enables multiple copies of the same item. This includes Shirts,
              Pants, Necklaces, Weapons and much more.
            </p>
            <p className="max-w-4xl text-xl font-heading font-medium mb-6">
              You can now <span className="underline">own</span> & trade the
              individual clothing items that your NFT wears.
            </p>
            <div className="h-full">
              <div className="text-center lg:text-left">
                <Link
                  className="block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-base text-white text-center  leading-none bg-blue-600 hover:bg-blue-700 rounded"
                  to="/collection"
                >
                  View collection
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center -mx-4">
          <div className="w-full flex flex-wrap px-4">
            <Link
              to={`/collection/${ITEM_IDS["Fancy Top"]}`}
              className="flex items-center mb-8"
              style={{
                maxWidth: "26rem",
              }}
            >
              <div className="flex-shrink-0 text-center mr-8 shadow-lg">
                <div className="h-32 w-44 overflow-hidden flex items-center justify-center bg-purple-300 rounded-t-3xl">
                  <img
                    className="w-full pixelate"
                    src={IMAGES["Fancy Top"]}
                    alt=""
                  />
                </div>
                <div className="py-4 px-2 bg-purple-500 rounded-b-3xl">
                  <span className="font-heading font-bold text-white">
                    Fancy Top
                  </span>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-heading font-medium">
                  Limited drops
                </h3>
                <p className="text-gray-400">Rare items and scheduled drops</p>
                <p className="mt-6 underline text-blue-500">
                  <Link
                    className="mt-6 underline text-blue-500"
                    to="/upcoming-drops"
                  >
                    View upcoming
                  </Link>
                </p>
              </div>
            </Link>
            <Link
              to={`/collection/${ITEM_IDS["Chef Apron"]}`}
              className="flex items-center mb-8"
              style={{
                maxWidth: "26rem",
              }}
            >
              <div className="flex-shrink-0 text-center mr-8  shadow-lg">
                <div className="h-32 w-44 overflow-hidden flex items-center justify-center bg-blue-300 rounded-t-3xl relative">
                  <img
                    className="w-full pixelate"
                    src={IMAGES["Chef Apron"]}
                    alt=""
                  />
                  <img
                    className="h-8 absolute top-4 right-4 pixelate"
                    src={lightning}
                    alt=""
                  />
                </div>
                <div className="py-4 px-2 bg-blue-500 rounded-b-3xl">
                  <span className="font-heading font-bold text-white">
                    Chef Apron
                  </span>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-heading font-medium">
                  Game Utility
                </h3>
                <p className="text-gray-400">Extra boosts in Sunflower Land</p>
              </div>
            </Link>
            <Link
              to={`/collection/${ITEM_IDS["Sunflower Shield"]}`}
              className="flex items-center mb-8"
              style={{
                maxWidth: "26rem",
              }}
            >
              <div className="flex-shrink-0 text-center mr-8  shadow-lg">
                <div className="h-32 w-44 overflow-hidden flex items-center justify-center bg-purple-300 rounded-t-3xl">
                  <img
                    className="w-full pixelate"
                    src={IMAGES["Sunflower Shield"]}
                    alt=""
                  />
                </div>
                <div className="py-4 px-2 bg-purple-500 rounded-b-3xl">
                  <span className="font-heading font-bold text-white">
                    Sunflower Shield
                  </span>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-heading font-medium">
                  Rarity
                </h3>
                <p className="text-gray-400">
                  Create your own rarity with a combination of items
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
