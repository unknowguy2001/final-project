import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";
import { GetRolesResponse } from "../interfaces/role";

export const getRoles = async (config: AxiosRequestConfig) => {
  const url = `${RESOURCES.COMMON}/roles`;
  const response = await axiosInstance.get<GetRolesResponse>(url, config);
  return response;
};
