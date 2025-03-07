import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import svgr from "@svgr/rollup";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    prerender({
      routes: ["/book", "/book/create"],
      renderer: path.resolve(__dirname, "prerender-chrome-aws-lambda.mjs"),
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
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
