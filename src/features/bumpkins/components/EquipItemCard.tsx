import React from "react";
import { Link } from "react-router-dom";
import { BumpkinItem, BumpkinPart, ITEM_IDS } from "../types/Items";
import { DETAILS } from "../types/ItemDetails";
import { PrimaryButton } from "components/PrimaryButton";
import collectionIcon from "assets/logos/sunflower_land.png";
import { IMAGES } from "../types/Images";
import classNames from "classnames";

interface Props {
  equipped?: boolean;
  name: BumpkinItem;
  amount: number;
  onEquip: (part: BumpkinPart, name: BumpkinItem) => void;
  onUnequip: (part: BumpkinPart, name: BumpkinItem) => void;
}

const REQUIRED_PARTS = [
  "background",
  "body",
  "hair",
  "shirt",
  "pants",
  "shoes",
  "tool",
];

const PotionButton: React.FC<{ onClick: () => void; title: string }> = ({
  onClick,
  title,
}) => {
  return (
    <button
      className="relative overflow-hidden h-10 w-full text-sm md:h-12 md:text-lg leading-none text-white font-medium tracking-tighter font-heading bg-orange-500 hover:bg-orange-600 rounded-lg"
      onClick={onClick}
    >
      <span className="bubble bubble-1" />
      <span className="bubble bubble-2" />
      <span className="bubble bubble-3" />
      <span className="bubble bubble-4" />
      <span className="bubble bubble-5" />
      <span className="bubble bubble-6" />
      <span className="bubble bubble-7" />
      {title}
    </button>
  );
};

export const EquipItemCard: React.FC<Props> = ({
  equipped = false,
  onEquip,
  onUnequip,
  name,
  amount,
}) => {
  const images = IMAGES[name];
  const details = DETAILS[name];

  const makeItemImage = () => {
    if (details.part === "background") {
      return (
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-1 object-contain w-full"
          src={images?.shopImage}
          alt=""
          style={{
            imageRendering: "pixelated",
          }}
        />
      );
    }

    return (
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-8 mb-1 h-24 md:h-36 object-contain"
        src={images?.shopImage}
        alt=""
        style={{
          imageRendering: "pixelated",
        }}
      />
    );
  };

  return (
    <div className="bg-white relative w-full mb-4 rounded-lg drop-shadow">
      <div className="relative bg-white rounded-2xl shadow-6xl">
        <Link to={`/collection/${ITEM_IDS[name]}`}>
          <div className="relative cursor-pointer rounded-t-lg overflow-hidden item-card-background h-36 w-full">
            {amount > 1 && (
              <span className="absolute bottom-1 right-2 text-gray-300 text-sm">{`x${amount}`}</span>
            )}
            {makeItemImage()}
          </div>
        </Link>
        <div className="pt-2 pb-3 px-3 flex-1 min-h-[128px] md:min-h-[148px]">
          <div className="flex flex-col items-start mb-3 px-1">
            <div className="flex items-center mb-2">
              <img className="h-3 mr-1" src={collectionIcon} alt="" />
              <p className="text-xs xl:text-sm text-darkBlueGray-400 font-heading leading-7">
                SFL Collection #1
              </p>
            </div>

            <div className="h-7 md:h-12">
              <h2 className="text-xs md:text-base font-heading font-medium">{`${name}`}</h2>
            </div>
          </div>
          {equipped && REQUIRED_PARTS.includes(details.part) && (
            <span
              className={classNames(
                "absolute right-3 bottom-3 text-xs py-1 px-3 h leading-5 text-red-500 font-bold uppercase bg-orange-200 rounded-lg z-10"
              )}
            >
              Equipped
            </span>
          )}
          {!equipped && details.part === "body" && (
            <PotionButton
              title="Drink Potion"
              onClick={() => onEquip(details?.part, name)}
            />
          )}
          {!equipped && details.part !== "body" && (
            <PrimaryButton
              size="sm"
              title="Add to NFT"
              onClick={() => onEquip(details?.part, name)}
            />
          )}
          {equipped && !REQUIRED_PARTS.includes(details.part) && (
            <PrimaryButton
              size="sm"
              title="Remove from NFT"
              onClick={() => onUnequip(details?.part, name)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
