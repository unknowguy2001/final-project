import {
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import { useFunctions } from "./useFunctions";

export const Navbar = () => {
  const { menues, authInfo, handleLogoutClick, handleAdminClick } =
    useFunctions();

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
            <Avatar size="xs" name={authInfo.user?.fullname[0]} />
            {authInfo.user?.fullname}
            <Icon fontSize={16} icon="akar-icons:chevron-down" />
          </Flex>
        </MenuButton>
        <MenuList>
          {authInfo.isAdmin && (
            <MenuItem
              onClick={handleAdminClick}
              icon={<Icon fontSize={16} icon="lucide:lock" />}
            >
              ระบบจัดการ
            </MenuItem>
          )}
          <MenuItem
            onClick={handleLogoutClick}
            icon={<Icon fontSize={16} icon="lucide:log-out" />}
          >
            ออกจากระบบ
          </MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};
