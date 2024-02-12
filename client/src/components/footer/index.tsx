import { useEffect, useRef } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footerHeight = footerRef.current?.offsetHeight;
    document.body.style.paddingBottom = `${footerHeight || 0}px`;

    return () => {
      document.body.style.paddingBottom = "0";
    };
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
    >
      <Container paddingY={8} maxWidth={1024}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Image
            width={200}
            height={40.67}
            src="https://www.rmutp.ac.th/web2561/wp-content/uploads/2018/06/rmutp-logo.png"
          />
          <Flex gap={12}>
            <Link to="/" as={ReactRouterDomLink}>
              หลักแรก
            </Link>
            <Link to="/companies" as={ReactRouterDomLink}>
              บริษัท
            </Link>
            <Link to="/forums" as={ReactRouterDomLink}>
              กระทู้
            </Link>
            <Link>แบบสอบถาม</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
