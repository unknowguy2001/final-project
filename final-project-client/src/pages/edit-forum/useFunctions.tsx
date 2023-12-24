import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";
import { getForum, updateForum } from "../../services/forumsService";

export const useFunctions = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const { forumId } = useParams<{ forumId: string }>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSaveForumClick = async () => {
    if (!forumId) return;
    const response = await updateForum(forumId, {
      title,
      description,
    });
    if (response.statusText === "OK") {
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

    return () => {
      abortGetForumController.abort();
    };
  }, [forumId, navigate, authInfo.user?.username]);

  return {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleSaveForumClick,
  };
};
