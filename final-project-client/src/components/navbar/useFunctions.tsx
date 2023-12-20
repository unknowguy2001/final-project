import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { authInfo, setAuthInfo } = useAuth();

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleLogoutClick = async () => {
    await logout();
    setAuthInfo({ isAuthenticated: false, user: null, isAdmin: false });
  };

  return { menues, authInfo, handleLogoutClick, handleAdminClick };
};
