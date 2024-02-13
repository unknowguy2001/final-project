import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import { useFunctions } from "./useFunctions";
import { Reply } from "../../components/reply";
import { Editor } from "../../components/editor";
import { Pagination } from "../../components/pagination";
import { formatDistanceToNow } from "../../utils/dateUtils";
import { UserProfile } from "../../components/user-profile";

export const Forum = () => {
  const {
    authInfo,
    forum,
    replies,
    handleCommentSubmit,
    comment,
    handleCommentChange,
    count,
    handleSearchReplies,
    handleDeleteForumClick,
    handleEditForumClick,
  } = useFunctions();

  const description = forum?.description || "";

  return (
    <Container as="main" paddingY={8} maxWidth="6xl">
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
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <UserProfile
            avatarSize={24}
            fullname={forum?.createdByName}
            rightNode={
              <Text fontSize="sm" color="gray.500">
                {formatDistanceToNow(forum?.createdAt)}
              </Text>
            }
          />
          {authInfo.user?.username === forum?.createdByUsername && (
            <Flex justifyContent="end" gap={2}>
              <IconButton
                onClick={() => handleEditForumClick(forum!.id)}
                aria-label="edit"
                icon={<Icon icon="lucide:pen" />}
                variant="ghost"
                size="sm"
              />
              <IconButton
                onClick={() => handleDeleteForumClick(forum!.id)}
                aria-label="delete"
                icon={<Icon icon="lucide:trash" />}
                variant="ghost"
                size="sm"
              />
            </Flex>
          )}
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
