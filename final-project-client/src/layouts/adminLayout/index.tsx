import { Outlet } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Authenticated } from "../../components/authenticated";

export const AdminLayout = () => {
  return (
    <Authenticated shouldBeAdmin={true}>
      <Navbar />
      <Outlet />
      <Footer />
    </Authenticated>
  );
};
