import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

export const useFunctions = () => {
  const navigate = useNavigate();
  const { isFetchingAuthInfo, authInfo } = useAuth();

  useEffect(() => {
    if (!isFetchingAuthInfo && !authInfo.isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isFetchingAuthInfo, authInfo, navigate]);

  return {
    isFetchingAuthInfo,
    authInfo,
  };
};
