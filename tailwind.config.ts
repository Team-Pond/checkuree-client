/** @type {import('tailwindcss').Config} */

import { tailwindStyleConfig } from "./tailwindStyleConfig";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      tailwindStyleConfig,
      fontFamily: {
        suit: ["SUIT", "sans-serif"],
        appleLiGothic: ["AppleLiGothic"],
      },
    },
  },
  plugins: [],
};
