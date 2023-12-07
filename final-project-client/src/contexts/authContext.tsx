import { createContext, useContext, useEffect, useState } from "react";

import { AuthInfo } from "../interfaces/auth";
import { getAuthInfo } from "../services/authService";

interface AuthContextValue {
  authInfo: AuthInfo;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
  isFetchingAuthInfo: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAuthenticated: false,
    user: null,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
