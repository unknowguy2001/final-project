import { Hashtag } from "./hashtag";

interface Review {
  id: number;
  companyId: number;
  reviewer: string;
  reviewerUsername: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewItem extends Review {
  hashtags: Hashtag[];
}

export interface ReviewData {
  rating: number;
  description: string;
  hashtags: number[];
}

export interface ReviewInfo extends Review {
  hashtags: number[];
}

export interface GetReviewResponse {
  item: ReviewInfo;
}
