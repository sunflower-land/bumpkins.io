import React from "react";
import token from "assets/icons/token_2.png";
import gameplay from "assets/images/landing.png";

export const SFL: React.FC = () => {
  return (
    <section className=" wave-top wave-bottom" id="sfl">
      <div className="wave wave-top w-full text-coolGray-50">
        <svg
          viewBox="0 0 1440 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 64.5909H349.922C606.664 64.5909 859.771 -7.62939e-06 1080 -7.62939e-06C1300.23 -7.62939e-06 1440 64.5909 1440 64.5909V116H0V64.5909Z"
            fill="#f5f6f7"
          ></path>
        </svg>
      </div>
      <div className="py-12  bg-gray-50">
        <div className="max-w-7xl mx-auto lg:flex lg:items-center container  ">
          <div className="w-full">
            <div className="lg:flex justify-between">
              <div className="ml-4 mb-20 lg:mb-0 mx-auto lg:max-w-2xl ">
                <span className="block mb-2 text-xs font-medium uppercase leading-4 text-gray-300 tracking-widest">
                  Powered by Sunflower Land
                </span>
                <div className="flex items-center mb-12 ">
                  <h2 className="text-8xl font-medium font-heading leading-none">
                    How do I earn SFL?
                  </h2>
                  <img
                    src={token}
                    className="h-10 ml-2 mr-5"
                    style={{
                      imageRendering: "pixelated",
                    }}
                  />
                </div>

                <p className="2xl:pr-20 mb-8 pr- text-lg lg:text-lg leading-relaxed font-heading font-light">
                  SFL is a{" "}
                  <span className="font-bold text-blue-500">
                    game utility token
                  </span>{" "}
                  that powers the Sunflower Land MetaVerse. It is used for
                  in-game and shop purchases.
                </p>
                <p className="2xl:pr-20 mb-12 text-lg lg:text-lg leading-relaxed font-heading font-light">
                  The only way to earn SFL is through farming, fishing, mining &
                  exploring Sunflower Land.
                </p>
                <p className="2xl:pr-20 mb-12 text-lg lg:text-lg leading-relaxed font-heading font-light">
                  <span className="font-bold">Bring your Bumpkin!</span> Now you
                  can use your Bumpkin in-game to help grow your farming empire.
                </p>
                <div className=" flex mb-12 font-heading">
                  <button
                    className=" bg-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 rounded-xl block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-base  text-center  leading-none "
                    type="button"
                  >
                    QuickSwap
                  </button>
                  <button
                    className="block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-base text-white text-center  leading-none bg-blue-600 hover:bg-blue-700 rounded"
                    type="button"
                  >
                    Play
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 flex justify-center relative">
                <img
                  src={gameplay}
                  className="h-auto w-80 rounded-lg lg:w-auto"
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
                <div className="absolute flex items-center top-[64%]">
                  <img
                    src={token}
                    className="w-8 mr-1"
                    style={{
                      imageRendering: "pixelated",
                    }}
                  />
                  <span className="font-bold  font-timer text-white timer-text text-3xl">
                    +5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wave wave-bottom w-full text-coolGray-50">
        <svg
          viewBox="0 0 1440 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 51.4091H1090.08C833.336 51.4091 580.229 116 360 116C139.771 116 0 51.4091 0 51.4091V0H1440V51.4091Z"
            fill="#f5f6f7"
          ></path>
        </svg>
      </div>
    </section>
  );
};
