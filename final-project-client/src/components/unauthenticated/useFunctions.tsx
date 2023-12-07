import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";

export const useFunctions = () => {
  const navigate = useNavigate();
  const { isFetchingAuthInfo, authInfo } = useAuth();

  useEffect(() => {
    if (!isFetchingAuthInfo && authInfo.isAuthenticated) {
      navigate("/");
    }
  }, [isFetchingAuthInfo, authInfo, navigate]);

  return {
    isFetchingAuthInfo,
    authInfo,
  };
};
