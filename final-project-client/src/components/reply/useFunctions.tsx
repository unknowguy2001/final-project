import { useState } from "react";
import { useParams } from "react-router-dom";

import { Reply } from "../../interfaces/reply";
import { createReply } from "../../services/repliesService";

interface UseFunctionsProps {
  reply: Reply;
  handleSearchReplies: () => void;
}

export const useFunctions = ({
  reply,
  handleSearchReplies,
}: UseFunctionsProps) => {
  const { forumId } = useParams<{ forumId: string }>();
  const [comment, setComment] = useState<string>("");
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showChildReplies, setShowChildReplies] = useState<boolean>(false);

  const handleSubCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!forumId) return;
      await createReply(
        forumId,
        { description: comment },
        {
          params: {
            replyId: reply.id,
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setComment("");
      handleSearchReplies();
      setShowChildReplies(true);
      setShowCommentForm(false);
    }
  };

  const handleReplyClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentCancel = () => {
    setShowCommentForm(false);
    setComment("");
  };

  const handleShowChildReplies = () => {
    setShowChildReplies((prev) => !prev);
  };

  return {
    comment,
    showCommentForm,
    showChildReplies,
    handleSubCommentChange,
    handleCommentSubmit,
    handleReplyClick,
    handleCommentCancel,
    handleShowChildReplies,
  };
};
