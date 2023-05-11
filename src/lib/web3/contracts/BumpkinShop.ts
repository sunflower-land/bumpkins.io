import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import { parseMetamaskError, estimateGasPrice } from "../utils";
import ABI from "./abis/BumpkinShop.json";
import { BumpkinShop } from "./types/BumpkinShop";

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

export async function mintItem({
  itemId,
  deadline,
  signature,
  price,
  supply,
  fee,
}: MintItemArgs): Promise<any> {
  const gasPrice = await estimateGasPrice(web3.provider);
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.provider.getSigner()
  );

  try {
    return await contract.mint(
      itemId,
      deadline,
      price,
      supply,
      fee,
      signature,
      { from: web3.myAccount as string }
    );
  } catch (error) {
    console.log(error);
    const parsed = parseMetamaskError(error);

    throw parsed;
  }

  return new Promise((resolve, reject) => {
    contract
      .mint(itemId, deadline, price, supply, fee, signature)
      .send({ from: web3.myAccount as string, gasPrice })
      .on("error", function (error: any) {
        const parsed = parseMetamaskError(error);

        reject(parsed);
      })
      .on("transactionHash", function (transactionHash: any) {
        console.log({ transactionHash });
      })
      .on("receipt", function (receipt: any) {
        resolve(receipt);
      });
  });
}

// export async function mintItemRetry(
//   args: MintItemArgs,
//   retryCount = 0
// ): Promise<any> {
//   try {
//     return await mintItem(args);
//   } catch (e: any) {
//     if (e.message === ERRORS.REJECTED_TRANSACTION) {
//       throw e;
//     }

//     if (retryCount < 3) {
//       console.log(e);
//       console.log("retry");
//       await new Promise((res) => setTimeout(res, 500));

//       return mintItemRetry(args, retryCount + 1);
//     }

//     throw e;
//   }
// }
