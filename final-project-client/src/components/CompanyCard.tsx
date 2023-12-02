import {
  Card,
  CardBody,
  CardHeader,
  Circle,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

import { Company } from "../hooks/usePopularCompanies";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingCircleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/companies/${company.id}`);
  };

  return (
    <Card
      ref={cardRef}
      onMouseEnter={() => {
        if (floatingCircleRef.current) {
          floatingCircleRef.current.style.opacity = "1";
          floatingCircleRef.current.style.transform =
            "scale(1.25) translate(-50%, -50%)";
        }
      }}
      onMouseMove={(e) => {
        const { x, y } = cardRef.current!.getBoundingClientRect();
        if (floatingCircleRef.current) {
          floatingCircleRef.current.style.left = `${e.clientX - x}px`;
          floatingCircleRef.current.style.top = `${e.clientY - y}px`;
        }
      }}
      onMouseLeave={() => {
        if (floatingCircleRef.current) {
          floatingCircleRef.current.style.opacity = "0";
          floatingCircleRef.current.style.transform =
            "scale(0.5) translate(-50%, -50%)";
        }
      }}
      onClick={() => handleCardClick()}
      variant="filled"
      height="100%"
      borderRadius="md"
      boxShadow="sm"
      border="1px solid black"
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
          src={
            "https://www.mfec.co.th/wp-content/uploads/2022/07/aboutTimeline-1.jpg"
          }
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
        top={0}
        left={0}
        transform="scale(0.5) translate(-50%, -50%)"
        padding={2}
        bgColor="white"
        zIndex={2}
      >
        <LuArrowUpRight size="24" />
      </Circle>
    </Card>
  );
};

export default CompanyCard;
