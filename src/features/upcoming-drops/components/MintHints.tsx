import { useActor } from "@xstate/react";
import { SecondaryButton } from "components/SecondaryButton";
import { Auth } from "features/auth/Auth";
import { Context } from "features/auth/lib/Provider";
import { Modal } from "features/components/Modal";
import {
  approveSFL,
  loadAllowance,
} from "lib/web3/contracts/SunflowerLandToken";
import React, { useContext, useEffect, useState } from "react";

/**
 * A range of hints to ensure a user is ready to mint
 * 1st - ensure they are connected + signed
 * 2nd - ensure they have approved SFL
 */
export const MintHints: React.FC<{ sfl: number }> = ({ sfl }) => {
  const { authService } = useContext(Context);
  const [authState] = useActor(authService);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [state, setState] = useState<
    "unauthorised" | "authorised" | "unapproved" | "approving" | "approved"
  >("authorised");

  useEffect(() => {
    const load = async () => {
      const allowance = await loadAllowance();

      if (allowance >= sfl) {
        setState("approved");
      } else {
        setState("unapproved");
      }
    };

    if (authState.matches("authorised")) {
      load();
    } else {
      setState("unauthorised");
    }
  }, [authState.value]);

  const connect = () => {
    setShowAuthModal(true);
  };

  const approve = async () => {
    try {
      setState("approving");
      await approveSFL();
      setState("approved");
    } catch {
      setState("unapproved");
    }
  };

  return (
    <>
      <Modal show={showAuthModal && !authState.matches("authorised")}>
        <Auth />
      </Modal>
      {state === "unauthorised" && (
        <div className="flex flex-col justify-center w-full mb-2">
          <span className="text-blue-500 text-sm">
            You must be connected to Bumpkins.io to mint
          </span>
          <SecondaryButton onClick={connect} title="Connect" />
        </div>
      )}
      {state === "unapproved" && (
        <div className="flex flex-col justify-center w-full mb-2">
          <span className="text-blue-500 text-sm">
            You must approve SFL before minting an item
          </span>
          <SecondaryButton onClick={approve} title="Approve" />
        </div>
      )}
      {state === "approving" && (
        <div className="overflow-hidden h-10 w-full text-center">
          <span className="loading text-lg text-blueGray-500 overflow-hidden">
            Approving
          </span>
        </div>
      )}
    </>
  );
};
