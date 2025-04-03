import 'cypress-file-upload'

// cypress/integration/bookCreate.spec.js
describe('BookCreate Page', () => {
  // Step1 테스트: 기본 폼 입력 및 Step2로 이동
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

  it('Step1: Form validation and navigation to Step2', () => {
    // Step1: "출석부 이름" 입력 필드가 보이는지 확인
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

    // 만약 모달에 특정 요소가 있다면 확인 후 닫기 (예: "확인" 버튼)
    // cy.contains('확인').click();

    // "다음으로" 버튼 클릭하여 Step2로 이동
    cy.get('[data-cy="stepSubmit"]').click()

    // Step2 화면으로 전환되었는지 확인 (예: "커리큘럼 추가하기" 버튼이 보이는지)
    const curriCulumAddButton = cy.get('[data-cy="curriculum-add-button"]')
    curriCulumAddButton.should('be.visible')
    curriCulumAddButton.click()

    const curriCulumTitleInput = cy.get('[data-cy="curriculum-input"]')
    curriCulumTitleInput.should('be.visible')
    curriCulumTitleInput.type('커리큘럼 테스트')

    cy.get('[data-cy="subject-add-button"]').click()

    // 오른쪽 목록에서 과목 아이템의 플러스 아이콘 클릭하여 과목 아이템 추가
    cy.get('[data-cy="add-icon"]').first().click()

    cy.get('[data-cy="bottom-drawer"]').click({ force: true })

    cy.get('[data-cy="curriculum-confirm"]').click()

    cy.get('[data-cy="submit-book-create"]').click()
  })
})
