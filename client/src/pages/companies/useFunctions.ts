import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Company } from "../../interfaces/company";
import { searchCompanies } from "../../services/companiesService";

const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayMode, setDisplayMode] = useState<"grid" | "list">(
    (localStorage.getItem("displayMode") as "grid" | "list") || "grid",
  );

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
      const page = searchParams.get("page")!;
      const perPage = searchParams.get("perPage")!;
      setIsLoading(true);
      const response = await searchCompanies({
        signal: abortController.signal,
        params: {
          searchQuery,
          page,
          perPage,
        },
      });
      setCompanies(response.data.items);
      setCount(response.data.count);
      setIsLoading(false);
    };

    handleSearchCompanies();

    return () => abortController.abort();
  }, [searchQuery, searchParams]);

  useEffect(() => {
    if (count === 0) return;
    const page = parseInt(searchParams.get("page")!) || 1;
    const perPage = parseInt(searchParams.get("perPage")!) || 12;
    if (page < 1 || page > Math.ceil(count / perPage)) {
      setSearchParams({ page: "1" });
    }
  }, [count, searchParams, setSearchParams]);

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode);
  }, [displayMode]);

  return {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
    isDisplayMode,
    setDisplayMode,
  };
};

export default useFunctions;
