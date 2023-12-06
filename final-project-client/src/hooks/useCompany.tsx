import { useCallback, useEffect, useState } from "react";

import axiosInstance from "../axiosInstance";
import { Company } from "./usePopularCompanies";

const useCompany = (id: string) => {
  const [canReview, setCanReview] = useState(false);
  const [company, setCompany] = useState<Company>();

  const fetchCompany = useCallback(
    async (signal?: AbortSignal) => {
      const response = await axiosInstance.get(`/companies/${id}`, {
        signal,
      });
      setCompany(response.data.item);
      setCanReview(response.data.canReview);
    },
    [id]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchCompany(abortController.signal);
    return () => abortController.abort();
  }, [id, fetchCompany]);

  return {
    company,
    canReview,
    fetchCompany,
  };
};
export default useCompany;
