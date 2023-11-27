import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isFetchingAuthInfo, authInfo } = useAuth();

  useEffect(() => {
    if (!isFetchingAuthInfo && !authInfo) {
      navigate("/login");
    }
  }, [isFetchingAuthInfo, authInfo, navigate]);

  return !isFetchingAuthInfo && authInfo.isAuthenticated ? children : null;
};

export default AuthenticatedRoute;
