import { AxiosRequestConfig } from "axios";

import {
  GetUserResponse,
  SearchUsersResponse,
  UpdateUserData,
  UserData,
} from "../interfaces/user";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchUsers = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<SearchUsersResponse>(RESOURCES.USERS, config);
};

export const addUser = async (userData: UserData) => {
  return await axiosInstance.post<UserData>(RESOURCES.USERS, userData);
};

export const deleteUser = async (userId: number) => {
  return await axiosInstance.delete(`${RESOURCES.USERS}/${userId}`);
};

export const getUser = async (userId: string, config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetUserResponse>(
    `${RESOURCES.USERS}/${userId}`,
    config,
  );
};

export const updateUser = async (
  userId: string,
  updateUserData: UpdateUserData,
) => {
  return await axiosInstance.patch(
    `${RESOURCES.USERS}/${userId}`,
    updateUserData,
  );
};
