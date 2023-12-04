import { useEffect, useState } from "react";

import axiosInstance from "../axiosInstance";
import { Company } from "./usePopularCompanies";

const useCompany = (id: string) => {
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCompany = async () => {
      const response = await axiosInstance.get(`/companies/${id}`, {
        signal: abortController.signal,
      });
      setCompany(response.data.item);
    };

    fetchCompany();

    return () => abortController.abort();
  }, [id]);

  return {
    company,
  };
};
export default useCompany;
