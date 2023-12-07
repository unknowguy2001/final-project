import { AxiosRequestConfig } from "axios";

import { Company } from "../interfaces/company";
import { axiosInstance } from "../axiosInstance";

interface SearchCompaniesResponse {
  items: Company[];
  count: number;
}

export const searchCompanies = async (config: AxiosRequestConfig) => {
  const url = "/companies";
  const response = await axiosInstance.get<SearchCompaniesResponse>(
    url,
    config
  );
  return response;
};
