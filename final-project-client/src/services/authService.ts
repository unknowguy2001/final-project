import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import { AuthInfo, LoginData, LoginResponse } from "../interfaces/auth";

export const login = async (data: LoginData) => {
  const url = "/auth/login";
  const response = await axiosInstance.post<LoginResponse>(url, data);
  return response;
};

export const logout = async () => {
  const url = "/auth/logout";
  const response = await axiosInstance.post(url);
  return response;
};

export const refresh = async () => {
  const url = "/auth/refresh";
  const response = await axiosInstance.post<LoginResponse>(url);
  return response;
};

export const getAuthInfo = async (config: AxiosRequestConfig) => {
  const url = "/auth/info";
  const response = await axiosInstance.get<AuthInfo>(url, config);
  return response;
};
