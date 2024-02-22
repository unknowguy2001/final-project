import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { Company } from "../../interfaces/company";
import { ReviewData } from "../../interfaces/review";
import { Hashtag } from "../../interfaces/hashtag";

import { getHashtags } from "../../services/commonService";
import { getCompany } from "../../services/companiesService";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../../services/reviewsService";

const useFunctions = () => {
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
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [isReviewDeleting, setIsReviewDeleting] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  const averageRating = company?.averageRating || 0;
  const formattedAverageRating = averageRating.toFixed(1);

  const generateGoogleMapsUrl = (company: Company | undefined): string => {
    if (!company) return "";

    const { address, road, village, district, province, zipcode, name } =
      company;

    const addressComponents = [
      address,
      road,
      village,
      district,
      province,
      zipcode,
    ]
      .filter((value) => value)
      .map((value) => encodeURIComponent(value.trim()));

    const formattedAddress = `${addressComponents.join("+")}|${encodeURIComponent(name.trim())}`;

    return `https://www.google.com/maps/search/${formattedAddress}`;
  };

  const isRatingFilterSelected = (rating: number) => {
    return selectedRatingFilter === rating;
  };

  const handleRatingFilterClick = async (rating: number) => {
    setSelectedRatingFilter((prev) => (prev === rating ? null : rating));
  };

  const filteredReviews = useMemo(() => {
    if (selectedRatingFilter) {
      return (
        company?.reviews.filter(
          (review) => review.rating === selectedRatingFilter
        ) || []
      );
    }
    return company?.reviews || [];
  }, [company?.reviews, selectedRatingFilter]);

  const handleReviewClick = async () => {
    if (!descriptionRef.current) return;

    const reviewData: ReviewData = {
      rating,
      description: descriptionRef.current.value,
      hashtags: selectedHashtags,
    };

    if (!companyId) return;

    try {
      setIsReviewSubmitting(true);

      if (!edittingReviewId) {
        await createReview(companyId, reviewData);
      } else {
        await updateReview(companyId, edittingReviewId, reviewData);
      }

      onClose();
      setRating(0);
      await handleGetCompany();
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  const handleDeleteReviewClick = async (reviewId: number) => {
    if (!companyId) return;

    setIsReviewDeleting(true);
    await deleteReview(companyId, reviewId);
    await handleGetCompany();
    setIsReviewDeleting(false);
  };

  const handleEditReviewClick = async (reviewId: number) => {
    onOpen();

    if (!companyId) return;

    setIsReviewLoading(true);
    setEdittingReviewId(reviewId);
    const response = await getReview(companyId, reviewId);
    const review = response.data.item;
    setRating(review.rating);

    if (descriptionRef.current) {
      descriptionRef.current.value = review.review;
    }

    setSelectedHashtags(review.hashtags);
    setIsReviewLoading(false);
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

  const handleGetHashtags = useCallback(async (signal: AbortSignal) => {
    const response = await getHashtags({ signal });
    setHashtags(response.data.items);
  }, []);

  const handleGetCompany = useCallback(
    async (signal?: AbortSignal) => {
      if (!companyId) return;

      setIsLoading(true);

      const response = await getCompany(parseInt(companyId), { signal });
      setCompany(response.data.item);
      setCanReview(response.data.canReview);

      setIsLoading(false);
    },
    [companyId]
  );

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

  const isEditting = edittingReviewId !== null;

  return {
    company,
    canReview,
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
    handleRatingFilterClick,
    filteredReviews,
    isRatingFilterSelected,
    generateGoogleMapsUrl,
    isLoading,
    isReviewSubmitting,
    isReviewDeleting,
    isReviewLoading,
    isEditting,
  };
};

export default useFunctions;
