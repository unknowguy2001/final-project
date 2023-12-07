import {
  Card,
  CardBody,
  CardHeader,
  Circle,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import { useFunctions } from "./useFunctions";
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
          src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </CardHeader>
      <CardBody zIndex={1} bgColor="transparent">
        <Heading as="h3" size="md" mb={2}>
          {company?.name}
        </Heading>
        <Text mb={2}>
          {company?.address} {company?.road} {company?.village}{" "}
          {company?.district} {company?.province} {company?.zipcode}
        </Text>
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
      >
        <Icon icon="lucide:arrow-up-right" />
      </Circle>
    </Card>
  );
};

export default CompanyCard;
