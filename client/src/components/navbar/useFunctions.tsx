import { useColorMode, useDisclosure } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";

const useFunctions = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isMenuesOpen,
    onOpen: onMenuesOpen,
    onClose: onMenuesClose,
  } = useDisclosure();

  const { authInfo, setAuthInfo } = useAuth();

  const toggleMenues = () => {
    isMenuesOpen ? onMenuesClose() : onMenuesOpen();
  };

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

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthInfo({ isAuthenticated: false, user: null, isAdmin: false });
  };

  return {
    menues,
    authInfo,
    logout,
    colorMode,
    toggleColorMode,
    isMenuesOpen,
    toggleMenues,
    onMenuesClose,
  };
};

export default useFunctions;
