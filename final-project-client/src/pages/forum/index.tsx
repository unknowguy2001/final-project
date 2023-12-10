import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";

import { useFunctions } from "./useFunctions";

export const Forum = () => {
  const { forum } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Heading isTruncated as="h1" mb={2} size="2xl">
        {forum?.title}
      </Heading>
      <Text display="inline">{forum?.createdByName}</Text>
      <Box dangerouslySetInnerHTML={{ __html: forum?.description || "" }} />
      <Divider my={4} />
    </Container>
  );
};
