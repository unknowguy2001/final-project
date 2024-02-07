import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  // initialColorMode: "dark",
};

export const theme = extendTheme(
  {
    config,
    colors: {
      brand: {
        25: "#FDF2FF",
        50: "#F5E6FF",
        100: "#E6CFFF",
        500: "#6E2996",
        600: "#5B1E84",
        700: "#4A1870",
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: "lg",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
