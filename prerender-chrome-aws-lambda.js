// prerender-chrome-aws-lambda.js
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

module.exports = async function renderRoute(route) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
    });
    const page = await browser.newPage();
    // 여기서 localhost 대신 빌드된 파일을 참조하거나 실제 URL을 사용
    await page.goto(`http://localhost:5173${route}`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });
    const content = await page.content();
    return content;
  } catch (error) {
    console.error("Error during prerender:", error);
    return "";
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
