import { useState } from "react";
import { useColorMode, useDisclosure } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { ChangePasswordData } from "../../interfaces/auth";
import { changePassword } from "../../services/authService";
import { toast } from "sonner";

const useFunctions = () => {
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
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState<
    "text" | "password"
  >("password");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMenuesOpen,
    onOpen: onMenuesOpen,
    onClose: onMenuesClose,
  } = useDisclosure();

  const { authInfo, setAuthInfo } = useAuth();

  const toggleMenues = () => {
    if (isMenuesOpen) {
      onMenuesClose();
    } else {
      onMenuesOpen();
    }
  };

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

  const switchConfirmPasswordType = () => {
    setConfirmNewPasswordType((prev) =>
      prev === "password" ? "text" : "password"
    );
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
    if (changePasswordData.newPassword !== confirmNewPassword) {
      return toast.error("รหัสผ่านไม่ตรงกัน");
    }
    setIsChangingPassword(true);
    await changePassword(changePasswordData);
    setIsChangingPassword(false);
    handleCloseClick();
    handleLogoutClick();
  };

  const isConfirmNewPasswordInvalid =
    changePasswordData.newPassword.length > 0 &&
    confirmNewPassword.length > 0 &&
    confirmNewPassword !== changePasswordData.newPassword;

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
    confirmNewPassword,
    setConfirmNewPassword,
    confirmNewPasswordType,
    switchConfirmPasswordType,
    isConfirmNewPasswordInvalid,
    isChangingPassword,
    isMenuesOpen,
    toggleMenues,
    onMenuesClose,
  };
};

export default useFunctions;
