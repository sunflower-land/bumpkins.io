import React, { useEffect, useState } from "react";
import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";

import sfl from "assets/logos/sunflower_land.png";

import { Link } from "react-router-dom";
import { Equipped, ITEM_IDS } from "features/bumpkins/types/Items";
import { IMAGES } from "features/bumpkins/types/Images";
import { getKeys } from "src/metadata/items";

const SHOWCASE: Equipped[] = [
  {
    body: "Dark Brown Farmer Potion",
    shirt: "Red Farmer Shirt",
    pants: "Farmer Overalls",
    hair: "Explorer Hair",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
  },
  {
    body: "Beige Farmer Potion",
    shirt: "Yellow Farmer Shirt",
    pants: "Lumberjack Overalls",
    hair: "Rancher Hair",
    shoes: "Brown Boots",
    tool: "Axe",
    background: "Forest Background",
  },
  {
    body: "Goblin Potion",
    shirt: "SFL T-Shirt",
    pants: "Brown Suspenders",
    hair: "Sun Spots",
    shoes: "Brown Boots",
    tool: "Sword",
    background: "Farm Background",
  },

  {
    body: "Beige Farmer Potion",
    shirt: "Blue Farmer Shirt",
    pants: "Farmer Overalls",
    hair: "Basic Hair",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
    background: "Seashore Background",
  },

  {
    body: "Light Brown Farmer Potion",
    shirt: "Fancy Top",
    pants: "Fancy Pants",
    hair: "Buzz Cut",
    shoes: "Black Farmer Boots",
    tool: "Sword",
    secondaryTool: "Sunflower Shield",
    background: "Farm Background",
  },
];

export const Landing: React.FC = () => {
  const [equippedIndex, setEquippedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquippedIndex((previous) => {
        console.log({ previous });
        if (previous + 1 >= SHOWCASE.length) {
          return 0;
        }

        return previous + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log({ equippedIndex });
  const equipped = SHOWCASE[equippedIndex];

  console.log({ keys: getKeys(equipped) });
  return (
    <section className="max-w-7xl mx-auto ">
      <div className="container px-4 mx-auto py-6 lg:py-24">
        <div className="flex flex-wrap items-center -mx-3">
          <div className="w-full lg:w-1/2 px-3">
            <div className="py-12">
              <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                <h2 className="text-6xl md:text-8xl mb-4 font-bold font-heading">
                  <div className="flex h-12 items-center">
                    <img
                      src={sfl}
                      className="h-10 mr-2"
                      style={{
                        imageRendering: "pixelated",
                      }}
                    />
                    <span className="text-xl font-normal text-darkBlueGray-400 ">
                      Powered by Sunflower Land
                    </span>
                  </div>

                  <p className="mb-4 mt-2">Build your Bumpkin.</p>
                  <p className="leading-none">
                    <span className="">Discover and own rare </span>
                    <span className="text-blue-600 ">SFT </span>
                    <span className="">wearables</span>
                  </p>
                </h2>
                <p className="text-darkBlueGray-400 leading-relaxed">
                  Mint a Bumpkin <span className="font-bold">NFT</span> today
                  and collect wearable SFTs to equip to your Bumpkin.
                </p>
              </div>
              <div className="text-center lg:text-left">
                <Link
                  className="block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-base text-white text-center  leading-none bg-blue-600 hover:bg-blue-700 rounded"
                  to="/bumpkins"
                >
                  Mint an NFT
                </Link>
                <a
                  className="block sm:inline-block py-4 px-8 text-base text-darkBlueGray-500 hover:text-darkBlueGray-600 text-center  leading-none bg-white border border-darkBlueGray-200 hover:border-darkBlueGray-300 rounded"
                  href="https://docs.bumpkins.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-12 lg:mb-0">
            <div className="flex items-center justify-center relative">
              <div className="w-full rounded-xl overflow-hidden z-10">
                <DynamicNFT equipped={equipped} />
              </div>

              <div className="absolute right-1 top-1 z-10">
                <Link
                  to={`/collection/${ITEM_IDS[equipped.hair]}`}
                  className=" bg-white rounded z-20 mb-2"
                >
                  <div className=" bg-white rounded z-20 p-2 shadow-xl">
                    <img
                      src={IMAGES[equipped.hair].shopImage}
                      className="w-6 h-auto ml-1"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </Link>
                <Link
                  to={`/collection/${ITEM_IDS[equipped.shirt]}`}
                  className=" bg-white rounded z-20 relative top-2  shadow-4xl"
                >
                  <div className=" bg-white rounded z-20 p-2 shadow-xl">
                    <img
                      src={IMAGES[equipped.shirt].shopImage}
                      className="w-6 h-auto ml-1"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </Link>
                <Link
                  to={`/collection/${ITEM_IDS[equipped.pants]}`}
                  className=" bg-white rounded z-20 relative top-4"
                >
                  <div className=" bg-white rounded z-20 p-2 shadow-xl">
                    <img
                      src={IMAGES[equipped.pants].shopImage}
                      className="w-6 h-auto ml-1"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
