import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import useFunctions from "./useFunctions";
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
    isCommentSubmitting,
    isOpen,
    handleCloseClick,
    handleCreateCommentClick,
    isRepliesLoading,
    isForumLoading,
    isForumDeleting,
    isFirstLoad,
  } = useFunctions();

  return (
    <>
      <Box
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
        backgroundColor="white"
        _dark={{
          borderColor: "whiteAlpha.200",
          backgroundColor: "gray.800",
        }}
      >
        <Container paddingY={16} maxWidth="6xl">
          <Stack gap={4}>
            {isForumLoading ? (
              <>
                <Skeleton height="32px" width="300px" />
                <Skeleton height="32px" width="150px" />
                <Skeleton height="16px" width="450px" />
                <Skeleton height="16px" width="400px" />
                <Skeleton height="16px" width="450px" />
              </>
            ) : (
              <>
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
                <Flex gap={4} alignItems="center">
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
                    <Flex>
                      <IconButton
                        isDisabled={isForumDeleting}
                        onClick={() => handleEditForumClick(forum!.id)}
                        aria-label="edit"
                        icon={<Icon icon="lucide:pen" />}
                        variant="ghost"
                        size="sm"
                      />
                      <IconButton
                        isLoading={isForumDeleting}
                        onClick={() => handleDeleteForumClick(forum!.id)}
                        aria-label="delete"
                        icon={<Icon icon="lucide:trash" />}
                        variant="ghost"
                        size="sm"
                      />
                    </Flex>
                  )}
                </Flex>
                <Editor
                  data={forum?.description}
                  readOnly={true}
                  theme="bubble"
                />
              </>
            )}
          </Stack>
        </Container>
      </Box>
      <Container py={8} maxWidth="6xl">
        <Flex alignItems="center" mb={4} gap={4} justifyContent="space-between">
          <Heading as="h2" fontSize="2xl">
            ความคิดเห็น
          </Heading>
          <Button onClick={handleCreateCommentClick} variant="outline">
            สร้างความคิดเห็น
          </Button>
          <Modal isOpen={isOpen} onClose={handleCloseClick}>
            <ModalOverlay />
            <ModalContent onSubmit={handleCommentSubmit} as="form">
              <ModalHeader>สร้างความคิดเห็น</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  isDisabled={isCommentSubmitting}
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
                  isDisabled={isCommentSubmitting}
                  onClick={handleCloseClick}
                  mr={2}
                  variant="outline"
                  colorScheme="red"
                >
                  ยกเลิก
                </Button>
                <Button isLoading={isCommentSubmitting} type="submit">
                  ยืนยัน
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        {!isRepliesLoading && replies.length === 0 && (
          <Card variant="outline">
            <CardBody>ยังไม่มีความคิดเห็น</CardBody>
          </Card>
        )}
        <Stack spacing={4}>
          {isFirstLoad && isRepliesLoading
            ? Array(12)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    height="124px"
                    width="full"
                    borderRadius="md"
                  />
                ))
            : replies.map((reply) => (
                <Reply
                  key={reply.id}
                  handleSearchReplies={handleSearchReplies}
                  reply={reply}
                />
              ))}
        </Stack>
        <Box
          _empty={{
            mt: 0,
          }}
          mt={4}
        >
          <Pagination count={count} />
        </Box>
      </Container>
    </>
  );
};
