import { NavLink } from "react-router-dom";
import { Button, Container, Flex, Link } from "@chakra-ui/react";

import axiosInstance from "../axiosInstance";
import { useAuth } from "../contexts/authContext";

const Navbar = () => {
  const { authInfo, setAuthInfo } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthInfo({ isAuthenticated: false, user: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      as="nav"
      backgroundColor="white"
      paddingY={4}
      maxWidth={1024}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap={4}>
        <Link
          _activeLink={{
            color: "black",
          }}
          color="gray.500"
          as={NavLink}
          to="/"
        >
          Home
        </Link>
        <Link
          _activeLink={{
            color: "black",
          }}
          color="gray.500"
          as={NavLink}
          to="/companies"
        >
          Companies
        </Link>
      </Flex>
      <Flex gap={4} alignItems="center">
        Hi, {authInfo.user?.username}
        <Button onClick={handleLogoutClick}>Logout</Button>
      </Flex>
    </Container>
  );
};

export default Navbar;
