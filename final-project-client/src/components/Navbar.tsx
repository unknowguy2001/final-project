import {
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { LuLogOut, LuChevronDown } from "react-icons/lu";

import axiosInstance from "../axiosInstance";
import { useAuth } from "../contexts/authContext";

const menues = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Companies",
    url: "/companies",
  },
  {
    label: "Forums",
    url: "/forums",
  },
];

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
      paddingY={6}
      maxWidth={1024}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap={4}>
        {menues.map((menu) => (
          <Link
            key={menu.label + menu.url}
            _activeLink={{
              color: "black",
            }}
            color="gray.500"
            as={NavLink}
            to={menu.url}
          >
            {menu.label}
          </Link>
        ))}
      </Flex>
      <Menu>
        <MenuButton>
          <Flex fontWeight="500" fontSize="sm" gap={2} alignItems="center">
            {authInfo.user?.fullname}
            <LuChevronDown size={16} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogoutClick} icon={<LuLogOut size={16} />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};

export default Navbar;
