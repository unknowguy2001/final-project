import { AxiosRequestConfig } from "axios";

import {
  GetUserResponse,
  SearchUsersResponse,
  UpdateUserData,
  UserData,
} from "../interfaces/user";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";

export const searchUsers = async (config: AxiosRequestConfig) => {
  const url = RESOURCES.USERS;
  const response = await axiosInstance.get<SearchUsersResponse>(url, config);
  return response;
};

export const addUser = async (userData: UserData) => {
  const url = RESOURCES.USERS;
  const response = await axiosInstance.post<UserData>(url, userData);
  return response;
};

export const deleteUser = async (userId: number) => {
  const url = `${RESOURCES.USERS}/${userId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const getUser = async (userId: string, config: AxiosRequestConfig) => {
  const url = `${RESOURCES.USERS}/${userId}`;
  const response = await axiosInstance.get<GetUserResponse>(url, config);
  return response;
};

export const updateUser = async (
  userId: string,
  updateUserData: UpdateUserData
) => {
  const url = `${RESOURCES.USERS}/${userId}`;
  const response = await axiosInstance.patch(url, updateUserData);
  return response;
};
