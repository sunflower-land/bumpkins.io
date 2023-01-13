import React, { useEffect, useState } from "react";

import silhouette from "assets/bumpkins/silhouette.png";

import { buildImage } from "../actions/buildImage";
import classNames from "classnames";
import { Equipped } from "../types/Items";

interface Props {
  equipped: Partial<Equipped>;
  className?: string;
}

export const DynamicNFT: React.FC<Props> = ({ equipped, className }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [transitioned, setTransitioned] = useState<boolean>(false);

  const parts = { ...equipped };

  useEffect(() => {
    const load = async () => {
      setImageSrc(undefined);
      setTransitioned(false);

      const image = await buildImage({
        parts,
      });

      setImageSrc(image);
    };

    load();
  }, [equipped]);

  if (!parts) {
    return null;
  }

  if (!imageSrc) {
    return (
      <div className={"relative w-full animate-pulse"}>
        <div className="">
          <div className="h-full w-full absolute  bg-darkBlueGray-300 opacity-50" />
        </div>
        <img
          src={silhouette}
          alt="bumpkin"
          className="relative w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames(`relative w-full`, {
        "animate-pulse": !transitioned,
      })}
    >
      <img
        src={silhouette}
        alt="bumpkin"
        className="relative w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="h-full w-full absolute left-0 top-0 bg-darkBlueGray-300 opacity-50" />
      <img
        src={imageSrc}
        alt="fader"
        className={classNames("absolute top-0 left-0 w-full opacity-0", {
          "opacity-100": transitioned,
        })}
        style={{
          transition: "opacity 0.2s ease-in-out",
          imageRendering: "pixelated",
        }}
        onLoad={() => {
          setTransitioned(true);
        }}
      />
    </div>
  );
};
