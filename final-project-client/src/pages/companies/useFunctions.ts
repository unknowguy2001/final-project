import { useSearchParams } from "react-router-dom";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { Company } from "../../interfaces/company";
import { searchCompanies } from "../../services/companiesService";

export const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
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
        const response = await searchCompanies({
          signal: abortController.signal,
          params: {
            searchQuery,
            page,
          },
        });
        setCompanies(response.data.items);
        setCount(response.data.count);
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
    handleSubmit,
    clearSearch,
  };
};
