import { BigNumber, Contract, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { web3 } from "lib/web3";
import ABI from "./abis/Pair.json";
import { Contracts_Uniswap_sol_IUniswapV2Router02 } from "./types/UniswapRouter02";

const address = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

/*
 * Bumpkin details contract
 */
export async function loadUSDCPrice() {
  const mainnet = new ethers.providers.JsonRpcBatchProvider(
    "https://rpc-mainnet.maticvigil.com"
  );
  const contract = new Contract(
    address as string,
    ABI,
    mainnet
  ) as unknown as Contracts_Uniswap_sol_IUniswapV2Router02;

  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const MATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
  try {
    const reserves = await contract.getAmountsOut("1000000", [USDC, MATIC]);

    const matic = formatUnits(reserves[1], "ether");

    return matic;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
