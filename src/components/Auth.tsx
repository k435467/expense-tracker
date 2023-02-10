import React from "react";
import { useFirebaseAuth, authContext } from "@/hooks/auth";

/**
 * context provider. use useAuth to retrieve the value
 */
export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useFirebaseAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
