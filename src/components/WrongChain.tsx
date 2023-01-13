import React from "react";

interface Props {
  isSwitching: boolean;
  onSwitch: () => void;
}

export const WrongChain: React.FC<Props> = ({ isSwitching, onSwitch }) => {
  return (
    <section className="h-full flex-1">
      <div className="container mx-auto">
        <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
          <div className="relative z-10">
            <h2 className="mb-4 text-6xl md:text-7xl font-heading font-semibold">
              You are not connected to Polygon
            </h2>
            <p className=" text-gray-300 font-heading font-medium">
              Bumpkins live on the Polygon Blockchain. To collect Bumpkins and
              SFTs, you must be on the correct chain.
            </p>
            <div className="sm:max-w-max mt-8">
              <button
                className="h-12 items-center flex justify-center py-5 px-7 w-full text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                onClick={onSwitch}
                disabled={isSwitching}
              >
                {isSwitching ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Switching...
                  </>
                ) : (
                  "Switch to Polygon"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
