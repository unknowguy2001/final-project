import { useSearchParams } from "react-router-dom";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { Company } from "../../hooks/usePopularCompanies";
import { searchCompanies } from "../../services/companiesService";

export const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current!.value = "";
    searchInputRef.current!.focus();
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearchQuery(searchInputRef.current?.value || "");
  };

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        if (searchQuery) {
          setSearchParams((params) => {
            params.delete("page");
            return params;
          });
        }
        const page = searchParams.get("page")!;
        const data = await searchCompanies({
          signal: abortController.signal,
          searchQuery,
          page,
        });
        setCompanies(data.items);
        setCount(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [searchQuery, searchParams, setSearchParams]);

  return {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleFormSubmit,
    handleClearSearch,
  };
};
