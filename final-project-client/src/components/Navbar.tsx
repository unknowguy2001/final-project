import { Button, Flex } from "@chakra-ui/react";

import axiosInstance from "../axiosInstance";
import { useAuth } from "../contexts/authContext";

const Navbar = () => {
  const { setAuthInfo } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthInfo({ isAuthenticated: false, user: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </Flex>
  );
};

export default Navbar;
