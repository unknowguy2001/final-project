import { useSearchParams } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { User } from "../../../interfaces/user";
import { searchUsers, deleteUser } from "../../../services/usersService";

export const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User[]>([]);
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

  const handleDeleteUserClick = async (userId: number) => {
    await deleteUser(userId);
    await handleSearchUsers();
  };

  const handleSearchUsers = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setIsLoading(true);
        const page = searchParams.get("page")!;
        const perPage = searchParams.get("perPage")!;
        const response = await searchUsers({
          signal,
          params: {
            searchQuery,
            page,
            perPage,
          },
        });
        setUsers(response.data.items);
        setCount(response.data.count);
      } finally {
        setIsLoading(false);
      }
    },
    [searchParams, searchQuery]
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleSearchUsers(abortController.signal);

    return () => abortController.abort();
  }, [searchQuery, searchParams, handleSearchUsers]);

  return {
    users,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
    handleDeleteUserClick,
  };
};
