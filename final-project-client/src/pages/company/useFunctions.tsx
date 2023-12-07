import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Company } from "../../interfaces/company";
import { axiosInstance } from "../../axiosInstance";
import { useAuth } from "../../contexts/authContext";

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
    if (!edittingReviewId) {
      await axiosInstance.post(`/companies/${companyId}/reviews`, {
        rating,
        description: descriptionRef.current!.value,
      });
    } else {
      await axiosInstance.patch(
        `/companies/${companyId}/reviews/${edittingReviewId}`,
        {
          rating,
          description: descriptionRef.current!.value,
        }
      );
    }
    onClose();
    setRating(0);
    await fetchCompany();
  };

  const handleDeleteReviewClick = async (reviewId: number) => {
    await axiosInstance.delete(`/companies/${companyId}/reviews/${reviewId}`);
    await fetchCompany();
  };

  const handleEditReviewClick = async (reviewId: number) => {
    onOpen();
    const response = await axiosInstance.get(
      `/companies/${companyId}/reviews/${reviewId}`
    );
    const review = response.data.item;
    setRating(review.rating);
    descriptionRef.current!.value = review.review;
    setEdittingReviewId(reviewId);
  };

  const fetchCompany = useCallback(
    async (signal?: AbortSignal) => {
      const response = await axiosInstance.get(`/companies/${companyId}`, {
        signal,
      });
      setCompany(response.data.item);
      setCanReview(response.data.canReview);
    },
    [companyId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchCompany(abortController.signal);
    return () => abortController.abort();
  }, [companyId, fetchCompany]);

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
