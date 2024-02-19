import {
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

import { UserProfile } from "../user-profile";
import useFunctions from "./useFunctions";
import { ChangePasswordModal } from "../change-password-modal";

export const Navbar = () => {
  const {
    menues,
    authInfo,
    logout,
    colorMode,
    toggleColorMode,
    isMenuesOpen,
    toggleMenues,
    onMenuesClose,
  } = useFunctions();

  return (
    <>
      <Flex
        display={["flex", "flex", "none"]}
        position="fixed"
        top="73px"
        flexDirection="column"
        p={4}
        transform={isMenuesOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s"
        right={0}
        left={0}
        gap={2}
        backgroundColor="whiteAlpha.900"
        backdropFilter="blur(1rem)"
        _dark={{
          backgroundColor: "gray.800",
          borderColor: "whiteAlpha.200",
        }}
        zIndex={999}
        borderBottomRadius="md"
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
      >
        {menues.map((menu) => (
          <Button
            onClick={onMenuesClose}
            key={menu.url}
            _activeLink={{
              color: "brand.700",
              backgroundColor: "brand.50 !important",
            }}
            _dark={{
              color: "white",
              _hover: {
                backgroundColor: "whiteAlpha.200",
              },
              _activeLink: {
                backgroundColor: "whiteAlpha.200 !important",
              },
              _active: {
                backgroundColor: "whiteAlpha.100",
              },
            }}
            fontWeight={400}
            leftIcon={<Icon fontSize={14} icon={menu.icon} />}
            variant="ghost"
            as={NavLink}
            to={menu.url}
          >
            {menu.label}
          </Button>
        ))}
      </Flex>
      <Box
        display={["flex", "flex", "none"]}
        position="fixed"
        backgroundColor="blackAlpha.600"
        onClick={onMenuesClose}
        zIndex={998}
        left={0}
        right={0}
        top={0}
        bottom={0}
        opacity={isMenuesOpen ? 1 : 0}
        transition="opacity 0.3s"
        pointerEvents={isMenuesOpen ? "auto" : "none"}
      />
      <Box
        as="nav"
        position="sticky"
        top={0}
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
        backgroundColor="whiteAlpha.900"
        backdropFilter="blur(1rem)"
        _dark={{
          backgroundColor: "gray.800",
          borderColor: "whiteAlpha.200",
        }}
        zIndex={999}
      >
        <Container
          paddingY={4}
          maxWidth="6xl"
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <IconButton
            onClick={toggleMenues}
            aria-label="เมนู"
            icon={
              <Icon
                fontSize={24}
                icon={isMenuesOpen ? "lucide:x" : "lucide:menu"}
              />
            }
            variant="ghost"
            display={["flex", "flex", "none"]}
          />
          <Flex gap={2} display={["none", "none", "flex"]}>
            {menues.map((menu) => (
              <Button
                onClick={onMenuesClose}
                key={menu.url}
                _activeLink={{
                  color: "brand.700",
                  backgroundColor: "brand.50 !important",
                }}
                _dark={{
                  color: "white",
                  _hover: {
                    backgroundColor: "whiteAlpha.200",
                  },
                  _activeLink: {
                    backgroundColor: "whiteAlpha.200 !important",
                  },
                  _active: {
                    backgroundColor: "whiteAlpha.100",
                  },
                }}
                fontWeight={400}
                leftIcon={<Icon fontSize={14} icon={menu.icon} />}
                variant="ghost"
                as={NavLink}
                to={menu.url}
              >
                {menu.label}
              </Button>
            ))}
          </Flex>
          <Flex align="center" gap={4}>
            <IconButton
              onClick={toggleColorMode}
              aria-label=""
              size="sm"
              backgroundColor="brand.300"
              _hover={{
                backgroundColor: "brand.350",
              }}
              _active={{
                backgroundColor: "brand.400",
              }}
              _dark={{
                backgroundColor: "orange.200",
                _hover: {
                  backgroundColor: "orange.250",
                },
                _active: {
                  backgroundColor: "orange.300",
                },
              }}
              icon={
                colorMode === "light" ? (
                  <Icon key="moon" icon={"line-md:moon-filled-alt-loop"} />
                ) : (
                  <Icon
                    key="sun"
                    icon={
                      "line-md:moon-filled-alt-to-sunny-filled-loop-transition"
                    }
                  />
                )
              }
            />
            <Menu>
              <MenuButton>
                <UserProfile
                  fullname={authInfo.user!.fullname}
                  rightNode={<Icon fontSize={16} icon="lucide:chevron-down" />}
                />
              </MenuButton>
              <MenuList>
                <ChangePasswordModal logout={logout} />
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
                  onClick={logout}
                  icon={<Icon fontSize={16} icon="lucide:log-out" />}
                >
                  ออกจากระบบ
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
