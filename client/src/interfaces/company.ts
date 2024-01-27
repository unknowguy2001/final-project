import { Review } from "./review";

export interface Company {
  id: number;
  name: string;
  address: string;
  road: string;
  village: string;
  district: string;
  province: string;
  zipcode: string;
  telephone: string;
  reviews: Review[];
  averageRating: number;
}

export interface CompanyData {
  name: string;
  address: string;
  road: string;
  village: string;
  district: string;
  province: string;
  zipcode: string;
  telephone: string;
}

export interface GetCompanyResponse {
  item: Company;
  canReview: boolean;
}

export interface SearchCompaniesResponse {
  items: Company[];
  count: number;
}

export interface GetTop4PopularCompaniesResponse {
  items: Company[];
}
