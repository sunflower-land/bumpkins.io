import React, { useContext, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { NavBar } from "./Navbar";

import { Profile } from "features/profile/Profile";
import { Home } from "features/home/Home";
import { Collection } from "features/collection/Collection";
import { Bumpkins } from "features/bumpkins/Bumpkins";
import { ItemDetails } from "features/collection/pages/ItemDetails";
import { RequireAuth } from "./RequireAuth";
import { Footer } from "./Footer";
import { MintConfirmationModal } from "features/collection/components/MintConfirmationModal";
import { UpcomingDrops } from "features/upcoming-drops/UpcomingDrops";
import { BumpkinDetail } from "features/bumpkins/BumpkinDetail";
import { MintBumpkin } from "features/bumpkins/components/MintBumpkin";
import * as AuthProvider from "features/auth/lib/Provider";
import { useActor } from "@xstate/react";
/**
 * Entry point for game which reflects the user session state
 * Controls flow of authorised and unauthorised games
 */

export const Navigation: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState, send] = useActor(authService);
  const { provider } = authState.context;

  /**
   * Listen to web3 account/chain changes
   * TODO: move into a hook
   */
  useEffect(() => {
    if (provider) {
      provider.on("chainChanged", () => {
        send("CHAIN_CHANGED");
      });

      provider.on("accountsChanged", function () {
        send("ACCOUNT_CHANGED");
      });
    }
  }, [provider]);

  return (
    <>
      <HashRouter>
        <div className="h-full flex flex-col">
          <NavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/collection/:id" element={<ItemDetails />}>
                <Route path="mint" element={<MintConfirmationModal />} />
              </Route>
              <Route path="/upcoming-drops" element={<UpcomingDrops />}>
                <Route path="mint" element={<MintConfirmationModal />} />
              </Route>
              <Route
                path="/bumpkins"
                element={
                  <RequireAuth>
                    <Bumpkins />
                  </RequireAuth>
                }
              />
              <Route
                path="/bumpkins/:id"
                element={
                  <RequireAuth>
                    <BumpkinDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="/mint-bumpkin"
                element={
                  <RequireAuth>
                    <MintBumpkin />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </HashRouter>
    </>
  );
};
