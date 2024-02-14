import {
  Box,
  Button,
  Card,
  CardBody,
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
    <>
      <Box
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
        backgroundColor="white"
        _dark={{
          borderColor: "whiteAlpha.200",
        }}
      >
        <Container paddingY={16} maxWidth="6xl">
          <Stack gap={4}>
            <Heading
              color="brand.500"
              _dark={{
                color: "brand.300",
              }}
              isTruncated
              as="h1"
              fontSize="4xl"
            >
              {forum?.title}
            </Heading>
            <Flex justifyContent="space-between" alignItems="center">
              <UserProfile
                verticalInfo
                fullname={forum?.createdByName}
                rightNode={
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    _dark={{
                      color: "gray.400",
                    }}
                  >
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
            <Editor data={description} readOnly={true} theme="bubble" />
          </Stack>
        </Container>
      </Box>
      <Container py={8} maxWidth="6xl">
        <Heading as="h2" fontSize="2xl" mb={4}>
          ความคิดเห็น
        </Heading>
        {replies.length === 0 && (
          <Card variant="outline">
            <CardBody>ยังไม่มีความคิดเห็น</CardBody>
          </Card>
        )}
        <Stack spacing={0}>
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
    </>
  );
};
