import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import AccountABI from "./abis/Account.json";
import { SunflowerLand } from "./types/Account";

const address = CONFIG.SUNFLOWER_LAND_CONTRACT;

/*
 * Bumpkin details contract
 */
export async function loadFarm() {
  const contract = new web3.provider.eth.Contract(
    AccountABI as AbiItem[],
    address as string
  ) as unknown as SunflowerLand;

  return contract.methods
    .getFarms(web3.myAccount as string)
    .call({ from: web3.myAccount as string });
}
