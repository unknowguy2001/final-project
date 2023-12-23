import { Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// theme
import { theme } from "./theme";

// pages
import { Home } from "./pages/home";
import { AdminCompanies } from "./pages/admin/companies";
import { Login } from "./pages/login";
import { Forum } from "./pages/forum";
import { Forums } from "./pages/forums";
import { Company } from "./pages/company";
import { NewForum } from "./pages/new-forum";
import { Companies } from "./pages/companies";
import { EditForum } from "./pages/edit-forum";
import { Admin } from "./pages/admin";
import { NewCompany } from "./pages/admin/new-company";
import { EditCompany } from "./pages/admin/edit-company";
import { AdminUsers } from "./pages/admin/users";
import { AdminAddUser } from "./pages/admin/add-user";
import { AdminEditUser } from "./pages/admin/edit-user";

// layouts
import { AuthLayout } from "./layouts/authLayout";
import { UserLayout } from "./layouts/userLayout";
import { AdminLayout } from "./layouts/adminLayout";

// contexts
import { AuthProvider } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "companies/:companyId",
        element: <Company />,
      },
      {
        path: "forums",
        element: <Forums />,
      },
      {
        path: "forums/:forumId",
        element: <Forum />,
      },
      {
        path: "forums/new",
        element: <NewForum />,
      },
      {
        path: "forums/:forumId/edit",
        element: <EditForum />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Admin />,
      },
      {
        path: "companies",
        element: <AdminCompanies />,
      },
      {
        path: "companies/new",
        element: <NewCompany />,
      },
      {
        path: "companies/:companyId/edit",
        element: <EditCompany />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/new",
        element: <AdminAddUser />,
      },
      {
        path: "users/:userId/edit",
        element: <AdminEditUser />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Toaster richColors position="bottom-center" />
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
