import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Input } from "@chakra-ui/react";

import { useFunctions } from "./useFunctions";
import { ForumCard } from "../../components/forum-card";
import { Pagination } from "../../components/pagination";

export const Forums = () => {
  const { forums, handleSubmit, clearSearch, searchInputRef, count } =
    useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Heading as="h2" fontSize="2xl">
          กระทู้ทั้งหมด
        </Heading>
        <Button as={Link} to="/forums/new" variant="outline">
          สร้างกระทู้
        </Button>
      </Flex>
      <Box as="form" onSubmit={handleSubmit} position="relative" mb={4}>
        <Input ref={searchInputRef} placeholder="ค้นหา" />
        <Box
          position="absolute"
          right={4}
          top="50%"
          zIndex={1}
          transform="translateY(-50%)"
          display="flex"
          gap={2}
        >
          <Box as="button" onClick={clearSearch} type="button">
            <Icon icon="lucide:x" />
          </Box>
          <Box as="button" type="submit">
            <Icon icon="lucide:search" />
          </Box>
        </Box>
      </Box>
      <Flex flexDirection="column" gap={4} mb={4}>
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </Flex>
      <Pagination count={count} />
    </Container>
  );
};
