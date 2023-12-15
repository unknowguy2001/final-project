import {
  Box,
  Button,
  Container,
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

export const Forum = () => {
  const {
    forum,
    replies,
    handleCommentSubmit,
    comment,
    handleCommentChange,
    count,
    subComment,
    handleSubCommentChange,
    handleSubCommentSubmit,
  } = useFunctions();

  const description = forum?.description || "";

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      {forum && (
        <Box
          borderRadius="md"
          padding="20px"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading mb={4} color="brand.500" isTruncated as="h1" size="2xl">
            {forum?.title}
          </Heading>
          <Editor data={description} readOnly={true} theme="bubble" />
          <Box mt={4} fontSize="sm">
            <Text color="gray.500" display="inline">
              {formatDistance(new Date(forum.createdAt), new Date(), {
                addSuffix: true,
                locale: th,
              }).replace("ประมาณ", "")}{" "}
              โดย
            </Text>{" "}
            <Text display="inline">{forum.createdByName}</Text>
          </Box>
        </Box>
      )}
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
          <Box key={reply.id}>
            <Box
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              padding="20px"
            >
              <Text mb={2}>{reply.description}</Text>
              <Box fontSize="sm">
                <Text color="gray.500" display="inline">
                  {reply.createdAt && (
                    <>
                      {formatDistance(new Date(reply.createdAt), new Date(), {
                        addSuffix: true,
                        locale: th,
                      }).replace("ประมาณ", "")}{" "}
                    </>
                  )}
                  โดย
                </Text>{" "}
                <Text display="inline">{reply.createdByName}</Text>
              </Box>
            </Box>
            {reply.childReplies.map((childReply, index) => (
              <Box
                _before={{
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: index === 0 ? "-0.5rem" : "-67px",
                  left: "-1.5rem",
                  width: "1px",
                  height: index === 0 ? "75%" : "125%",
                  borderRadius: "full",
                  backgroundColor: "gray.300",
                }}
                _after={{
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: "3rem",
                  left: "-1.5rem",
                  width: "1rem",
                  height: "1px",
                  borderRadius: "full",
                  backgroundColor: "gray.300",
                }}
                position="relative"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                padding="20px"
                key={childReply.id}
                mt={4}
                ml={8}
              >
                <Text mb={2}>{childReply.description}</Text>
                <Box fontSize="sm">
                  <Text color="gray.500" display="inline">
                    {childReply.createdAt && (
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
                    โดย
                  </Text>{" "}
                  <Text display="inline">{childReply.createdByName}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        <Box
          _before={{
            content: '""',
            display: "block",
            position: "absolute",
            top: "-67px",
            left: "-23px",
            width: "1px",
            height: "85%",
            borderRadius: "full",
            backgroundColor: "gray.300",
          }}
          _after={{
            content: '""',
            display: "block",
            position: "absolute",
            top: "3rem",
            left: "-23px",
            width: "1rem",
            height: "1px",
            borderRadius: "full",
            backgroundColor: "gray.300",
          }}
          position="relative"
          ml={8}
          as="form"
          onSubmit={handleSubCommentSubmit}
        >
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
