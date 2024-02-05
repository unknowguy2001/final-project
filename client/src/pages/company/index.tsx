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
  Badge,
  CardBody,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Rating } from "@smastrom/react-rating";

import { useFunctions } from "./useFunctions";
import { formatDistanceToNow } from "../../utils/dateUtils";
import { UserProfile } from "../../components/user-profile";

export const Company = () => {
  const {
    company,
    canReview,
    isOpen,
    onClose,
    rating,
    setRating,
    descriptionRef,
    handleReviewClick,
    handleDeleteReviewClick,
    handleEditReviewClick,
    formattedAverageRating,
    averageRating,
    authInfo,
    hashtags,
    isSelectedHashtag,
    handleHashtagClick,
    openReviewModal,
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
            รีวิวบริษัท
          </Heading>
          {canReview && (
            <Button onClick={openReviewModal} variant="outline">
              เขียนรีวิว
            </Button>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>ริวิวบริษัท</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading mb={2} fontSize="md" fontWeight="normal">
                  ความพึ่งพอใจ
                </Heading>
                <Flex alignItems="center" gap={2} mb={4}>
                  <Box maxWidth="150px">
                    <Rating
                      value={rating}
                      onChange={(ratingChange: number) => {
                        setRating(ratingChange);
                      }}
                    />
                  </Box>
                  {rating ? (
                    <Text fontSize="sm">
                      {rating === 1
                        ? "ไม่พอใจเลย"
                        : rating === 2
                          ? "พอใจน้อย"
                          : rating === 3
                            ? "พอใจ"
                            : rating === 4
                              ? "พอใจมาก"
                              : "พอใจมากที่สุด"}
                    </Text>
                  ) : null}
                </Flex>
                <Text mb={2}>คำอธิบาย</Text>
                <Textarea ref={descriptionRef} rows={4} resize="none" />
                <Flex mt={4} wrap="wrap" gap={2}>
                  {hashtags.map((hashtag) => (
                    <Button
                      py={0.5}
                      px={1.5}
                      key={hashtag.id}
                      size="xs"
                      onClick={() => handleHashtagClick(hashtag.id)}
                      variant="outline"
                      backgroundColor={
                        isSelectedHashtag(hashtag.id)
                          ? "brand.500"
                          : "transparent"
                      }
                      color={
                        isSelectedHashtag(hashtag.id) ? "white" : "brand.500"
                      }
                      _hover={{
                        backgroundColor: isSelectedHashtag(hashtag.id)
                          ? "brand.600"
                          : "brand.50",
                      }}
                      borderColor="brand.500"
                    >
                      {hashtag.name}
                    </Button>
                  ))}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  ยกเลิก
                </Button>
                <Button onClick={handleReviewClick}>ส่งรีวิว</Button>
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
            <Text pl={1}>{company?.reviews.length} รีวิว</Text>
          </Flex>
        </Flex>
      </Box>
      <Stack mt={4} gap={8}>
        {company?.reviews.map((review) => (
          <Card variant="outline" key={review.id}>
            <CardBody>
              <Flex gap={4} justifyContent="space-between" align="center">
                <UserProfile fullname={review.reviewer} />
                <Text fontSize="sm">
                  {formatDistanceToNow(review.createdAt)}
                </Text>
              </Flex>
              <Flex my={2} align="center" gap={4} justify="space-between">
                <Box maxWidth="100px">
                  <Rating readOnly value={review.rating} />
                </Box>
                {authInfo.user?.username === review.reviewerUsername && (
                  <Box>
                    <IconButton
                      onClick={() => handleEditReviewClick(review.id)}
                      aria-label="edit"
                      icon={<Icon icon="lucide:pen" />}
                      variant="ghost"
                      size="sm"
                    />
                    <IconButton
                      onClick={() => {
                        handleDeleteReviewClick(review.id);
                      }}
                      aria-label="delete"
                      icon={<Icon icon="lucide:trash" />}
                      variant="ghost"
                      size="sm"
                    />
                  </Box>
                )}
              </Flex>
              {review?.hashtags?.length > 0 && (
                <Flex mb={4} wrap="wrap" gap={2}>
                  {review?.hashtags?.map((hashtag) => (
                    <Badge
                      py={0.5}
                      px={1.5}
                      rounded="lg"
                      variant="outline"
                      key={hashtag.id}
                    >
                      {hashtag.name}
                    </Badge>
                  ))}
                </Flex>
              )}
              {review?.review && <Text>{review.review}</Text>}
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
