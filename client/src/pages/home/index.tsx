import { Link as ReactRouterDomLink } from "react-router-dom";
import {
  Button,
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
  const { topPopularCompanies, isLoading, provinces, isProvincesLoading } =
    useFunctions();

  return (
    <>
      <Hero />
      <Container as="main" paddingY={8} maxWidth="6xl">
        <Flex marginBottom={4}>
          <Heading fontSize="2xl" fontWeight="bold">
            จังหวัดแนะนำ
          </Heading>
        </Flex>
        <SimpleGrid mb={8} columns={6} gap={2}>
          {isProvincesLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height="40px" borderRadius="md" />
                ))
            : provinces.map((province) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={province}
                  as={ReactRouterDomLink}
                  to={`/companies/?q=${province}`}
                >
                  {province}
                </Button>
              ))}
        </SimpleGrid>
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
