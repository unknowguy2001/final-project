import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/authService";

export const useFunctions = () => {
  const { authInfo, setAuthInfo } = useAuth();

  const userMenues = [
    {
      label: "หน้าแรก",
      url: "/",
      canAccess: authInfo.isAuthenticated,
    },
    {
      label: "บริษัท",
      url: "/companies",
      canAccess: authInfo.isAuthenticated,
    },
    {
      label: "กระทู้",
      url: "/forums",
      canAccess: authInfo.isAuthenticated,
    },
  ];

  const adminMenues = [
    {
      label: "แอดมิน",
      url: "/admin",
      canAccess: authInfo.isAdmin,
    },
  ];

  const menues = [...userMenues, ...adminMenues];

  const handleLogoutClick = async () => {
    await logout();
    setAuthInfo({ isAuthenticated: false, user: null, isAdmin: false });
  };

  return { menues, authInfo, handleLogoutClick };
};
