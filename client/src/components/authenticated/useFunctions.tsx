import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const useFunctions = (shouldBeAdmin: boolean) => {
  const navigate = useNavigate();
  const { isFetchingAuthInfo, authInfo } = useAuth();

  useEffect(() => {
    if (isFetchingAuthInfo) return;
    if (!authInfo.isAuthenticated) {
      navigate("/auth/login");
    } else {
      if (shouldBeAdmin && !authInfo.isAdmin) {
        navigate("/");
      }
    }
  }, [isFetchingAuthInfo, authInfo, navigate, shouldBeAdmin]);

  return {
    isFetchingAuthInfo,
    authInfo,
  };
};

export default useFunctions;
