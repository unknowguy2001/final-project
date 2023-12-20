import { Outlet } from "react-router-dom";

import { Authenticated } from "../../components/authenticated";

export const AdminLayout = () => {
  return (
    <Authenticated shouldBeAdmin={true}>
      <Outlet />
    </Authenticated>
  );
};
