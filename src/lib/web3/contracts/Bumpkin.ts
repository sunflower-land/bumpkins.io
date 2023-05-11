import { ethers } from "ethers";
import { web3 } from "lib/web3";
import BumpkinABI from "./abis/Bumpkin.json";
import { Bumpkin } from "./types/Bumpkin";

// Local testing only
const address = "0x48F53E506882A502B07668f6990f0E15422a539B";

/*
 * Bumpkin details contract
 */
export async function burnBumpkin(tokenId: string) {
  console.log({ burn: tokenId });
  const contract = new ethers.Contract(
    address as string,
    BumpkinABI,
    web3.provider
  ) as unknown as Bumpkin;

  await contract.transferFrom(
    web3.myAccount as string,
    "0x000000000000000000000000000000000000dead",
    tokenId,
    { from: web3.myAccount as string }
  );

  console.log("Burnt?");
}
