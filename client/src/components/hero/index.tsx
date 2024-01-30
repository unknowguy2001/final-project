import {
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import { useFunctions } from "./useFunctions";
import hero1 from "../../assets/images/hero/1.png";
import hero2 from "../../assets/images/hero/2.png";
import hero3 from "../../assets/images/hero/3.png";
import hero4 from "../../assets/images/hero/4.png";
import hero5 from "../../assets/images/hero/5.png";
import hero6 from "../../assets/images/hero/6.png";

export const Hero = () => {
  const { queryRef, handleSearchSubmit } = useFunctions();

  return (
    <Container
      position="relative"
      display="flex"
      justifyContent="center"
      my={250}
      maxWidth={1024}
    >
      <Flex flexDirection="column" gap={4} alignItems="center">
        <Heading textAlign="center" fontSize={48} as="h1">
          <Text
            display="inline-block"
            bgGradient="linear(to-l, #6E2996, #FF0099)"
            bgClip="text"
          >
            Discover
          </Text>
          {` `}
          your ideal
          <br />
          internship destination
        </Heading>
        <Text>
          Embark on a Journey · Uncover Opportunities · Shape Your Future
        </Text>
        <Flex
          onSubmit={handleSearchSubmit}
          as="form"
          gap={4}
          px={4}
          width="100%"
        >
          <FormControl flex={1}>
            <Input ref={queryRef} placeholder="กรอกคำค้นหา" />
          </FormControl>
          <Button type="submit" rightIcon={<Icon icon="lucide:search" />}>
            ค้นหาบริษัท
          </Button>
        </Flex>
      </Flex>
      <Image
        objectFit="cover"
        rounded="lg"
        left="-15%"
        top="-65%"
        position="absolute"
        width={250}
        height={160}
        src={hero1}
        boxShadow="base"
      />
      <Image
        objectFit="cover"
        rounded="lg"
        left="-2.5%"
        top="0"
        zIndex={-1}
        position="absolute"
        width={190}
        height={120}
        src={hero2}
        boxShadow="base"
      />
      <Image
        objectFit="cover"
        rounded="lg"
        left="-10%"
        bottom="-50%"
        zIndex={-1}
        position="absolute"
        width={200}
        height={130}
        src={hero3}
        boxShadow="base"
      />
      <Image
        objectFit="cover"
        rounded="lg"
        right="-15%"
        top="-75%"
        position="absolute"
        width={225}
        height={150}
        src={hero4}
        boxShadow="base"
      />
      <Image
        objectFit="cover"
        rounded="lg"
        right="-5%"
        top="-20%"
        zIndex={-1}
        position="absolute"
        width={197}
        height={131}
        src={hero5}
        boxShadow="base"
      />
      <Image
        objectFit="cover"
        rounded="lg"
        right="-15%"
        bottom="-40%"
        zIndex={-1}
        position="absolute"
        width={241}
        height={160}
        src={hero6}
        boxShadow="base"
      />
    </Container>
  );
};
