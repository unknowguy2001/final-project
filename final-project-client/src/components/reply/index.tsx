import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { th } from "date-fns/locale";
import { Icon } from "@iconify/react";
import { formatDistance } from "date-fns";

import { useFunctions } from "./useFunctions";
import { Reply as IReply } from "../../interfaces/reply";

interface ReplyProps {
  reply: IReply;
  handleSearchReplies: () => void;
}

export const Reply = ({ reply, handleSearchReplies }: ReplyProps) => {
  const {
    comment,
    handleCommentCancel,
    handleCommentSubmit,
    handleReplyClick,
    handleShowChildReplies,
    handleSubCommentChange,
    showChildReplies,
    showCommentForm,
  } = useFunctions({ reply, handleSearchReplies });

  return (
    <Box>
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
              {reply?.createdAt && (
                <>
                  {formatDistance(new Date(reply.createdAt), new Date(), {
                    addSuffix: true,
                    locale: th,
                  }).replace("ประมาณ", "")}{" "}
                </>
              )}
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
              backgroundColor="gray.50"
              position="relative"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              padding="20px"
              key={childReply.id}
              ml={8}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex fontSize="sm" gap={2} alignItems="center">
                  <Avatar size="xs" name={reply?.createdByName[0]} />
                  <Text display="inline">{reply?.createdByName}</Text>
                  <Text color="gray.500" display="inline">
                    {reply?.createdAt && (
                      <>
                        {formatDistance(new Date(reply.createdAt), new Date(), {
                          addSuffix: true,
                          locale: th,
                        }).replace("ประมาณ", "")}{" "}
                      </>
                    )}
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
            onChange={handleSubCommentChange}
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
