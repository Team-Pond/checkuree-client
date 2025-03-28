import { test } from "@playwright/test";

test.describe("로그인 시나리오 (API Mocking)", () => {
  // given
  test.beforeEach(async ({ page }) => {
    await page.goto("/checkuree-auth/signin");
  });

  test("로그인 성공 시나리오 (Given-When-Then)", async ({ page }) => {
    // 로그인 API 모킹 (성공 응답)
    await page.route("**/auth/login", (route) => {
      route.fulfill({
        status: 200, // 성공 응답 (HTTP 200)
        body: JSON.stringify({
          status: 200, // 서버가 성공했다는 상태
          message: "로그인 성공", // 성공 메시지
          data: {
            accessToken: "mockAccessToken", // 가짜 토큰
            refreshToken: "mockRefreshToken", // 가짜 리프레시 토큰
          },
        }),
      });
    });

    // When: 로그인 정보 입력 및 제출
    await test.step("로그인 정보 입력", async () => {
      await page.fill("#id-input", "dkandkdlel");
      await page.fill("#password-input", "test123123!!");
      await page.click("#login-button");
    });

    // Then: 로그인 성공 후 리다이렉션 또는 특정 요소 노출 확인
    await test.step("로그인 성공 검증", async () => {
      await page.waitForURL("/book"); // 로그인 성공 후 /book 페이지로 리다이렉션 되는지 확인
    });
  });

  test("로그인 실패 시나리오 (Given-When-Then)", async ({ page }) => {
    // 로그인 API 모킹 (실패 응답)
    await page.route("**/auth/login", (route) => {
      route.fulfill({
        status: 400, // 실패 응답 (HTTP 400)
        body: JSON.stringify({
          status: 400, // 서버가 실패했다는 상태
          message: "잘못된 로그인 정보입니다.", // 실패 메시지
        }),
      });
    });

    // When: 로그인 정보 입력 및 제출
    await test.step("로그인 정보 입력", async () => {
      await page.fill("#id-input", "dkandkdlel");
      await page.fill("#password-input", "wrongpassword");
      await page.click("#login-button");
    });

    // Then: 로그인 실패 후 리다이렉션 또는 특정 요소 노출 확인
    await test.step("로그인 실패 검증", async () => {
      await page.waitForURL("/checkuree-auth/signin"); // 로그인 실패 후 로그인 페이지로 돌아오는지 확인
    });
  });
});
