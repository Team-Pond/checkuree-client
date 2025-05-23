import 'cypress-file-upload'

// cypress/integration/bookCreate.spec.js
describe('출석부 생성 시나리오', () => {
  // Given
  beforeEach(() => {
    cy.Login()
    cy.visit('/book/create')
  })

  it('Happy Path', () => {
    // When
    cy.BookFormStep1({
      name: '출석부 테스트',
    })

    // "다음으로" 버튼 클릭하여 Step2로 이동
    cy.get('[data-cy="stepSubmit"]').click()

    // Step2 화면으로 전환되었는지 확인
    cy.BookFormStep2({
      name: '출석부 커리큘럼 테스트',
    })
    cy.get('[data-cy="submit-book-create"]').click()

    cy.getCookie('accessToken').then((cookie) => {
      const accessToken = cookie?.value
      // Then
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api_server')}/book/my`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((response) => {
        cy.log('API 응답:', JSON.stringify(response.body.data))

        const bookCount = response.body.data.length
        if (bookCount >= 5) {
          cy.get('[data-cy="toast-error"]').should('exist')
          cy.log('출석부 생성 실패: 최대 5개까지 출석부 생성이 가능합니다.')
        } else {
          // 출석부 갯수가 5개 이하일 경우 성공 메시지
          cy.get('[data-cy="toast-success"]').should('exist')
          cy.log('출석부 생성 성공')
        }
      })
    })
  })
  it('Bad Path', () => {
    // When
    cy.get('[data-cy="title"]').should('be.visible')
    cy.get('[data-cy="availableDays"]').should('be.visible')
    cy.get('[data-cy="startTime"]').should('be.visible')
    cy.get('[data-cy="endTime"]').should('be.visible')

    // 빈 폼에서 제출
    cy.get('[data-cy="stepSubmit"]').click()

    cy.get('[data-cy="title-error"]').should('be.visible')
    cy.get('[data-cy="availableDays-error"]').should('be.visible')
    cy.get('[data-cy="availTime-error"]').should('be.visible')

    // 다시 입력
    cy.BookFormStep1({
      name: '테스트',
    })

    cy.get('[data-cy="stepSubmit"]').click()

    cy.get('[data-cy="curriculum-add-button"]').should('be.visible')
    cy.get('[data-cy="curriculum-input"]').should('be.visible')
    cy.get('[data-cy="curriculum-confirm"]').should('be.visible')
    cy.get('[data-cy="curriculum-confirm"]').click()
  })
})
