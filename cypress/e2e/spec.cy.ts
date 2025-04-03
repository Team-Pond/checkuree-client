describe('로그인 시나리오 (API Mocking)', () => {
  // given
  beforeEach(() => {
    cy.visit('/checkuree-auth/signin')
  })

  it('로그인 성공 시나리오 (Given-When-Then)', () => {
    // When: 로그인 정보 입력 및 제출
    cy.get('#id-input').type('dkandkdlel')
    cy.get('#password-input').type('test123123!!')
    cy.get('#login-button').click()

    // Then: 로그인 성공 후 리다이렉션 또는 특정 요소 노출 확인

    cy.url().should('include', '/book') // 로그인 성공 후 /book 페이지로 리다이렉션 되는지 확인
  })

  it('로그인 실패 시나리오 (Given-When-Then)', () => {
    // When: 로그인 정보 입력 및 제출
    cy.get('#id-input').type('dkandkdlel')
    cy.get('#password-input').type('wrongpassword')
    cy.get('#login-button').click()

    // Then: 로그인 실패 후 리다이렉션 또는 특정 요소 노출 확인
    cy.url().should('include', '/checkuree-auth/signin') // 로그인 실패 후 로그인 페이지로 돌아오는지 확인
  })
})
