import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, Image } from "@chakra-ui/react";

import blueElephantOnMacbookImage from "../assets/images/blue-elephant-on-macbook.jpg";

const Hero = () => {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      position="relative"
      height={500}
    >
      <Image
        zIndex={-1}
        alt="blue elephant on macbook"
        objectFit="cover"
        width="100%"
        height="100%"
        position="absolute"
        left={0}
        top={0}
        src={blueElephantOnMacbookImage}
      />
      <Box
        zIndex={-1}
        width="100%"
        height="100%"
        position="absolute"
        left={0}
        top={0}
        bg="blackAlpha.300"
      />
      <Container maxWidth={1024}>
        <Heading fontSize={64} as="h1" color="white">
          Discover
          <br />
          Your Ideal
          <br />
          Internship
          <br />
          Destination
        </Heading>
        <Button
          to="/companies"
          as={Link}
          mt={4}
          rightIcon={<ChevronRightIcon boxSize={5} />}
        >
          Explore Opportunities
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
