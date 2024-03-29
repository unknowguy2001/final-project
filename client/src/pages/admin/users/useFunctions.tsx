import { useSearchParams } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { User } from "../../../interfaces/user";
import { deleteUser, searchUsers } from "../../../services/usersService";

const useFunctions = () => {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    handleSearchUsers();
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

  useEffect(() => {
    if (count === 0) return;
    const page = parseInt(searchParams.get("page")!) || 1;
    const perPage = parseInt(searchParams.get("perPage")!) || 12;
    if (page < 1 || page > Math.ceil(count / perPage)) {
      setSearchParams({ page: "1" });
    }
  }, [count, searchParams, setSearchParams]);

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

export default useFunctions;
