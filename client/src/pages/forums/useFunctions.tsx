import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Forum } from "../../interfaces/forum";
import { searchForums } from "../../services/forumsService";

const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [forums, setForums] = useState<Forum[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInputRef.current?.value || "");
  };

  useEffect(() => {
    const abortController = new AbortController();

    const handleSearchForums = async () => {
      const page = searchParams.get("page")!;
      const perPage = searchParams.get("perPage")!;
      setIsLoading(true);
      const response = await searchForums({
        signal: abortController.signal,
        params: { searchQuery, page, perPage },
      });
      setForums(response.data.items);
      setCount(response.data.count);
      setIsLoading(false);
    };

    handleSearchForums();

    return () => abortController.abort();
  }, [searchQuery, searchParams, setSearchParams]);

  useEffect(() => {
    if (count === 0) return;
    const page = parseInt(searchParams.get("page")!) || 1;
    const perPage = parseInt(searchParams.get("perPage")!) || 12;
    if (page < 1 || page > Math.ceil(count / perPage)) {
      setSearchParams({ page: "1" });
    }
  }, [count, searchParams, setSearchParams]);

  return {
    forums,
    handleSubmit,
    searchInputRef,
    clearSearch,
    count,
    isLoading,
  };
};

export default useFunctions;
