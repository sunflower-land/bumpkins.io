import { Contract, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import ABI from "./abis/Pair.json";

const address = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

/*
 * Bumpkin details contract
 */
export async function loadUSDCPrice() {
  const mainnet = new ethers.providers.JsonRpcBatchProvider(
    "https://polygon-rpc.com"
  );
  const contract = new Contract(address as string, ABI, mainnet);

  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const MATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
  const amount = formatUnits("1", "picoether");
  const reserves: [string, string] = await contract
    .getAmountsOut(amount, [USDC, MATIC])
    .call();

  const matic = formatUnits(reserves[1], "ether");

  return Number(matic);
}
