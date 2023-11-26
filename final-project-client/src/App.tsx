import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
