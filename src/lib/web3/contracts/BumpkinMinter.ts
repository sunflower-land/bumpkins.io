import { CONFIG } from "lib/config";
import { web3 } from "lib/web3";
import { AbiItem } from "web3-utils";
import { estimateGasPrice, parseMetamaskError } from "../utils";
import BumpkinMinterABI from "./abis/BumpkinMinter.json";
import { IBumpkinMinter } from "./types/IBumpkinMinter";

const address = CONFIG.BUMPKIN_MINTER_CONTRACT;
export type OnChainBumpkin = {
  tokenId: string;
  tokenURI: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  nonce: string;
  metadata: string;
  wallet: string;
};

/*
 * Bumpkin details contract
 */

export async function createBumpkin({
  signature,
  deadline,
  fee,
  partIds,
  farmId,
  tokenUri,
}: {
  signature: string;
  deadline: number;
  fee: string;
  partIds: number[];
  farmId: number;
  tokenUri: string;
}): Promise<string> {
  const gasPrice = await estimateGasPrice(web3.provider);

  const contract = new web3.provider.eth.Contract(
    BumpkinMinterABI as AbiItem[],
    address as string
  ) as unknown as IBumpkinMinter;

  return new Promise((resolve, reject) => {
    contract.methods
      .mintBumpkin(signature, deadline, fee, farmId, partIds, tokenUri)
      .send({ from: web3.myAccount as string, gasPrice, value: fee })
      .on("error", async function (error: any) {
        const parsed = parseMetamaskError(error);

        console.log({ parsed });

        // In case it was a Blockchain timing issue
        await new Promise((res) => setTimeout(res, 5 * 1000));

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

/*
 * Bumpkin details contract
 */
export async function hasMinted(sunflowerLandAccountId: string) {
  const contract = new web3.provider.eth.Contract(
    BumpkinMinterABI as AbiItem[],
    address as string
  ) as unknown as IBumpkinMinter;

  return contract.methods
    .freeBumpkinMintedAt(Number(sunflowerLandAccountId))
    .call({ from: web3.myAccount as string });
}
