/** @type {import('tailwindcss').Config} */

const colors: any = {
  white: "#FFFFFF",
  black: "#000000",
  red: {
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#F44336",
    600: "#E53935",
    700: "#D32F2F",
    800: "#C62828",
    900: "#B71C1C",
  },
  pink: {
    50: "#FCE4EC",
    100: "#F8BBD0",
    200: "#F48FB1",
    300: "#F06292",
    400: "#EC407A",
    500: "#E91E63",
    600: "#D81B60",
    700: "#C2185B",
    800: "#AD1457",
    900: "#880E4F",
  },
  orange: {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800",
    600: "#FB8C00",
    700: "#F57C00",
    800: "#EF6C00",
    900: "#E65100",
  },
  amber: {
    50: "#FFF8E1",
    100: "#FFECB3",
    200: "#FFE082",
    300: "#FFD54F",
    400: "#FFCA28",
    500: "#FFC107",
    600: "#FFB300",
    700: "#FFA000",
    800: "#FF8F00",
    900: "#FF6F00",
  },
  lime: {
    50: "#F9FBE7",
    100: "#F0F4C3",
    200: "#E6EE9C",
    300: "#DCE775",
    400: "#D4E157",
    500: "#CDDC39",
    600: "#C0CA33",
    700: "#AFB42B",
    800: "#9E9D24",
    900: "#827717",
  },
  green: {
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
  },
  teal: {
    50: "#E0F2F1",
    100: "#B2DFDB",
    200: "#80CBC4",
    300: "#4DB6AC",
    400: "#26A69A",
    500: "#009688",
    600: "#00897B",
    700: "#00796B",
    800: "#00695C",
    900: "#004D40",
  },
  cyan: {
    50: "#E0F2F1",
    100: "#B2EBF2",
    200: "#80CBC4",
    300: "#4DB6AC",
    400: "#26A69A",
    500: "#009688",
    600: "#00897B",
    700: "#00796B",
    800: "#00695C",
    900: "#004D40",
  },
  aqua: {
    50: "#EBFAFF",
    100: "#C8F1FF",
    200: "#8AE2FF",
    300: "#4ED3FF",
    400: "#24BEF0",
    500: "#00B0E9",
    600: "#0096C8",
    700: "#00769C",
    800: "#006080",
    900: "#00455B",
  },
  // (Light blue)
  sky: {
    50: "#E1F5FE",
    100: "#B3E5FC",
    200: "#81D4FA",
    300: "#4FC3F7",
    400: "#29B6F6",
    500: "#03A9F4",
    600: "#039BE5",
    700: "#0288D1",
    800: "#0277BD",
    900: "#01579B",
  },
  blue: {
    50: "#E5F2FF",
    100: "#BDDEFF",
    200: "#92CAFF",
    300: "#67B5FF",
    400: "#48A4FF",
    500: "#3196FF",
    600: "#3186F0",
    700: "#2F74DC",
    800: "#2D62CA",
    900: "#2943AA",
  },
  // (Deep purple)
  purple: {
    50: "#EDE7F6",
    100: "#D1C4E9",
    200: "#B39DDB",
    300: "#9575CD",
    400: "#7E57C2",
    500: "#673AB7",
    600: "#5E35B1",
    700: "#512DA8",
    800: "#4527A0",
    900: "#311B92",
  },
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      fontFamily: {
        suit: ["SUIT", "sans-serif"],
      },
    },
  },
  plugins: [],
};
