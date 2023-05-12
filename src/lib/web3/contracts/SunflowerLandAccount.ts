import { ethers } from "ethers";
import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import AccountABI from "./abis/Account.json";
import { SunflowerLand } from "./types/Account";

const address = CONFIG.SUNFLOWER_LAND_CONTRACT;

/*
 * Bumpkin details contract
 */
export async function loadFarm() {
  const contract = new ethers.Contract(
    address as string,
    AccountABI,
    web3.readProvider
  ) as unknown as SunflowerLand;

  return contract.getFarms(web3.myAccount as string, {
    from: web3.myAccount as string,
  });
}
