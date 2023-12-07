import { logout } from "../../services/authService";
import { useAuth } from "../../contexts/authContext";

const menues = [
  {
    label: "หน้าแรก",
    url: "/",
  },
  {
    label: "บริษัท",
    url: "/companies",
  },
  {
    label: "กระทู้",
    url: "/forums",
  },
];

export const useFunctions = () => {
  const { authInfo, setAuthInfo } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    setAuthInfo({ isAuthenticated: false, user: null });
  };

  return { menues, authInfo, handleLogoutClick };
};
