import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getForum } from "../../services/forumsService";
import { create, update } from "../../services/baseService";
import { CreateForumResponse, ForumData } from "../../interfaces/forum";

export const useFunctions = () => {
  const { authInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const { forumId } = useParams<{ forumId: string }>();

  const mode = location.pathname.includes("new") ? "new" : "edit";
  const isNewMode = mode === "new";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleActionClick = async () => {
    const forumData = {
      title,
      description,
    };
    if (isNewMode) {
      const response = await create<ForumData, CreateForumResponse>(
        "forums",
        forumData
      );
      navigate(`/forums/${response.data.forumId}`);
    } else {
      if (!forumId) return;
      await update<ForumData>("forums", forumId, forumData);
      navigate(`/forums/${forumId}`);
    }
  };

  useEffect(() => {
    if (!forumId) return;

    const abortGetForumController = new AbortController();

    const handleGetForum = async () => {
      const response = await getForum(forumId, {
        signal: abortGetForumController.signal,
      });
      if (response.data.item.createdByUsername !== authInfo.user?.username) {
        return navigate(`/forums/${forumId}`);
      }
      setTitle(response.data.item.title);
      setDesciption(response.data.item.description);
    };

    handleGetForum();

    return () => abortGetForumController.abort();
  }, [forumId, navigate, authInfo.user?.username]);

  return {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleActionClick,
    mode,
  };
};
