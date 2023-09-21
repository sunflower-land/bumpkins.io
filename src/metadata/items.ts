import { BumpkinItem, ITEM_IDS } from "features/bumpkins/types/Items";
import { DETAILS } from "features/bumpkins/types/ItemDetails";

type DisplayType = "boost_percentage" | "boost_number";

export type Attribute = {
  display_type?: DisplayType;
  trait_type?: string;
  value: number | string;
};

export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

type Designer = {
  name: string;
  link: string;
};

type Details = {
  boosts?: Attribute[];
  supply?: number;
  designer?: Designer;
};

export type Metadata = Details & {
  id: number;
  name: BumpkinItem;
  description: string;
  attributes?: Attribute[];
  supply?: number;
  designer?: Designer;
  tradeable: boolean;
};

export const EXTRA_DETAILS: Partial<Record<BumpkinItem, Details>> = {
  "Chef Apron": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increased Cake SFL at Grub Shop",
        value: 20,
      },
    ],
  },
  "Fruit Picker Apron": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Fruit Yield",
        value: 0.1,
      },
    ],
  },
  "Angel Wings": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Chance of Instant Crops",
        value: 30,
      },
    ],
  },
  "Devil Wings": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Chance of Instant Crops",
        value: 30,
      },
    ],
  },
  "Eggplant Onesie": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Eggplant Yield",
        value: 0.1,
      },
    ],
  },
  "Golden Spatula": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase EXP gains",
        value: 10,
      },
    ],
  },
  "Mushroom Hat": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Mushroom Yield",
        value: 0.1,
      },
    ],
  },
  Parsnip: {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Parsnip Yield",
        value: 20,
      },
    ],
  },
  "Sunflower Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Sunflower Yield",
        value: 10,
      },
    ],
  },
  "Carrot Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Carrot Growth Time",
        value: -20,
      },
    ],
  },
  "Beetroot Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Beetroot Yield",
        value: 20,
      },
    ],
  },
  "Sunflower Shield": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Cost of Sunflower Seeds",
        value: 0,
      },
    ],
  },
  "Green Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Crop Critical Hit Yield",
        value: 900, // 900% more yield=10x
      },
    ],
  },
  Cattlegrim: {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Animal Yield",
        value: 0.25,
      },
    ],
  },
  "Luna's Hat": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Cooking time",
        value: -50,
      },
    ],
  },
  "Infernal Pitchfork": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Crop Yield",
        value: 3,
      },
    ],
  },
  "Corn Onesie": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Corn Yield",
        value: 0.1,
      },
    ],
  },
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const BUMPKIN_ITEM_METADATA: Metadata[] = getKeys(DETAILS).reduce(
  (acc, name) => {
    const details = DETAILS[name];
    const extraDetails =
      EXTRA_DETAILS[name as keyof typeof EXTRA_DETAILS] || {};

    const partAttribute = {
      trait_type: "Part",
      value: capitalizeFirstLetter(details.part),
    } as Attribute;
    return [
      ...acc,
      {
        id: ITEM_IDS[name as keyof typeof ITEM_IDS],
        name,
        tradeable: true,
        description: details.description,
        attributes: [partAttribute].concat(extraDetails.boosts || []),
        designer: extraDetails.designer,
        supply: extraDetails.supply,
      } as Metadata,
    ];
  },
  [] as Metadata[]
);
