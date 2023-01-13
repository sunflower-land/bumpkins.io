import React from "react";
import classNames from "classnames";

import { BumpkinItem, BumpkinPart } from "features/bumpkins/types/Items";

import { Link } from "react-router-dom";

interface Props {
  image: string;
  id?: number;
  name: BumpkinItem;
  part: BumpkinPart;
}

export const ItemCard: React.FC<Props> = ({
  image,
  id,
  name,
  part,
  children,
}) => {
  return (
    <Link to={`/collection/${id}`} id={`collection${id}`}>
      <div className="bg-white relative w-full mb-4 rounded-lg drop-shadow overflow-hidden">
        <div className="relative item-card-background h-40 w-full">
          <img
            src={image}
            alt={name}
            className={classNames(
              "absolute h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover",
              {
                "bumpkin-background": part === "background",
                "mouth-eyes-shoes": part === "shoes",
              }
            )}
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </Link>
  );
};
