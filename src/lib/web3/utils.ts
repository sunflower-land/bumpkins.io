import { ethers } from "ethers";
import { ERRORS } from "lib/errors";

const MINIMUM_GAS_PRICE = 40;

export async function estimateGasPrice(
  web3: ethers.providers.JsonRpcProvider,
  incr = 1
) {
  const minimum = MINIMUM_GAS_PRICE * 1000000000;
  try {
    const e = await web3.getGasPrice();
    let gasPrice = e ? Number(e) * incr : undefined;
    if (!gasPrice || gasPrice < minimum) {
      gasPrice = minimum;
    }
    return gasPrice;
  } catch {
    return minimum;
  }
}

export function parseMetamaskError(error: any): Error {
  if (error.code === "ACTION_REJECTED") {
    return new Error(ERRORS.REJECTED_TRANSACTION);
  }

  if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
    return new Error(ERRORS.UNPREDICTABLE_GAS_LIMIT);
  }

  return error;
}
