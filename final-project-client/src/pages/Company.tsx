import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { Text, Container, Heading, Image, Box, Stack } from "@chakra-ui/react";

import useCompany from "../hooks/useCompany";

const Company = () => {
  const [rating, setRating] = useState(0);
  const { companyId } = useParams<{ companyId: string }>();
  const { company } = useCompany(companyId!);

  useEffect(() => {
    if (company) {
      setRating(company.averageRating);
    }
  }, [company]);

  return (
    <div>
      <Container as="section" paddingY={8} maxWidth={1024}>
        <Image
          objectFit="cover"
          maxHeight="333px"
          height="100%"
          width="100%"
          src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          borderRadius="md"
        />
        <Heading mt={8} as="h1" size="lg">
          {company?.name}
        </Heading>
        <Text mt={4} fontSize="lg">
          ที่อยู่: {company?.address} {company?.road} {company?.village}{" "}
          {company?.district} {company?.province} {company?.zipcode}
        </Text>
        <Text mt={4} fontSize="lg">
          เบอร์โทรศัพท์: {company?.telephone || "ไม่มี"}
        </Text>
        <Stack mt={4}>
          <Text fontSize="lg">คะแนนเฉลี่ย: {rating} / 5</Text>
          <Box maxWidth="200px">
            <Rating readOnly value={rating} />
          </Box>
        </Stack>
      </Container>
    </div>
  );
};
export default Company;
