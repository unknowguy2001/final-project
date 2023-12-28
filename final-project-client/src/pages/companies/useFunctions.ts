import { useSearchParams } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Company, SearchCompaniesResponse } from "../../interfaces/company";
import { get } from "../../services/baseService";

export const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchParams] = useSearchParams();

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchInputRef.current?.value || "");
  };

  useEffect(() => {
    const abortController = new AbortController();

    const handleSearchCompanies = async () => {
      try {
        setIsLoading(true);
        const page = searchParams.get("page")!;
        const perPage = searchParams.get("perPage")!;
        const response = await get<SearchCompaniesResponse>("companies", {
          signal: abortController.signal,
          params: {
            searchQuery,
            page,
            perPage,
          },
        });
        setCompanies(response.data.items);
        setCount(response.data.count);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchCompanies();

    return () => abortController.abort();
  }, [searchQuery, searchParams]);

  return {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
  };
};
