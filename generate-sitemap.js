import { SitemapStream } from "sitemap";
import { createWriteStream, existsSync, mkdirSync } from "fs";

// dist 폴더가 없으면 생성
if (!existsSync("./dist")) {
  mkdirSync("./dist");
}

const sitemap = new SitemapStream({
  hostname: "https://pond-client.vercel.app/",
});
const writeStream = createWriteStream("./dist/sitemap.xml");

// sitemap 스트림을 writeStream으로 pipe
sitemap.pipe(writeStream);

// sitemap에 경로 추가
sitemap.write({ url: "/", changefreq: "daily", priority: 1 });

sitemap.write({
  url: "/kakao-auth/signin",
  changefreq: "weekly",
  priority: 0.8,
});

sitemap.end();

// writeStream이 완료될 때까지 기다림
writeStream.on("finish", () => {
  console.log("Sitemap generated successfully!");
});
