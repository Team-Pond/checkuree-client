/** @type {import('tailwindcss').Config} */

import { extend } from "./tailwindStyleConfig";
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend,
  },
  plugins: [
    scrollbarHide,
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
        ".scrollable": {
          "will-change": "transform, scroll-position",
        },
      });
    },
  ],
};
