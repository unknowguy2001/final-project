import { createContext, useContext, useEffect, useState } from "react";

import {
  IAuthInfo,
  IAuthContext,
  IAuthProviderProps,
} from "../interfaces/auth";
import axiosInstance from "../axiosInstance";

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [authInfo, setAuthInfo] = useState<IAuthInfo>({
    isAuthenticated: false,
    user: null,
  });
  const [isFetchingAuthInfo, setIsFetchingAuthInfo] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const handleGetAuthInfo = async () => {
      const response = await axiosInstance.get<IAuthInfo>("/auth/info", {
        signal: controller.signal,
      });
      setAuthInfo(response.data);
      setIsFetchingAuthInfo(false);
    };
    handleGetAuthInfo();
    return () => controller.abort();
  }, []);

  const value: IAuthContext = {
    authInfo,
    setAuthInfo,
    isFetchingAuthInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
