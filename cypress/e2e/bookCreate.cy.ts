import 'cypress-file-upload'

// cypress/integration/bookCreate.spec.js
describe('출석부 생성 페이지', () => {
  // Given
  beforeEach(() => {
    cy.request('POST', 'https://dev.checkuree.com/api/v1/auth/signin', {
      username: 'dkandkdlel',
      password: 'test123123!!',
    }).then((response) => {
      const accessToken = response.body.data.accessToken
      cy.setCookie('accessToken', accessToken)
    })

    cy.visit('/book/create')
  })

  it('출석부 생성 시나리오', () => {
    // When
    // "출석부 이름" 입력 필드가 보이는지 확인
    cy.get('[data-cy="title"]').should('be.visible')

    // "출석부 이름" 입력
    cy.get('[data-cy="title"]').type('cypress E2E 테스트')

    // 요일 선택 - 예시로 "월" 버튼 클릭 (Step1에서는 요일 버튼의 텍스트가 "월"로 표시)
    cy.get('[data-cy="월"]').click()

    // TimePicker 테스트 (여기서는 단순히 버튼 클릭하여 모달 오픈 여부 확인)
    cy.get('[data-cy="startTime"]').click()
    cy.get('.fixed.inset-0').click({ force: true })
    cy.get('.fixed.inset-0').should('not.exist')

    cy.get('[data-cy="endTime"]').click()
    cy.get('.fixed.inset-0').click({ force: true })
    cy.get('.fixed.inset-0').should('not.exist')

    // "다음으로" 버튼 클릭하여 Step2로 이동
    cy.get('[data-cy="stepSubmit"]').click()

    // Step2 화면으로 전환되었는지 확인
    cy.get('[data-cy="curriculum-add-button"]').should('be.visible')
    cy.get('[data-cy="curriculum-add-button"]').click()

    cy.get('[data-cy="curriculum-input"]')
      .should('be.visible')
      .type('커리큘럼 테스트')

    cy.get('[data-cy="subject-add-button"]').click()

    // 오른쪽 목록에서 과목 아이템의 플러스 아이콘 클릭하여 과목 아이템 추가
    cy.get('[data-cy="add-icon"]').first().click()

    cy.get('[data-cy="bottom-drawer"]').click({ force: true })

    cy.get('[data-cy="curriculum-confirm"]').click()

    cy.get('[data-cy="submit-book-create"]').click()

    cy.getCookie('accessToken').then((cookie) => {
      const accessToken = cookie?.value

      // Then
      cy.request({
        method: 'GET',
        url: 'https://dev.checkuree.com/api/v1/book/my',
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
})
