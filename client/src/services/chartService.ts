import { AxiosRequestConfig } from "axios";

import { get } from "./baseService";
import { RESOURCES } from "../constants/api";

export const getHashtags = async (config: AxiosRequestConfig) => {
  return await get(`${RESOURCES.CHART}/hashtags`, config);
};

export const getRoles = async (config: AxiosRequestConfig) => {
  return await get(`${RESOURCES.CHART}/roles`, config);
};
