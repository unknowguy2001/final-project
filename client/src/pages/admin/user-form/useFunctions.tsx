import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Role } from "../../../interfaces/role";
import { getCompanyNames, getRoles } from "../../../services/commonService";
import { UpdateUserData, UserData } from "../../../interfaces/user";
import { addUser, getUser, updateUser } from "../../../services/usersService";
import { CompanyNameOption } from "../../register/useFunctions";

const useFunctions = () => {
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyNameOption | null>();
  const [companyNames, setCompanyNames] = useState<CompanyNameOption[]>([]);
  const location = useLocation();
  const mode = location.pathname.includes("new") ? "new" : "edit";
  const isNewMode = mode === "new";
  const { userId } = useParams<{
    userId: string;
  }>();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [userData, setUserData] = useState<UserData | UpdateUserData>(() => {
    if (isNewMode) {
      return {
        username: "",
        password: "",
        fullname: "",
        roleId: "",
        trainedCompanyId: null,
      };
    }
    return {
      username: "",
      fullname: "",
      roleId: "",
      trainedCompanyId: null,
    };
  });
  const [passwordType, setPasswordType] = useState("password");

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionClick = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedCompany) {
      userData.trainedCompanyId = selectedCompany?.value;
    }
    if (isNewMode) {
      await addUser(userData as UserData);
    } else {
      if (!userId) return;
      await updateUser(userId, userData as UpdateUserData);
    }
    navigate("/admin/users");
  };

  const handleCancelClick = () => {
    navigate("/admin/users");
  };

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetRoles = async () => {
      const response = await getRoles({
        signal: abortController.signal,
      });
      setRoles(response.data.items);
      setUserData((prev) => ({
        ...prev,
        roleId: response.data.items[0].id,
      }));
    };

    handleGetRoles();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (isNewMode) return;

    const abortController = new AbortController();

    const handleGetUser = async () => {
      if (!userId) return;

      const response = await getUser(userId, {
        signal: abortController.signal,
      });
      const { username, fullname, role, trainedCompany } = response.data.item;
      setUserData({
        username,
        fullname,
        roleId: role.id,
      });
      setSelectedCompany({
        value: trainedCompany.id,
        label: trainedCompany.name,
      });
    };

    handleGetUser();

    return () => abortController.abort();
  }, [isNewMode, userId]);

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
    const entryYear = parseInt(userData.username.slice(2, 4));
    const currentYear = parseInt(
      (new Date().getFullYear() + 543).toString().slice(2, 4)
    );
    const totalYear = Math.abs(entryYear - currentYear);

    return totalYear >= 4;
  }, [userData.username]);

  useEffect(() => {
    if (userData.username.length < 14) return;
    const EXPERIENCED_ROLE_ID = 1;
    const INEXPERIENCED_ROLE_ID = 3;
    setUserData((prev) => ({
      ...prev,
      roleId: !isTrained ? INEXPERIENCED_ROLE_ID : EXPERIENCED_ROLE_ID,
    }));
  }, [userData.username, isTrained]);

  const isPasswordMoreThan8Characters =
    (userData as UserData)?.password?.length >= 8;
  const isPasswordHas1UpperCase = /[A-Z]/.test(
    (userData as UserData)?.password
  );
  const isPasswordHas1Number = /\d/.test((userData as UserData)?.password);
  const isPasswordHas1SpecialCharacter =
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      (userData as UserData)?.password
    );

  const handleUsernameBlur = () => {
    console.log(isTrained);
    if (!isTrained) {
      setSelectedCompany(null);
    }
  };

  return {
    userData,
    roles,
    handleChange,
    handleActionClick,
    isNewMode,
    handleCancelClick,
    selectedCompany,
    companyNames,
    setSelectedCompany,
    isTrained,
    isPasswordMoreThan8Characters,
    isPasswordHas1UpperCase,
    isPasswordHas1Number,
    isPasswordHas1SpecialCharacter,
    passwordType,
    switchPasswordType,
    handleUsernameBlur,
  };
};

export default useFunctions;
