import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import { createReply } from "../../services/repliesService";

interface CreateCommentModalProps {
  searchReplies: () => void;
}

export const CreateCommentModal = ({
  searchReplies,
}: CreateCommentModalProps) => {
  const { forumId } = useParams();

  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmittingComment(true);
      if (!forumId) return;
      await createReply(forumId, { description: comment });
      setComment("");
      searchReplies();
      setIsSubmittingComment(false);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline">
        สร้างความคิดเห็น
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent onSubmit={handleCommentSubmit} as="form">
          <ModalHeader>สร้างความคิดเห็น</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              isDisabled={isSubmittingComment}
              value={comment}
              onChange={handleCommentChange}
              required
              resize="none"
              placeholder="ความคิดเห็น"
              rows={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={isSubmittingComment}
              onClick={onClose}
              mr={2}
              variant="outline"
              colorScheme="red"
            >
              ยกเลิก
            </Button>
            <Button isLoading={isSubmittingComment} type="submit">
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
