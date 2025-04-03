// tests/bookCreate.spec.ts
import { test, expect } from '@playwright/test'
import path from 'path'

test.describe('BookCreate Page', () => {
  // Step1 테스트: 기본 폼 입력 및 Step2로 이동

  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'accessToken', // 실제 사용하는 쿠키 이름으로 변경
        value:
          'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0MzU4Mzc4OSwiZXhwIjoxNzQzNTg0MDg5fQ.w91hStWvaX51jtpze-qaF-MWdSeXf5iAVYoZ0nQrOW8',
        domain: 'localhost', // 실제 도메인으로 변경
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
    ])
    await page.goto('/book/create') // 쿠키가 적용된 상태로 페이지 접근
  })

  test('Step1: Form validation and navigation to Step2', async ({ page }) => {
    // BookCreate 페이지로 이동

    // Step1: "출석부 이름" 입력 필드가 보이는지 확인
    const titleInput = page.locator('#title-input')

    await expect(titleInput).toBeVisible()

    // "출석부 이름" 입력
    await titleInput.fill('테스트 출석부')

    // 요일 선택 - 예시로 "월" 버튼 클릭 (Step1에서는 요일 버튼의 텍스트가 "월"로 표시)
    const mondayButton = page.locator('div', { hasText: '월' })
    await mondayButton.click()

    // 파일 업로드 테스트 (테스트용 이미지 파일 경로를 지정)
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles(
      path.resolve(__dirname, 'fixtures/test-image.png'),
    )

    // TimePicker 테스트 (여기서는 단순히 버튼 클릭하여 모달 오픈 여부 확인)
    const startTimeButton = page.locator('button', { hasText: '시작 시간' })
    await startTimeButton.click()
    // 만약 모달에 특정 요소가 있다면 확인 후 닫기 (예: "확인" 버튼)
    // await page.locator('button', { hasText: '확인' }).click();

    // "다음으로" 버튼 클릭하여 Step2로 이동
    const nextButton = page.locator('button', { hasText: '다음으로' })
    await nextButton.click()

    // Step2 화면으로 전환되었는지 확인 (예: "커리큘럼 추가하기" 버튼이 보이는지)
    const curriculumButton = page.locator('button', {
      hasText: '커리큘럼 추가하기',
    })
    await expect(curriculumButton).toBeVisible()
  })

  // Step2 테스트: 커리큘럼 추가
  test('Step2: Curriculum addition', async ({ page }) => {
    // BookCreate 페이지로 이동 후 Step1을 채워서 Step2로 이동
    await page.goto('/book-create')
    await page.locator('#title-input').fill('테스트 출석부')
    await page.locator('div', { hasText: '월' }).click()
    await page.locator('button', { hasText: '다음으로' }).click()

    // Step2: 커리큘럼 추가 버튼 클릭 (기본적으로 커리큘럼이 추가되지 않은 상태)
    const addCurriculumButton = page.locator('button', {
      hasText: '커리큘럼 추가하기',
    })
    await addCurriculumButton.click()

    // 커리큘럼 이름 입력 필드가 나타나는지 확인 후 입력
    const curriculumNameInput = page.locator(
      'input[placeholder="커리큘럼 이름"]',
    )
    await expect(curriculumNameInput).toBeVisible()
    await curriculumNameInput.fill('커리큘럼 테스트')

    // 하단의 "과목 추가하기" 영역 클릭하여 BottomDrawer 오픈
    const addSubjectButton = page.locator('div', { hasText: '과목 추가하기' })
    await addSubjectButton.click()

    // BottomDrawer 내 왼쪽 목록에서 첫 번째 과목 선택 (목록 요소는 li 태그로 렌더링)
    const firstSubject = page.locator('ul li').first()
    await firstSubject.click()

    // 오른쪽 목록에서 과목 아이템의 플러스 아이콘 클릭하여 과목 아이템 추가
    // (여기서는 alt 속성 또는 이미지 경로를 기준으로 선택)
    const plusIcon = page
      .locator('img', { has: page.locator('~ico-plus') })
      .first()
    await plusIcon.click()

    // "확인" 버튼 클릭하여 커리큘럼 추가 완료
    const confirmButton = page.locator('button', { hasText: '확인' })
    await confirmButton.click()

    // 추가된 커리큘럼 항목이 목록에 나타나는지 확인 (커리큘럼 이름 포함)
    const curriculumItem = page.locator('p', { hasText: '커리큘럼 테스트' })
    await expect(curriculumItem).toBeVisible()
  })
})
