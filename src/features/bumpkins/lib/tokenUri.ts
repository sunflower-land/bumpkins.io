import {
  BumpkinBody,
  BumpkinHat,
  BumpkinNecklace,
  BumpkinPant,
  BumpkinShirt,
  BumpkinShoe,
  BumpkinTool,
  BumpkinHair,
  ITEM_IDS,
  BumpkinSecondaryTool,
  ITEM_NAMES,
  Equipped,
  BumpkinBackground,
  BumpkinCoat,
  BumpkinOnesie,
  BumpkinSuit,
  BumpkinWings,
} from "../types/Items";

const VERSION = "v1";

enum Slots {
  Background = 0,
  Body = 1,
  Hair = 2,
  Shirt = 3,
  Pants = 4,
  Shoes = 5,
  Tool = 6,
  Hat = 7,
  Necklace = 8,
  SecondaryTool = 9,
  Coat = 10,
  Onesie = 11,
  Suit = 12,
  Wings = 13,
}

export function tokenUriBuilder(parts: Equipped) {
  const ids = [];

  ids[Slots.Background] = ITEM_IDS[parts.background];
  ids[Slots.Body] = ITEM_IDS[parts.body];
  ids[Slots.Hair] = ITEM_IDS[parts.hair];
  ids[Slots.Shirt] = ITEM_IDS[parts.shirt];
  ids[Slots.Pants] = ITEM_IDS[parts.pants];
  ids[Slots.Shoes] = ITEM_IDS[parts.shoes];
  ids[Slots.Tool] = ITEM_IDS[parts.tool];
  ids[Slots.Hat] = parts.hat ? ITEM_IDS[parts.hat] : 0;
  ids[Slots.Coat] = parts.coat ? ITEM_IDS[parts.coat] : 0;
  ids[Slots.Necklace] = parts.necklace ? ITEM_IDS[parts.necklace] : 0;
  ids[Slots.SecondaryTool] = parts.secondaryTool
    ? ITEM_IDS[parts.secondaryTool]
    : 0;
  ids[Slots.Suit] = parts.suit ? ITEM_IDS[parts.suit] : 0;
  ids[Slots.Onesie] = parts.onesie ? ITEM_IDS[parts.onesie] : 0;
  ids[Slots.Wings] = parts.wings ? ITEM_IDS[parts.wings] : 0;

  // Trim off trailing 0s
  const lastPartIndex = [...ids].reverse().findIndex(Boolean);
  const validIds = lastPartIndex > 0 ? ids.slice(0, -lastPartIndex) : ids;

  const uriFormat = validIds.join("_");
  return uriFormat;
}

function getItemName<T>(id: number | string): T {
  return ITEM_NAMES[id] as unknown as T;
}

/**
 * Interprets an onChain URI into the parts the Bumpkin has
 * sunflower-land.com/testnet/1_v1_1012_1120 => { tokenId: 1, version: 1, equipped: { body: Beige, hair: Mop }}
 */
export function interpretTokenUri(tokenUri: string) {
  // Remove the baseUri (sunflower-land.com/testnet/)
  const urlParts = tokenUri.split("/");
  const tokenPart = urlParts[urlParts.length - 1];
  const [tokenId, version, ...ids] = tokenPart
    .split("_")
    .map((val) => (!val.startsWith("v") ? Number(val) : val));

  const equipped: Equipped = {
    background: getItemName<BumpkinBackground>(ids[Slots.Background]),
    body: getItemName<BumpkinBody>(ids[Slots.Body]),
    hair: getItemName<BumpkinHair>(ids[Slots.Hair]),
    shirt: getItemName<BumpkinShirt>(ids[Slots.Shirt]),
    pants: getItemName<BumpkinPant>(ids[Slots.Pants]),
    shoes: getItemName<BumpkinShoe>(ids[Slots.Shoes]),
    tool: getItemName<BumpkinTool>(ids[Slots.Tool]),
    ...(ids[Slots.Hat] && { hat: getItemName<BumpkinHat>(ids[Slots.Hat]) }),
    ...(ids[Slots.Coat] && { coat: getItemName<BumpkinCoat>(ids[Slots.Coat]) }),
    ...(ids[Slots.Necklace] && {
      necklace: getItemName<BumpkinNecklace>(ids[Slots.Necklace]),
    }),
    ...(ids[Slots.SecondaryTool] && {
      secondaryTool: getItemName<BumpkinSecondaryTool>(
        ids[Slots.SecondaryTool]
      ),
    }),
    ...(ids[Slots.Onesie] && {
      onesie: getItemName<BumpkinOnesie>(ids[Slots.Onesie]),
    }),
    ...(ids[Slots.Suit] && {
      suit: getItemName<BumpkinSuit>(ids[Slots.Suit]),
    }),
    ...(ids[Slots.Wings] && {
      wings: getItemName<BumpkinWings>(ids[Slots.Wings]),
    }),
  };

  return { tokenId, version, equipped };
}
