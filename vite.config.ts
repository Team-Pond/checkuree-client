import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import svgr from "@svgr/rollup";
import path from "path";
import createSitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    createSitemap({
      hostname: "http://pond-client.vercel.app",
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
