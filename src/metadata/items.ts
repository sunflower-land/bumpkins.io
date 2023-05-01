import { BumpkinItem, ITEM_IDS } from "features/bumpkins/types/Items";
import { DETAILS } from "features/bumpkins/types/ItemDetails";

type DisplayType = "boost_percentage" | "number";

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
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const BUMPKIN_ITEM_METADATA: Metadata[] = getKeys(DETAILS).reduce(
  (acc, name) => {
    const details = DETAILS[name];
    const extraDetails =
      EXTRA_DETAILS[name as keyof typeof EXTRA_DETAILS] || {};

    console.log({ name });
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
