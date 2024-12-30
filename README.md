# 🌐 Links

> **Service** : (작업중)

# ⚙️ How to Start

## 0️⃣ Prerequisites

- [Node.js 22.9.0](https://nodejs.org/en/download/package-manager/)
- [npm 10.8.3](https://www.npmjs.com/package/npm/v/10.7.0)

## 1️⃣ Installation

### Front-End

```bash
$ npm install
$ npm run dev
```

# ⚒️ Stacks

## Front-End

![React.js](https://img.shields.io/badge/React.js-000000?style=for-the-badge&logo=React.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![TailWind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)

## 1. 프로젝트 구조 및 히스토리

현재 작업된 기준에 대한 대략적 설명입니다.

- MUI에서 Tailwind CSS로 마이그레이션
  TailwindCss는 디자인 시스템이 정교할 시 가치가 있다고 느껴집니다.
  디자인 일관성 및 성능 향상: Tailwind CSS 도입으로 가벼운 스타일링 구현
  개발 생산성 증가: 유틸리티 클래스 기반 스타일링으로 CSS 작성 시간 단축
- Tailwind-css 컨벤션
  컬러 생상은 체쿠리 디자인 시스템을 기준으로 정의하였습니다.
  1. 작업 시 컬러값의 단축 팔레트명을 찾아 작업했습니다. (ex. bg-disabled)
  2. 단축 팔레트명이 없다면 명시적으로 값을 지정했습니다. (ex. bg-[#EEEEEE])
- React-hook-form 사용
  Formik은 큰 폼에서 렌더링이 자주 트리거 되며 타입이 엄격하지 않는 문제가 있는 것 같아 react-hook-form으로 진행하였습니다.
