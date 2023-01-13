import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import ABI from "./abis/BumpkinEquipper.json";
import { BumpkinEquipper } from "./types/BumpkinEquipper";

const address = CONFIG.BUMPKIN_EQUIPPER_CONTRACT;

/*
 * Bumpkin details contract
 */
export async function equipBumpkin({
  signature,
  deadline,
  bumpkinId,
  equipIds,
  unequipIds,
  burnIds,
  tokenURI,
}: {
  signature: string;
  deadline: string;
  bumpkinId: number;
  equipIds: number[];
  unequipIds: number[];
  burnIds: number[];
  tokenURI: string;
}): Promise<string> {
  const gasPrice = await estimateGasPrice(web3.provider);

  const contract = new web3.provider.eth.Contract(
    ABI as AbiItem[],
    address as string
  ) as unknown as BumpkinEquipper;

  return new Promise((resolve, reject) => {
    contract.methods
      .equipBumpkin(
        signature,
        deadline,
        bumpkinId,
        equipIds,
        unequipIds,
        burnIds,
        tokenURI
      )
      .send({ from: web3.myAccount as string, gasPrice })
      .on("error", function (error: any) {
        const parsed = parseMetamaskError(error);

        reject(parsed);
      })
      .on("transactionHash", function (transactionHash: any) {
        console.log({ transactionHash });
      })
      .on("receipt", function (receipt: any) {
        resolve(receipt);
      });
  });
}
