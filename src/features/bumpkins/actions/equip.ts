import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { loadBumpkin } from "lib/web3/contracts/BumpkinDetails";
import { equipBumpkin } from "lib/web3/contracts/BumpkinEquipper";
import { Equipped, Wallet } from "../types/Items";

const API_URL = CONFIG.API_URL;

type Options = {
  token: string;
  bumpkinId: string;
  equipment: Equipped;
  wallet: Wallet;
};

type Response = {
  payload: any;
  signature: string;
};

export async function equip({ token, bumpkinId, equipment, wallet }: Options) {
  const response = await window.fetch(`${API_URL}/bumpkins/equip`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bumpkinId,
      equipment,
      wallet,
    }),
  });

  if (response.status === 403) {
    throw new Error(ERRORS.CANNOT_EQUIP_LISTED);
  }

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.FAILED_REQUEST);
  }

  const transaction: Response = await response.json();

  // Fire off Blockchain request
  await equipBumpkin({
    bumpkinId: transaction.payload.bumpkinId,
    signature: transaction.signature,
    deadline: transaction.payload.deadline,
    equipIds: transaction.payload.equipIds,
    unequipIds: transaction.payload.unequipIds,
    burnIds: transaction.payload.burnIds,
    tokenURI: transaction.payload.tokenURI,
  });

  const bumpkin = await waitForEquip(
    transaction.payload.bumpkinId,
    transaction.payload.tokenUri
  );
  return {
    bumpkin,
  };
}

async function waitForEquip(bumpkinId: number, tokenURI: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const bumpkin = await loadBumpkin(bumpkinId);

  if (bumpkin.tokenURI.endsWith(tokenURI)) {
    await waitForEquip(bumpkinId, tokenURI);
  }

  return bumpkin;
}
