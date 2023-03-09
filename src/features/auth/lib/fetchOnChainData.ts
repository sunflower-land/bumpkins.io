import { IDS, ITEM_NAMES, WalletItems } from "features/bumpkins/types/Items";
import { web3 } from "lib/web3";
import {
  loadBumpkins,
  OnChainBumpkin,
} from "lib/web3/contracts/BumpkinDetails";
import { loadItems } from "lib/web3/contracts/BumpkinItems";
import { getSFLBalance } from "lib/web3/contracts/SunflowerLandToken";
import Web3 from "web3";

export type Bumpkin = OnChainBumpkin & {
  wearableIds: number[];
};

type OnChainData = {
  bumpkins?: Bumpkin[];
  sflBalance: number;
};

export async function fetchOnChainData(): Promise<OnChainData> {
  const onChainBumpkinsFn = loadBumpkins();
  const sflBalanceFn = getSFLBalance();

  const [onChainBumpkins, sflBalance] = await Promise.all([
    onChainBumpkinsFn,
    sflBalanceFn,
  ]);

  const bumpkins = onChainBumpkins.map(async (onChainBumpkin) => {
    const itemSupply = await loadItems(onChainBumpkin.wallet);
    const bumpkin = { ...onChainBumpkin } as Bumpkin;

    bumpkin.wearableIds = IDS.filter(
      (_, index) => Number(itemSupply[index]) > 0
    );

    return bumpkin;
  });

  return {
    bumpkins: await Promise.all(bumpkins),
    sflBalance: Number(Web3.utils.fromWei(sflBalance)),
  };
}

export async function fetchWalletItems() {
  const itemAmounts = await loadItems(web3.myAccount as string);

  const walletItems = IDS.reduce((acc, id, index) => {
    const amount = itemAmounts[index];
    return {
      ...acc,
      [ITEM_NAMES[id]]: Number(amount),
    };
  }, {} as WalletItems);

  return {
    walletItems,
  };
}
