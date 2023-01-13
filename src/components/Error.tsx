import React from "react";

export const Error: React.FC<{ errorCode?: string }> = ({ errorCode }) => {
  return (
    <section className="py-8 bg-blueGray-100 h-full flex-1">
      <div className="container px-4 mx-auto">
        <div className="relative p-10 md:py-10 xl:px-20 bg-white overflow-hidden rounded-3xl">
          <div className="relative z-10 space-y-4">
            <h2 className="mb-4 text-6xl md:text-7xl font-heading font-semibold">
              Error!
            </h2>
            {errorCode && <p>{errorCode}</p>}
            <p className="text-xs">{new Date().toISOString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
