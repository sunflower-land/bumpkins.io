import Web3 from "web3";
import { AbiItem } from "web3-utils";
import ABI from "./abis/Pair.json";

const address = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

/*
 * Bumpkin details contract
 */
export async function loadUSDCPrice() {
  const mainnet = new Web3("https://polygon-rpc.com");
  const contract = new mainnet.eth.Contract(
    ABI as AbiItem[],
    address as string
  );

  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const MATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
  const amount = Web3.utils.toWei("1", "picoether");
  const reserves: [string, string] = await contract.methods
    .getAmountsOut(amount, [USDC, MATIC])
    .call();

  const matic = Web3.utils.fromWei(reserves[1]);

  return Number(matic);
}
