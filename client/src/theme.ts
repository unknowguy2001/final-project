import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      brand: {
        25: "#FDF2FF",
        50: "#F5E6FF",
        100: "#E6CFFF",
        300: "#C399FF",
        350: "#B88AFF",
        400: "#A366FF",
        500: "#6E2996",
        600: "#5B1E84",
        700: "#4A1870",
      },
      orange: {
        250: "#F9C66A",
      },
      gray: {
        650: "#2D3748",
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "normal",
        },
        variants: {
          solid: {
            _dark: {
              bg: "brand.500",
              color: "white",
              _hover: {
                bg: "brand.600",
              },
              _active: {
                bg: "brand.700",
              },
            },
          },
          ghost: {
            color: "black",
            _hover: {
              color: "brand.700",
            },
          },
          outline: {
            _dark: {
              color: "white",
              borderColor: "brand.500",
              _hover: {
                bg: "gray.700",
              },
            },
          },
        },
      },
      Table: {
        variants: {
          simple: {
            th: {
              borderColor: "brand.100",
              _dark: {
                borderColor: "gray.600",
              },
            },
            td: {
              borderColor: "brand.100",
              _dark: {
                borderColor: "gray.600",
              },
            },
          },
        },
      },
      Badge: {
        variants: {
          outline: {
            _dark: {
              color: "white",
              bg: "brand.500",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
