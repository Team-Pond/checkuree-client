/** @type {import('tailwindcss').Config} */
import type { PluginAPI } from 'tailwindcss/types/config'

import { extend } from './tailwindStyleConfig'
// import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend,
  },
  plugins: [
    // scrollbarHide,
    function ({ addUtilities }: { addUtilities: PluginAPI['addUtilities'] }) {
      addUtilities({
        '.scrollbar-none': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        },
        '.custom-scrollbar-hide::-webkit-scrollbar': {
          display: 'none' /* Chrome, Safari */,
        },
        '.custom-scrollbar-hide': {
          '-ms-overflow-style': 'none' /* IE, Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
        '.scrollable': {
          'will-change': 'transform, scroll-position',
        },
      })
    },
  ],
}
