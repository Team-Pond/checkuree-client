import 'cypress-file-upload'

// cypress/integration/bookCreate.spec.js
describe('학생 등록 페이지', () => {
  // Given
  beforeEach(() => {
    cy.request('POST', 'https://dev.checkuree.com/api/v1/auth/signin', {
      username: 'dkandkdlel',
      password: 'test123123!!',
    }).then((response) => {
      const accessToken = response.body.data.accessToken
      cy.setCookie('accessToken', accessToken)
    })

    cy.visit('/book')
  })

  it('학생 등록 시나리오', () => {
    // When

    // "출석부" 존재 유무 확인
    cy.get('[data-cy="book-0"]').should('be.visible')

    // "출석부" 첫번째 클릭
    cy.get('[data-cy="book-0"]').click()

    cy.get('[data-cy="navigate-attendee"]').click()

    cy.get('[data-cy="icon-attendee-create"]').click()

    // "출석부 이름" 입력 필드가 보이는지 확인
    cy.get('[data-cy="name-input"]').should('be.visible')

    // "출석부 이름" 입력
    cy.get('[data-cy="name-input"]').type(Date.now().toString().slice(-5))

    cy.get('[data-cy="birth-input"]').type('19981010')

    cy.get('[data-cy="male-radio"]').click()

    cy.get('[data-cy="today-enroll-label"]').click()

    // "다음으로" 버튼 클릭하여 Step2로 이동
    cy.get('[data-cy="stepSubmit"]').click()

    // Step2 화면으로 전환되었는지 확인
    cy.get('[data-cy="curriculum-select"]').should('be.visible')
    cy.get('[data-cy="curriculum-select"]').click()

    // 오른쪽 목록에서 과목 아이템의 플러스 아이콘 클릭하여 과목 아이템 추가
    cy.get('[data-cy="add-icon"]').first().click()

    cy.get('[data-cy="schedule-0"]').first().click()

    cy.get('[data-cy="add-schedule-button"]').click()

    cy.get('[data-cy="submit-attendee-create"]').click()

    // Then
    cy.get('[data-cy="toast-success"]').should('exist')
  })
})
