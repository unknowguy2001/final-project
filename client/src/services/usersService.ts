import { AxiosRequestConfig } from "axios";

import {
  GetUserResponse,
  SearchUsersResponse,
  UpdateUserData,
  UserData,
} from "../interfaces/user";
import { RESOURCES } from "../constants/api";
import { create, get, remove, update } from "./baseService";

export const searchUsers = async (config: AxiosRequestConfig) => {
  return await get<SearchUsersResponse>(RESOURCES.USERS, config);
};

export const addUser = async (userData: UserData) => {
  return await create<UserData>(RESOURCES.USERS, userData);
};

export const deleteUser = async (userId: number) => {
  return await remove(RESOURCES.USERS, userId);
};

export const getUser = async (userId: string, config: AxiosRequestConfig) => {
  return await get<GetUserResponse>(`${RESOURCES.USERS}/${userId}`, config);
};

export const updateUser = async (
  userId: string,
  updateUserData: UpdateUserData
) => {
  return await update(RESOURCES.USERS, userId, updateUserData);
};
