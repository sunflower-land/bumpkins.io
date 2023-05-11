import { BumpkinItem, BumpkinPart } from "features/bumpkins/types/Items";
import { loadSupply } from "lib/web3/contracts/BumpkinItems";
import { DETAILS } from "features/bumpkins/types/ItemDetails";
import { DateTime } from "luxon";
import { fetchAllItems } from "features/collection/actions/items";
import { BumpkinItemShopDetails } from "features/bumpkins/types/Shop";
import { CONFIG } from "lib/config";
import { ethers } from "ethers";

export type Item = BumpkinItemShopDetails & {
  name: BumpkinItem;
};

export type ReleaseDates = {
  releaseDate: DateTime;
  endDate: DateTime;
  price: number;
  supply: number;
};

export type CurrentOrUpcomingItem = {
  name: BumpkinItem;
  part: BumpkinPart;
  maxSupply: number;
  releases: ReleaseDates[];
};

export async function loadCurrentAndUpcomingDrops(): Promise<
  CurrentOrUpcomingItem[]
> {
  const { items } = await fetchAllItems();

  const sortedUpcomingItemNames = items
    .filter((item) => item.releases.length > 0)
    .sort((a, b) => a.releases[0].releaseDate - b.releases[0].releaseDate)
    .filter((item) => {
      const now = Date.now();
      const { endDate } = item.releases[item.releases.length - 1];

      return endDate && endDate > now;
    })
    .slice(0, 10);

  const upcomingItems = sortedUpcomingItemNames.map((item) => {
    const details = DETAILS[item?.name];
    const releaseDates = item.releases.map((release) => ({
      ...release,
      price: Number(release.price),
      releaseDate: DateTime.fromMillis(release.releaseDate),
      endDate: DateTime.fromMillis(release.endDate as number),
    }));

    const maxSupply = item.releases[item.releases.length - 1].supply;

    return {
      name: item?.name,
      part: details.part,
      maxSupply,
      releases: releaseDates,
    } as CurrentOrUpcomingItem;
  });

  return upcomingItems;
}
const alchemyWeb3 = new ethers.providers.JsonRpcProvider(CONFIG.ALCHEMY_RPC);

export async function loadTotalSupplyForCurrentItem(id: number) {
  const supply = await loadSupply([id], alchemyWeb3);

  return supply[0];
}
