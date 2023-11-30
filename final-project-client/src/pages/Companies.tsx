import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import CompanyCard from "../components/CompanyCard";

const Companies = () => {
  return (
    <>
      <main>
        <Container as="section" paddingY={8} maxWidth={1024}>
          <Flex
            marginBottom={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box as="h2" fontSize="3xl" fontWeight="bold">
              Companies
            </Box>
            <Text>Total 4 Companies</Text>
          </Flex>
          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            <CompanyCard company={{ id: 1 }} />
            <CompanyCard company={{ id: 2 }} />
            <CompanyCard company={{ id: 3 }} />
            <CompanyCard company={{ id: 4 }} />
            <CompanyCard company={{ id: 5 }} />
            <CompanyCard company={{ id: 6 }} />
          </SimpleGrid>
        </Container>
      </main>
    </>
  );
};
export default Companies;
