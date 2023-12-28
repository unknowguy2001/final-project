import { Outlet } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Authenticated } from "../../components/authenticated";
import { FC } from "react";

interface MainLayoutProps {
  shouldBeAdmin?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({ shouldBeAdmin = false }) => {
  return (
    <Authenticated shouldBeAdmin={shouldBeAdmin}>
      <Navbar />
      <Outlet />
      <Footer />
    </Authenticated>
  );
};
