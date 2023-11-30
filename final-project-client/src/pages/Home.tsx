import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Flex, Grid, GridItem, Link } from "@chakra-ui/react";

import Hero from "../components/Hero";
import CompanyCard from "../components/CompanyCard";

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <Container as="section" paddingY={8} maxWidth={1024}>
          <Flex
            marginBottom={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box as="h2" fontSize="3xl" fontWeight="bold">
              Popular Companies
            </Box>
            <Link as={RouterLink} to="/companies" fontSize="xl">
              View All
            </Link>
          </Flex>
          <Grid
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(6, 1fr);"
            gap={4}
          >
            <GridItem gridArea="1 / 1 / 4 / 4">
              <CompanyCard company={{ id: 1 }} />
            </GridItem>
            <GridItem gridArea="1 / 4 / 4 / 6">
              <CompanyCard company={{ id: 2 }} />
            </GridItem>
            <GridItem gridArea="4 / 1 / 7 / 3">
              <CompanyCard company={{ id: 3 }} />
            </GridItem>
            <GridItem gridArea="4 / 3 / 7 / 6">
              <CompanyCard company={{ id: 4 }} />
            </GridItem>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
