module.exports = {
  theme: {
    extend: {},
  },
};

const colors = {
  bg: {
    base: "#f8f8f8", // Color/bg/base
    interactive: {
      primary: {
        DEFAULT: "#bdddc3", // Color/bg/interactive/primary
        hover: "#92c39f", // Color/bg/interactive/primary-hover
        press: "#59996b", // Color/bg/interactive/primary-press
      },
      secondary: {
        DEFAULT: "#f6f6f6", // Color/bg/interactive/secondary
        hover: "#e7e7e7", // Color/bg/interactive/secondary-hover
        press: "#d1d1d1", // Color/bg/interactive/secondary-press
      },
      tertiary: {
        DEFAULT: "#59996b", // Color/bg/interactive/tertiary
        hover: "#428758", // Color/bg/interactive/tertiary-hover
        press: "#306b44", // Color/bg/interactive/tertiary-press
      },
      destructive: {
        DEFAULT: "#fccccc", // Color/bg/interactive/destructive
        hover: "#f9a8a8", // Color/bg/interactive/destructive-hover
        press: "#f37676", // Color/bg/interactive/destructive-press
      },
      disabled: "#e7e7e7", // Color/bg/interactive/disabled
    },
    primary: "#ffffff", // Color/bg/primary
  },
  border: {
    brand: "#59996b", // Color/border/brand
    info: "#59996b", // Color/border/info
    danger: "#ea5353", // Color/border/danger
    disabled: "#b0b0b0", // Color/border/disabled
    warning: "#f2bd2d", // Color/border/warning
    primary: {
      DEFAULT: "#d1d1d1", // Color/border/interactive/primary
      hover: "#428758", // Color/border/interactive/primary-hover
      press: "#306b44", // Color/border/interactive/primary-press
    },
    secondary: {
      DEFAULT: "#d1d1d1", // Color/border/interactive/secondary
      hover: "#b0b0b0", // Color/border/interactive/secondary-hover
      press: "#888888", // Color/border/interactive/secondary-press
    },
  },
  text: {
    primary: "#171717", // Color/text/primary
    secondary: "#5d5d5d", // Color/text/secondary
    tertiary: "#d1d1d1", // Color/text/tetiary
    disabled: "#888888", // Color/text/disabled
    brand: "#428758", // Color/text/brand
    danger: "#d62c2c", // Color/text/danger
    success: "#306b44", // Color/text/success
    warning: "#ec9e14", // Color/text/warning
    interactive: {
      primary: "#20452e", // Color/text/interactive/primary
      hover: "#1b3926", // Color/text/interactive/primary-hover
      press: "#0e2016", // Color/text/interactive/primary-press
      destructive: "#951f1f", // Color/text/interactive/destructive
      inverse: "#f6f6f6", // Color/text/interactive/inverse
    },
  },
  shadow: {
    12: "#0000001f", // Color/shadow/12
    16: "#00000029", // Color/shadow/16
    20: "#00000033", // Color/shadow/20
    24: "#0000003d", // Color/shadow/24
  },
};

const borderRadius = {
  0: "0px", // Border/radius/0
  2: "2px", // Border/radius/2
  4: "4px", // Border/radius/4
  6: "6px", // Border/radius/6
  8: "8px", // Border/radius/8
  12: "12px", // Border/radius/12
  16: "16px", // Border/radius/16
  circle: "999px", // Border/radius/circle
};

const borderWidth = {
  1: "1px", // Border/width/1
  2: "2px", // Border/width/2
  4: "4px", // Border/width/4
  8: "8px", // Border/width/8
};
const opacity = {
  0: "0", // Effect/opacity/0
  20: "0.2", // Effect/opacity/20
  40: "0.4", // Effect/opacity/40
  60: "0.6", // Effect/opacity/60
  80: "0.8", // Effect/opacity/80
  100: "1", // Effect/opacity/100
};

const spacing = {
  0: "0px", // Spacing/0
  2: "2px", // Spacing/2
  4: "4px", // Spacing/4
  6: "6px", // Spacing/6
  8: "8px", // Spacing/8
  12: "12px", // Spacing/12
  16: "16px", // Spacing/16
  24: "24px", // Spacing/24
  32: "32px", // Spacing/32
  36: "36px", // Spacing/36
  40: "40px", // Spacing/40
  48: "48px", // Spacing/48
  56: "56px", // Spacing/56
  64: "64px", // Spacing/64
};

const fontSize: unknown = {
  // 3XL
  "3xl-bold": ["40px", { lineHeight: "120%", fontWeight: "700" }], // 3XL/bold

  // 2XL
  "2xl-bold": ["32px", { lineHeight: "120%", fontWeight: "700" }], // 2XL/bold

  // XL
  "xl-bold": ["20px", { lineHeight: "auto", fontWeight: "700" }], // XL/bold
  "xl-semibold": ["20px", { lineHeight: "auto", fontWeight: "600" }], // XL/semibold
  "xl-medium": ["20px", { lineHeight: "auto", fontWeight: "500" }], // XL/medium
  "xl-regular": ["28px", { lineHeight: "120%", fontWeight: "400" }], // XL/regular

  // L
  "l-bold": ["18px", { lineHeight: "auto", fontWeight: "700" }], // L/bold
  "l-semibold": ["18px", { lineHeight: "auto", fontWeight: "600" }], // L/semibold
  "l-medium": ["18px", { lineHeight: "auto", fontWeight: "500" }], // L/medium

  // M
  "m-bold": ["16px", { lineHeight: "auto", fontWeight: "700" }], // M/bold
  "m-semibold": ["16px", { lineHeight: "auto", fontWeight: "600" }], // M/semibold
  "m-medium": ["16px", { lineHeight: "auto", fontWeight: "500" }], // M/medium

  // S
  "s-semibold": ["14px", { lineHeight: "auto", fontWeight: "600" }], // S/semibold
  "s-medium": ["14px", { lineHeight: "auto", fontWeight: "500" }], // S/medium

  // XS
  "xs-semibold": ["12px", { lineHeight: "auto", fontWeight: "600" }], // XS/semibold
  "xs-medium": ["12px", { lineHeight: "auto", fontWeight: "500" }], // XS/medium
};

export const tailwindStyleConfig = {
  colors,
  borderRadius,
  borderWidth,
  opacity,
  spacing,
  fontSize,
};
