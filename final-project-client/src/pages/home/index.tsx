import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Flex, Grid, GridItem, Link } from "@chakra-ui/react";

import { Hero } from "../../components/hero";
import { useFunctions } from "./useFunctions";
import CompanyCard from "../../components/company-card";

export const Home = () => {
  const { top4PopularCompanies } = useFunctions();

  const [company1, company2, company3, company4] = top4PopularCompanies;

  return (
    <>
      <Hero />
      <Container as="main" paddingY={8} maxWidth={1024}>
        <Flex
          marginBottom={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box as="h2" fontSize="3xl" fontWeight="bold">
            บริษัทยอดนิยม
          </Box>
          <Link as={RouterLink} to="/companies">
            ดูบริษัททั้งหมด
          </Link>
        </Flex>
        <Grid
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(6, 1fr);"
          gap={4}
        >
          <GridItem gridArea="1 / 1 / 4 / 4">
            <CompanyCard company={company1} />
          </GridItem>
          <GridItem gridArea="1 / 4 / 4 / 6">
            <CompanyCard company={company2} />
          </GridItem>
          <GridItem gridArea="4 / 1 / 7 / 3">
            <CompanyCard company={company3} />
          </GridItem>
          <GridItem gridArea="4 / 3 / 7 / 6">
            <CompanyCard company={company4} />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
