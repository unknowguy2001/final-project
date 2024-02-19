import { useSearchParams } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import {
  deleteCompany,
  searchCompanies,
} from "../../../services/companiesService";
import { Company } from "../../../interfaces/company";

const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

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
    [searchParams, searchQuery],
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleSearchCompanies(abortController.signal);

    return () => abortController.abort();
  }, [searchQuery, searchParams, handleSearchCompanies]);

  useEffect(() => {
    if (count === 0) return;
    const page = parseInt(searchParams.get("page")!) || 1;
    const perPage = parseInt(searchParams.get("perPage")!) || 12;
    if (page < 1 || page > Math.ceil(count / perPage)) {
      setSearchParams({ page: "1" });
    }
  }, [count, searchParams, setSearchParams]);

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

export default useFunctions;
