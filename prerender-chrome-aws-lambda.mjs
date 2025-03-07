// prerender-chrome-aws-lambda.mjs
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

class ChromeAwsLambdaRenderer {
  constructor(options) {
    this.options = options;
  }

  async initialize() {
    // 필요한 초기화 작업이 있다면 작성
  }

  async renderRoutes(routes, context) {
    const results = [];
    for (const route of routes) {
      const html = await this.renderRoute(route, context);
      results.push({ route, html });
    }
    return results;
  }

  async renderRoute(route, context) {
    let browser = null;
    try {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      });
      const page = await browser.newPage();
      // 페이지 이동: 로컬 개발 서버(5173) 사용
      await page.goto(`http://localhost:5173${route}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // document.title이 업데이트 될 때까지 대기 (예: 기본 title이 "My App"인 경우)
      await page.waitForFunction(() => document.title !== "My App", {
        timeout: 5000,
      });

      const content = await page.content();
      return content;
    } catch (error) {
      console.error("Error during prerender:", error);
      return "";
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async destroy() {
    // 필요한 정리 작업이 있다면 작성
  }
}

export default ChromeAwsLambdaRenderer;
