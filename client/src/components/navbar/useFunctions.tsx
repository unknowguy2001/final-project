import { useState } from "react";
import { useColorMode, useDisclosure } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { ChangePasswordData } from "../../interfaces/auth";
import { changePassword } from "../../services/authService";

export const useFunctions = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordData>({
      oldPassword: "",
      newPassword: "",
    });
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [newPasswordType, setNewPasswordType] = useState<"text" | "password">(
    "password"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { authInfo, setAuthInfo } = useAuth();

  const isNewPasswordMoreThan8Characters =
    changePasswordData.newPassword.length >= 8;
  const isNewPasswordHas1UpperCase = /[A-Z]/.test(
    changePasswordData.newPassword
  );
  const isNewPasswordHas1Number = /\d/.test(changePasswordData.newPassword);
  const isNewPasswordHas1SpecialCharacter =
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(changePasswordData.newPassword);

  const menues = [
    {
      label: "หน้าแรก",
      url: "/",
      canAccess: authInfo.isAuthenticated,
      icon: "lucide:home",
    },
    {
      label: "บริษัท",
      url: "/companies",
      canAccess: authInfo.isAuthenticated,
      icon: "lucide:briefcase",
    },
    {
      label: "กระทู้",
      url: "/forums",
      canAccess: authInfo.isAuthenticated,
      icon: "lucide:help-circle",
    },
  ];

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const switchNewPasswordType = () => {
    setNewPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogoutClick = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthInfo({ isAuthenticated: false, user: null, isAdmin: false });
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
    e.preventDefault();
    await changePassword(changePasswordData);
    handleCloseClick();
    handleLogoutClick();
  };

  return {
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
  };
};
