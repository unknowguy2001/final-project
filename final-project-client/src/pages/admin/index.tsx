import { Link } from "react-router-dom";
import { Button, Container, Heading } from "@chakra-ui/react";

export const Admin = () => {
  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Heading as="h1" fontSize="3xl">
        หน้าแอดมิน
      </Heading>
      <Button variant="outline" to="/admin/companies" as={Link} mt={4}>
        จัดการบริษัท
      </Button>
    </Container>
  );
};
