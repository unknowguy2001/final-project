import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#E8E6FF",
        500: "#4C00FF",
        600: "#3C00DB",
        700: "#2C00B7",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
