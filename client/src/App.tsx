import { Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";

import { theme } from "./theme";
import { AuthProvider } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/auth",
    lazy: async () => {
      const { AuthLayout } = await import("./layouts/authLayout");
      return { Component: AuthLayout };
    },
    children: [
      {
        path: "login",
        lazy: async () => {
          const { Login } = await import("./pages/login");
          return { Component: Login };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const { Register } = await import("./pages/register");
          return { Component: Register };
        },
      },
    ],
  },
  {
    path: "/",
    lazy: async () => {
      const { MainLayout } = await import("./layouts/mainLayout");
      return { Component: MainLayout };
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const { Home } = await import("./pages/home");
          return { Component: Home };
        },
      },
      {
        path: "companies",
        lazy: async () => {
          const { Companies } = await import("./pages/companies");
          return { Component: Companies };
        },
      },
      {
        path: "companies/:companyId",
        lazy: async () => {
          const { Company } = await import("./pages/company");
          return { Component: Company };
        },
      },
      {
        path: "forums",
        lazy: async () => {
          const { Forums } = await import("./pages/forums");
          return { Component: Forums };
        },
      },
      {
        path: "forums/:forumId",
        lazy: async () => {
          const { Forum } = await import("./pages/forum");
          return { Component: Forum };
        },
      },
      {
        path: "forums/new",
        lazy: async () => {
          const { ForumForm } = await import("./pages/forum-form");
          return { Component: ForumForm };
        },
      },
      {
        path: "forums/:forumId/edit",
        lazy: async () => {
          const { ForumForm } = await import("./pages/forum-form");
          return { Component: ForumForm };
        },
      },
    ],
  },
  {
    path: "/admin",
    lazy: async () => {
      const { MainLayout } = await import("./layouts/mainLayout");
      return { Component: MainLayout };
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const { Admin } = await import("./pages/admin");
          return { Component: Admin };
        },
      },
      {
        path: "companies",
        lazy: async () => {
          const { AdminCompanies } = await import("./pages/admin/companies");
          return { Component: AdminCompanies };
        },
      },
      {
        path: "companies/new",
        lazy: async () => {
          const { AdminCompanyForm } = await import(
            "./pages/admin/company-form"
          );
          return { Component: AdminCompanyForm };
        },
      },
      {
        path: "companies/:companyId/edit",
        lazy: async () => {
          const { AdminCompanyForm } = await import(
            "./pages/admin/company-form"
          );
          return { Component: AdminCompanyForm };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { AdminUsers } = await import("./pages/admin/users");
          return { Component: AdminUsers };
        },
      },
      {
        path: "users/new",
        lazy: async () => {
          const { AdminUserForm } = await import("./pages/admin/user-form");
          return { Component: AdminUserForm };
        },
      },
      {
        path: "users/:userId/edit",
        lazy: async () => {
          const { AdminUserForm } = await import("./pages/admin/user-form");
          return { Component: AdminUserForm };
        },
      },
    ],
  },
]);

const colorModeManager = createLocalStorageManager("color-mode");

const App = () => {
  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
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
