import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import { UserProfile } from "../user-profile";
import { useFunctions } from "./useFunctions";
import { Reply as IReply } from "../../interfaces/reply";
import { formatDistanceToNow } from "../../utils/dateUtils";

interface ReplyProps {
  reply: IReply;
  handleSearchReplies: () => void;
}

export const Reply = ({ reply, handleSearchReplies }: ReplyProps) => {
  const {
    authInfo,
    comment,
    handleCommentCancel,
    handleCommentSubmit,
    handleReplyClick,
    handleShowChildReplies,
    handleCommentChange,
    showChildReplies,
    showCommentForm,
    handleDeleteReplyClick,
    handleEditReplyClick,
    isOpen,
    handleClose,
    edittingComment,
    handleEdittingCommentChange,
    handleSaveClick,
    isCommentSubmitting,
    isCommentUpdating,
    isCommentDeleting,
    deletingReplyId,
  } = useFunctions({ reply, handleSearchReplies });

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>แก้ไขความคิดเห็น</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              isDisabled={isCommentUpdating}
              value={edittingComment}
              onChange={handleEdittingCommentChange}
              required
              rows={5}
              resize="none"
              placeholder="ความคิดเห็น"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={isCommentUpdating}
              variant="outline"
              colorScheme="red"
              mr={2}
              onClick={handleClose}
            >
              ยกเลิก
            </Button>
            <Button isLoading={isCommentUpdating} onClick={handleSaveClick}>
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card variant="outline">
        <CardBody>
          <Flex justifyContent="space-between" gap={4} alignItems="center">
            <Flex gap={4} align="center">
              <UserProfile
                fullname={reply?.createdByName}
                verticalInfo
                rightNode={
                  <Text fontSize="sm" color="gray.500">
                    {formatDistanceToNow(reply?.createdAt)}
                  </Text>
                }
              />
              {authInfo.user?.username === reply.createdByUsername && (
                <Flex>
                  <IconButton
                    onClick={() => handleEditReplyClick(reply)}
                    aria-label="edit"
                    icon={<Icon icon="lucide:pen" />}
                    variant="ghost"
                    size="sm"
                    isDisabled={
                      isCommentDeleting && deletingReplyId === reply.id
                    }
                  />
                  <IconButton
                    isLoading={
                      isCommentDeleting && deletingReplyId === reply.id
                    }
                    onClick={() =>
                      handleDeleteReplyClick(reply.forumId, reply.id)
                    }
                    aria-label="delete"
                    icon={<Icon icon="lucide:trash" />}
                    variant="ghost"
                    size="sm"
                  />
                </Flex>
              )}
            </Flex>
            <Button
              isDisabled={isCommentDeleting && deletingReplyId === reply.id}
              onClick={handleReplyClick}
              leftIcon={<Icon icon="lucide:reply" />}
              size="sm"
              variant="link"
            >
              ตอบกลับ
            </Button>
          </Flex>
          <Text mt={3}>{reply.description}</Text>
        </CardBody>
      </Card>
      {reply.childReplies.length > 0 && (
        <Box pl={8} pt={4}>
          <Button
            width="full"
            onClick={handleShowChildReplies}
            variant="outline"
            size="sm"
          >
            {showChildReplies ? "ซ่อน" : "ดู"}ความคิดเห็นย่อย (
            {reply.childReplies.length})
          </Button>
        </Box>
      )}
      <Box
        display="grid"
        transition={"grid-template-rows 0.25s"}
        gridTemplateRows={showChildReplies ? "1fr" : "0fr"}
        position="relative"
        as="form"
        onSubmit={handleCommentSubmit}
      >
        <Box overflow="hidden">
          <Stack pt={4} gap={4}>
            {reply.childReplies.map((childReply) => (
              <Box
                key={childReply.id}
                backgroundColor="gray.50"
                position="relative"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                padding="20px"
                ml={8}
              >
                <Flex
                  justifyContent="space-between"
                  gap={4}
                  alignItems="center"
                >
                  <Flex gap={4} align="center">
                    <UserProfile
                      fullname={childReply?.createdByName}
                      verticalInfo
                      rightNode={
                        <Text fontSize="sm" color="gray.500">
                          {formatDistanceToNow(childReply?.createdAt)}
                        </Text>
                      }
                    />
                    {authInfo.user?.username ===
                      childReply.createdByUsername && (
                      <Flex>
                        <IconButton
                          isDisabled={
                            isCommentDeleting &&
                            deletingReplyId === childReply.id
                          }
                          onClick={() => handleEditReplyClick(childReply)}
                          aria-label="edit"
                          icon={<Icon icon="lucide:pen" />}
                          variant="ghost"
                          size="sm"
                        />
                        <IconButton
                          isLoading={
                            isCommentDeleting &&
                            deletingReplyId === childReply.id
                          }
                          onClick={() =>
                            handleDeleteReplyClick(reply.forumId, childReply.id)
                          }
                          aria-label="delete"
                          icon={<Icon icon="lucide:trash" />}
                          variant="ghost"
                          size="sm"
                        />
                      </Flex>
                    )}
                  </Flex>
                  <Button
                    isDisabled={
                      isCommentDeleting && deletingReplyId === childReply.id
                    }
                    onClick={handleReplyClick}
                    leftIcon={<Icon icon="lucide:reply" />}
                    size="sm"
                    variant="link"
                  >
                    ตอบกลับ
                  </Button>
                </Flex>
                <Text mt={3}>{childReply.description}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
      <Box
        display="grid"
        transition={"grid-template-rows 0.25s"}
        gridTemplateRows={showCommentForm ? "1fr" : "0fr"}
        position="relative"
        as="form"
        onSubmit={handleCommentSubmit}
      >
        <Box overflow="hidden">
          <Box pt={4} pl={8} pb={4}>
            <Textarea
              value={comment}
              onChange={handleCommentChange}
              required
              resize="none"
              placeholder="ความคิดเห็น"
              isDisabled={isCommentSubmitting}
            />
            <Flex mt={4} gap={2}>
              <Button
                isDisabled={isCommentSubmitting}
                variant="outline"
                colorScheme="red"
                type="button"
                onClick={handleCommentCancel}
              >
                ยกเลิก
              </Button>
              <Button isLoading={isCommentSubmitting} type="submit">
                ยืนยัน
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
