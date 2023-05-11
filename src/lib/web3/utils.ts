import { ethers } from "ethers";
import { ERRORS } from "lib/errors";

const MINIMUM_GAS_PRICE = 40;

export async function estimateGasPrice(
  web3: ethers.providers.Web3Provider,
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
  if (error.code === 4001) {
    return new Error(ERRORS.REJECTED_TRANSACTION);
  }

  if (error.code === -32603) {
    return new Error(ERRORS.NETWORK_CONGESTED);
  }

  return error;
}
