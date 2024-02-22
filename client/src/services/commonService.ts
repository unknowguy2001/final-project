import { AxiosRequestConfig } from "axios";

import { RESOURCES } from "../constants/api";
import { GetRolesResponse } from "../interfaces/role";
import { axiosInstance } from "../utils/axiosInstance";
import { GetHashtagsResponse } from "../interfaces/hashtag";
import { GetProvincesResponse } from "../interfaces/province";

export const getRoles = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetRolesResponse>(
    `${RESOURCES.COMMON}/roles`,
    config
  );
};

export const getProvinces = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetProvincesResponse>(
    `${RESOURCES.COMMON}/provinces`,
    config
  );
};

export const getGoogleFormUrl = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<{ url: string }>(
    `${RESOURCES.COMMON}/google-form-url`,
    config
  );
};

export const getHashtags = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetHashtagsResponse>(
    `${RESOURCES.COMMON}/hashtags`,
    config
  );
};

export const getCompanyNames = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<{ items: { id: number; name: string }[] }>(
    `${RESOURCES.COMMON}/company-names`,
    config
  );
};
