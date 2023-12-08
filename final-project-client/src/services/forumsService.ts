import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import { SearchForumsResponse } from "../interfaces/forum";

export const searchForums = async (config: AxiosRequestConfig) => {
  const url = "/forums";
  const response = await axiosInstance.get<SearchForumsResponse>(url, config);
  return response;
};
