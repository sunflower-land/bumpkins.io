import { BumpkinItem, ITEM_IDS } from "features/bumpkins/types/Items";

import { getKeys } from "src/metadata/items";

type ItemImages = {
  shopImage: string;
};

export const IMAGES: Record<BumpkinItem, ItemImages> = getKeys(ITEM_IDS).reduce(
  (acc, name) => ({
    ...acc,
    [name]: {
      shopImage: `public/erc1155/images/${ITEM_IDS[name]}.png`,
    },
  }),
  {} as Record<BumpkinItem, ItemImages>
);
