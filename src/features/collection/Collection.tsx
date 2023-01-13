import React, { useEffect, useState } from "react";

import { Category, CATEGORY_PARTS, loadShop, Shop } from "./actions/items";
import { Loading } from "components/Loading";
import { CategoryFilter } from "features/bumpkins/components/CategoryFilter";
import { ItemCard } from "./components/ItemCard";

import token from "assets/icons/token_2.png";
import opensea from "assets/logos/opensea.png";
import { useNavigationType, NavigationType } from "react-router-dom";
import { useScrollIntoView } from "src/hooks/useScrollIntoView";
import { Supply } from "./components/Supply";
import { isCommon, isReleased } from "./lib/common";
import { ITEM_IDS } from "features/bumpkins/types/Items";
import { IMAGES } from "features/bumpkins/types/Images";

export const Collection: React.FC = () => {
  const action = useNavigationType();
  const [shop, setShop] = useState<Shop>();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<Category>("All");
  const [scrollIntoView] = useScrollIntoView();

  const scrollToDesiredProduct = () => {
    const persistedId = sessionStorage.getItem(
      "scroll-position-product-id-marker"
    );
    if (action === NavigationType.Pop && persistedId) {
      scrollIntoView(`collection${persistedId}`);
    }
    sessionStorage.removeItem("scroll-position-product-id-marker");
  };

  useEffect(() => {
    const load = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      const shop = await loadShop();

      setShop(shop);
      setIsLoading(false);
      scrollToDesiredProduct();
    };

    load();
  }, []);

  if (isLoading || shop === undefined) {
    return <Loading />;
  }

  let filteredItems = shop?.items || [];

  if (category !== "All") {
    const part = CATEGORY_PARTS[category];
    filteredItems = filteredItems.filter((item) => item.part === part);
  }

  const makeItemCounts = () => {
    const { items, ...counts } = shop;

    return { ...counts, itemCount: items.length };
  };

  return (
    <section>
      <div className="pt-12 pb-24 2xl:pb-44">
        <div className="container px-4 mx-auto">
          <h2 className="mb-10 md:mb-20 font-heading font-medium text-7xl md:text-8xl xl:text-9xl text-center leading-tight">
            Bumpkin Items
          </h2>
          <div className="flex flex-col lg:flex-row mb-10">
            <div className="sm:pr-5 mb-5 sm:mb-0 sm:w-1/2 lg:w-4/12 xl:w-3/12">
              <CategoryFilter
                counts={makeItemCounts()}
                category={category}
                setCategory={setCategory}
              />
            </div>

            <div className="w-full md:mt-0 lg:px-4 grid gap-5 grid-cols-2 md:gap-8 md:grid-cols-4 2xl:grid-cols-5">
              {filteredItems.map((item, i) => {
                // Show supply when sale/event is finished
                const isCommonItem = isCommon(item);
                const isComingSoon = !isReleased(item);

                return (
                  <ItemCard
                    key={i}
                    image={IMAGES[item.name].shopImage}
                    name={item.name}
                    id={ITEM_IDS[item.name]}
                    part={item.part}
                  >
                    <div className="flex flex-col items-start px-1 pb-1">
                      <h2 className="h-11 md:h-9 text-sm font-heading font-medium mb-2">{`${item.name}`}</h2>

                      {!isCommonItem && (
                        <Supply supply={item.totalMinted ?? 0} />
                      )}

                      {isComingSoon && (
                        <span className="absolute right-1 top-1 py-0 px-2 text-xxs leading-5 text-purple-500 font-bold uppercase bg-blue-200 rounded-xl md:rounded-2xl z-10">
                          {`Coming soon`}
                        </span>
                      )}

                      <div className="w-full h-4">
                        {isCommonItem && (
                          <div className="flex items-center">
                            <img
                              src={token}
                              alt="SFL token"
                              className="w-5"
                              style={{
                                imageRendering: "pixelated",
                              }}
                            />
                            <span className="ml-2 leading-none text-sm font-medium">
                              {item.price} SFL
                            </span>
                          </div>
                        )}
                        {!isCommonItem && (
                          <div className="flex justify-between w-full">
                            {/* <img
                              src={niftyswap}
                              alt="Niftyswap"
                              className="h-3"
                            /> */}
                            <img
                              src={opensea}
                              alt="OpenSea logo"
                              className="h-4"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </ItemCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
