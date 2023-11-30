import { Box, Container, Image } from "@chakra-ui/react";

const Company = () => {
  return (
    <div>
      <Container as="section" paddingY={8} maxWidth={1024}>
        <Image
          objectFit="cover"
          maxHeight="333px"
          height="100%"
          width="100%"
          src={
            "https://www.mfec.co.th/wp-content/uploads/2022/07/aboutTimeline-1.jpg"
          }
          borderRadius="md"
        />
        <Box mt={4} as="h2" fontSize="3xl" fontWeight="bold" marginBottom={4}>
          Company
        </Box>
      </Container>
    </div>
  );
};
export default Company;
