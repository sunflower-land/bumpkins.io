import { DETAILS } from "features/bumpkins/types/ItemDetails";
import { BumpkinItem, BumpkinPart } from "features/bumpkins/types/Items";

import { loadSupply } from "lib/web3/contracts/BumpkinItems";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { Item } from "features/upcoming-drops/actions/loadCurrentAndUpcomingDrops";
import { MOCK_SHOP } from "./mockShopItems";
import { isCommon, isReleased } from "../lib/common";
import { Release } from "features/bumpkins/types/Shop";

const API_URL = CONFIG.API_URL;

export type BumpkinShopItem = {
  tokenId: number;
  name: BumpkinItem;
  part: BumpkinPart;
  totalMinted?: number;
  price?: number;
  releases: Release[];
};

export type Category =
  | "All"
  | "Hats"
  | "Hair"
  | "Potions"
  | "Necklaces"
  | "Pants"
  | "Shirts"
  | "Shoes"
  | "Tools"
  | "Backgrounds";

export type CategoryPart = Exclude<Category, "All">;

export const CATEGORY_PARTS: Record<CategoryPart, BumpkinPart> = {
  Pants: "pants",
  Shirts: "shirt",
  Potions: "body",
  Shoes: "shoes",
  Hair: "hair",
  Hats: "hat",
  Necklaces: "necklace",
  Tools: "tool",
  Backgrounds: "background",
};

export type Shop = {
  items: BumpkinShopItem[];
  pantCount: number;
  shirtCount: number;
  potionCount: number;
  shoeCount: number;
  hairCount: number;
  hatCount: number;
  necklaceCount: number;
  toolCount: number;
  backgroundCount: number;
};

const CACHE_KEY = "bumpkin.shopItems";
const CACHE_MINUTES = 5;

type Cache = {
  cachedAt: number;
  items: Item[];
};

/**
 * Cache items for snappy page changes
 */
function loadCachedItems(): Cache | null {
  const stored = localStorage.getItem(CACHE_KEY);

  if (!stored) {
    return null;
  }

  const cache = JSON.parse(stored) as Cache;

  // Expired
  if (cache.cachedAt < Date.now() - CACHE_MINUTES * 60 * 1000) {
    return null;
  }

  return cache;
}

function cacheItems(items: Item[]) {
  const cache: Cache = {
    cachedAt: Date.now(),
    items,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export async function fetchAllItems() {
  const cache = loadCachedItems();

  if (cache) {
    return { items: cache.items };
  }

  const response = await window.fetch(`${API_URL}/bumpkins/collection`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.FAILED_REQUEST);
  }

  const {
    items,
  }: {
    items: Item[];
  } = await response.json();

  cacheItems(items);

  return {
    items,
  };
}

async function loadItems(): Promise<Shop> {
  if (!CONFIG.API_URL) {
    return MOCK_SHOP;
  }

  const { items } = await fetchAllItems();
  const ids = items.map((item) => item.id);
  let supply: string[] = [];

  try {
    supply = await loadSupply(ids);
  } catch (e) {
    console.log("Loading supply failed: ", e);
  }

  const collectionItems = items
    .map((item, index) => {
      const details = DETAILS[item.name];
      // This will be a collection item that is always available to buy on the bumpkins.io site
      const isCommon = item.releases.length === 1 && !item.releases[0].endDate;
      const price = isCommon ? Number(item.releases[0].price) : undefined;

      return {
        totalMinted: supply[index] ? Number(supply[index]) : undefined,
        name: item.name,
        part: details.part,
        price,
        tokenId: item.id,
        releases: item.releases,
      };
    })
    .filter(isReleased);

  const itemCount = (item: CategoryPart) => {
    return collectionItems.filter((i) => i.part === CATEGORY_PARTS[item])
      .length;
  };

  const shirtCount = itemCount("Shirts");
  const pantCount = itemCount("Pants");
  const shoeCount = itemCount("Shoes");
  const potionCount = itemCount("Potions");
  const hairCount = itemCount("Hair");
  const hatCount = itemCount("Hats");
  const necklaceCount = itemCount("Necklaces");
  const toolCount = itemCount("Tools");
  const backgroundCount = itemCount("Backgrounds");

  return {
    items: collectionItems,
    shirtCount,
    pantCount,
    shoeCount,
    potionCount,
    hairCount,
    hatCount,
    necklaceCount,
    toolCount,
    backgroundCount,
  };
}

export async function loadShop(): Promise<Shop> {
  const shop = await loadItems();

  /**
   * Sort by:
   * 1. Common items (unlimited supply) - lowest price
   * 2. Common items (unlimited supply) - highest price
   * 3. High Supply (already dropped)
   * 4. Low Supply (already dropped)
   */
  const sorted = shop.items.sort((first, second) => {
    const firstIsCommon = isCommon(first);
    const secondIsCommon = isCommon(second);

    // 1/2. Sort common items by price
    if (firstIsCommon && secondIsCommon) {
      return (
        Number(first.releases[0]?.price ?? 0) -
        Number(second.releases[0]?.price ?? 0)
      );
    }

    if (!firstIsCommon && secondIsCommon) {
      return 1;
    }

    if (firstIsCommon && !secondIsCommon) {
      return -1;
    }

    // 5. Sort by released versus coming soon
    const firstIsReleased = isReleased(first);
    const secondIsReleased = isReleased(second);

    if (!firstIsReleased && secondIsReleased) {
      return 1;
    }

    if (firstIsReleased && !secondIsReleased) {
      return -1;
    }

    // Sort by supply
    return (second.totalMinted ?? 0) - (first?.totalMinted ?? 0);
  });

  return {
    ...shop,
    items: sorted,
  };
}

export type SingleBumpkinItem = BumpkinShopItem & {
  releases: Release[];
};

export async function loadSingleItem(id: number): Promise<SingleBumpkinItem> {
  const { items } = await fetchAllItems();

  const item = items.find((item) => item.id === id);

  if (!item) {
    throw new Error("Item not found");
  }

  let supply: string[] = [];

  try {
    supply = await loadSupply([id]);
  } catch (e) {
    console.log("Loading supply failed: ", e);
  }

  const details = DETAILS[item.name];

  // This will be a collection item that is always available to buy on the bumpkins.io site
  const isCommon = item.releases.length === 1 && !item.releases[0].endDate;
  const price = isCommon ? Number(item.releases[0].price) : undefined;

  return {
    name: item.name,
    part: details.part,
    price,
    tokenId: item.id,
    releases: item.releases,
    totalMinted: supply[0] ? Number(supply[0]) : undefined,
  };
}
