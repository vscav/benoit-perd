import { createBox, createText } from "@shopify/restyle";

const theme = {
  colors: {
    primary: "#2cb9b0",
    secondary: "#0c0d34",
    text: "rgba(12, 13, 52, .7)",
    white: "#fff",
    grey: "rgba(12, 13, 52, .05)",
    disabled: "rgba(12, 13, 52, .5)",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
    },
  },
  breakpoints: {},
};

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
