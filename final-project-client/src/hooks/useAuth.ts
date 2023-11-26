import { useState } from "react";

import axiosInstance from "../axiosInstance";
import { AuthStatusResponse, LoginRequest } from "../interfaces/auth";

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async (loginRequest: LoginRequest) => {
    setIsAuthenticating(true);
    try {
      await axiosInstance.post("/auth/login", loginRequest);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const checkAuthStatus = async () => {
    const response = await axiosInstance.get<AuthStatusResponse>(
      "/auth/status"
    );
    return response;
  };

  return {
    isAuthenticating,
    login,
    checkAuthStatus,
  };
};
