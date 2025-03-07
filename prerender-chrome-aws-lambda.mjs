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

  // 수정: 결과를 배열로 반환, 각 항목은 { route, html } 형태
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
      // URL은 환경에 맞게 수정하세요. 예를 들어, localhost 대신 실제 주소 사용 가능.
      await page.goto(`http://localhost:5000${route}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
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
