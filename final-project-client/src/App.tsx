import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Company from "./pages/Company";
import Companies from "./pages/Companies";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/userLayout";
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
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Toaster richColors />
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
