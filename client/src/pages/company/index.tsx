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
  Skeleton,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Rating } from "@smastrom/react-rating";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";

import useFunctions from "./useFunctions";
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
    isLoading,
    isReviewSubmitting,
    isReviewDeleting,
    isEditting,
    isReviewLoading,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth="6xl">
      <ParallaxBanner
        layers={[
          {
            image: "/company-high.jpg",
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
          <Box mb={4}>
            {isLoading ? (
              <Skeleton height={8} width={500} />
            ) : (
              <Heading as="h1" fontSize="3xl">
                {company?.name}
              </Heading>
            )}
          </Box>
          <Flex>
            <IconButton
              _dark={{
                color: "white",
              }}
              aria-label="info"
              as={ReactRouterDomLink}
              to={`https://www.google.com/search?q=ข้อมูล+${company?.name}`}
              target="_blank"
              variant="ghost"
              icon={<Icon icon="lucide:info" />}
            />
            <IconButton
              _dark={{
                color: "white",
              }}
              aria-label="map"
              as={ReactRouterDomLink}
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
                {isLoading ? (
                  <Skeleton height={4} width={300} />
                ) : (
                  <Text textAlign="center">
                    {company?.address} {company?.road} {company?.village}{" "}
                    {company?.district} {company?.province} {company?.zipcode}
                  </Text>
                )}
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
                {isLoading ? (
                  <Skeleton height={4} width={150} />
                ) : (
                  <Text textAlign="center">{company?.telephone || "-"}</Text>
                )}
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
              สร้างรีวิว
            </Button>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isEditting ? "แก้ไขรีวิว" : "สร้างรีวิว"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading mb={2} fontSize="md" fontWeight="normal">
                  คะแนน
                </Heading>
                <Flex alignItems="center" gap={2} mb={4}>
                  <Box maxWidth="150px">
                    <Rating
                      isDisabled={isReviewSubmitting || isReviewLoading}
                      value={rating}
                      onChange={(ratingChange: number) => {
                        setRating(ratingChange);
                      }}
                    />
                  </Box>
                  {rating ? (
                    <Text fontSize="sm">
                      {rating === 1
                        ? "แย่"
                        : rating === 2
                          ? "พอใช้"
                          : rating === 3
                            ? "ดี"
                            : rating === 4
                              ? "ดีมาก"
                              : "ยอดเยี่ยม"}
                    </Text>
                  ) : null}
                </Flex>
                <Text mb={2}>คำอธิบาย</Text>
                <Textarea
                  isDisabled={isReviewSubmitting || isReviewLoading}
                  ref={descriptionRef}
                  rows={4}
                  resize="none"
                />
                <Flex mt={4} wrap="wrap" gap={2}>
                  {hashtags.map((hashtag) => (
                    <Button
                      isDisabled={isReviewSubmitting || isReviewLoading}
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
                <Button
                  isDisabled={isReviewSubmitting || isReviewLoading}
                  mr={2}
                  variant="outline"
                  colorScheme="red"
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
                <Button
                  isDisabled={isReviewLoading}
                  isLoading={isReviewSubmitting}
                  onClick={handleReviewClick}
                >
                  ยืนยัน
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Flex justify="space-between" align="center" gap={4}>
          <Flex gap={4} alignItems="center">
            <Heading
              textColor="brand.500"
              _dark={{
                textColor: "brand.300",
              }}
              as="h3"
              fontSize="6xl"
            >
              {formattedAverageRating}
            </Heading>
            <Flex flexDirection="column" gap={1}>
              <Box maxWidth="150px">
                <Rating readOnly value={averageRating} />
              </Box>
              <Text ml={1}>{company?.reviews.length || 0} รีวิว</Text>
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
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} height={4} width={150} rounded="lg" />
            ))
          : company?.hashtagSummary?.map((item) => (
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
                      isDisabled={isReviewDeleting}
                      onClick={() => handleEditReviewClick(review.id)}
                      aria-label="edit"
                      icon={<Icon icon="lucide:pen" />}
                      variant="ghost"
                      size="sm"
                      _dark={{
                        color: "white",
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        handleDeleteReviewClick(review.id);
                      }}
                      isLoading={isReviewDeleting}
                      aria-label="delete"
                      icon={<Icon icon="lucide:trash" />}
                      variant="ghost"
                      size="sm"
                      _dark={{
                        color: "white",
                      }}
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
