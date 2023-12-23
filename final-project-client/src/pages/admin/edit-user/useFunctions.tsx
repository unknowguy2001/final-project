import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Role } from "../../../interfaces/role";
import { UpdateUserData } from "../../../interfaces/user";
import { getRoles } from "../../../services/commonService";
import { getUser, updateUser } from "../../../services/usersService";

export const useFunctions = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{
    userId: string;
  }>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [userData, setUserData] = useState<UpdateUserData>({
    username: "",
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

  const handleSaveUserClick = async () => {
    if (!userId) return;
    await updateUser(userId, userData);
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

  const handleGetUser = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) return;
      const response = await getUser(userId, {
        signal,
      });
      const { username, fullname, role } = response.data.item;
      setUserData({
        username,
        fullname,
        roleId: role.id,
      });
    },
    [userId]
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleGetUser(abortController.signal);

    return () => abortController.abort();
  }, [userId, handleGetUser]);

  return {
    userData,
    roles,
    handleChange,
    handleSaveUserClick,
  };
};
