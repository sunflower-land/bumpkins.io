import { DETAILS } from "../types/ItemDetails";
import { BumpkinItem, Equipped, ITEM_NAMES, Wallet } from "../types/Items";

export function interpretWearableIds(wearableIds: number[]): Wallet {
  const wallet: Wallet = {
    background: [],
    body: [],
    hair: [],
    shirt: [],
    pants: [],
    shoes: [],
    tool: [],
    necklace: [],
    coat: [],
    hat: [],
    secondaryTool: [],
    onesie: [],
    suit: [],
    wings: [],
  };

  return wearableIds.reduce((wallet, id) => {
    const item = ITEM_NAMES[id];
    const part = DETAILS[item].part;

    const items = [...wallet[part], item];

    return { ...wallet, [part]: items };
  }, wallet);
}

function getEquipped<T extends BumpkinItem>(
  walletItems: T[],
  equippedItem?: T
): T | undefined {
  // No item equipped
  if (equippedItem === undefined) {
    return undefined;
  }

  // Item exists in bumpkin wallet
  if (equippedItem in walletItems) {
    return equippedItem;
  }

  // Item didn't exist, select first in wallet
  if (walletItems[0]) {
    return walletItems[0];
  }

  // Nothing equipped
  return undefined;
}

/**
 *
 * Checks each equipped item to see if it exists within the bumpkin wallet.
 * Sets the equipped item to undefined if it doesn't exist in the players wallet.
 *
 */
export function getWalletEquipped(
  wallet: Wallet,
  equipped: Equipped
): Partial<Equipped> {
  return {
    background: getEquipped(wallet.background, equipped.background),
    body: getEquipped(wallet.body, equipped.body),
    hair: getEquipped(wallet.hair, equipped.hair),
    shirt: getEquipped(wallet.shirt, equipped.shirt),
    pants: getEquipped(wallet.pants, equipped.pants),
    shoes: getEquipped(wallet.shoes, equipped.shoes),
    tool: getEquipped(wallet.tool, equipped.tool),
    necklace: getEquipped(wallet.necklace, equipped.necklace),
    coat: getEquipped(wallet.coat, equipped.coat),
    hat: getEquipped(wallet.hat, equipped.hat),
    secondaryTool: getEquipped(wallet.secondaryTool, equipped.secondaryTool),
    suit: getEquipped(wallet.suit, equipped.suit),
    onesie: getEquipped(wallet.onesie, equipped.onesie),
    wings: getEquipped(wallet.wings, equipped.wings),
  };
}
