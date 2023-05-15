import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import BumpkinMinterABI from "./abis/BumpkinMinter.json";
import { BumpkinMinter } from "./types/IBumpkinMinter";

const address = CONFIG.BUMPKIN_MINTER_CONTRACT;
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

export async function createBumpkin({
  signature,
  deadline,
  fee,
  partIds,
  farmId,
  tokenUri,
}: {
  signature: string;
  deadline: number;
  fee: string;
  partIds: number[];
  farmId: number;
  tokenUri: string;
}) {
  const gasPrice = await estimateGasPrice(web3.writeProvider);

  const contract = new ethers.Contract(
    address as string,
    BumpkinMinterABI,
    web3.writeProvider.getSigner()
  ) as unknown as BumpkinMinter;

  try {
    const receipt = await contract.mintBumpkin(
      signature,
      deadline,
      fee,
      farmId,
      partIds,
      tokenUri,
      { from: web3.myAccount as string, gasPrice, value: fee }
    );

    await receipt.wait();
  } catch (error) {
    const parsed = parseMetamaskError(error);

    throw parsed;
  }
}
