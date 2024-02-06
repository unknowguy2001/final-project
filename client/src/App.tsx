import { Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

// theme
import { theme } from "./theme";

// user pages
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Forums } from "./pages/forums";
import { Forum } from "./pages/forum";
import { Companies } from "./pages/companies";
import { Company } from "./pages/company";

// admin pages
import { Admin } from "./pages/admin";
import { AdminUsers } from "./pages/admin/users";
import { AdminUserForm } from "./pages/admin/user-form";
import { AdminCompanies } from "./pages/admin/companies";
import { AdminCompanyForm } from "./pages/admin/company-form";

// layouts
import { AuthLayout } from "./layouts/authLayout";

// contexts
import { AuthProvider } from "./contexts/authContext";
import { ForumForm } from "./pages/forum-form";
import { MainLayout } from "./layouts/mainLayout";
import { Register } from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
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
        element: <ForumForm mode="new" />,
      },
      {
        path: "forums/:forumId/edit",
        element: <ForumForm mode="edit" />,
      },
    ],
  },
  {
    path: "/admin",
    element: <MainLayout shouldBeAdmin />,
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
        element: <AdminCompanyForm mode="new" />,
      },
      {
        path: "companies/:companyId/edit",
        element: <AdminCompanyForm mode="edit" />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/new",
        element: <AdminUserForm mode="new" />,
      },
      {
        path: "users/:userId/edit",
        element: <AdminUserForm mode="edit" />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ParallaxProvider>
        <AuthProvider>
          <Toaster richColors position="bottom-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </ParallaxProvider>
    </ChakraProvider>
  );
};

export default App;
