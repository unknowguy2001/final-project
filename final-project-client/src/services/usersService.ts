import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import {
  GetUserResponse,
  SearchUsersResponse,
  UpdateUserData,
  UserData,
} from "../interfaces/user";

export const searchUsers = async (config: AxiosRequestConfig) => {
  const url = "/users";
  const response = await axiosInstance.get<SearchUsersResponse>(url, config);
  return response;
};

export const addUser = async (userData: UserData) => {
  const url = "/users";
  const response = await axiosInstance.post<UserData>(url, userData);
  return response;
};

export const deleteUser = async (userId: number) => {
  const url = `/users/${userId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const getUser = async (userId: string, config: AxiosRequestConfig) => {
  const url = `/users/${userId}`;
  const response = await axiosInstance.get<GetUserResponse>(url, config);
  return response;
};

export const updateUser = async (
  userId: string,
  updateUserData: UpdateUserData
) => {
  const url = `/users/${userId}`;
  const response = await axiosInstance.patch(url, updateUserData);
  return response;
};
