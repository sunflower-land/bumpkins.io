import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { tokenUriBuilder } from "../lib/tokenUri";
import { Equipped } from "../types/Items";

const API_URL = CONFIG.API_URL;

type Request = {
  parts: Partial<Equipped>;
};

type Response = {
  image: string;
};

export async function buildImageRequest({
  fileName,
  token,
}: {
  fileName: string;
  token: string;
}) {
  const response = await window.fetch(
    `${API_URL}/bumpkins/metadata/${fileName}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        // TODO Authorization: `Bearer ${request.token}`,
        accept: "application/json",
      },
    }
  );

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status !== 200 || !response.ok) {
    throw new Error("ERROR");
  }

  const data: Response = await response.json();

  return data.image;
}

export async function buildImage(request: Request): Promise<string> {
  const tokenUri = tokenUriBuilder(request.parts as Equipped);

  // Grab a small file size and enlarge with CSS
  const size = 100;
  const url = `https://testnet-images.bumpkins.io/nfts/${tokenUri}x${size}.png`;
  const img = new Image();
  img.src = url;

  return new Promise((res, rej) => {
    // Check if image already loaded
    if (img.complete) {
      res(url);
    } else {
      // Image does work
      img.onload = () => {
        res(url);
      };

      // Image 404 - build it
      img.onerror = async () => {
        // Since these are not real NFTs, prepend fake ID and version
        const validName = `0_v1_${tokenUri}?size=${size}`;

        const response = await buildImageRequest({
          fileName: validName,
          token: "",
        });

        res(response);
      };
    }
  });
}
