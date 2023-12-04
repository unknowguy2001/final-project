import { useEffect, useState } from "react";

import axiosInstance from "../axiosInstance";
import { Company } from "./usePopularCompanies";
import { useSearchParams } from "react-router-dom";

const useCompanies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCompanies = async () => {
      if (searchTerm) {
        setSearchParams((params) => {
          params.delete("page");
          return params;
        });
      }
      const response = await axiosInstance.get("/companies", {
        signal: abortController.signal,
        params: {
          search: searchTerm,
          page: searchParams.get("page"),
        },
      });
      setCompanies(response.data.items);
      setCount(response.data.count);
      setIsLoading(false);
    };

    fetchCompanies();

    return () => abortController.abort();
  }, [searchTerm, searchParams, setSearchParams]);

  return {
    companies,
    isLoading,
    setSearchTerm,
    count,
  };
};
export default useCompanies;
