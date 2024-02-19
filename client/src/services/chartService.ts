import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const getHashtags = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get(`${RESOURCES.CHART}/hashtags`, config);
};

export const getRoles = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get(`${RESOURCES.CHART}/roles`, config);
};
