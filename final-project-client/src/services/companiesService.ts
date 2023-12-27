import { AxiosRequestConfig } from "axios";

import {
  CompanyData,
  GetCompanyResponse,
  SearchCompaniesResponse,
} from "../interfaces/company";
import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";

export const searchCompanies = async (config: AxiosRequestConfig) => {
  const url = RESOURCES.COMPANIES;
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
  const url = `${RESOURCES.COMPANIES}/${companyId}`;
  const response = await axiosInstance.get<GetCompanyResponse>(url, config);
  return response;
};

export const getTop4PopularCompanies = async (config: AxiosRequestConfig) => {
  const url = `${RESOURCES.COMPANIES}/top-4-popular`;
  const response = await axiosInstance.get(url, config);
  return response;
};

export const addCompany = async (companyData: CompanyData) => {
  const url = RESOURCES.COMPANIES;
  const response = await axiosInstance.post(url, companyData);
  return response;
};

export const deleteCompany = async (companyId: number) => {
  const url = `${RESOURCES.COMPANIES}/${companyId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const updateCompany = async (
  companyId: string,
  companyData: CompanyData
) => {
  const url = `${RESOURCES.COMPANIES}/${companyId}`;
  const response = await axiosInstance.patch(url, companyData);
  return response;
};
