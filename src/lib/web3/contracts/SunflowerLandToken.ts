import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import ABI from "./abis/SunflowerLandToken.json";
import { SunflowerLandToken } from "./types/SunflowerLandToken";

const address = CONFIG.TOKEN_CONTRACT;
export const INFINITY =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export async function getSFLBalance(retryCount = 0): Promise<BigNumber> {
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.readProvider
  ) as unknown as SunflowerLandToken;

  try {
    const balance = await contract.balanceOf(web3.myAccount as string);

    return balance;
  } catch (error) {
    console.log(error);

    if (retryCount < 3) {
      await new Promise((res) => setTimeout(res, 1000));

      return getSFLBalance(retryCount + 1);
    }
    throw error;
  }
}

export async function approveSFL() {
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.writeProvider.getSigner()
  ) as unknown as SunflowerLandToken;

  const gasPrice = await estimateGasPrice(web3.writeProvider);

  try {
    const receipt = await contract.approve(
      CONFIG.BUMPKIN_SHOP_CONTRACT,
      INFINITY,
      { from: web3.myAccount as string, gasPrice }
    );

    await receipt.wait();
  } catch (error) {
    const parsed = parseMetamaskError(error);

    throw parsed;
  }
}

export async function loadAllowance(retryCount = 0): Promise<number> {
  const contract = new ethers.Contract(
    address as string,
    ABI,
    web3.readProvider
  ) as unknown as SunflowerLandToken;

  try {
    const allowance = await contract.allowance(
      web3.myAccount as string,
      CONFIG.BUMPKIN_SHOP_CONTRACT,
      { from: web3.myAccount as string }
    );

    return Number(formatUnits(allowance));
  } catch (error) {
    console.log(error);

    if (retryCount < 3) {
      await new Promise((res) => setTimeout(res, 1000));

      return loadAllowance(retryCount + 1);
    }
    throw error;
  }
}
