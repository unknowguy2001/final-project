import { RESOURCES } from "../constants/api";
import { axiosInstance } from "../axiosInstance";
import { ReviewData } from "../interfaces/review";

export const createReview = async (
  companyId: string,
  reviewData: ReviewData
) => {
  const url = `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}`;
  const response = await axiosInstance.post(url, reviewData);
  return response;
};

export const updateReview = async (
  companyId: string,
  edittingReviewId: string,
  reviewData: ReviewData
) => {
  const response = await axiosInstance.patch(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}/${edittingReviewId}`,
    reviewData
  );
  return response;
};

export const deleteReview = async (companyId: string, reviewId: string) => {
  const url = `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}/${reviewId}`;
  const response = await axiosInstance.delete(url);
  return response;
};

export const getReview = async (companyId: string, reviewId: string) => {
  const response = await axiosInstance.get(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}/${reviewId}`
  );
  return response;
};
