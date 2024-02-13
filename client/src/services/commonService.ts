import { AxiosRequestConfig } from "axios";

import { get } from "./baseService";
import { RESOURCES } from "../constants/api";
import { GetRolesResponse } from "../interfaces/role";
import { GetProvincesResponse } from "../interfaces/province";

export const getRoles = async (config: AxiosRequestConfig) => {
  return await get<GetRolesResponse>(`${RESOURCES.COMMON}/roles`, config);
};

export const getProvinces = async (config: AxiosRequestConfig) => {
  return await get<GetProvincesResponse>(
    `${RESOURCES.COMMON}/provinces`,
    config
  );
};
