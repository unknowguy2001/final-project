import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../../services/reviewsService";
import { Company } from "../../interfaces/company";
import { useAuth } from "../../contexts/authContext";
import { ReviewData } from "../../interfaces/review";
import * as companiesService from "../../services/companiesService";

export const useFunctions = () => {
  const [edittingReviewId, setEdittingReviewId] = useState<number | null>(null);
  const { authInfo } = useAuth();
  const { companyId } = useParams<{
    companyId: string;
  }>();
  const [canReview, setCanReview] = useState(false);
  const [company, setCompany] = useState<Company>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const averageRating = company?.averageRating || 0;
  const formattedAverageRating = averageRating.toFixed(1);

  const handleClose = () => {
    onClose();
    setRating(0);
    setEdittingReviewId(null);
  };

  const handleReviewClick = async () => {
    if (!descriptionRef.current) return;

    const reviewData: ReviewData = {
      rating,
      description: descriptionRef.current.value,
    };

    if (!companyId) return;

    if (!edittingReviewId) {
      await createReview(companyId, reviewData);
    } else {
      await updateReview(companyId, edittingReviewId.toString(), reviewData);
    }

    onClose();
    setRating(0);
    await getCompany();
  };

  const handleDeleteReviewClick = async (reviewId: number) => {
    if (!companyId) return;

    await deleteReview(companyId, reviewId.toString());
    await getCompany();
  };

  const handleEditReviewClick = async (reviewId: number) => {
    onOpen();

    if (!companyId) return;

    const response = await getReview(companyId, reviewId.toString());
    const review = response.data.item;
    setRating(review.rating);

    if (!descriptionRef.current) return;

    descriptionRef.current.value = review.review;
    setEdittingReviewId(reviewId);
  };

  const getCompany = useCallback(
    async (signal?: AbortSignal) => {
      if (!companyId) return;

      const response = await companiesService.getCompany(companyId, {
        signal,
      });
      setCompany(response.data.item);
      setCanReview(response.data.canReview);
    },
    [companyId]
  );

  useEffect(() => {
    const abortController = new AbortController();

    getCompany(abortController.signal);

    return () => abortController.abort();
  }, [companyId, getCompany]);

  return {
    company,
    canReview,
    onOpen,
    isOpen,
    rating,
    setRating,
    descriptionRef,
    handleReviewClick,
    formattedAverageRating,
    authInfo,
    handleClose,
    handleDeleteReviewClick,
    handleEditReviewClick,
    averageRating,
  };
};
