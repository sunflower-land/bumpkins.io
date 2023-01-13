import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import BumpkinABI from "./abis/Bumpkin.json";
import { Bumpkin } from "./types/Bumpkin";

// Local testing only
const address = "0x48F53E506882A502B07668f6990f0E15422a539B";

/*
 * Bumpkin details contract
 */
export async function burnBumpkin(tokenId: string) {
  console.log({ burn: tokenId });
  const contract = new web3.provider.eth.Contract(
    BumpkinABI as AbiItem[],
    address as string
  ) as unknown as Bumpkin;

  await contract.methods
    .transferFrom(
      web3.myAccount as string,
      "0x000000000000000000000000000000000000dead",
      tokenId
    )
    .send({ from: web3.myAccount as string });

  console.log("Burnt?");
}
