import { ReactNode, createContext, useEffect, useState } from "react";

import { getAuthInfo } from "../services/authService";
import { AuthContextValue, AuthInfo } from "../interfaces/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAuthenticated: false,
    user: null,
    isAdmin: false,
  });
  const [isFetchingAuthInfo, setIsFetchingAuthInfo] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const handleGetAuthInfo = async () => {
      const response = await getAuthInfo({
        signal: controller.signal,
      });
      setAuthInfo(response.data);
      setIsFetchingAuthInfo(false);
    };

    handleGetAuthInfo();

    return () => controller.abort();
  }, []);

  const value: AuthContextValue = {
    authInfo,
    setAuthInfo,
    isFetchingAuthInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
