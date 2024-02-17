import { useEffect, useRef } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import { getGoogleFormUrl } from "../../services/commonService";

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const handleGoogleFormClick = () => {
    getGoogleFormUrl().then((response) => {
      window.open(response.data.url, "_blank");
    });
  };

  const calculatePaddingBottom = () => {
    const footerHeight = footerRef.current?.offsetHeight;
    document.body.style.paddingBottom = `${footerHeight || 0}px`;
  };

  useEffect(() => {
    calculatePaddingBottom();

    return () => {
      document.body.style.paddingBottom = "0px";
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", calculatePaddingBottom);

    return () => document.removeEventListener("resize", calculatePaddingBottom);
  }, []);

  return (
    <Box
      ref={footerRef}
      pos="absolute"
      bottom={0}
      width="100%"
      bgColor="gray.800"
      _dark={{ bgColor: "#2D3748" }}
      color="white"
      as="footer"
      zIndex={997}
    >
      <Container paddingY={8} maxWidth="6xl">
        <Flex
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={4}
        >
          <Image width={200} height={40.67} src="/rmutp-full-logo.png" />
          <Flex flexWrap="wrap" gap={12}>
            <Link to="/" as={ReactRouterDomLink}>
              หลักแรก
            </Link>
            <Link to="/companies" as={ReactRouterDomLink}>
              บริษัท
            </Link>
            <Link to="/forums" as={ReactRouterDomLink}>
              กระทู้
            </Link>
            <Link onClick={handleGoogleFormClick}>แบบสอบถาม</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
