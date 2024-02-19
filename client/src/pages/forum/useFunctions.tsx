import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Forum } from "../../interfaces/forum";
import { Reply } from "../../interfaces/reply";
import * as repliesService from "../../services/repliesService";
import { deleteForum, getForum } from "../../services/forumsService";

const useFunctions = () => {
  const { authInfo } = useAuth();
  const navigate = useNavigate();
  const { forumId } = useParams<{ forumId: string }>();
  const [forum, setForum] = useState<Forum | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [isRepliesLoading, setIsRepliesLoading] = useState<boolean>(false);
  const [isForumLoading, setIsForumLoading] = useState<boolean>(false);
  const [isForumDeleting, setIsForumDeleting] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const searchReplies = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      if (!forumId) return;
      setIsRepliesLoading(true);
      const page = searchParams.get("page")!;
      const perPage = searchParams.get("perPage")!;
      const response = await repliesService.searchReplies(forumId, {
        ...config,
        params: { page, perPage },
      });
      setReplies(response.data.items);
      setCount(response.data.count);
      setIsRepliesLoading(false);
      setIsFirstLoad(false);
    },
    [forumId, searchParams]
  );

  const handleDeleteForumClick = async (forumId: number) => {
    if (!forumId) return;
    setIsForumDeleting(true);
    try {
      await deleteForum(forumId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsForumDeleting(false);
    }
    navigate("/forums");
  };

  const handleEditForumClick = (forumId: number) => {
    if (!forumId) return;
    navigate(`/forums/${forumId}/edit`);
  };

  useEffect(() => {
    if (!forumId) return;

    const abortGetForumController = new AbortController();
    const abortSearchRepliesController = new AbortController();

    const handleGetForum = async () => {
      setIsForumLoading(true);
      const response = await getForum(forumId, {
        signal: abortGetForumController.signal,
      });
      setIsForumLoading(false);
      setForum(response.data.item);
    };

    handleGetForum();
    searchReplies({
      signal: abortSearchRepliesController.signal,
    });

    return () => {
      abortGetForumController.abort();
      abortSearchRepliesController.abort();
    };
  }, [forumId, searchReplies]);

  return {
    authInfo,
    forum,
    replies,
    count,
    searchReplies,
    handleDeleteForumClick,
    handleEditForumClick,
    isRepliesLoading,
    isForumLoading,
    isForumDeleting,
    isFirstLoad,
  };
};

export default useFunctions;
