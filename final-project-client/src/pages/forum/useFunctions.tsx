import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Forum } from "../../interfaces/forum";
import { Reply } from "../../interfaces/reply";
import { deleteForum, getForum } from "../../services/forumsService";
import { createReply, searchReplies } from "../../services/repliesService";

export const useFunctions = () => {
  const { authInfo } = useAuth();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const { forumId } = useParams<{ forumId: string }>();
  const [forum, setForum] = useState<Forum | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const handleSearchReplies = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      if (!forumId) return;
      const page = searchParams.get("page")!;
      const perPage = searchParams.get("perPage")!;
      const response = await searchReplies(forumId, {
        ...config,
        params: { page, perPage },
      });
      setReplies(response.data.items);
      setCount(response.data.count);
    },
    [forumId, searchParams]
  );

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!forumId) return;
      await createReply(forumId, { description: comment });
    } catch (error) {
      console.error(error);
    } finally {
      setComment("");
      handleSearchReplies();
    }
  };

  const handleDeleteForumClick = async (forumId: number) => {
    if (!forumId) return;
    try {
      await deleteForum(forumId);
    } catch (error) {
      console.error(error);
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
      const response = await getForum(forumId, {
        signal: abortGetForumController.signal,
      });
      setForum(response.data.item);
    };

    handleGetForum();
    handleSearchReplies({ signal: abortSearchRepliesController.signal });

    return () => {
      abortGetForumController.abort();
      abortSearchRepliesController.abort();
    };
  }, [forumId, handleSearchReplies]);

  return {
    authInfo,
    forum,
    replies,
    handleCommentSubmit,
    comment,
    handleCommentChange,
    count,
    handleSearchReplies,
    handleDeleteForumClick,
    handleEditForumClick,
  };
};
