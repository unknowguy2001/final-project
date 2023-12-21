import { Outlet } from "react-router-dom";

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { Authenticated } from "../../components/authenticated";

export const UserLayout = () => {
  return (
    <Authenticated shouldBeAdmin={false}>
      <Navbar />
      <Outlet />
      <Footer />
    </Authenticated>
  );
};
