import { IDS, ITEM_NAMES, WalletItems } from "features/bumpkins/types/Items";
import { web3 } from "lib/web3";
import {
  loadBumpkins,
  OnChainBumpkin,
} from "lib/web3/contracts/BumpkinDetails";
import { loadItems } from "lib/web3/contracts/BumpkinItems";
import { hasMinted } from "lib/web3/contracts/BumpkinMinter";
import { loadFarm } from "lib/web3/contracts/SunflowerLandAccount";
import { getSFLBalance } from "lib/web3/contracts/SunflowerLandToken";
import Web3 from "web3";

export type SunflowerLandAccount = {
  tokenId: string;
  canMintFreeBumpkin: boolean;
};

export type Bumpkin = OnChainBumpkin & {
  wearableIds: number[];
};

type OnChainData = {
  bumpkins?: Bumpkin[];
  sflBalance: number;
  sunflowerLandAccount?: SunflowerLandAccount;
};

export async function fetchOnChainData(): Promise<OnChainData> {
  const onChainBumpkinsFn = loadBumpkins();
  const sflBalanceFn = getSFLBalance();
  const sunflowerLandAccountsFN = loadFarm();

  const [onChainBumpkins, sflBalance, sunflowerLandAccounts] =
    await Promise.all([
      onChainBumpkinsFn,
      sflBalanceFn,
      sunflowerLandAccountsFN,
    ]);

  const sunflowerLandAccount = sunflowerLandAccounts[0] && {
    tokenId: sunflowerLandAccounts[0].tokenId,
    canMintFreeBumpkin: false,
  };

  if (sunflowerLandAccount) {
    const mintedAt = await hasMinted(sunflowerLandAccount.tokenId);
    sunflowerLandAccount.canMintFreeBumpkin = Number(mintedAt ?? 0) === 0;
  }

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
    sunflowerLandAccount,
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
