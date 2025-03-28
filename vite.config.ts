import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import svgr from "vite-plugin-svgr";
import path from "path";
import createSitemap from "vite-plugin-sitemap";

export default defineConfig({
  build: {
    minify: "terser",
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    createSitemap({
      hostname: "https://pond-client.vercel.app",
      // 동적 경로에 원하는 URL들을 명시합니다.
      dynamicRoutes: ["/auth/login", "/auth/signin"],
      // 제외할 경로 (예: 네이버 소유권 확인 파일)
      exclude: ["/naver104*.html"],
      // 각 경로별 changefreq 설정 (RoutesOptionMap<string>)
      changefreq: {
        "/auth/login": "weekly",
        "/auth/signin": "monthly",
      },
      // 각 경로별 priority 설정 (RoutesOptionMap<number>)
      priority: {
        "/auth/login": 0.8,
        "/auth/signin": 0.5,
      },
      // 각 경로별 lastmod 설정 (RoutesOptionMap<Date>)
      lastmod: {
        "/auth/login": new Date(),
        "/auth/signin": new Date(),
      },
      // 사람이 읽기 좋은 형식으로 출력 (옵션에 따라 true/false 설정)
      readable: true,
      // robots.txt 파일 생성 여부
      generateRobotsTxt: true,
      // robots.txt에 들어갈 정책
      robots: [{ userAgent: "*", allow: "/" }],
      // (기타 필요한 옵션을 추가할 수 있습니다.)
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
