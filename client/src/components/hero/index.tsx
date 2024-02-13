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
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useFunctions } from "./useFunctions";
import hero1 from "../../assets/images/hero/1.png";
import hero2 from "../../assets/images/hero/2.jpg";
import hero3 from "../../assets/images/hero/3.png";
import hero4 from "../../assets/images/hero/4.png";
import hero5 from "../../assets/images/hero/5.png";
import hero6 from "../../assets/images/hero/6.png";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from("#hero1", {
        x: 300,
        y: 100,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero2", {
        x: 200,
        y: 0,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero3", {
        x: 350,
        y: -50,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero4", {
        x: -450,
        y: 125,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero5", {
        x: -400,
        y: 150,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero6", {
        x: -525,
        y: -75,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.inOut",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
        delay: 1,
      });
      tl.to(
        "#hero1",
        {
          y: container.current!.offsetHeight * 0.25,
          ease: "none",
        },
        "<"
      )
        .to(
          "#hero2",
          {
            y: container.current!.offsetHeight * 0.125,
            ease: "none",
          },
          "<"
        )
        .to(
          "#hero3",
          {
            y: container.current!.offsetHeight * 0.125,
            ease: "none",
          },
          "<"
        )
        .to(
          "#hero4",
          {
            y: container.current!.offsetHeight * 0.25,
            ease: "none",
          },
          "<"
        )
        .to(
          "#hero5",
          {
            y: container.current!.offsetHeight * 0.125,
            ease: "none",
          },
          "<"
        )
        .to(
          "#hero6",
          {
            y: container.current!.offsetHeight * -0.075,
            ease: "none",
          },
          "<"
        );
    },
    { scope: container }
  );
  const { queryRef, handleSearchSubmit } = useFunctions();

  return (
    <Box
      id="hero"
      ref={container}
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
        maxWidth="6xl"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex id="hero-content" flexDirection="column" alignItems="center">
          <Heading mb={2} textAlign="center" fontSize={56} as="h1" zIndex={500}>
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
            Internship destination
          </Heading>
          <Text>
            Embark on a Journey
            {` `}
            <Text as="span" color="brand.500">
              ·
            </Text>
            {` `}
            Uncover Opportunities
            {` `}
            <Text as="span" color="brand.500">
              ·
            </Text>
            {` `}
            Shape Your Future
          </Text>
          <Flex
            mt={4}
            onSubmit={handleSearchSubmit}
            as="form"
            gap={4}
            width="80%"
          >
            <FormControl flex={1}>
              <Input
                bg="white"
                _dark={{
                  bg: "gray.800",
                }}
                ref={queryRef}
                placeholder="ค้นหา"
              />
            </FormControl>
            <Button type="submit" rightIcon={<Icon icon="lucide:search" />}>
              ค้นหาบริษัท
            </Button>
          </Flex>
        </Flex>
        <Image
          id="hero1"
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
          id="hero2"
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
          id="hero3"
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
          id="hero4"
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
          id="hero5"
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
          id="hero6"
          objectFit="cover"
          rounded="lg"
          right="-15%"
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
