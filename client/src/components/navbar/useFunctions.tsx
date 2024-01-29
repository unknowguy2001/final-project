import { useAuth } from "../../hooks/useAuth";

export const useFunctions = () => {
  const { authInfo, setAuthInfo } = useAuth();

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
      icon: "lucide:building-2",
    },
    {
      label: "กระทู้",
      url: "/forums",
      canAccess: authInfo.isAuthenticated,
      icon: "lucide:library-big",
    },
  ];

  const handleLogoutClick = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthInfo({ isAuthenticated: false, user: null, isAdmin: false });
  };

  return { menues, authInfo, handleLogoutClick };
};
