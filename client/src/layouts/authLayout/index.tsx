import { Outlet } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";

import { Unauthenticated } from "../../components/unauthenticated";

export const AuthLayout = () => {
  return (
    <Unauthenticated>
      <Flex height="100%">
        <Flex pt={20} justifyContent="center" flex={1}>
          <Flex width="100%" maxWidth={350} flexDirection="column" gap={8}>
            <Image
              src="https://app.rmutp.ac.th/alumni/img/logo-300x237.png"
              alt=""
              width="80px"
              height="63px"
            />
            <Outlet />
          </Flex>
        </Flex>
        <Box flex={1} position="relative">
          <Box position="absolute" inset={0} backgroundColor="blackAlpha.500" />
          <Image
            src="https://sci.rmutp.ac.th/web2558/wp-content/uploads/2018/08/cropped-139346.jpg"
            objectFit="cover"
            objectPosition="center"
            height="100%"
            alt="RMUTP Place"
          />
        </Box>
      </Flex>
    </Unauthenticated>
  );
};
