import layout from "./layout";
const { width, height } = layout.window;

export const COLORS = {
  // base colors
  primary: "#03174C", // dark blue
  secondary: "#CDCDD2", // blue
  accent: "#CDCDD2", // purple

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",

  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  //h1: { fontFamily: "PoppinsBold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "PoppinsMedium", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "PoppinsMedium", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "PoppinsMedium", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
