import {
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";
import avatar from "animal-avatar-generator";

import { useFunctions } from "./useFunctions";

export const Navbar = () => {
  const { menues, authInfo, handleLogoutClick } = useFunctions();

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
      backgroundColor="white"
      zIndex={999}
    >
      <Container
        paddingY={4}
        maxWidth={1024}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={2}>
          {menues.map((menu) => (
            <Button
              fontWeight="400"
              key={menu.url}
              _activeLink={{
                backgroundColor: "brand.50 !important",
              }}
              _hover={{
                backgroundColor: "brand.25",
              }}
              color="black"
              leftIcon={<Icon icon={menu.icon} />}
              variant="ghost"
              as={NavLink}
              to={menu.url}
            >
              {menu.label}
            </Button>
          ))}
        </Flex>
        <Menu>
          <MenuButton>
            <Flex fontWeight="500" fontSize="sm" gap={2} alignItems="center">
              <Box
                dangerouslySetInnerHTML={{
                  __html: avatar(authInfo.user!.fullname, {
                    size: 32,
                  }),
                }}
              />
              {authInfo.user?.fullname}
              <Icon fontSize={16} icon="lucide:chevron-down" />
            </Flex>
          </MenuButton>
          <MenuList>
            {authInfo.isAdmin && (
              <MenuItem
                as={Link}
                to="/admin"
                icon={<Icon fontSize={16} icon="lucide:shield-check" />}
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
    </Box>
  );
};
