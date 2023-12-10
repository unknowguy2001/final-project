import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Forum } from "../../interfaces/forum";
import { getForum } from "../../services/forumsService";

export const useFunctions = () => {
  const { forumId } = useParams<{ forumId: string }>();
  const [forum, setForum] = useState<Forum | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetForum = async () => {
      if (!forumId) return;
      const response = await getForum(forumId, {
        signal: abortController.signal,
      });
      setForum(response.data.item);
    };

    handleGetForum();
  }, [forumId]);

  return { forum };
};
