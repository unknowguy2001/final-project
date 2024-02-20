import { toast } from "sonner";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "../../hooks/useAuth";
import { RegisterData } from "../../interfaces/auth";
import { register } from "../../services/authService";
import { OptionBase } from "chakra-react-select";
import { getCompanyNames } from "../../services/commonService";

export interface CompanyNameOption extends OptionBase {
  label: string;
  value: number;
}

const useFunctions = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyNameOption>();
  const [companyNames, setCompanyNames] = useState<CompanyNameOption[]>([]);
  const { setAuthInfo } = useAuth();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    password: "",
    trainedCompanyId: null,
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
      if (selectedCompany) {
        registerData.trainedCompanyId = selectedCompany!.value;
      }
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

  useEffect(() => {
    const abortController = new AbortController();
    getCompanyNames({
      signal: abortController.signal,
    }).then((res) => {
      setCompanyNames(
        res.data.items.map(
          (item) =>
            ({
              value: item.id,
              label: item.name,
            }) as unknown as CompanyNameOption
        )
      );
    });
    return () => abortController.abort();
  }, []);

  const isTrained = useMemo(() => {
    const entryYear = parseInt(registerData.username.slice(2, 4));
    const currentYear = parseInt(
      (new Date().getFullYear() + 543).toString().slice(2, 4)
    );
    const totalYear = Math.abs(entryYear - currentYear);

    return totalYear >= 4;
  }, [registerData.username]);

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
    isTrained,
    selectedCompany,
    setSelectedCompany,
    companyNames,
  };
};

export default useFunctions;
