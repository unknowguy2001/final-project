import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box bgColor="gray.800" color="white" as="footer">
      <Container paddingY={8} maxWidth={1024}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Image
            width={200}
            height={40.67}
            src="https://www.rmutp.ac.th/web2561/wp-content/uploads/2018/06/rmutp-logo.png"
          />
          <Flex gap={12}>
            <Link to="/" as={RouterLink}>
              หลักแรก
            </Link>
            <Link to="/companies" as={RouterLink}>
              บริษัท
            </Link>
            <Link to="/forums" as={RouterLink}>
              กระทู้
            </Link>
            <Link>แบบสอบถาม</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
