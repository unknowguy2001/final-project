import { ChangeEvent, SyntheticEvent, useState } from "react";

import { useAuth } from "../../contexts/authContext";
import { LoginData, login } from "../../services/authService";

export const useFunctions = () => {
  const { setAuthInfo } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    const response = await login(loginData);
    setAuthInfo(response.data.authInfo);
    setIsAuthenticating(false);
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
