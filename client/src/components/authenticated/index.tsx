import { ReactNode } from "react";

import { Loader } from "../loader";
import useFunctions from "./useFunctions";

interface AuthenticatedProps {
  children: ReactNode;
  shouldBeAdmin: boolean;
}

export const Authenticated = ({
  children,
  shouldBeAdmin,
}: AuthenticatedProps) => {
  const { isFetchingAuthInfo, authInfo } = useFunctions(shouldBeAdmin);

  return !isFetchingAuthInfo && authInfo.isAuthenticated ? (
    children
  ) : (
    <Loader />
  );
};
