import { axiosInstance } from "../axiosInstance";
import { ReviewData } from "../interfaces/review";

export const createReview = async (
  companyId: string,
  reviewData: ReviewData
) => {
  const url = `/companies/${companyId}/reviews`;
  const response = await axiosInstance.post(url, reviewData);
  return response;
};

export const updateReview = async (
  companyId: string,
  edittingReviewId: string,
  reviewData: ReviewData
) => {
  const response = await axiosInstance.patch(
    `/companies/${companyId}/reviews/${edittingReviewId}`,
    reviewData
  );
  return response;
};

export const deleteReview = async (companyId: string, reviewId: string) => {
  const url = `/companies/${companyId}/reviews/${reviewId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const getReview = async (companyId: string, reviewId: string) => {
  const response = await axiosInstance.get(
    `/companies/${companyId}/reviews/${reviewId}`
  );
  return response;
};
