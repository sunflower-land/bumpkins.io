import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import BumpkinDetailsABI from "./abis/BumpkinDetails.json";
import { IBumpkinDetails } from "./types/IBumpkinDetails";

const address = CONFIG.BUMPKIN_DETAILS_CONTRACT;

export type OnChainBumpkin = {
  tokenId: string;
  tokenURI: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  nonce: string;
  metadata: string;
  wallet: string;
};

/*
 * Bumpkin details contract
 */
export async function loadBumpkins(): Promise<OnChainBumpkin[]> {
  const contract = new web3.provider.eth.Contract(
    BumpkinDetailsABI as AbiItem[],
    address as string
  ) as unknown as IBumpkinDetails;

  return contract.methods
    .loadBumpkins(web3.myAccount as string)
    .call({ from: web3.myAccount as string });
}

export async function loadBumpkin(id: number): Promise<OnChainBumpkin> {
  const contract = new web3.provider.eth.Contract(
    BumpkinDetailsABI as AbiItem[],
    address as string
  ) as unknown as IBumpkinDetails;

  return contract.methods
    .getBumpkin(id)
    .call({ from: web3.myAccount as string });
}
