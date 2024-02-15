import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Authenticated } from "../../components/authenticated";

export const MainLayout = () => {
  const location = useLocation();
  const shouldBeAdmin = location.pathname.includes("admin");

  return (
    <Authenticated shouldBeAdmin={shouldBeAdmin}>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </Authenticated>
  );
};
