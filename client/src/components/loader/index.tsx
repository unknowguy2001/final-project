import { Flex } from "@chakra-ui/react";
import DotLoader from "react-spinners/DotLoader";

export const Loader = () => {
  return (
    <Flex height="100dvh" justifyContent="center" alignItems="center">
      <DotLoader color="#6E2996" />
    </Flex>
  );
};
