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
        transform: "translateY(-2px) scale(1.02)",
      }}
    >
      <CardHeader pb={0}>
        <Heading isTruncated as="h2" size="md">
          {forum.title}
        </Heading>
      </CardHeader>
      <CardBody pt={2}>
        <Box>
          <Text color="gray.500" display="inline">
            {formatDistanceToNow(forum.createdAt)} โดย
          </Text>{" "}
          <Text display="inline">{forum.createdByName}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};
