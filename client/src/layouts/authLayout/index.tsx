import { Outlet } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";

import { Unauthenticated } from "../../components/unauthenticated";

export const AuthLayout = () => {
  return (
    <Unauthenticated>
      <Flex height="100dvh">
        <Flex pt={20} justifyContent="center" flex={1}>
          <Flex width="100%" maxWidth={400} flexDirection="column" gap={8}>
            <Image src="/rmutp-logo.png" alt="" width="80px" height="63px" />
            <Outlet />
          </Flex>
        </Flex>
        <Box flex={1}>
          <Image
            src="/science-and-technology-building.jpg"
            objectFit="cover"
            objectPosition="center"
            height="100%"
            alt=""
          />
        </Box>
      </Flex>
    </Unauthenticated>
  );
};
