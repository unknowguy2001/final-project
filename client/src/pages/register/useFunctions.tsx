import { toast } from "sonner";
import { ChangeEvent, SyntheticEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { RegisterData } from "../../interfaces/auth";
import { register } from "../../services/authService";

export const useFunctions = () => {
  const { setAuthInfo } = useAuth();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");

  const isPasswordMoreThan8Characters = registerData.password.length >= 8;
  const isPasswordHas1UpperCase = /[A-Z]/.test(registerData.password);
  const isPasswordHas1Number = /\d/.test(registerData.password);
  const isPasswordHas1SpecialCharacter =
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(registerData.password);

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const switchConfirmPasswordType = () => {
    setConfirmPasswordType((prev) =>
      prev === "password" ? "text" : "password"
    );
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (registerData.password !== confirmPassword) {
        return toast.error("รหัสผ่านไม่ตรงกัน");
      }
      setIsAuthenticating(true);
      const response = await register(registerData);
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
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const isConfirmPasswordInvalid =
    registerData.password.length > 0 &&
    confirmPassword.length > 0 &&
    confirmPassword !== registerData.password;

  return {
    isAuthenticating,
    registerData,
    passwordType,
    switchPasswordType,
    handleFormSubmit,
    handleInputChange,
    isPasswordMoreThan8Characters,
    isPasswordHas1UpperCase,
    isPasswordHas1Number,
    isPasswordHas1SpecialCharacter,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordType,
    switchConfirmPasswordType,
    isConfirmPasswordInvalid,
  };
};
