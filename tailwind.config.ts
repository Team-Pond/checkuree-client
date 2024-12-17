/** @type {import('tailwindcss').Config} */

import { extend } from "./tailwindStyleConfig";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend,
  },
  plugins: [],
};
