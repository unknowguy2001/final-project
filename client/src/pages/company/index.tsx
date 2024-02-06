import {
  Text,
  Container,
  Heading,
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
  Divider,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Rating } from "@smastrom/react-rating";
import { Link as RouterLink } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";

import { useFunctions } from "./useFunctions";
import { RatingSummary } from "../../interfaces/company";
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
    handleRatingFilterClick,
    filteredReviews,
    isRatingFilterSelected,
    generateGoogleMapsUrl,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <ParallaxBanner
        layers={[
          {
            image:
              "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            speed: 10,
          },
        ]}
        style={{
          height: "333px",
          borderRadius: "0.5rem",
        }}
      />
      <Box mt={8}>
        <Flex justify="space-between" gap={4}>
          <Heading as="h1" mb={4} fontSize="3xl">
            {company?.name}
          </Heading>
          <Flex>
            <IconButton
              aria-label="info"
              as={RouterLink}
              to={`https://www.google.com/search?q=ข้อมูล+${company?.name}`}
              target="_blank"
              variant="ghost"
              icon={<Icon icon="lucide:info" />}
            />
            <IconButton
              aria-label="map"
              as={RouterLink}
              to={generateGoogleMapsUrl(company)}
              target="_blank"
              variant="ghost"
              icon={<Icon icon="lucide:map" />}
            />
          </Flex>
        </Flex>
        <SimpleGrid gap={4} columns={2}>
          <Card variant="outline">
            <CardBody>
              <Flex height="full" direction="column" align="center" gap={4}>
                <Icon icon="lucide:map-pin" fontSize={24} />
                <Text textAlign="center">
                  {company?.address} {company?.road} {company?.village}{" "}
                  {company?.district} {company?.province} {company?.zipcode}
                </Text>
              </Flex>
            </CardBody>
          </Card>
          <Card variant="outline">
            <CardBody>
              <Flex
                height="full"
                justify="center"
                direction="column"
                align="center"
                gap={4}
              >
                <Icon icon="lucide:phone" fontSize={24} />
                <Text textAlign="center">{company?.telephone || "-"}</Text>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
      <Box mt={8}>
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Heading as="h2" fontSize="2xl">
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
        <Flex justify="space-between" align="center" gap={4}>
          <Flex gap={4} alignItems="center">
            <Heading textColor="brand.500" as="h3" fontSize="6xl">
              {formattedAverageRating}
            </Heading>
            <Flex flexDirection="column" gap={1}>
              <Box maxWidth="150px">
                <Rating readOnly value={averageRating} />
              </Box>
              <Text ml={1}>{company?.reviews.length} รีวิว</Text>
            </Flex>
          </Flex>
          <Flex direction="column">
            {Object.keys(company?.ratingSummary || {})
              .map((key, i) => ({
                key,
                num: i + 1,
              }))
              .reverse()
              .map(({ key, num }) => (
                <Flex key={key} alignItems="center" gap={4}>
                  <Box maxWidth="100px">
                    <Rating readOnly value={num} />
                  </Box>
                  <Progress
                    rounded="full"
                    width={150}
                    max={100}
                    value={
                      company?.ratingSummary[key as keyof RatingSummary]
                        .percentage
                    }
                  />
                  <Text fontSize="xs">
                    {company?.ratingSummary[key as keyof RatingSummary].count}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Box>
      <Flex my={4} wrap="wrap" gap={2}>
        {company?.hashtagSummary?.map((item) => (
          <Badge
            py={0.5}
            px={1.5}
            colorScheme="gray"
            rounded="lg"
            variant="subtle"
            key={item.id}
          >
            {item.name} {item.count}
          </Badge>
        ))}
      </Flex>
      <Divider my={4} />
      <Flex gap={2} mt={4}>
        {Array.from({ length: 5 }, (_, i) => (
          <Button
            key={`rating-filter-${i + 1}`}
            rounded="full"
            gap={1}
            variant="outline"
            backgroundColor={
              isRatingFilterSelected(i + 1) ? "brand.500" : "transparent"
            }
            color={isRatingFilterSelected(i + 1) ? "white" : "brand.500"}
            _hover={{
              backgroundColor: isRatingFilterSelected(i + 1)
                ? "brand.600"
                : "brand.50",
            }}
            borderColor="brand.500"
            size="sm"
            aria-label=""
            onClick={() => handleRatingFilterClick(i + 1)}
          >
            {i + 1}
            <Icon fontSize={14} icon="lucide:star" />
          </Button>
        ))}
      </Flex>
      <Stack mt={4} gap={4}>
        {filteredReviews.map((review) => (
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
        {filteredReviews.length === 0 && (
          <Card variant="outline">
            <CardBody>ไม่พบรีวิวที่ค้นหา</CardBody>
          </Card>
        )}
      </Stack>
    </Container>
  );
};
