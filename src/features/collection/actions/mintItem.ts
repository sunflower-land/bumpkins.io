import { BumpkinItem } from "features/bumpkins/types/Items";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { mintItemRetry as mint } from "lib/web3/contracts/BumpkinShop";

const API_URL = CONFIG.API_URL;

type Options = {
  token: string;
  item: BumpkinItem;
};

type Response = {
  payload: {
    deadline: number;
    itemId: number;
    sender: string;
    price: string;
    supply: number;
    fee: string;
  };
  signature: string;
};

export async function mintItem({ token, item }: Options) {
  const response = await window.fetch(`${API_URL}/bumpkins/mint-bumpkin-item`, {
    method: "POST",
    body: JSON.stringify({
      item,
    }),
    headers: {
      "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.FAILED_REQUEST);
  }

  const transaction: Response = await response.json();

  console.log({ transaction });

  try {
    const receipt = await mint({
      signature: transaction.signature,
      deadline: transaction.payload.deadline,
      itemId: transaction.payload.itemId,
      price: transaction.payload.price,
      supply: transaction.payload.supply,
      fee: transaction.payload.fee,
    });

    return receipt;
  } catch (e) {
    throw new Error(e as string);
  }
}
