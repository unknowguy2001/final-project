import { AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance } from "../axiosInstance";

export const get = async <T>(
  resource: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const url = resource;
  return await axiosInstance.get(url, config);
};

export const create = async <T, K = undefined>(
  resource: string,
  data: T
): Promise<AxiosResponse<K>> => {
  const url = resource;
  return await axiosInstance.post(url, data);
};

export const update = async <T>(
  resource: string,
  resourceId: string,
  data: T
) => {
  const url = `${resource}/${resourceId}`;
  return await axiosInstance.patch(url, data);
};

export const remove = async (resource: string, resourceId: number) => {
  const url = `${resource}/${resourceId}`;
  return await axiosInstance.delete(url);
};
