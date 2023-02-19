import { useInterpret, useSelector } from "@xstate/react";
import React, { useEffect } from "react";
import {
  upcomingDropMachine,
  UpcomingDropMachineInterpreter,
  UpcomingDropMachineState,
} from "./lib/upcomingDropMachine";

import token from "assets/icons/token_2.png";
import { DETAILS } from "features/bumpkins/types/ItemDetails";
import classNames from "classnames";
import { ItemCard } from "features/collection/components/ItemCard";
import { Time } from "./components/Time";
import { PrimaryButton } from "components/PrimaryButton";
import { DateTime } from "luxon";
import { Link, Outlet } from "react-router-dom";
import { Loading } from "components/Loading";
import { ITEM_IDS } from "features/bumpkins/types/Items";
import { MintHints } from "./components/MintHints";
import { NoUpcomingDrops } from "components/NoUpcomingDrops";
import { Release } from "./components/Release";
import { IMAGES } from "features/bumpkins/types/Images";
import { WrongChain } from "components/WrongChain";

// Supply that is given to timed drops
export const UNLIMITED_SUPPLY = 1000000;

interface Release {
  supply: number;
}

export const getReleaseSupply = (releases: Release[], index: number) => {
  if (index === 0) return releases[0].supply;

  return releases[index].supply - releases[index - 1].supply;
};

const currentItem = (state: UpcomingDropMachineState) =>
  state.context.currentItem;
const currentReleaseIndex = (state: UpcomingDropMachineState) =>
  state.context.releaseIndex;
const upcomingItems = (state: UpcomingDropMachineState) =>
  state.context.upcomingItems;
const currentPrice = (state: UpcomingDropMachineState) =>
  state.context.currentPrice;
const totalSupply = (state: UpcomingDropMachineState) =>
  state.context.totalMinted;
const openForMint = (state: UpcomingDropMachineState) =>
  state.matches("openForMint") || state.matches("updatingSupply");
const noUpcomingItems = (state: UpcomingDropMachineState) =>
  state.matches("noUpcomingItems");
const wrongChain = (state: UpcomingDropMachineState) =>
  state.matches("wrongChain");
const switchingNetwork = (state: UpcomingDropMachineState) =>
  state.matches("switchingNetwork");

export const UpcomingDrops: React.FC = () => {
  const upcomingDropService = useInterpret(
    upcomingDropMachine
  ) as unknown as UpcomingDropMachineInterpreter;

  const nextItem = useSelector(upcomingDropService, currentItem);
  const otherItems = useSelector(upcomingDropService, upcomingItems);
  const mintLive = useSelector(upcomingDropService, openForMint);
  const price = useSelector(upcomingDropService, currentPrice);
  const totalMinted = useSelector(upcomingDropService, totalSupply);
  const releaseIndex = useSelector(upcomingDropService, currentReleaseIndex);
  const noUpcomingDrops = useSelector(upcomingDropService, noUpcomingItems);
  const wrongChainConnected = useSelector(upcomingDropService, wrongChain);
  const isSwitchingNetworks = useSelector(
    upcomingDropService,
    switchingNetwork
  );

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        upcomingDropService.send("CHAIN_CHANGED");
      });
    }
  }, [upcomingDropService.send]);

  if (wrongChainConnected || isSwitchingNetworks)
    return (
      <WrongChain
        isSwitching={isSwitchingNetworks}
        onSwitch={() => upcomingDropService.send("SWITCH_NETWORK")}
      />
    );
  if (noUpcomingDrops) return <NoUpcomingDrops />;
  if (!nextItem) return <Loading />;

  const { supply } = nextItem.releases[releaseIndex];
  const remaining = supply - totalMinted;

  const DynamicSupply = () => {
    if (supply === UNLIMITED_SUPPLY) {
      return null;
    }

    if (remaining > 0) {
      return (
        <p className="text-xl font-semibold my-2">{`${remaining} left`}</p>
      );
    }

    return (
      <p className="text-xl font-semibold my-2 text-red-500">
        Current release is sold out!
      </p>
    );
  };

  return (
    <>
      <section>
        <div className="pt-12 pb-24 2xl:pb-44 lg:flex">
          <div className="flex w-full flex-col container px-5 md:px-10 mx-auto">
            <h2 className="mb-10 md:mb-20 font-heading font-medium text-7xl md:text-8xl xl:text-9xl text-center leading-tight">
              Upcoming Drops
            </h2>
            <div className="relative flex flex-col lg:flex-row mb-10">
              <div className="relative card-background rounded-lg overflow-hidden w-full lg:w-1/2 mb-6 available-item-shadow h-80 md:h-112">
                <img
                  src={IMAGES[nextItem.name]}
                  alt={nextItem.name}
                  className={classNames("absolute h-full w-full object-cover", {
                    "bumpkin-background": nextItem.part === "background",
                    "mouth-eyes-shoes": nextItem.part === "shoes",
                  })}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
                {mintLive && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[15%] py-[2px] px-2 sm:px-4 text-[9px] sm:text-xs leading-5 text-red-500 font-bold uppercase bg-orange-100 rounded-xl md:rounded-2xl z-10 border border-red-500">
                    Ends in
                  </span>
                )}

                <div className="absolute bottom-2 w-4/5 left-1/2 -translate-x-1/2">
                  <Time service={upcomingDropService} />
                </div>
              </div>

              <div className="lg:pl-12 w-full lg:w-4/5 h-full flex flex-col">
                <div className="flex flex-col h-full items-start lg:w-4/6">
                  <div className="mt-5 lg:mt-0 lg:mb-5">
                    <h1 className="text-3xl md:text-6xl mb-2 md:mb-4 font-medium">
                      {nextItem.name}
                    </h1>
                    <div className="flex items-center mb-3 md:mb-5">
                      <img
                        src={token}
                        alt="SFL token"
                        className="w-4 md:w-6"
                        style={{
                          imageRendering: "pixelated",
                        }}
                      />
                      <span className="text-lg md:text-4xl ml-2">
                        {price} SFL
                      </span>
                    </div>
                    <p className="md:text-xl mb-6">
                      {DETAILS[nextItem.name].description}
                    </p>
                  </div>
                  {nextItem.releases.length > 0 && (
                    <div className="mb-2">
                      {nextItem.releases.length > 1 ? (
                        <p className="font-light mb-1 underline">{`${nextItem.releases.length} Releases`}</p>
                      ) : (
                        <p className="font-light mb-1 underline">Release</p>
                      )}
                      <ul>
                        {nextItem.releases.map((release, index) => {
                          const { releaseDate, endDate, price } = release;

                          const availableSupply = getReleaseSupply(
                            nextItem.releases,
                            index
                          );

                          return (
                            <Release
                              key={index}
                              releaseDate={releaseDate}
                              endDate={endDate}
                              supply={availableSupply}
                              sfl={price}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {mintLive && <DynamicSupply />}
                  <div className="mt-3 w-full">
                    <MintHints sfl={price} />
                  </div>
                  <Link
                    to={{ pathname: "mint" }}
                    state={{ price, name: nextItem.name }}
                    className={classNames("w-full", {
                      "pointer-events-none": !mintLive || remaining < 1,
                    })}
                  >
                    <PrimaryButton
                      disabled={!mintLive || remaining < 1}
                      title="Mint"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="text-4xl lg:text-6xl mb-5">Coming soon</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:gap-4 lg:grid-cols-5">
              {otherItems?.map((item) => (
                <ItemCard
                  id={ITEM_IDS[item.name]}
                  key={item.name}
                  name={item.name}
                  image={IMAGES[item.name]}
                  part={item.part}
                >
                  <div className="flex flex-col items-start px-1 pt-1 h-[100px] md:h-[110px] justify-between">
                    <h2 className="h-9 text-sm md:text-base font-heading font-medium mb-2">{`${item.name}`}</h2>
                    <div>
                      <div className="flex items-center mb-3">
                        <img
                          src={token}
                          alt="SFL token"
                          className="w-3"
                          style={{
                            imageRendering: "pixelated",
                          }}
                        />
                        <span className="ml-2 leading-none">
                          {item.releases[0].price} SFL
                        </span>
                      </div>

                      <p className="text-xxs md:text-sm mb-1 font-medium">{`Drops: ${item.releases[0].releaseDate.toLocaleString(
                        DateTime.DATETIME_MED
                      )}`}</p>
                    </div>
                  </div>
                </ItemCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
};
