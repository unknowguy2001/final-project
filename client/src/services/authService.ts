import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";
import {
  AuthInfo,
  LoginData,
  AuthResponse,
  RegisterData,
  Tokens,
  ChangePasswordData,
} from "../interfaces/auth";

export const login = async (data: LoginData) => {
  const url = `${RESOURCES.AUTH}/login`;
  const response = await axiosInstance.post<AuthResponse>(url, data);
  return response;
};

export const register = async (data: RegisterData) => {
  const url = `${RESOURCES.AUTH}/register`;
  const response = await axiosInstance.post<AuthResponse>(url, data);
  return response;
};

export const refresh = async () => {
  const url = `${RESOURCES.AUTH}/refresh`;
  const response = await axiosInstance.post<{ tokens: Tokens }>(url, {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  return response;
};

export const getAuthInfo = async (config: AxiosRequestConfig) => {
  const url = `${RESOURCES.AUTH}/info`;
  const response = await axiosInstance.get<AuthInfo>(url, config);
  return response;
};

export const changePassword = async (data: ChangePasswordData) => {
  const url = `${RESOURCES.AUTH}/change-password`;
  const response = await axiosInstance.post(url, data);
  return response;
};
