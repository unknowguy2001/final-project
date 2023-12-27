import { FC, ReactNode, createContext, useEffect, useState } from "react";

import { getAuthInfo } from "../services/authService";
import { AuthContextValue, AuthInfo } from "../interfaces/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAuthenticated: false,
    user: null,
    isAdmin: false,
  });
  const [isFetchingAuthInfo, setIsFetchingAuthInfo] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const handleGetAuthInfo = async () => {
      try {
        const response = await getAuthInfo({ signal: controller.signal });
        setAuthInfo(response.data);
      } catch (error) {
        console.error("Error fetching authentication info:", error);
      } finally {
        setIsFetchingAuthInfo(false);
      }
    };

    handleGetAuthInfo();

    return () => controller.abort();
  }, []);

  const contextValue: AuthContextValue = {
    authInfo,
    setAuthInfo,
    isFetchingAuthInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
