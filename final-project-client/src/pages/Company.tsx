import {
  Text,
  Container,
  Heading,
  Image,
  Box,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Stack,
  Card,
  IconButton,
} from "@chakra-ui/react";
import { th } from "date-fns/locale";
import { useRef, useState } from "react";
import { formatDistance } from "date-fns";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { LuMapPin, LuPen, LuPhone, LuTrash } from "react-icons/lu";

import axiosInstance from "../axiosInstance";
import useCompany from "../hooks/useCompany";
import { useAuth } from "../contexts/authContext";

const Company = () => {
  const { authInfo } = useAuth();
  const { companyId } = useParams<{
    companyId: string;
  }>();
  const { company, fetchCompany } = useCompany(companyId!);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const averageRating = company?.averageRating || 0;
  const formattedAverageRating = averageRating.toFixed(1);

  const handleClose = () => {
    onClose();
    setRating(0);
  };

  const handleReviewClick = async () => {
    await axiosInstance.post(`/companies/${companyId}/reviews`, {
      rating,
      description: descriptionRef.current!.value,
    });
    onClose();
    setRating(0);
    await fetchCompany();
  };

  const handleDeleteReviewClick = async (reviewId: number) => {
    await axiosInstance.delete(`/companies/${companyId}/reviews/${reviewId}`);
    await fetchCompany();
  };

  const handleEditReviewClick = async () => {};

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
        <Box mt={8}>
          <Heading as="h1" fontSize="4xl">
            {company?.name}
          </Heading>
          <Flex alignItems="center" gap={8} mt={4}>
            <Flex alignItems="center" gap={2}>
              <LuMapPin />
              <Text>ที่อยู่</Text>
            </Flex>
            <Text>
              {company?.address} {company?.road} {company?.village}{" "}
              {company?.district} {company?.province} {company?.zipcode}
            </Text>
          </Flex>
          <Flex alignItems="center" gap={8} mt={4}>
            <Flex alignItems="center" gap={2}>
              <LuPhone />
              <Text>เบอร์โทรศัพท์</Text>
            </Flex>
            <Text>{company?.telephone || "-"}</Text>
          </Flex>
        </Box>
        <Box mt={8}>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading as="h2" size="lg">
              Reviews
            </Heading>
            <Button onClick={onOpen} variant="outline">
              เขียนรีวิว
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>ริวิวบริษัท</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Heading mb={2} fontSize="md" fontWeight="normal">
                    ความพึ่งพอใจ
                  </Heading>
                  <Box mb={4} maxWidth="150px">
                    <Rating value={rating} onChange={setRating} />
                  </Box>
                  <Text mb={2}>คำอธิบาย</Text>
                  <Textarea ref={descriptionRef} rows={4} resize="none" />
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={handleReviewClick}>Confirm</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
          <Flex mt={4} gap={4} alignItems="center">
            <Heading textColor="brand.500" as="h3" size="3xl">
              {formattedAverageRating}
            </Heading>
            <Flex flexDirection="column" gap={1}>
              <Box maxWidth="150px">
                <Rating readOnly value={averageRating} />
              </Box>
              <Text pl={1}>{company?.reviews.length} Reviews</Text>
            </Flex>
          </Flex>
        </Box>
        <Stack mt={8} gap={8}>
          {company?.reviews.map((review) => (
            <Card key={review.id} p={8}>
              <Flex justifyContent="space-between">
                <Heading as="h4" size="sm">
                  {review.reviewer}
                </Heading>
                <Text>
                  {formatDistance(new Date(review.createdAt), new Date(), {
                    addSuffix: true,
                    locale: th,
                  }).replace("ประมาณ", "")}
                </Text>
              </Flex>
              <Box mt={2} maxWidth="100px">
                <Rating readOnly value={review.rating} />
              </Box>
              {review?.review && <Text mt={2}>{review.review}</Text>}
              {authInfo.user?.username === review.reviewerUsername && (
                <Flex justifyContent="end" gap={2}>
                  <IconButton
                    onClick={handleEditReviewClick}
                    aria-label="edit"
                    icon={<LuPen />}
                    variant="ghost"
                    size="sm"
                  />
                  <IconButton
                    onClick={() => handleDeleteReviewClick(review.id)}
                    aria-label="delete"
                    icon={<LuTrash />}
                    variant="ghost"
                    size="sm"
                  />
                </Flex>
              )}
            </Card>
          ))}
        </Stack>
      </Container>
    </div>
  );
};
export default Company;
