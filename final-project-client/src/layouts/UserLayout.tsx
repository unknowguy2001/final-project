import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthenticatedRoute from "../components/AuthenticatedRoute";

const UserLayout = () => {
  return (
    <AuthenticatedRoute>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthenticatedRoute>
  );
};
export default UserLayout;
