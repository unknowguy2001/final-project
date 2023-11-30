import { Outlet } from "react-router-dom";

import UnauthenticatedGuard from "../components/UnauthenticatedRoute";

const AuthLayout = () => {
  return (
    <UnauthenticatedGuard>
      <Outlet />
    </UnauthenticatedGuard>
  );
};
export default AuthLayout;
