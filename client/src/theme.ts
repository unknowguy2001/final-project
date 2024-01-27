import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#F5E6FF",
        500: "#6E2996",
        600: "#5B1E84",
        700: "#4A1870",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
