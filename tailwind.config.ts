/** @type {import('tailwindcss').Config} */

import { extend } from "./tailwindStyleConfig";
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend,
  },
  plugins: [scrollbarHide],
};
