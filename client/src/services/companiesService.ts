import { AxiosRequestConfig } from "axios";

import {
  CompanyData,
  GetCompanyResponse,
  SearchCompaniesResponse,
  GetTopPopularCompaniesResponse,
} from "../interfaces/company";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchCompanies = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<SearchCompaniesResponse>(
    RESOURCES.COMPANIES,
    config,
  );
};

export const getCompany = async (
  companyId: string,
  config: AxiosRequestConfig,
) => {
  return await axiosInstance.get<GetCompanyResponse>(
    `${RESOURCES.COMPANIES}/${companyId}`,
    config,
  );
};

export const getTopPopularCompanies = async (config: AxiosRequestConfig) => {
  return await axiosInstance.get<GetTopPopularCompaniesResponse>(
    `${RESOURCES.COMPANIES}/top-popular`,
    config,
  );
};

export const addCompany = async (companyData: CompanyData) => {
  return await axiosInstance.post(RESOURCES.COMPANIES, companyData);
};

export const deleteCompany = async (companyId: number) => {
  return await axiosInstance.delete(`${RESOURCES.COMPANIES}/${companyId}`);
};

export const updateCompany = async (
  companyId: string,
  companyData: CompanyData,
) => {
  return await axiosInstance.patch(
    `${RESOURCES.COMPANIES}/${companyId}`,
    companyData,
  );
};
