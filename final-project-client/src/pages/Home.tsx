import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import Navbar from "../components/Navbar";
import blueElephantOnMacbookImage from "../assets/images/blue-elephant-on-macbook.jpg";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box width="100%" height={600}>
        <Image
          alt="blue elephant on macbook"
          objectFit="cover"
          width="100%"
          height="100%"
          src={blueElephantOnMacbookImage}
        />
      </Box>
      <main>
        <Container as="section" paddingY={8} maxWidth={1024}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box as="h2" fontSize="3xl" fontWeight="bold" marginBottom={4}>
              Companies
            </Box>
            <Link as={RouterLink} to="/companies" fontSize="xl">
              View All
            </Link>
          </Flex>
          <Grid height={700} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem rowSpan={2} colSpan={2} height="100%" w="100%">
              <Box
                width="100%"
                height="100%"
                backgroundColor="gray.200"
                borderRadius="md"
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} height="100%" w="100%">
              <Box
                width="100%"
                height="100%"
                backgroundColor="gray.200"
                borderRadius="md"
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} height="100%" w="100%">
              <Box
                width="100%"
                height="100%"
                backgroundColor="gray.200"
                borderRadius="md"
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2} height="100%" w="100%">
              <Box
                width="100%"
                height="100%"
                backgroundColor="gray.200"
                borderRadius="md"
              />
            </GridItem>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;
