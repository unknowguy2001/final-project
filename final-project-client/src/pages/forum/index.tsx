import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { th } from "date-fns/locale";
import { formatDistance } from "date-fns";

import { useFunctions } from "./useFunctions";
import { Editor } from "../../components/editor";
import { Pagination } from "../../components/pagination";
import { Reply } from "../../components/reply";

export const Forum = () => {
  const {
    forum,
    replies,
    handleCommentSubmit,
    comment,
    handleCommentChange,
    count,
    handleSearchReplies,
  } = useFunctions();

  const description = forum?.description || "";

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Box
        borderRadius="md"
        padding="20px"
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading mb={4} color="brand.500" isTruncated as="h1" fontSize="4xl">
          {forum?.title}
        </Heading>
        <Editor data={description} readOnly={true} theme="bubble" />
        <Flex mt={4} fontSize="sm" gap={2} alignItems="center">
          <Avatar size="xs" name={forum?.createdByName[0]} />
          <Text display="inline">{forum?.createdByName}</Text>
          <Text color="gray.500" display="inline">
            {forum?.createdAt && (
              <>
                {formatDistance(new Date(forum.createdAt), new Date(), {
                  addSuffix: true,
                  locale: th,
                }).replace("ประมาณ", "")}{" "}
              </>
            )}
          </Text>
        </Flex>
      </Box>
      <Heading mt={8} as="h2" size="md" mb={4}>
        ความคิดเห็น
      </Heading>
      {replies.length === 0 && (
        <Box
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          padding="20px"
        >
          <Text>ยังไม่มีความคิดเห็น</Text>
        </Box>
      )}
      <Stack spacing={4}>
        {replies.map((reply) => (
          <Reply
            key={reply.id}
            handleSearchReplies={handleSearchReplies}
            reply={reply}
          />
        ))}
      </Stack>
      <Box mt={4}>
        <Pagination count={count} />
      </Box>
      <Box mt={8} as="form" onSubmit={handleCommentSubmit}>
        <Heading mb={4} as="h2" size="md">
          แสดงความคิดเห็น
        </Heading>
        <Textarea
          value={comment}
          onChange={handleCommentChange}
          required
          resize="none"
          placeholder="ความคิดเห็น"
        />
        <Button type="submit" mt={4}>
          ส่งความคิดเห็น
        </Button>
      </Box>
    </Container>
  );
};
