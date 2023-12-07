import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../axiosInstance";
import { Company, GetCompanyResponse } from "../interfaces/company";

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

export const getCompany = async (
  companyId: string,
  config: AxiosRequestConfig
) => {
  const url = `/companies/${companyId}`;
  const response = await axiosInstance.get<GetCompanyResponse>(url, config);
  return response;
};

export const getTop4PopularCompanies = async (config: AxiosRequestConfig) => {
  const url = "/companies/top-4-popular";
  const response = await axiosInstance.get(url, config);
  return response;
};
