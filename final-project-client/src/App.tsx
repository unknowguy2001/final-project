import { Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// theme
import { theme } from "./theme";

// pages
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Forum } from "./pages/forum";
import { Forums } from "./pages/forums";
import { Company } from "./pages/company";
import { Companies } from "./pages/companies";

// layouts
import { AuthLayout } from "./layouts/authLayout";
import { UserLayout } from "./layouts/userLayout";

// contexts
import { AuthProvider } from "./contexts/authContext";
import { NewForum } from "./pages/new-forum";

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
