import { CONFIG } from "lib/config";
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
  const contract = new web3.provider.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as BumpkinShop;

  return new Promise((resolve, reject) => {
    contract.methods
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
