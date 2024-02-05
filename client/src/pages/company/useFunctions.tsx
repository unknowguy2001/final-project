import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { Company, GetCompanyResponse } from "../../interfaces/company";
import { GetReviewResponse, ReviewData } from "../../interfaces/review";
import { create, get, remove, update } from "../../services/baseService";
import { GetHashtagsResponse, Hashtag } from "../../interfaces/hashtag";

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
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<number[]>([]);

  const averageRating = company?.averageRating || 0;
  const formattedAverageRating = averageRating.toFixed(1);

  const handleReviewClick = async () => {
    if (!descriptionRef.current) return;

    const reviewData: ReviewData = {
      rating,
      description: descriptionRef.current.value,
      hashtags: selectedHashtags,
    };

    if (!companyId) return;

    if (!edittingReviewId) {
      await create<ReviewData>(`companies/${companyId}/reviews`, reviewData);
    } else {
      await update<ReviewData>(
        `companies/${companyId}/reviews`,
        edittingReviewId.toString(),
        reviewData
      );
    }

    onClose();
    setRating(0);
    await handleGetCompany();
  };

  const handleDeleteReviewClick = async (reviewId: number) => {
    if (!companyId) return;

    await remove(`companies/${companyId}/reviews`, reviewId);
    await handleGetCompany();
  };

  const handleEditReviewClick = async (reviewId: number) => {
    onOpen();

    if (!companyId) return;

    const response = await get<GetReviewResponse>(
      `companies/${companyId}/reviews/${reviewId}`
    );

    const review = response.data.item;
    setRating(review.rating);

    if (!descriptionRef.current) return;
    descriptionRef.current.value = review.review;

    setEdittingReviewId(reviewId);
    setSelectedHashtags(review.hashtags);
  };

  const handleHashtagClick = (hashtagId: number) => {
    if (selectedHashtags.includes(hashtagId)) {
      setSelectedHashtags((prev) => prev.filter((id) => id !== hashtagId));
    } else {
      setSelectedHashtags((prev) => [...prev, hashtagId]);
    }
  };

  const isSelectedHashtag = (hashtagId: number) => {
    return selectedHashtags.includes(hashtagId);
  };

  const openReviewModal = () => {
    onOpen();
    setRating(0);
    setEdittingReviewId(null);
    setSelectedHashtags([]);
  };

  const handleGetCompany = useCallback(
    async (signal?: AbortSignal) => {
      if (!companyId) return;

      const response = await get<GetCompanyResponse>(`companies/${companyId}`, {
        signal,
      });
      setCompany(response.data.item);
      setCanReview(response.data.canReview);
    },
    [companyId]
  );

  const handleGetHashtags = useCallback(async (signal?: AbortSignal) => {
    const response = await get<GetHashtagsResponse>("common/hashtags", {
      signal,
    });
    setHashtags(response.data.items);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    handleGetHashtags(abortController.signal);

    return () => abortController.abort();
  }, [handleGetHashtags]);

  useEffect(() => {
    const abortController = new AbortController();

    handleGetCompany(abortController.signal);

    return () => abortController.abort();
  }, [companyId, handleGetCompany]);

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
    onClose,
    handleDeleteReviewClick,
    handleEditReviewClick,
    averageRating,
    hashtags,
    isSelectedHashtag,
    handleHashtagClick,
    openReviewModal,
  };
};
