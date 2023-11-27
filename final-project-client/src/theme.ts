import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      brand: {
        500: "#4C00FF",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
