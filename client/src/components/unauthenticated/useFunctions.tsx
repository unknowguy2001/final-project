import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

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
