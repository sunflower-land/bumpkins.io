import React from "react";
import { useNavigate } from "react-router-dom";

export const NoBumpkin: React.FC = () => {
  const navigate = useNavigate();

  const go = () => {
    navigate("/mint-bumpkin");
  };

  return (
    <section className="py-8 bg-blueGray-100 h-full flex-1">
      <div className="container px-4 mx-auto">
        <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
          <div className="relative z-10">
            <h2 className="mb-4 text-6xl md:text-7xl font-heading font-semibold">
              Missing a Bumpkin!
            </h2>
            <p className=" text-gray-300 font-heading font-medium">
              You first need to mint a Bumpkin before you can customise it
            </p>
            <div className="sm:max-w-max mt-8">
              <button
                className="h-12 items-center px-7 w-full flex text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                onClick={go}
              >
                Mint a Bumpkin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
