import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useActor } from "@xstate/react";
import { EquipItemCard } from "./EquipItemCard";

import { Modal } from "features/components/Modal";
import { Context } from "features/auth/lib/Provider";
import { interpretTokenUri } from "../lib/tokenUri";
import {
  BumpkinDress,
  BumpkinItem,
  BumpkinPant,
  BumpkinPart,
  Equipped,
  NAMES,
  WalletItems,
} from "../types/Items";
import { BumpkinMachineInterpreter } from "../lib/bumpkinMachine";
import { DynamicNFT } from "./DynamicNFT";
import { CategoryFilter } from "./CategoryFilter";
import {
  Category,
  CategoryPart,
  CATEGORY_PARTS,
} from "features/collection/actions/items";
import { DETAILS } from "../types/ItemDetails";
import { LoadingSpinner } from "components/LoadingSpinner";
import { PrimaryButton } from "components/PrimaryButton";
import { fetchWalletItems } from "features/auth/lib/fetchOnChainData";
import { Loading } from "components/Loading";
import { burnBumpkin } from "lib/web3/contracts/Bumpkin";
import { CONFIG } from "lib/config";
import { useParams } from "react-router-dom";
import { getWalletEquipped, interpretWearableIds } from "../lib/wallet";

import openseaBlue from "assets/logos/opensea-logo-blue.png";

const ADJECTIVES = [
  "Beautiful",
  "Baffling",
  "Busy",
  "Bulky",
  "Blissful",
  "Beloved",
  "Bold",
  "Breezy",
  "Brave",
  "Brilliant",
  "Bustling",
  "Bossy",
  "Buzzing",
  "Bubbly",
  "Buff",
  "Beaming",
  "Blooming",
  "Blushing",
  "Boisterous",
  "Brazen",
  "Bright",
  "Bullish",
];

const randomAdjectives = ADJECTIVES.slice(0, 3);

export const Equip: React.FC = () => {
  const { authService } = useContext(Context);
  const [authState] = useActor(authService);
  const { id } = useParams();

  const bumpkinService = authState.children
    .bumpkin as BumpkinMachineInterpreter;
  const [bumpkinState, send] = useActor(bumpkinService);

  const { bumpkins } = bumpkinState.context;
  const bumpkin = bumpkins.find((item) => item.tokenId === id);

  const wallet = interpretWearableIds(bumpkin?.wearableIds ?? []);
  const { equipped: tokenUriEquipped, tokenId } = interpretTokenUri(
    bumpkin?.tokenURI as string
  );
  console.log({ tokenUriEquipped });
  const walletEquipped = getWalletEquipped(wallet, tokenUriEquipped);

  const [walletItems, setWalletItems] = useState<WalletItems>(
    {} as WalletItems
  );
  const [equipped, setEquipped] = useState<Partial<Equipped>>(walletEquipped);
  const [category, setCategory] = useState<Category>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const load = async () => {
      const { walletItems: items } = await fetchWalletItems();
      setWalletItems(items);
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const equip = (part: BumpkinPart, item: BumpkinItem) => {
    if (equipped[part] === item) {
      setWarning("Your Bumpkin already has this item. Don't waste it!");
      return;
    }
    const lastPart = equipped[part];

    setEquipped((prev) => ({
      ...prev,
      [part]: item,
    }));

    setWalletItems((prev) => ({
      ...prev,
      [item]: prev[item] - 1,
    }));

    // Do not return potions
    if (lastPart && part !== "body") {
      setWalletItems((prev) => ({
        ...prev,
        [lastPart]: prev[lastPart] + 1,
      }));
    }

    // If wearing a dress, remove the shirt
    if (part === "dress" && equipped["shirt"]) {
      const shirt = equipped["shirt"] as BumpkinPant;
      setEquipped((prev) => ({
        ...prev,
        shirt: undefined,
      }));

      setWalletItems((prev) => ({
        ...prev,
        [shirt]: prev[shirt] + 1,
      }));
    }

    // If wearing dress, remove the pants
    if (part === "dress" && equipped["pants"]) {
      const pants = equipped["pants"] as BumpkinPant;
      setEquipped((prev) => ({
        ...prev,
        pants: undefined,
      }));
      setWalletItems((prev) => ({
        ...prev,
        [pants]: prev[pants] + 1,
      }));
    }

    // If wearing shirt or pants, remove the dress
    if ((part === "shirt" || part === "pants") && equipped["dress"]) {
      const dress = equipped["dress"] as BumpkinDress;
      setEquipped((prev) => ({
        ...prev,
        dress: undefined,
      }));
      setWalletItems((prev) => ({
        ...prev,
        [dress]: prev[dress] + 1,
      }));
    }
  };

  const unequip = (part: BumpkinPart, item: BumpkinItem) => {
    setEquipped((prev) => ({
      ...prev,
      [part]: undefined,
    }));

    setWalletItems((prev) => ({
      ...prev,
      [item]: prev[item] + 1,
    }));
  };

  const save = () => {
    bumpkinService.send("EQUIP", {
      equipment: equipped,
      wallet: wallet,
      tokenId: id,
    });
  };

  const bodyChanged = equipped.body !== walletEquipped.body;

  // Soul bound items not visible in equipment
  const { body, ...visibleItems } = equipped;
  const equippedItems: BumpkinItem[] = Object.values(visibleItems);

  // Combine personal wallet items and items the Bumpkin is wearing
  const allItems = NAMES.map((name) => ({
    name,
    amount: walletItems[name] + (equippedItems.includes(name) ? 1 : 0),
    part: DETAILS[name].part,
  }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const makeItemCounts = () => {
    const itemCount = (item: CategoryPart) => {
      return allItems.filter((i) => i.part === CATEGORY_PARTS[item]).length;
    };

    return {
      itemCount: allItems.length,
      shirtCount: itemCount("Shirts"),
      pantCount: itemCount("Pants"),
      shoeCount: itemCount("Shoes"),
      potionCount: itemCount("Potions"),
      hairCount: itemCount("Hair"),
      hatCount: itemCount("Hats"),
      necklaceCount: itemCount("Necklaces"),
      toolCount: itemCount("Tools"),
      backgroundCount: itemCount("Backgrounds"),
    };
  };

  let itemsToShow = allItems;

  if (category !== "All") {
    const part = CATEGORY_PARTS[category];
    itemsToShow = allItems.filter((item) => item.part === part);
  }

  const missingRequiredItems: boolean =
    !equipped.background ||
    !equipped.body ||
    !equipped.hair ||
    (!equipped.dress && !(equipped.shirt && equipped.pants)) ||
    !equipped.shoes ||
    !equipped.tool;

  const makeBannerText = () => {
    if (bodyChanged) {
      return (
        <>
          <strong>{"Potions are one time use only."}</strong>
          {" Are you happy with your changes?"}
        </>
      );
    }

    if (missingRequiredItems) {
      return (
        <>
          {
            "Oh no! Your bumpkin must have a complete outfit on in order to save changes."
          }
        </>
      );
    }

    return <>{"Are you happy with your changes?"}</>;
  };

  const visitOpenSea = () => {
    const network = CONFIG.NETWORK === "mainnet" ? "matic" : "mumbai";
    const baseURL =
      CONFIG.NETWORK === "mainnet"
        ? "https://opensea.io"
        : "https://testnets.opensea.io";

    window.open(
      `${baseURL}/assets/${network}/${CONFIG.BUMPKIN_CONTRACT}/${id}`,
      "_blank"
    );
  };

  const hasChanges =
    JSON.stringify(equipped) !== JSON.stringify(walletEquipped) ||
    missingRequiredItems;

  return (
    <>
      <div className="flex-1">
        {/* Banner */}
        <div className="h-14 overflow-hidden w-full sticky top-0 z-20">
          <div
            className={classNames(
              "h-14 w-full bg-blue-500 flex items-center justify-between px-4",
              {
                "opacity-100": hasChanges,
                "opacity-0": !hasChanges,
                "bg-orange-600": bodyChanged,
                "pointer-events-none": !hasChanges,
              }
            )}
          >
            <p className="text-white text-sm">{makeBannerText()}</p>

            {!missingRequiredItems && (
              <button
                className={classNames(
                  "h-9 px-2 md:px-3 items-center text-sm justify-center flex leading-3 tracking-tighter font-heading text-center bg-white hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl text-blue-500 border border-blue-500 hover:border-transparent",
                  {
                    "text-orange-500 border-orange-500 focus:ring-orange-500 hover:bg-orange-200":
                      bodyChanged,
                  }
                )}
                onClick={save}
                disabled={
                  bumpkinState.matches("equipping") || missingRequiredItems
                }
              >
                {bumpkinState.matches("equipping") ? (
                  <>
                    <LoadingSpinner size={5} />
                    Saving...
                  </>
                ) : (
                  "Save to blockchain"
                )}
              </button>
            )}
          </div>
        </div>
        <div className="relative container mb-4 mx-auto flex flex-col mt-3 md:mt-6 transition-transform duration-300">
          <h2 className=" font-heading font-medium text-7xl md:text-8xl xl:text-9xl text-center leading-tight">
            {`Bumpkin #${tokenId}`}
          </h2>
          <p className="font-heading mb-4 text-center text-base leading-8 text-darkBlueGray-400 max-w-lg mx-auto">
            {`A ${randomAdjectives[0].toLowerCase()}, ${randomAdjectives[1].toLowerCase()} & ${randomAdjectives[2].toLowerCase()} Bumpkin.`}
          </p>
          <p className="mb-4 px-2 font-heading text-center text-sm tracking-tight leading-2 text-darkBlueGray-400 mx-auto">
            To withdraw a piece of clothing you must replace it with another
            piece of clothing from your wallet.
          </p>
          <div className="mt-4 p-6 pb-0 lg:hidden">
            <CategoryFilter
              counts={makeItemCounts()}
              category={category}
              setCategory={setCategory}
            />
          </div>
          <section
            id="bumpkin"
            className="col-span-12 sticky z-10 top-0 bg-white p-6 pt-0 lg:hidden -mx-1"
          >
            <div className="w-full h-7"></div>
            <div
              className="rounded-lg overflow-hidden z-10 m-auto relative"
              style={{
                maxWidth: "300px",
              }}
            >
              <DynamicNFT equipped={equipped} />
              <img
                id="opensea"
                className="absolute bottom-2 right-2 w-10 cursor-pointer"
                src={openseaBlue}
                alt="View on opensea"
                onClick={visitOpenSea}
              />
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6 p-6 md:p-0 mt-3 no-scrollbar">
            <section
              id="bumpkin"
              className="w-full h-full col-span-12 lg:col-span-4 sticky top-0 z-10 hidden lg:block"
            >
              <div className="absolute w-[106%] h-full -z-10 bg-white" />
              <div className="rounded-lg overflow-hidden z-10 relative">
                <DynamicNFT equipped={equipped} />
                <img
                  id="opensea"
                  className="absolute bottom-2 right-2 w-10 cursor-pointer"
                  src={openseaBlue}
                  alt="View on opensea"
                  onClick={visitOpenSea}
                />
              </div>
              <div className="mt-4">
                <CategoryFilter
                  counts={makeItemCounts()}
                  category={category}
                  setCategory={setCategory}
                />
              </div>
              {CONFIG.NETWORK === "mumbai" && (
                <>
                  <button
                    className="h-10 w-full text-sm md:mb-0 mr-0 md:mr-5 md:h-12 md:text-lg leading-none font-medium tracking-tighter font-heading bg-transparent text-red-500 hover:bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 rounded-lg border-[1px] border-red-500"
                    onClick={() => burnBumpkin(tokenId as string)}
                  >
                    Burn Bumpkin
                  </button>
                  <span className="text-xs text-red-500">Testnet only</span>
                </>
              )}
            </section>
            <section className=" bg-white col-span-12 lg:col-span-8 lg:justify-end -mt-3 pt-3 -mr-2 pr-2 no-scrollbar">
              <div className="w-full md:mt-0 lg:px-4 grid gap-5 grid-cols-2 md:gap-8 md:grid-cols-3 2xl:grid-cols-4">
                {itemsToShow.map((item, i) => (
                  <EquipItemCard
                    key={i}
                    name={item.name}
                    amount={item.amount}
                    onEquip={equip}
                    onUnequip={unequip}
                    equipped={equippedItems.includes(item.name)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal show={!!warning} onHide={() => setWarning("")}>
        <div className="p-4">
          <h2 className="mb-4 font-bold text-5xl leading-tight">{warning}</h2>
          <PrimaryButton size="sm" title="Ok" onClick={() => setWarning("")} />
        </div>
      </Modal>
      <Modal
        show={bumpkinState.matches("cannotEquip")}
        onHide={() => setWarning("")}
      >
        <div className="p-4">
          <h2 className="mb-4 font-bold text-5xl leading-tight">
            Bumpkin is listed on OpenSea!
          </h2>
          <p className="mb-4">
            You cannot equip new items to a Bumpkin that is listed for sale.
          </p>
          <PrimaryButton
            size="sm"
            title="Ok"
            onClick={() => send("ACKNOWLEDGE")}
          />
        </div>
      </Modal>
    </>
  );
};
