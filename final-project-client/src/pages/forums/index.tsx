import { Box, Container, Flex } from "@chakra-ui/react";

export const Forums = () => {
  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Box mb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box as="h2" fontSize="3xl" fontWeight="bold">
            กระทู้ทั้งหมด
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};
