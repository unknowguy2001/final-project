import { Link as ReactRouterDomLink } from "react-router-dom";
import {
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

import { Hero } from "../../components/hero";
import { useFunctions } from "./useFunctions";
import CompanyCard from "../../components/company-card";

export const Home = () => {
  const { topPopularCompanies, isLoading } = useFunctions();

  return (
    <>
      <Hero />
      <Container as="main" paddingY={8} maxWidth="6xl">
        <Flex
          marginBottom={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="2xl" fontWeight="bold">
            บริษัทยอดนิยม
          </Heading>
          <Link as={ReactRouterDomLink} to="/companies">
            ดูบริษัททั้งหมด
          </Link>
        </Flex>
        <SimpleGrid columns={3} gap={4}>
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    height="454px"
                    width="100%"
                    borderRadius="md"
                  />
                ))
            : topPopularCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
        </SimpleGrid>
      </Container>
    </>
  );
};
