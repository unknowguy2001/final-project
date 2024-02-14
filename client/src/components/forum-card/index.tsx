import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Forum } from "../../interfaces/forum";
import { useFunctions } from "./useFunctions";
import { formatDistanceToNow } from "../../utils/dateUtils";

interface ForumCardProps {
  forum: Forum;
}

export const ForumCard = ({ forum }: ForumCardProps) => {
  const { handleForumClick } = useFunctions(forum);

  return (
    <Card
      variant="filled"
      height="100%"
      borderRadius="md"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      bg="white"
      transition="all 0.5s"
      position="relative"
      cursor="pointer"
      onClick={handleForumClick}
      _hover={{
        borderColor: "gray.500",
        _after: {
          width: "200%",
          height: "200%",
        },
      }}
      _dark={{
        bg: "transparent",
        borderColor: "gray.600",
        _after: {
          bg: "gray.700",
        },
      }}
      _after={{
        content: `""`,
        height: 0,
        width: 0,
        position: "absolute",
        bottom: 0,
        right: 0,
        bg: "blackAlpha.300",
        borderTopLeftRadius: "100%",
        backgroundColor: "brand.50",
        transition: "all 0.5s",
      }}
    >
      <CardHeader zIndex={1} pb={0}>
        <Heading isTruncated as="h2" size="md">
          {forum.title}
        </Heading>
      </CardHeader>
      <CardBody zIndex={1} pt={2}>
        <Box>
          <Text
            color="gray.500"
            _dark={{
              color: "gray.400",
            }}
            display="inline"
          >
            {formatDistanceToNow(forum.createdAt)} โดย
          </Text>{" "}
          <Text display="inline">{forum.createdByName}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};
