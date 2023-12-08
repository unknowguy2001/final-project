import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// theme
import { theme } from "./theme";

// pages
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Forums } from "./pages/forums";
import { Company } from "./pages/company";
import { Companies } from "./pages/companies";

// layouts
import { AuthLayout } from "./layouts/authLayout";
import { UserLayout } from "./layouts/userLayout";

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
