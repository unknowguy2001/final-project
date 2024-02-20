import { AxiosRequestConfig } from "axios";
import {
  GetUserResponse,
  SearchUsersResponse,
  UpdateUserData,
  UserData,
} from "../interfaces/user";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchUsers = (config: AxiosRequestConfig) => {
  return axiosInstance.get<SearchUsersResponse>(RESOURCES.USERS, config);
};

export const addUser = (userData: UserData) => {
  return axiosInstance.post<UserData>(RESOURCES.USERS, userData);
};

export const deleteUser = (userId: number) => {
  return axiosInstance.delete(`${RESOURCES.USERS}/${userId}`);
};

export const getUser = (userId: string, config: AxiosRequestConfig) => {
  return axiosInstance.get<GetUserResponse>(
    `${RESOURCES.USERS}/${userId}`,
    config
  );
};

export const updateUser = (userId: string, updateUserData: UpdateUserData) => {
  return axiosInstance.patch(`${RESOURCES.USERS}/${userId}`, updateUserData);
};
