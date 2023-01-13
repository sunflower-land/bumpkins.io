import { decodeToken } from "features/auth/actions/auth/login";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { web3 } from "lib/web3";
import { loadBumpkins } from "lib/web3/contracts/BumpkinDetails";
import { createBumpkin } from "lib/web3/contracts/BumpkinMinter";

const API_URL = CONFIG.API_URL;

type Options = {
  token: string;
  farmId: number;
};

type Response = {
  payload: {
    deadline: number;
    farmId: 0;
    fee: string;
    itemIds: number[];
    sender: string;
    tokenUri: string;
  };
  signature: string;
};

export async function mintBumpkin({ token, farmId }: Options) {
  const user = decodeToken(token);

  const response = await window.fetch(
    `${API_URL}/bumpkins/mint-random-bumpkin`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        farmId,
      }),
    }
  );

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.FAILED_REQUEST);
  }

  const transaction: Response = await response.json();

  await createBumpkin({
    signature: transaction.signature,
    deadline: transaction.payload.deadline,
    farmId: transaction.payload.farmId,
    fee: transaction.payload.fee,
    partIds: transaction.payload.itemIds,
    tokenUri: transaction.payload.tokenUri,
  });

  const bumpkins = await waitForBumpkins();

  return {
    bumpkins,
  };
}

async function waitForBumpkins() {
  const bumpkins = await loadBumpkins();

  if (bumpkins.length === 0) {
    await waitForBumpkins();
  }

  // Possible pending block bug
  if (bumpkins[0].owner !== web3.myAccount) {
    await waitForBumpkins();
  }

  return bumpkins;
}
