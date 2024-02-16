import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Authenticated } from "../../components/authenticated";
import ScrollToTop from "react-scroll-up";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export const MainLayout = () => {
  const location = useLocation();
  const shouldBeAdmin = location.pathname.includes("admin");

  return (
    <Authenticated shouldBeAdmin={shouldBeAdmin}>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
      <ScrollToTop
        style={{
          zIndex: 997,
        }}
        showUnder={500}
      >
        <IconButton
          aria-label="Scroll to top"
          icon={<Icon fontSize={24} icon="lucide:arrow-up" />}
          size="lg"
          borderRadius="full"
        />
      </ScrollToTop>
    </Authenticated>
  );
};
