import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import { GetRolesResponse } from "../interfaces/role";

export const getRoles = async (config: AxiosRequestConfig) => {
  const url = "/common/roles";
  const response = await axiosInstance.get<GetRolesResponse>(url, config);
  return response;
};
