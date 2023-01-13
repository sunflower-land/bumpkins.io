import { IDS } from "features/bumpkins/types/Items";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import ABI from "./abis/BumpkinItems.json";
import { BumpkinItems } from "./types/BumpkinItems";

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
  const contract = new web3.provider.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as BumpkinItems;

  const account = web3.myAccount as string;
  const addresses = IDS.map((_) => wallet);

  return contract.methods
    .balanceOfBatch(addresses, IDS)
    .call({ from: account });
}

export async function loadSupply(ids: number[], provider: any = web3) {
  const contract = new provider.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as BumpkinItems;

  return contract.methods.totalSupplyBatch(ids).call();
}
