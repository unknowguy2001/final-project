import { useSearchParams } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { Company } from "../../../interfaces/company";
import {
  deleteCompany,
  searchCompanies,
} from "../../../services/companiesService";

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

  const handleDeleteCompanyClick = async (companyId: number) => {
    await deleteCompany(companyId);
    await handleSearchCompanies();
  };

  const handleSearchCompanies = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setIsLoading(true);
        const page = searchParams.get("page")!;
        const perPage = searchParams.get("perPage")!;
        const response = await searchCompanies({
          signal,
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
    },
    [searchParams, searchQuery]
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleSearchCompanies(abortController.signal);

    return () => abortController.abort();
  }, [searchQuery, searchParams, handleSearchCompanies]);

  return {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
    handleDeleteCompanyClick,
  };
};
