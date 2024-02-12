import {
  Box,
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
    <Box
      backgroundImage="radial-gradient(#fff 10%, #f0f0f0 10%, #f0f0f0 90%, #fff 90%)"
      _dark={{
        backgroundImage:
          "radial-gradient(#1A202C 10%, #2D3748 10%, #2D3748 90%, #1A202C 90%)",
      }}
      backgroundSize="300px 300px"
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
      py={250}
    >
      <Container
        position="relative"
        display="flex"
        justifyContent="center"
        maxWidth={1024}
      >
        <Flex flexDirection="column" gap={4} alignItems="center">
          <Heading textAlign="center" fontSize={48} as="h1">
            <Text
              display="inline-block"
              bgGradient="linear(to-l, #A366FF, #6E2996)"
              _dark={{
                bgGradient: "linear(to-l, #C399FF, #A366FF)",
              }}
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
              <Input
                bg="white"
                _dark={{
                  bg: "gray.800",
                }}
                ref={queryRef}
                placeholder="กรอกคำค้นหา"
              />
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
          top="-50%"
          position="absolute"
          width={300}
          height={200}
          src={hero1}
          boxShadow="base"
        />
        <Image
          objectFit="cover"
          rounded="lg"
          left="-5%"
          top="20%"
          position="absolute"
          width={241}
          height={145}
          src={hero2}
          boxShadow="base"
        />
        <Image
          objectFit="cover"
          rounded="lg"
          left="-10%"
          top="100%"
          position="absolute"
          width={228}
          height={148}
          src={hero3}
          boxShadow="base"
        />
        <Image
          objectFit="cover"
          rounded="lg"
          right="-15%"
          top="-75%"
          position="absolute"
          width={283}
          height={189}
          src={hero4}
          boxShadow="base"
        />
        <Image
          objectFit="cover"
          rounded="lg"
          right="-5%"
          top="-10%"
          position="absolute"
          width={243}
          height={162}
          src={hero5}
          boxShadow="base"
        />
        <Image
          objectFit="cover"
          rounded="lg"
          right="-20%"
          top="75%"
          position="absolute"
          width={299}
          height={199}
          src={hero6}
          boxShadow="base"
        />
      </Container>
    </Box>
  );
};
