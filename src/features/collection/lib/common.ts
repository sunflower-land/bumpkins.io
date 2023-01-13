import { BumpkinShopItem } from "../actions/items";

export function isCommon(item: BumpkinShopItem) {
  return item.releases.length === 1 && !item.releases[0]?.endDate;
}

export function isReleased(item: BumpkinShopItem) {
  if (!item.name) return false;

  const releasedInGame = item.releases.length === 0;

  if (releasedInGame) return true;

  if (isCommon(item) && item.releases[0].releaseDate < Date.now()) return true;

  const { endDate } = item.releases[item.releases.length - 1];

  return endDate && endDate < Date.now();
}
