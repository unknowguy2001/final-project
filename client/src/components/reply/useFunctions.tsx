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

const useFunctions = ({ reply, handleSearchReplies }: UseFunctionsProps) => {
  const { authInfo } = useAuth();
  const [edittingReplyId, setEdittingReplyId] = useState<number | null>(null);
  const [edittingComment, setEdittingComment] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { forumId } = useParams<{ forumId: string }>();
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showChildReplies, setShowChildReplies] = useState<boolean>(false);
  const [isCommentSubmitting, setIsCommentSubmitting] =
    useState<boolean>(false);
  const [isCommentUpdating, setIsCommentUpdating] = useState<boolean>(false);
  const [isCommentDeleting, setIsCommentDeleting] = useState<boolean>(false);
  const [deletingReplyId, setDeletingReplyId] = useState<number | null>(null);

  const handleClose = () => {
    onClose();
    setComment("");
  };

  const handleEdittingCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEdittingComment(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsCommentSubmitting(true);
      e.preventDefault();
      if (!forumId) return;
      await createReply(
        forumId,
        { description: comment },
        {
          params: {
            replyId: reply.id,
          },
        },
      );
      setComment("");
      handleSearchReplies();
      setShowChildReplies(true);
      setShowCommentForm(false);
      setIsCommentSubmitting(false);
    } catch (error) {
      console.error(error);
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
      setIsCommentDeleting(true);
      setDeletingReplyId(replyId);
      await deleteReply(forumId, replyId);
      handleSearchReplies();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCommentDeleting(false);
      setDeletingReplyId(null);
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
      setIsCommentUpdating(true);
      const data = { description: edittingComment };
      await updateReply(reply.forumId, edittingReplyId, data);
      setEdittingComment("");
      setEdittingReplyId(null);
      handleSearchReplies();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCommentUpdating(false);
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
    isCommentSubmitting,
    isCommentUpdating,
    isCommentDeleting,
    deletingReplyId,
  };
};

export default useFunctions;
