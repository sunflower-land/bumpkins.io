import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { web3 } from "lib/web3";
import { parseMetamaskError, estimateGasPrice } from "../utils";
import ABI from "./abis/BumpkinShop.json";

const address = CONFIG.BUMPKIN_SHOP_CONTRACT;

export type ShopItem = {
  tokenId: string;
  maxSupply: string;
  releaseDate: string;
};

type MintItemArgs = {
  itemId: number;
  deadline: number;
  signature: string;
  price: string;
  supply: number;
  fee: string;
};

async function mintItem({
  itemId,
  deadline,
  signature,
  price,
  supply,
  fee,
}: MintItemArgs): Promise<any> {
  const gasPrice = await estimateGasPrice(web3.writeProvider);
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.writeProvider.getSigner()
  );

  try {
    const receipt = await contract.mint(
      itemId,
      deadline,
      price,
      supply,
      fee,
      signature,
      { from: web3.myAccount as string, gasPrice }
    );
    await receipt.wait();
  } catch (error) {
    console.log(error);
    const parsed = parseMetamaskError(error);

    throw parsed;
  }
}

export async function mintItemRetry(
  args: MintItemArgs,
  retryCount = 0
): Promise<any> {
  try {
    return await mintItem(args);
  } catch (e: any) {
    if (
      e.message === ERRORS.REJECTED_TRANSACTION ||
      e.message === ERRORS.UNPREDICTABLE_GAS_LIMIT
    ) {
      throw e;
    }

    if (retryCount < 3) {
      await new Promise((res) => setTimeout(res, 500));

      return mintItemRetry(args, retryCount + 1);
    }

    throw e;
  }
}
