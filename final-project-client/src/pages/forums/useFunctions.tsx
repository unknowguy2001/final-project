import { useSearchParams } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Forum } from "../../interfaces/forum";
import { searchForums } from "../../services/forumsService";

export const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [forums, setForums] = useState<Forum[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
      const response = await searchForums({
        signal: abortController.signal,
        params: { searchQuery, page, perPage },
      });
      setForums(response.data.items);
      setCount(response.data.count);
    };

    handleSearchForums();

    return () => abortController.abort();
  }, [searchQuery, searchParams, setSearchParams]);

  return {
    forums,
    handleSubmit,
    searchInputRef,
    clearSearch,
    count,
  };
};
