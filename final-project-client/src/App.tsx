import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/authContext";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedGuard from "./components/UnauthenticatedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <UnauthenticatedGuard>
        <Login />
      </UnauthenticatedGuard>
    ),
  },
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Home />
      </AuthenticatedRoute>
    ),
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
