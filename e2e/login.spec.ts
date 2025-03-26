import { test, expect } from "@playwright/test";

test.describe("로그인 시나리오 (API Mocking)", () => {
  // given
  test.beforeEach(async ({ page }) => {
    await page.goto("/checkuree-auth/signin");
  });

  test("로그인 성공 시나리오 (Given-When-Then)", async ({ page }) => {
    // When: 로그인 정보 입력 및 제출
    await test.step("로그인 정보 입력", async () => {
      await page.fill("#id-input", "dkandkdlel");
      await page.fill("#password-input", "test123123!!");
      await page.click("#login-button");
    });

    // Then: 로그인 성공 후 리다이렉션 또는 특정 요소 노출 확인
    await test.step("로그인 성공 검증", async () => {
      await page.waitForURL("/book");
    });
  });

  test("로그인 실패패 시나리오 (Given-When-Then)", async ({ page }) => {
    // When: 로그인 정보 입력 및 제출
    await test.step("로그인 정보 입력", async () => {
      await page.fill("#id-input", "dkandkdlel");
      await page.fill("#password-input", "test123123");
      await page.click("#login-button");
    });

    // Then: 로그인 실패 후 리다이렉션 또는 특정 요소 노출 확인
    await test.step("로그인 실패 검증", async () => {
      await page.waitForURL("/checkuree-auth/signin");
    });
  });
});
