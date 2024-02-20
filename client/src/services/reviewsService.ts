import { RESOURCES } from "../constants/api";
import { ReviewData } from "../interfaces/review";
import { axiosInstance } from "../utils/axiosInstance";

export const createReview = (companyId: string, reviewData: ReviewData) => {
  return axiosInstance.post<ReviewData>(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}`,
    reviewData
  );
};

export const updateReview = (
  companyId: string,
  reviewId: number,
  reviewData: ReviewData
) => {
  return axiosInstance.patch(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${reviewId}`,
    reviewData
  );
};

export const deleteReview = (companyId: string, reviewId: number) => {
  return axiosInstance.delete(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${reviewId}`
  );
};

export const getReview = (companyId: string, reviewId: number) => {
  return axiosInstance.get(
    `${RESOURCES.COMPANIES}/${companyId}/${RESOURCES.REVIEWS}/${reviewId}`
  );
};
