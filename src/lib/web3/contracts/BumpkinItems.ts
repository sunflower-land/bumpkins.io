import { ethers } from "ethers";
import { IDS } from "features/bumpkins/types/Items";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import ABI from "./abis/BumpkinItems.json";
import { BumpkinWearables } from "./types/BumpkinItems";

const address = CONFIG.BUMPKIN_ITEMS_CONTRACT;

export type OnChainBumpkin = {
  tokenId: string;
  tokenURI: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  nonce: string;
  metadata: string;
  wardrobe: string;
};

export async function loadItems(wallet: string) {
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.provider
  ) as unknown as BumpkinWearables;

  const account = web3.myAccount as string;
  const addresses = IDS.map((_) => wallet);

  return contract.balanceOfBatch(addresses, IDS, { from: account });
}

export async function loadSupply(
  ids: number[],
  provider = web3.provider,
  retryCount = 0
): Promise<string[]> {
  try {
    const contract = new ethers.Contract(
      address as string,
      ABI,
      provider.getSigner()
    ) as unknown as BumpkinWearables;

    return (await contract.totalSupplyBatch(ids)).map((supply) =>
      supply.toString()
    );
  } catch (error) {
    if (retryCount < 3) {
      return loadSupply(ids, provider, retryCount + 1);
    }
    throw error;
  }
}
