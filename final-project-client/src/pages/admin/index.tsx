import { Link } from "react-router-dom";
import { Button, Container, Flex, Heading } from "@chakra-ui/react";

export const Admin = () => {
  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Heading as="h1" fontSize="3xl">
        หน้าแอดมิน
      </Heading>
      <Flex alignItems="center" gap={4} mt={4}>
        <Button variant="outline" to="/admin/users" as={Link}>
          จัดการผู้ใช้
        </Button>
        <Button variant="outline" to="/admin/companies" as={Link}>
          จัดการบริษัท
        </Button>
      </Flex>
    </Container>
  );
};
