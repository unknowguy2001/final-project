import { RESOURCES } from "../constants/api";
import { ReviewData } from "../interfaces/review";
import { axiosInstance } from "../utils/axiosInstance";

export const createReview = async (
  companyId: string,
  reviewData: ReviewData,
) => {
  return await axiosInstance.post<ReviewData>(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}`,
    reviewData,
  );
};

export const updateReview = async (
  companyId: string,
  edittingReviewId: number,
  reviewData: ReviewData,
) => {
  return await axiosInstance.patch(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${edittingReviewId}`,
    reviewData,
  );
};

export const deleteReview = async (companyId: string, reviewId: number) => {
  return await axiosInstance.delete(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${reviewId}`,
  );
};

export const getReview = async (companyId: string, reviewId: number) => {
  return await axiosInstance.get(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${reviewId}`,
  );
};
