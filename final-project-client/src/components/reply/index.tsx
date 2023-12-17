import { useState } from "react";
import { th } from "date-fns/locale";
import { formatDistance } from "date-fns";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { Reply as IReply } from "../../interfaces/reply";
import { createReply } from "../../services/repliesService";

interface ReplyProps {
  reply: IReply;
  handleSearchReplies: () => void;
}

export const Reply = ({ reply, handleSearchReplies }: ReplyProps) => {
  const { forumId } = useParams<{ forumId: string }>();
  const [subComment, setSubComment] = useState<string>("");
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showChildReplies, setShowChildReplies] = useState<boolean>(false);

  const handleSubCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSubComment(e.target.value);
  };

  const handleSubCommentSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      if (!forumId) return;
      await createReply(
        forumId,
        { description: subComment },
        {
          params: {
            replyId: reply.id,
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSubComment("");
      handleSearchReplies();
      setShowChildReplies(true);
    }
  };

  const handleReplyClick = () => {
    setShowCommentForm((prev) => !prev);
  };

  const handleShowChildReplies = () => {
    setShowChildReplies((prev) => !prev);
  };

  return (
    <Box>
      <Box
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        padding="20px"
      >
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
        <Text my={3}>{reply.description}</Text>
        <Button onClick={handleReplyClick} size="sm" variant="link">
          ตอบกลับ
        </Button>
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
              position="relative"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              padding="20px"
              key={childReply.id}
              ml={8}
            >
              <Flex fontSize="sm" gap={2} alignItems="center">
                <Avatar size="xs" name={childReply?.createdByName[0]} />
                <Text display="inline">{childReply?.createdByName}</Text>
                <Text color="gray.500" display="inline">
                  {childReply?.createdAt && (
                    <>
                      {formatDistance(
                        new Date(childReply.createdAt),
                        new Date(),
                        {
                          addSuffix: true,
                          locale: th,
                        }
                      ).replace("ประมาณ", "")}{" "}
                    </>
                  )}
                </Text>
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
        onSubmit={handleSubCommentSubmit}
      >
        <Box overflow="hidden">
          <Textarea
            value={subComment}
            onChange={handleSubCommentChange}
            required
            resize="none"
            placeholder="ความคิดเห็น"
          />
          <Button type="submit" mt={4}>
            ส่งความคิดเห็น
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
