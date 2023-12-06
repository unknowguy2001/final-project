import { axiosInstance } from "../axiosInstance";
import { Company } from "../interfaces/company";

interface SearchCompaniesParams {
  signal: AbortSignal;
  searchQuery: string;
  page: string;
}

interface SearchCompaniesResponse {
  items: Company[];
  count: number;
}

export const searchCompanies = async ({
  signal,
  searchQuery,
  page,
}: SearchCompaniesParams): Promise<SearchCompaniesResponse> => {
  const response = await axiosInstance.get("/companies", {
    signal,
    params: {
      searchQuery,
      page,
    },
  });
  return response.data;
};
