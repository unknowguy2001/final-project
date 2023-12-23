import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Role } from "../../../interfaces/role";
import { UserData } from "../../../interfaces/user";
import { addUser } from "../../../services/usersService";
import { getRoles } from "../../../services/commonService";

export const useFunctions = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    fullname: "",
    roleId: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUserClick = async () => {
    await addUser(userData);
    navigate("/admin/users");
  };

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await getRoles({
        signal: abortController.signal,
      });
      setRoles(response.data.items);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    userData,
    roles,
    handleChange,
    handleAddUserClick,
  };
};
