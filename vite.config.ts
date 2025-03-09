import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import svgr from "@svgr/rollup";
import path from "path";
import createSitemap from "vite-plugin-sitemap";
import prerender from "@prerenderer/rollup-plugin";

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ["/", "/auth/signin", "/kakao-auth/signin"],
      renderer: "@prerenderer/renderer-puppeteer",
      server: {
        port: 5173,
        host: "localhost",
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            "https://pond-client.vercel.app/"
          );
      },
    }),
    tsconfigPaths(),
    svgr(),
    createSitemap({
      hostname: "https://pond-client.vercel.app",
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
