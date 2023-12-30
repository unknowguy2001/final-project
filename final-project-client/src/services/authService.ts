import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";
import { AuthInfo, LoginData, LoginResponse, Tokens } from "../interfaces/auth";

export const login = async (data: LoginData) => {
  const url = `${RESOURCES.AUTH}/login`;
  const response = await axiosInstance.post<LoginResponse>(url, data);
  return response;
};

export const logout = async () => {
  const url = `${RESOURCES.AUTH}/logout`;
  const response = await axiosInstance.post(url);
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
