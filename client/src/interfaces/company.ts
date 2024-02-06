import { ReviewItem } from "./review";

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
  reviews: ReviewItem[];
  averageRating: number;
  ratingSummary: RatingSummary;
  hashtagSummary: HashtagSummaryItem[];
  reviewCount?: number;
}

export interface RatingSummary {
  oneStar: Star;
  twoStar: Star;
  threeStar: Star;
  fourStar: Star;
  fiveStar: Star;
}

export interface Star {
  count: number;
  percentage: number;
}

export interface HashtagSummaryItem {
  id: number;
  name: string;
  count: number;
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
