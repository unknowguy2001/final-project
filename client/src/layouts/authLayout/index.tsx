import { Outlet } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";

import rmutpLogo from "../../assets/images/rmutp-logo.png";
import { Unauthenticated } from "../../components/unauthenticated";
import scienceAndTechnologyBuildingImage from "../../assets/images/science-and-technology-building.jpg";

export const AuthLayout = () => {
  return (
    <Unauthenticated>
      <Flex height="100dvh">
        <Flex pt={20} justifyContent="center" flex={1}>
          <Flex width="100%" maxWidth={400} flexDirection="column" gap={8}>
            <Image src={rmutpLogo} alt="" width="80px" height="63px" />
            <Outlet />
          </Flex>
        </Flex>
        <Box flex={1}>
          <Image
            src={scienceAndTechnologyBuildingImage}
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
