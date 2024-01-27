import { Outlet } from "react-router-dom";

import { Unauthenticated } from "../../components/unauthenticated";

export const AuthLayout = () => {
  return (
    <Unauthenticated>
      <Outlet />
    </Unauthenticated>
  );
};
