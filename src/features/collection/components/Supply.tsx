import React from "react";

interface Props {
  supply: number;
}
export const Supply: React.FC<Props> = ({ supply }) => {
  if (supply < 5) {
    return (
      <span className="absolute right-1 top-1 py-0 px-2 text-xxs leading-5 text-red-500 font-bold uppercase bg-orange-200 rounded-xl md:rounded-2xl z-10">
        {`Supply: ${supply}`}
      </span>
    );
  }

  return (
    <span className="absolute right-1 top-1 py-0 px-2 text-xxs leading-5 text-orange-500 font-bold uppercase bg-yellow-200 rounded-xl md:rounded-2xl z-10">
      {`Supply: ${supply}`}
    </span>
  );
};
