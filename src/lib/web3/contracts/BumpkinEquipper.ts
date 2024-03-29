import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import ABI from "./abis/BumpkinEquipper.json";
import { BumpkinEquipper } from "./types/BumpkinEquipper";

const address = CONFIG.BUMPKIN_EQUIPPER_CONTRACT;

/*
 * Bumpkin details contract
 */
export async function equipBumpkin({
  signature,
  deadline,
  bumpkinId,
  equipIds,
  unequipIds,
  burnIds,
  tokenURI,
}: {
  signature: string;
  deadline: string;
  bumpkinId: number;
  equipIds: number[];
  unequipIds: number[];
  burnIds: number[];
  tokenURI: string;
}) {
  const gasPrice = await estimateGasPrice(web3.writeProvider);

  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.writeProvider.getSigner()
  ) as unknown as BumpkinEquipper;

  try {
    const receipt = await contract.equipBumpkin(
      signature,
      deadline,
      bumpkinId,
      equipIds,
      unequipIds,
      burnIds,
      tokenURI,
      { from: web3.myAccount as string, gasPrice }
    );

    await receipt.wait();
  } catch (error) {
    const parsed = parseMetamaskError(error);

    throw parsed;
  }
}
