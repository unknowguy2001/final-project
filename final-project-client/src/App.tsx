import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
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
