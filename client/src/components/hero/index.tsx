import {
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  IconButton,
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
  const {
    queryRef,
    handleSearchSubmit,
    businessOperationsRef,
    handleScrollClick,
    isLeftScrollable,
    isRightScrollable,
  } = useFunctions();

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
        <Flex rounded="lg" overflow="hidden" position="relative" gap={2} mx={8}>
          <IconButton
            opacity={Number(isLeftScrollable)}
            onClick={() => handleScrollClick("left")}
            zIndex={1}
            position="absolute"
            left={0}
            size="xs"
            aria-label=""
            icon={<Icon icon="lucide:arrow-left" />}
          />
          <Flex
            ref={businessOperationsRef}
            width="454px"
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
            overflow="scroll"
            gap={2}
          >
            <Button
              _hover={{
                backgroundColor: "brand.100",
              }}
              lineHeight={6}
              fontWeight="400"
              fontSize={14}
              backgroundColor="brand.50"
              color="black"
              height="auto"
              px={4}
              variant="ghost"
              flexShrink={0}
            >
              จำหน่ายและผลิตโปรแกรม...
            </Button>
            <Button
              _hover={{
                backgroundColor: "brand.100",
              }}
              lineHeight={6}
              fontWeight="400"
              fontSize={14}
              backgroundColor="brand.50"
              color="black"
              height="auto"
              px={4}
              variant="ghost"
              flexShrink={0}
            >
              จำหน่ายและผลิตโปรแกรม...
            </Button>
            <Button
              _hover={{
                backgroundColor: "brand.100",
              }}
              lineHeight={6}
              fontWeight="400"
              fontSize={14}
              backgroundColor="brand.50"
              color="black"
              height="auto"
              px={4}
              variant="ghost"
              flexShrink={0}
            >
              จำหน่ายและผลิตโปรแกรม...
            </Button>
            <Button
              _hover={{
                backgroundColor: "brand.100",
              }}
              lineHeight={6}
              fontWeight="400"
              fontSize={14}
              backgroundColor="brand.50"
              color="black"
              height="auto"
              px={4}
              variant="ghost"
              flexShrink={0}
            >
              จำหน่ายและผลิตโปรแกรม...
            </Button>
            <Button
              _hover={{
                backgroundColor: "brand.100",
              }}
              lineHeight={6}
              fontWeight="400"
              fontSize={14}
              backgroundColor="brand.50"
              color="black"
              height="auto"
              px={4}
              variant="ghost"
              flexShrink={0}
            >
              จำหน่ายและผลิตโปรแกรม...
            </Button>
          </Flex>
          <IconButton
            opacity={Number(isRightScrollable)}
            onClick={() => handleScrollClick("right")}
            zIndex={1}
            position="absolute"
            right={0}
            size="xs"
            aria-label=""
            icon={<Icon icon="lucide:arrow-right" />}
          />
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
        zIndex={-1}
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
        zIndex={-1}
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
        zIndex={-1}
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
        zIndex={-1}
        position="absolute"
        width={299}
        height={199}
        src={hero6}
        boxShadow="base"
      />
    </Container>
  );
};
