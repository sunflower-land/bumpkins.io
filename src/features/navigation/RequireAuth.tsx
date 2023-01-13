import { useActor } from "@xstate/react";
import { Auth } from "features/auth/Auth";
import { Context } from "features/auth/lib/Provider";
import React, { useContext } from "react";

export const RequireAuth: React.FC = ({ children }) => {
  const { authService } = useContext(Context);
  const [state] = useActor(authService);

  return state.matches("authorised") ? <>{children}</> : <Auth />;
};
