import { Review } from "./review";

export interface Company {
  id: number;
  name: string;
  typeId: number;
  workModelId: number;
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

export interface GetCompanyResponse {
  item: Company;
  canReview: boolean;
}
