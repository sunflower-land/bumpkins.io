import React from "react";

import { Landing } from "./components/Landing";
import { SFT } from "./components/SFTs";
import { SFL } from "./components/SFL";
import { Team } from "./components/Team";
import { LogoCloud } from "./components/LogoCloud";

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="">
        <Landing />

        <SFT />

        <SFL />

        <Team />

        <LogoCloud />
      </div>
    </div>
  );
};
