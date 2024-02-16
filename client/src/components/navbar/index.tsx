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
  FormErrorMessage,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

import { UserProfile } from "../user-profile";
import useFunctions from "./useFunctions";
import { PasswordChecklist } from "../password-checklist";
import { PasswordVisibilityToggleButton } from "../password-visibility-toggle-button";

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
    confirmNewPassword,
    setConfirmNewPassword,
    confirmNewPasswordType,
    switchConfirmPasswordType,
    isConfirmNewPasswordInvalid,
    isChangingPassword,
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
          maxWidth="6xl"
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
          <ModalHeader>เปลี่ยนรหัสผ่าน</ModalHeader>
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
                    placeholder="********"
                    required
                    type={passwordType}
                  />
                  <PasswordVisibilityToggleButton
                    passwordType={passwordType}
                    switchPasswordType={switchPasswordType}
                  />
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
                      placeholder="********"
                      required
                      type={newPasswordType}
                    />
                    <PasswordVisibilityToggleButton
                      passwordType={newPasswordType}
                      switchPasswordType={switchNewPasswordType}
                    />
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
              <FormControl isInvalid={isConfirmNewPasswordInvalid}>
                <FormLabel>ยืนยันรหัสผ่านใหม่</FormLabel>
                <Box position="relative">
                  <Input
                    pos="relative"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                    required
                    type={confirmNewPasswordType}
                    placeholder="********"
                  />
                  <PasswordVisibilityToggleButton
                    passwordType={confirmNewPasswordType}
                    switchPasswordType={switchConfirmPasswordType}
                  />
                </Box>
                {isConfirmNewPasswordInvalid && (
                  <FormErrorMessage>รหัสผ่านไม่ตรงกัน</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCloseClick}
              mr={2}
              variant="outline"
              colorScheme="red"
            >
              ยกเลิก
            </Button>
            <Button isLoading={isChangingPassword} type="submit">
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
