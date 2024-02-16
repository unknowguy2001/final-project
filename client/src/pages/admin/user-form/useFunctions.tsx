import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Role } from "../../../interfaces/role";
import { getRoles } from "../../../services/commonService";
import { UpdateUserData, UserData } from "../../../interfaces/user";
import { addUser, getUser, updateUser } from "../../../services/usersService";

const useFunctions = () => {
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
      };
    }
    return {
      username: "",
      fullname: "",
      roleId: "",
    };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionClick = async () => {
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
      const { username, fullname, role } = response.data.item;
      setUserData({
        username,
        fullname,
        roleId: role.id,
      });
    };

    handleGetUser();

    return () => abortController.abort();
  }, [isNewMode, userId]);

  return {
    userData,
    roles,
    handleChange,
    handleActionClick,
    isNewMode,
    handleCancelClick,
  };
};

export default useFunctions;
