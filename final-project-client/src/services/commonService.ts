import { AxiosRequestConfig } from "axios";

import { get } from "./baseService";
import { RESOURCES } from "../constants/api";
import { GetRolesResponse } from "../interfaces/role";

export const getRoles = async (config: AxiosRequestConfig) => {
  return await get<GetRolesResponse>(`${RESOURCES.COMMON}/roles`, config);
};
