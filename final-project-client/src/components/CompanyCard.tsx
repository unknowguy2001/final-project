import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const CompanyCard = ({ company }: { company: { id: number } }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/companies/${company.id}`);
  };

  return (
    <Card
      onClick={() => handleCardClick()}
      cursor="pointer"
      overflow="hidden"
      variant="filled"
      height="100%"
    >
      <CardHeader height="100%" p={0}>
        <Image
          objectFit="cover"
          maxHeight="200px"
          height="100%"
          width="100%"
          src={
            "https://www.mfec.co.th/wp-content/uploads/2022/07/aboutTimeline-1.jpg"
          }
        />
      </CardHeader>
      <CardBody bgColor="brand.50">
        <Heading isTruncated as="h3" size="md" marginBottom={2}>
          MFEC Public Company Limited Limited Limited Limited Limited Limited
        </Heading>
        <Text isTruncated>
          349 SJ Infinite One Business Complex, Vibhavadi Rangsit Rd, Chompol,
          Chatuchak, Bangkok 10900
        </Text>
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
