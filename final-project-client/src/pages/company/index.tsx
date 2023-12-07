import {
  Text,
  Container,
  Heading,
  Image,
  Box,
  Flex,
  Button,
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
import { Icon } from "@iconify/react";
import { formatDistance } from "date-fns";
import { Rating } from "@smastrom/react-rating";

import { useFunctions } from "./useFunctions";

export const Company = () => {
  const {
    company,
    canReview,
    onOpen,
    isOpen,
    handleClose,
    rating,
    setRating,
    descriptionRef,
    handleReviewClick,
    handleDeleteReviewClick,
    handleEditReviewClick,
    formattedAverageRating,
    averageRating,
    authInfo,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
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
            <Icon icon="lucide:map-pin" />
            <Text>ที่อยู่</Text>
          </Flex>
          <Text>
            {company?.address} {company?.road} {company?.village}{" "}
            {company?.district} {company?.province} {company?.zipcode}
          </Text>
        </Flex>
        <Flex alignItems="center" gap={8} mt={4}>
          <Flex alignItems="center" gap={2}>
            <Icon icon="lucide:phone" />
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
          {canReview && (
            <Button onClick={onOpen} variant="outline">
              เขียนรีวิว
            </Button>
          )}
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
                  onClick={() => handleEditReviewClick(review.id)}
                  aria-label="edit"
                  icon={<Icon icon="lucide:pen" />}
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  onClick={() => handleDeleteReviewClick(review.id)}
                  aria-label="delete"
                  icon={<Icon icon="lucide:trash" />}
                  variant="ghost"
                  size="sm"
                />
              </Flex>
            )}
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
