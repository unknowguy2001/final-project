import { ReactNode } from "react";

import { useFunctions } from "./useFunctions";

interface AuthenticatedProps {
  children: ReactNode;
}

export const Authenticated = ({ children }: AuthenticatedProps) => {
  const { isFetchingAuthInfo, authInfo } = useFunctions();

  return !isFetchingAuthInfo && authInfo.isAuthenticated ? children : null;
};
