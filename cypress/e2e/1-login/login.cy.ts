describe("로그인 테스트", () => {
  context("정상 로그인", () => {
    it("유효한 자격증명으로 로그인 성공 시 대시보드로 이동한다", () => {
      // Given: 사용자가 로그인 페이지에 접근한 상태
      cy.visit("/checkuree-auth/signin");

      // And: 로그인 API 호출을 성공 응답으로 모킹한다.

      // When: 사용자가 올바른 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
      cy.get("#id-input").type("dkandkdlel");
      cy.get("#password-input").type("test123123!!");
      cy.get("#login-button").click();

      // Then: API 요청이 발생하고 대시보드 페이지로 리다이렉트 된다.
      cy.url().should("include", "/book");
    });
  });

  context("로그인 실패", () => {
    it("잘못된 자격증명으로 로그인 시 오류 메시지를 보여준다", () => {
      // Given: 사용자가 로그인 페이지에 접근한 상태
      cy.visit("/checkuree-auth/signin");

      // And: 로그인 API 호출을 실패 응답으로 모킹한다.
      cy.intercept("POST", "/api/login", {
        statusCode: 401,
        body: { message: "잘못된 이메일 또는 비밀번호" },
      }).as("loginError");

      // When: 사용자가 잘못된 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
      cy.get("#id-input").type("invalid@example.com");
      cy.get("#password-input").type("wrongpassword");
      cy.get("#login-button").click();

      // Then: API 요청 후 오류 메시지가 화면에 표시된다.

      cy.contains("잘못된 이메일 또는 비밀번호").should("be.visible");
    });
  });
});
