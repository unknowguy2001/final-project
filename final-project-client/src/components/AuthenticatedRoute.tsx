import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isFetchingAuthInfo, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isFetchingAuthInfo && !isAuthenticated) {
      navigate("/login");
    }
  }, [isFetchingAuthInfo, isAuthenticated, navigate]);

  return !isFetchingAuthInfo && isAuthenticated ? children : null;
};

export default AuthenticatedRoute;
