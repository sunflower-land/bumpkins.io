import React from "react";

import adam from "assets/images/adam.jpg";
import craig from "assets/images/craig.jpg";
import spencer from "assets/images/spencer.jpg";
import romy from "assets/images/romy.jpg";
import steve from "assets/images/steve.jpg";
import harry from "assets/images/harry.jpg";
import harnoor from "assets/images/harnoor.jpg";
import brandon from "assets/images/brandon.jpeg";

export const Team: React.FC = () => {
  return (
    <section className="py-10 max-w-7xl mx-auto lg:py-20">
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-lg mx-auto mb-12">
          <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
            Creators of Sunflower Land
          </span>
          <h2 className="text-3xl md:text-4xl mt-2 mb-4 font-bold font-heading">
            Meet the Bumpkin Builders
          </h2>
          <p className="text-blueGray-400 leading-loose">
            Built by Thought Farm, a Sydney based game studio.
          </p>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={adam}
              alt=""
            />
            <p className="mt-6 text-xl">Adam Hannigan</p>
            <p className="mt-2 mb-4 text-blue-600">Chief Bumpkin</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={craig}
              alt=""
            />
            <p className="mt-6 text-xl">Craig Gray</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Tech Officer</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={spencer}
              alt=""
            />
            <p className="mt-6 text-xl">Spencer Dezart-Smith</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Blender</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={romy}
              alt=""
            />
            <p className="mt-6 text-xl">Romy Furtado</p>
            <p className="mt-2 mb-4 text-blue-600">Head Goblin</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={harnoor}
              alt=""
            />
            <p className="mt-6 text-xl">Harnoor Bandesh</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Beautifier</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={steve}
              alt=""
            />
            <p className="mt-6 text-xl">Steve Woody</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Blaster</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={harry}
              alt=""
            />
            <p className="mt-6 text-xl">Harry McBrydge</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Banker</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-12">
            <img
              className="h-64 w-64 mx-auto rounded object-cover object-top"
              src={brandon}
              alt=""
            />
            <p className="mt-6 text-xl">Brandon Collins</p>
            <p className="mt-2 mb-4 text-blue-600">Bumpkin Bearer</p>
          </div>
        </div>
      </div>
    </section>
  );
};
