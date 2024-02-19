import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import {
  createForum,
  getForum,
  updateForum,
} from "../../services/forumsService";

const useFunctions = () => {
  const { authInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const { forumId } = useParams<{ forumId: string }>();
  const [isForumLoading, setIsForumLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const mode = location.pathname.includes("new") ? "new" : "edit";
  const isNewMode = mode === "new";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleActionClick = async () => {
    try {
      setIsActionLoading(true);
      const forumData = {
        title,
        description,
      };
      if (isNewMode) {
        const response = await createForum(forumData);
        navigate(`/forums/${response.data.forumId}`);
      } else {
        if (!forumId) return;
        await updateForum(forumId, forumData);
        navigate(`/forums/${forumId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCancelClick = () => {
    navigate("/forums");
  };

  useEffect(() => {
    if (!forumId) return;

    const abortGetForumController = new AbortController();

    const handleGetForum = async () => {
      setIsForumLoading(true);
      const response = await getForum(forumId, {
        signal: abortGetForumController.signal,
      });
      // If the user is not the creator of the forum, redirect to the forum page
      if (response.data.item.createdByUsername !== authInfo.user?.username) {
        return navigate(`/forums/${forumId}`);
      }
      setTitle(response.data.item.title);
      setDesciption(response.data.item.description);
      setIsForumLoading(false);
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
    handleCancelClick,
    isForumLoading,
    isActionLoading,
  };
};

export default useFunctions;
