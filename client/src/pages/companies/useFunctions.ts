import { useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Company, SearchCompaniesResponse } from "../../interfaces/company";
import { get } from "../../services/baseService";

export const useFunctions = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");

  const isDisplayMode = (_displayMode: "grid" | "list") => {
    return displayMode === _displayMode;
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
    setSearchParams({});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchInputRef.current?.value || "");
    setSearchParams({ q: searchInputRef.current?.value || "" });
  };

  const handleCompanyRowClick = (id: number) => {
    navigate(`/companies/${id}`);
  };

  useEffect(() => {
    const searchQuery = searchParams.get("q") || "";
    setSearchQuery(searchQuery);
    if (searchInputRef.current) {
      searchInputRef.current.value = searchQuery;
    }
  }, [searchParams]);

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

  useEffect(() => {
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
    isDisplayMode,
    setDisplayMode,
    handleCompanyRowClick,
  };
};
