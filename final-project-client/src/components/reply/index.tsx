import {
  Avatar,
  Box,
  Button,
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
              value={edittingComment}
              onChange={handleEdittingCommentChange}
              required
              resize="none"
              placeholder="ความคิดเห็น"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveClick}>บันทึก</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        padding="20px"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex fontSize="sm" gap={2} alignItems="center">
            <Avatar size="xs" name={reply?.createdByName[0]} />
            <Text display="inline">{reply?.createdByName}</Text>
            <Text color="gray.500" display="inline">
              {formatDistanceToNow(reply.createdAt)}
            </Text>
          </Flex>
          <Button
            onClick={handleReplyClick}
            leftIcon={<Icon icon="lucide:reply" />}
            size="sm"
            variant="link"
          >
            ตอบกลับ
          </Button>
        </Flex>
        <Text mt={3}>{reply.description}</Text>
        {authInfo.user?.username === reply.createdByUsername && (
          <Flex justifyContent="end" gap={2}>
            <IconButton
              onClick={() => handleEditReplyClick(reply)}
              aria-label="edit"
              icon={<Icon icon="lucide:pen" />}
              variant="ghost"
              size="sm"
            />
            <IconButton
              onClick={() => handleDeleteReplyClick(reply.forumId, reply.id)}
              aria-label="delete"
              icon={<Icon icon="lucide:trash" />}
              variant="ghost"
              size="sm"
            />
          </Flex>
        )}
      </Box>
      {reply.childReplies.length > 0 && (
        <Button
          width="calc(100% - 2rem)"
          mt={4}
          onClick={handleShowChildReplies}
          variant="outline"
          ml={8}
          size="sm"
        >
          {showChildReplies ? "ซ่อน" : "ดู"}ความคิดเห็นย่อย (
          {reply.childReplies.length})
        </Button>
      )}
      <Stack mt={showChildReplies ? 4 : 0} gap={4}>
        {showChildReplies &&
          reply.childReplies.map((childReply) => (
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
              <Flex justifyContent="space-between" alignItems="center">
                <Flex fontSize="sm" gap={2} alignItems="center">
                  <Avatar size="xs" name={childReply?.createdByName[0]} />
                  <Text display="inline">{childReply?.createdByName}</Text>
                  <Text color="gray.500" display="inline">
                    {formatDistanceToNow(childReply.createdAt)}
                  </Text>
                </Flex>
                <Button
                  onClick={handleReplyClick}
                  leftIcon={<Icon icon="lucide:reply" />}
                  size="sm"
                  variant="link"
                >
                  ตอบกลับ
                </Button>
              </Flex>
              <Text mt={3}>{childReply.description}</Text>
              {authInfo.user?.username === childReply.createdByUsername && (
                <Flex justifyContent="end" gap={2}>
                  <IconButton
                    onClick={() => handleEditReplyClick(childReply)}
                    aria-label="edit"
                    icon={<Icon icon="lucide:pen" />}
                    variant="ghost"
                    size="sm"
                  />
                  <IconButton
                    onClick={() =>
                      handleDeleteReplyClick(childReply.forumId, childReply.id)
                    }
                    aria-label="delete"
                    icon={<Icon icon="lucide:trash" />}
                    variant="ghost"
                    size="sm"
                  />
                </Flex>
              )}
            </Box>
          ))}
      </Stack>
      <Box
        mt={4}
        display="grid"
        transition={"grid-template-rows 0.25s"}
        gridTemplateRows={showCommentForm ? "1fr" : "0fr"}
        position="relative"
        ml={8}
        as="form"
        onSubmit={handleCommentSubmit}
      >
        <Box overflow="hidden">
          <Textarea
            value={comment}
            onChange={handleCommentChange}
            required
            resize="none"
            placeholder="ความคิดเห็น"
          />
          <Flex mt={4} gap={4}>
            <Button
              variant="outline"
              type="button"
              onClick={handleCommentCancel}
              colorScheme="red"
            >
              ยกเลิก
            </Button>
            <Button type="submit">ส่งความคิดเห็น</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
