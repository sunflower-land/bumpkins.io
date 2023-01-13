import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import ABI from "./abis/SunflowerLandToken.json";
import { SunflowerLandToken } from "./types/SunflowerLandToken";

const address = CONFIG.TOKEN_CONTRACT;

export async function getSFLBalance() {
  const contract = new web3.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as SunflowerLandToken;

  const balance = await contract.methods
    .balanceOf(web3.myAccount as string)
    .call();

  return balance;
}

export async function approveSFL(amount: number) {
  const contract = new web3.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as SunflowerLandToken;

  const gasPrice = await estimateGasPrice(web3.provider);

  const wei = Web3.utils.toWei(amount.toString());

  return new Promise((resolve, reject) => {
    contract.methods
      .approve(CONFIG.BUMPKIN_SHOP_CONTRACT, wei)
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

export async function loadAllowance() {
  const contract = new web3.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as SunflowerLandToken;

  const allowance = await contract.methods
    .allowance(web3.myAccount as string, CONFIG.BUMPKIN_SHOP_CONTRACT)
    .call({ from: web3.myAccount as string });

  return Number(Web3.utils.fromWei(allowance));
}
