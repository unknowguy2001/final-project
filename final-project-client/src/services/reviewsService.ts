import { RESOURCES } from "../constants/api";
import { ReviewData } from "../interfaces/review";
import { create, get, remove, update } from "./baseService";

export const createReview = async (
  companyId: string,
  reviewData: ReviewData
) => {
  return await create<ReviewData>(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}`,
    reviewData
  );
};

export const updateReview = async (
  companyId: string,
  edittingReviewId: string,
  reviewData: ReviewData
) => {
  return await update(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}`,
    edittingReviewId,
    reviewData
  );
};

export const deleteReview = async (companyId: string, reviewId: string) => {
  return await remove(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}`,
    reviewId
  );
};

export const getReview = async (companyId: string, reviewId: string) => {
  return await get(
    `${RESOURCES.COMPANIES}/${companyId}${RESOURCES.REVIEWS}/${reviewId}`
  );
};
