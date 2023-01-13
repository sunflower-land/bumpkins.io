import React from "react";
import { Link } from "react-router-dom";

import token from "assets/logos/sunflower_land.png";

interface Props {
  id: number;
  image: string;
  title: string;
  price: number;
  date: Date;
  supply: number;
}

export const NewItemCard: React.FC<Props> = ({ id, image, title, price }) => {
  return (
    <div className="w-full px-3 mb-16 md:mb-0">
      <div>
        <Link to={`/collection/${id}`}>
          <div className="flex w-full h-[300px] items-center relative justify-center  p-6 mb-8 rounded-2xl bg-gray-50 cursor-pointer">
            <img
              className="object-contain h-[150px]"
              src={image}
              style={{
                imageRendering: "pixelated",
              }}
              alt=""
            />
          </div>
        </Link>
        <a
          className="block  text-3xl font-heading font-medium hover:underline"
          href="#"
        >
          {title}
        </a>
        <p className="flex items-center mb-6 xl:mb-10 text-lg font-heading font-medium tracking-tighter">
          <img src={token} className="w-4 mr-2" />
          <span>{price} SFL</span>
        </p>
      </div>
    </div>
  );
};
