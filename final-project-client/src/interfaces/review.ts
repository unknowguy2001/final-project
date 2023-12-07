export interface Review {
  id: number;
  companyId: number;
  reviewer: string;
  reviewerUsername: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewData {
  rating: number;
  description: string;
}
