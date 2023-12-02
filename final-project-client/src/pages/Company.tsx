import { Text, Container, Heading, Image } from "@chakra-ui/react";

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
        <Heading mt={4} as="h1" size="md" marginBottom={2}>
          MFEC Public Company Limited Limited Limited Limited Limited Limited
        </Heading>
        <Text>
          349 SJ Infinite One Business Complex, Vibhavadi Rangsit Rd, Chompol,
          Chatuchak, Bangkok 10900
        </Text>
      </Container>
    </div>
  );
};
export default Company;
