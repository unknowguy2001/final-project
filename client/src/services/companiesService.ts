import { AxiosRequestConfig } from "axios";

import {
  CompanyData,
  GetCompanyResponse,
  SearchCompaniesResponse,
  GetTop4PopularCompaniesResponse,
} from "../interfaces/company";
import { RESOURCES } from "../constants/api";
import { create, get, remove, update } from "./baseService";

export const searchCompanies = async (config: AxiosRequestConfig) => {
  return await get<SearchCompaniesResponse>(RESOURCES.COMPANIES, config);
};

export const getCompany = async (
  companyId: string,
  config: AxiosRequestConfig
) => {
  return await get<GetCompanyResponse>(
    `${RESOURCES.COMPANIES}/${companyId}`,
    config
  );
};

export const getTop4PopularCompanies = async (config: AxiosRequestConfig) => {
  return await get<GetTop4PopularCompaniesResponse>(
    `${RESOURCES.COMPANIES}/top-4-popular`,
    config
  );
};

export const addCompany = async (companyData: CompanyData) => {
  return await create(RESOURCES.COMPANIES, companyData);
};

export const deleteCompany = async (companyId: number) => {
  return await remove(RESOURCES.COMPANIES, companyId);
};

export const updateCompany = async (
  companyId: string,
  companyData: CompanyData
) => {
  return await update(RESOURCES.COMPANIES, companyId, companyData);
};
