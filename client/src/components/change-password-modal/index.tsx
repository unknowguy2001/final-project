import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "sonner";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { PasswordChecklist } from "../password-checklist";
import { PasswordVisibilityToggleButton } from "../password-visibility-toggle-button";
import { ChangePasswordData } from "../../interfaces/auth";
import { changePassword } from "../../services/authService";

interface ChangePasswordModalProps {
  logout: () => void;
}

export const ChangePasswordModal = ({ logout }: ChangePasswordModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordData>({
      oldPassword: "",
      newPassword: "",
    });
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );
  const [newPasswordType, setNewPasswordType] = useState<"text" | "password">(
    "password",
  );
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState<
    "text" | "password"
  >("password");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const isNewPasswordMoreThan8Characters =
    changePasswordData.newPassword.length >= 8;
  const isNewPasswordHas1UpperCase = /[A-Z]/.test(
    changePasswordData.newPassword,
  );
  const isNewPasswordHas1Number = /\d/.test(changePasswordData.newPassword);
  const isNewPasswordHas1SpecialCharacter =
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(changePasswordData.newPassword);

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const switchNewPasswordType = () => {
    setNewPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const switchConfirmPasswordType = () => {
    setConfirmNewPasswordType((prev) =>
      prev === "password" ? "text" : "password",
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseClick = () => {
    setChangePasswordData({ oldPassword: "", newPassword: "" });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (changePasswordData.newPassword !== confirmNewPassword) {
        return toast.error("รหัสผ่านไม่ตรงกัน");
      }
      setIsChangingPassword(true);
      await changePassword(changePasswordData);
      handleCloseClick();
      logout();
    } finally {
      setIsChangingPassword(false);
    }
  };

  const isConfirmNewPasswordInvalid =
    changePasswordData.newPassword.length > 0 &&
    confirmNewPassword.length > 0 &&
    confirmNewPassword !== changePasswordData.newPassword;

  return (
    <>
      <MenuItem
        onClick={onOpen}
        icon={<Icon fontSize={16} icon="lucide:lock" />}
      >
        เปลี่ยนรหัสผ่าน
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
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
