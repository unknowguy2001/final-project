import { ReactNode } from "react";

import { useFunctions } from "./useFunctions";

interface UnauthenticatedProps {
  children: ReactNode;
}

export const Unauthenticated = ({ children }: UnauthenticatedProps) => {
  const { isFetchingAuthInfo, authInfo } = useFunctions();

  return !isFetchingAuthInfo && !authInfo.isAuthenticated ? children : null;
};
