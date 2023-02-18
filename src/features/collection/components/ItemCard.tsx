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
        <div className="relative  h-40 w-full">
          <img
            src={image}
            alt={name}
            className={classNames("absolute  h-full w-full object-cover", {
              "bumpkin-background": part === "background",
              "mouth-eyes-shoes": part === "shoes",
            })}
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
