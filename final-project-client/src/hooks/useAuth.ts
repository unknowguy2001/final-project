import { useState } from "react";

import axiosInstance from "../axiosInstance";
import { LoginRequest } from "../interfaces/auth";
import { BaseResponse } from "../interfaces/api";

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async (loginRequest: LoginRequest) => {
    setIsAuthenticating(true);
    const response = await axiosInstance.post<BaseResponse>(
      "/auth/login",
      loginRequest
    );
    setIsAuthenticating(false);
    return response;
  };

  return {
    login,
    isAuthenticating,
  };
};
