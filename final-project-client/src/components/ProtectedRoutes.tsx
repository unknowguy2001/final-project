import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleAuthCheck = async () => {
      const response = await checkAuthStatus();
      if (!response.data.isAuthenticated) {
        return navigate("/login");
      }
      setIsAuthenticated(response.data.isAuthenticated);
    };
    handleAuthCheck();
  }, [checkAuthStatus, navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
