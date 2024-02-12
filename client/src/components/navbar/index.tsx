import {
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

import { UserProfile } from "../user-profile";
import { useFunctions } from "./useFunctions";
import { PasswordChecklist } from "../password-checklist";

export const Navbar = () => {
  const {
    menues,
    authInfo,
    handleLogoutClick,
    changePasswordData,
    handleChange,
    isNewPasswordMoreThan8Characters,
    isNewPasswordHas1UpperCase,
    isNewPasswordHas1Number,
    isNewPasswordHas1SpecialCharacter,
    passwordType,
    switchPasswordType,
    newPasswordType,
    switchNewPasswordType,
    handleCloseClick,
    onOpen,
    isOpen,
    handleSubmit,
    colorMode,
    toggleColorMode,
  } = useFunctions();

  return (
    <>
      <Box
        as="nav"
        position="sticky"
        top={0}
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
        backgroundColor="whiteAlpha.900"
        backdropFilter="blur(0.75rem)"
        _dark={{
          backgroundColor: "gray.800",
          borderColor: "whiteAlpha.200",
        }}
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
                <MenuItem
                  onClick={onOpen}
                  icon={<Icon fontSize={16} icon="lucide:lock" />}
                >
                  เปลี่ยนรหัสผ่าน
                </MenuItem>
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
          </Flex>
        </Container>
      </Box>
      <Modal isOpen={isOpen} onClose={handleCloseClick}>
        <ModalOverlay />
        <ModalContent onSubmit={handleSubmit} as="form">
          <ModalHeader>
            <Flex alignItems="center" gap={2}>
              <Icon icon="lucide:lock" />
              เปลี่ยนรหัสผ่าน
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>รหัสผ่านเก่า</FormLabel>
                <Box position="relative">
                  <Input
                    name="oldPassword"
                    value={changePasswordData.oldPassword}
                    onChange={handleChange}
                    placeholder="กรอกรหัสผ่านเก่า"
                    required
                    type={passwordType}
                  />
                  <Box
                    position="absolute"
                    right={4}
                    top="50%"
                    zIndex={1}
                    transform="translateY(-50%)"
                    cursor="pointer"
                    onClick={switchPasswordType}
                  >
                    <Icon
                      icon={
                        passwordType === "password"
                          ? "lucide:eye"
                          : "lucide:eye-off"
                      }
                    />
                  </Box>
                </Box>
              </FormControl>
              <Box>
                <FormControl>
                  <FormLabel>รหัสผ่านใหม่</FormLabel>
                  <Box position="relative">
                    <Input
                      name="newPassword"
                      value={changePasswordData.newPassword}
                      onChange={handleChange}
                      placeholder="กรอกรหัสผ่านใหม่"
                      required
                      type={newPasswordType}
                    />
                    <Box
                      position="absolute"
                      right={4}
                      top="50%"
                      zIndex={1}
                      transform="translateY(-50%)"
                      cursor="pointer"
                      onClick={switchNewPasswordType}
                    >
                      <Icon
                        icon={
                          newPasswordType === "password"
                            ? "lucide:eye"
                            : "lucide:eye-off"
                        }
                      />
                    </Box>
                  </Box>
                </FormControl>
                <PasswordChecklist
                  isPasswordMoreThan8Characters={
                    isNewPasswordMoreThan8Characters
                  }
                  isPasswordHas1UpperCase={isNewPasswordHas1UpperCase}
                  isPasswordHas1Number={isNewPasswordHas1Number}
                  isPasswordHas1SpecialCharacter={
                    isNewPasswordHas1SpecialCharacter
                  }
                />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseClick} mr={2} variant="ghost">
              ยกเลิก
            </Button>
            <Button type="submit">บันทึก</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
