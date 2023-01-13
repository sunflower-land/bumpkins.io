import React from "react";

import "./css/tailwind/tailwind.min.css";
import "./styles.css";

import { Navigation } from "features/navigation/Navigation";
import * as Auth from "features/auth/lib/Provider";

/**
 * Top level wrapper for providers
 */
export const App: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Auth.Provider>
        <Navigation />
      </Auth.Provider>
    </div>
  );
};
