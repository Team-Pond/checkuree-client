# 🌐 Links

> **Service** : https://checkuree.com (prod)
> <br/>

**TEST Account**
<br/>
ID : dkandkdlel
<br/>
PW : test123123!!

# ⚒️ Stacks

## Front-End

![React.js](https://img.shields.io/badge/React.js-000000?style=for-the-badge&logo=React.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![TailWind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)

## 1. 프로젝트 구조 및 히스토리

### Next -> React로 마이그레이션

효율성을 고려하여 React로 마이그레이션을 진행하였습니다.

- **비용적인 측면**: 저희는 백엔드 서버와 API가 별도로 제공되고 있어 DB 접근이 필요하지 않습니다. 따라서 체쿠리는 React의 번들로 배포하는 것이 전체 시스템 구성과 비용 효율성 면에서 더 적합하다고 판단하였습니다.
- **단순성**: 프론트엔드를 정적 파일로 배포함으로써 인프라 구성이 간소화되었으며, 백엔드와의 역할 분리도 명확해졌습니다.

### MUI에서 Tailwind CSS + Radix로 마이그레이션

Tailwind CSS는 디자인 시스템이 정교할 시 가치가 있다고 느껴집니다.

- **디자인 일관성 및 성능 향상**: Tailwind CSS 도입으로 가벼운 스타일링 구현
- **개발 생산성 증가**: 유틸리티 클래스 기반 스타일링으로 CSS 작성 시간 단축
- **디자인 커스터마이징 용이성**: headless-ui는 기본적인 UI 로직만 제공하고, 스타일링을 자유롭게 할 수 있어 프로젝트에 맞는 디자인 시스템을 구현하는 데 유리합니다. MUI와 달리 디자인 측면에서 더 높은 유연성을 제공하므로, 팀의 디자인 요구사항에 맞는 사용자 정의가 쉬웠습니다.
- **가벼운 번들 크기**: Radix UI는 불필요한 스타일이나 자원 없이 최소화된 코드만 제공하여 프로젝트의 번들 크기를 줄이는 데 기여했습니다. 이는 페이지 로딩 시간을 줄이고 성능을 개선하는 데 도움을 주었습니다.

### Tailwind-css 컨벤션

컬러 생상은 체쿠리 디자인 시스템을 기준으로 정의하였습니다.

1. 작업 시 컬러값의 단축 팔레트명을 찾아 작업했습니다. (예: `bg-disabled`)
2. 단축 팔레트명이 없다면 명시적으로 값을 지정했습니다. (예: `bg-[#EEEEEE]`)

### React-hook-form 사용

Formik을 고려하였으나 큰 폼에서 렌더링이 자주 트리거 되며 타입이 엄격하지 않은 문제가 있어 react-hook-form으로 전환하였습니다.

- **성능 향상**: 불필요한 렌더링 최소화
- **타입 안전성**: 엄격한 타입 관리를 통해 버그 감소

### Chart.js 사용

차트 라이브러리를 검토하는 과정에서 Chart.js를 선택하였습니다. 개발자 커뮤니티에서 널리 사용되며, 생태계가 크고 다양한 지원을 받을 수 있다는 점이 주요한 선택 이유입니다.

- **가벼움**: 용량이 60kb
- **무료**

### husky 설정

깃 훅에 타입 체크를 추가하여 커밋 및 배포 과정에서 발생할 수 있는 타입 관련 오류를 미연에 방지하기 위함입니다.  
(`yarn prepare` 명령어로 husky 설정을 초기화하여 git hook을 설치)

### Cypress

Cypress를 채택한 이유는, 실시간으로 테스트 진행 상황을 시각화하고 직관적인 GUI를 제공하여 디버깅을 쉽게 할 수 있으며, 자동 대기 기능 덕분에 명시적인 wait 없이 안정적이고 효율적인 테스트가 가능하기 때문입니다.

- **디버깅**: Cypress는 브라우저 내에서 테스트 진행 상황을 실시간으로 시각화하며, 직관적인 GUI를 제공하여 테스트 과정을 쉽게 파악할 수 있습니다.
- **자동 대기 기능**: `cy.get()`이나 `cy.contains()`와 같은 명령어는 요소가 화면에 나타날 때까지 자동으로 기다리므로, 명시적인 `wait`을 추가할 필요가 없습니다.

## 2. 깃 커밋 메시지 정책

1. feat (Feature):<br/>
   용도: 새로운 기능을 추가할 때 사용합니다.<br/>
   예시: feat: 사용자 로그인 기능 추가

2. fix (Bug Fix):<br/>
   용도: 버그를 수정할 때 사용합니다.<br/>
   예시: fix: 로그인 시 발생하는 오류 수정

3. docs (Documentation):<br/>
   용도: 문서만 변경했을 때 사용합니다.<br/>
   예시: docs: README 파일 업데이트

4. style (Formatting):<br/>
   용도: 코드의 포맷팅, 세미콜론 누락, 공백 등 스타일 관련 변경 시 사용합니다. 기능 변경 없이 코드의 가독성 향상에만 초점을 맞춥니다.<br/>
   예시: style: 코드 포맷팅 일관성 유지

5. refactor (Code Refactoring):<br/>
   용도: 코드 리팩토링(기능 변경 없이 코드 구조 개선) 시 사용합니다.<br/>
   예시: refactor: 로그인 모듈 리팩토링

6. test (Testing):<br/>
   용도: 테스트 관련 코드 추가 또는 수정 시 사용합니다.<br/>
   예시: test: 로그인 기능 테스트 케이스 추가

7. chore (Maintenance):<br/>
   용도: 빌드 작업, 도구 설정 등 기타 잡다한 작업 시 사용합니다.<br/>
   예시: chore: 의존성 패키지 업데이트

8. build (Build System):<br/>
   용도: 빌드 관련 설정이나 스크립트 변경 시 사용합니다.<br/>
   예시: build: webpack 설정 변경
