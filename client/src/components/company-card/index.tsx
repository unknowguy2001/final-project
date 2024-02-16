import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Rating } from "@smastrom/react-rating";

import useFunctions from "./useFunctions";
import { Company } from "../../interfaces/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const {
    cardRef,
    floatingCircleRef,
    handleClick,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useFunctions({
    company,
  });

  return (
    <Card
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      variant="filled"
      height="100%"
      borderRadius="md"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      bg="white"
      _dark={{
        bg: "transparent",
        borderColor: "gray.600",
        _after: {
          bg: "gray.700",
        },
      }}
      transition="all 0.5s"
      position="relative"
      cursor="pointer"
      _after={{
        content: `""`,
        height: 0,
        width: 0,
        position: "absolute",
        bottom: 0,
        right: 0,
        bg: "blackAlpha.300",
        borderTopLeftRadius: "100%",
        backgroundColor: "brand.50",
        transition: "all 0.5s",
      }}
      _hover={{
        borderColor: "gray.500",
        _after: {
          width: "200%",
          height: "200%",
        },
      }}
    >
      <CardHeader zIndex={1} p={0}>
        <Image
          objectFit="cover"
          height="250px"
          width="100%"
          src="/company.jpg"
        />
      </CardHeader>
      <CardBody zIndex={1} bgColor="transparent">
        <Heading noOfLines={1} as="h3" size="base" mb={2}>
          {company?.name}
        </Heading>
        <Text noOfLines={2} mb={2}>
          {company?.address} {company?.road} {company?.village}{" "}
          {company?.district} {company?.province} {company?.zipcode}
          {[
            company?.address,
            company?.road,
            company?.village,
            company?.district,
            company?.province,
            company?.zipcode,
          ].some((item) => item) && <br />}
        </Text>
        <Flex gap={1} alignItems="center">
          <Box maxWidth="70px">
            <Rating readOnly value={company?.averageRating} />
          </Box>
          <Text
            color="brand.500"
            _dark={{
              color: "brand.300",
            }}
            fontWeight={500}
            fontSize="xs"
          >
            {company?.averageRating}/5
          </Text>
          <Text fontSize="xs">({company?.reviewCount} รีวิว)</Text>
        </Flex>
      </CardBody>
      <Circle
        transition="transform 0.25s, left 0.125s, top 0.125s, opacity 0.25s"
        ref={floatingCircleRef}
        opacity={0}
        position="absolute"
        transform="scale(0.5) translate(-50%, -50%)"
        padding={2}
        bgColor="white"
        zIndex={2}
        _dark={{
          bgColor: "gray.800",
        }}
      >
        <Icon icon="lucide:arrow-up-right" />
      </Circle>
    </Card>
  );
};

export default CompanyCard;
