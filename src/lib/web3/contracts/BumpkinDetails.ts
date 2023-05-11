import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import BumpkinDetailsABI from "./abis/BumpkinDetails.json";
import { BumpkinDetails } from "./types/IBumpkinDetails";

const address = CONFIG.BUMPKIN_DETAILS_CONTRACT;

export type OnChainBumpkin = {
  tokenId: string;
  tokenURI: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  wallet: string;
};

/*
 * Bumpkin details contract
 */
export async function loadBumpkins(): Promise<OnChainBumpkin[]> {
  const contract = new ethers.Contract(
    address as string,
    BumpkinDetailsABI,
    web3.provider
  ) as unknown as BumpkinDetails;

  const response = await contract.loadBumpkins(web3.myAccount as string, {
    from: web3.myAccount as string,
  });

  return response.map((bumpkin) => ({
    ...bumpkin,
    tokenId: bumpkin.tokenId.toString(),
    createdAt: bumpkin.createdAt.toString(),
  }));
}

export async function loadBumpkin(id: number): Promise<OnChainBumpkin> {
  const contract = new ethers.Contract(
    address as string,
    BumpkinDetailsABI,
    web3.provider
  ) as unknown as BumpkinDetails;

  const response = await contract.getBumpkin(id, {
    from: web3.myAccount as string,
  });

  return {
    ...response,
    tokenId: response.tokenId.toString(),
    createdAt: response.createdAt.toString(),
  };
}
