import 'cypress-file-upload'

// cypress/integration/bookCreate.spec.js
describe('학생 등록 페이지', () => {
  // Given
  before(() => {
    cy.Login()
    cy.visit('/book')
  })

  it('학생 등록 시나리오', () => {
    // When

    cy.get('[data-cy="book-0"]').should('be.visible').click()

    cy.get('[data-cy="navigate-attendee"]').click()

    cy.get('[data-cy="icon-attendee-create"]').click()

    cy.StudentFormStep1({
      name: new Date().toISOString().slice(-5),
      birth: '20230404',
      gender: 'male',
    })

    // "다음으로" 버튼 클릭하여 Step2로 이동
    cy.get('[data-cy="stepSubmit"]').click()

    cy.StudentFormStep2()

    cy.get('[data-cy="submit-attendee-create"]').click()

    // Then
    cy.get('[data-cy="toast-success"]').should('exist')
  })
})
