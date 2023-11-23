import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: props.colorMode === "dark" ? "purple.900" : "purple.100",
          color: props.colorMode === "dark" ? "white" : "black",
          _hover: {
            bg: props.colorMode === "dark" ? "purple.600" : "purple.200",
          },
          _active: {
            bg: props.colorMode === "dark" ? "purple.500" : "purple.300",
          },
        }),
      },
    },
  },
});

export default theme;
