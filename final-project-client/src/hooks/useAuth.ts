import { useState } from "react";

import axiosInstance from "../axiosInstance";
import { BaseResponse } from "../interfaces/api";
import { LoginRequest } from "../interfaces/auth";

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async (loginRequest: LoginRequest) => {
    setIsAuthenticating(true);
    try {
      await axiosInstance.post<BaseResponse>("/auth/login", loginRequest);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    login,
    isAuthenticating,
  };
};
