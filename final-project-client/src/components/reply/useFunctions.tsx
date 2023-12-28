import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import {
  createReply,
  deleteReply,
  updateReply,
} from "../../services/repliesService";
import { useAuth } from "../../hooks/useAuth";
import { Reply } from "../../interfaces/reply";

interface UseFunctionsProps {
  reply: Reply;
  handleSearchReplies: () => void;
}

export const useFunctions = ({
  reply,
  handleSearchReplies,
}: UseFunctionsProps) => {
  const { authInfo } = useAuth();
  const [edittingReplyId, setEdittingReplyId] = useState<number | null>(null);
  const [edittingComment, setEdittingComment] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { forumId } = useParams<{ forumId: string }>();
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showChildReplies, setShowChildReplies] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
    setComment("");
  };

  const handleEdittingCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEdittingComment(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleDeleteReplyClick = async (forumId: number, replyId: number) => {
    try {
      await deleteReply(forumId, replyId);
      handleSearchReplies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReplyClick = (reply: Reply) => {
    onOpen();
    setEdittingComment(reply.description);
    setEdittingReplyId(reply.id);
  };

  const handleSaveClick = async () => {
    if (!edittingReplyId) return;
    try {
      const data = { description: edittingComment };
      await updateReply(reply.forumId, edittingReplyId, data);
    } catch (error) {
      console.error(error);
    } finally {
      setEdittingComment("");
      setEdittingReplyId(null);
      handleSearchReplies();
      onClose();
    }
  };

  return {
    authInfo,
    comment,
    showCommentForm,
    showChildReplies,
    handleCommentChange,
    handleCommentSubmit,
    handleReplyClick,
    handleCommentCancel,
    handleShowChildReplies,
    handleDeleteReplyClick,
    handleEditReplyClick,
    handleClose,
    isOpen,
    edittingComment,
    handleEdittingCommentChange,
    handleSaveClick,
  };
};
