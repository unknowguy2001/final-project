import { ChangeEvent, SyntheticEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { LoginData } from "../../interfaces/auth";
import { login } from "../../services/authService";

const useFunctions = () => {
  const { setAuthInfo } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsAuthenticating(true);
      const response = await login(loginData);
      setAuthInfo(response.data.authInfo);
      if (response.data.tokens) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    isAuthenticating,
    loginRequest: loginData,
    passwordType,
    switchPasswordType,
    handleFormSubmit,
    handleInputChange,
  };
};

export default useFunctions;
