import { AxiosRequestConfig } from "axios";

import {
  CompanyData,
  GetCompanyResponse,
  SearchCompaniesResponse,
  GetTopPopularCompaniesResponse,
} from "../interfaces/company";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../utils/axiosInstance";

export const searchCompanies = (config: AxiosRequestConfig) => {
  return axiosInstance.get<SearchCompaniesResponse>(
    RESOURCES.COMPANIES,
    config
  );
};

export const getCompany = (companyId: number, config: AxiosRequestConfig) => {
  return axiosInstance.get<GetCompanyResponse>(
    `${RESOURCES.COMPANIES}/${companyId}`,
    config
  );
};

export const getTopPopularCompanies = (config: AxiosRequestConfig) => {
  return axiosInstance.get<GetTopPopularCompaniesResponse>(
    `${RESOURCES.COMPANIES}/top-popular`,
    config
  );
};

export const addCompany = (companyData: CompanyData) => {
  return axiosInstance.post(RESOURCES.COMPANIES, companyData);
};

export const deleteCompany = (companyId: number) => {
  return axiosInstance.delete(`${RESOURCES.COMPANIES}/${companyId}`);
};

export const updateCompany = (companyId: number, companyData: CompanyData) => {
  return axiosInstance.patch(
    `${RESOURCES.COMPANIES}/${companyId}`,
    companyData
  );
};
