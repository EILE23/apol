# Portfolio Project

프론트엔드(Next.js)와 백엔드(Express)가 연동된 포트폴리오 프로젝트입니다.

## 프로젝트 구조

```
apol_/
├── back/          # 백엔드 (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/  # 컨트롤러
│   │   ├── models/       # 데이터 모델
│   │   ├── routes/       # 라우터
│   │   ├── services/     # 비즈니스 로직
│   │   └── index.ts      # 서버 진입점
│   └── package.json
├── front/         # 프론트엔드 (Next.js + TypeScript)
│   ├── src/
│   │   ├── components/   # UI 컴포넌트
│   │   ├── pages/        # 페이지
│   │   ├── util/         # 유틸리티
│   │   └── styles/       # 스타일
│   └── package.json
└── README.md
```

## 기능

- **프로젝트 CRUD**: 프로젝트 생성, 조회, 수정, 삭제
- **프론트엔드**: Next.js + TypeScript + Tailwind CSS
- **백엔드**: Express + TypeScript + CORS
- **API 연동**: RESTful API를 통한 프론트엔드-백엔드 통신

## 설치 및 실행

### 백엔드 실행

```bash
cd back
npm install
npm run dev
```

서버가 `http://localhost:4000`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd front
npm install
npm run dev
```

애플리케이션이 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

### 프로젝트 API

- `GET /api/projects` - 모든 프로젝트 조회
- `GET /api/projects/:id` - 특정 프로젝트 조회
- `POST /api/projects` - 새 프로젝트 생성
- `PUT /api/projects/:id` - 프로젝트 수정
- `DELETE /api/projects/:id` - 프로젝트 삭제

## 기술 스택

### 백엔드

- Node.js
- Express.js
- TypeScript
- CORS

### 프론트엔드

- Next.js
- React
- TypeScript
- Tailwind CSS

## 개발 환경 설정

1. Node.js 18+ 설치
2. 프로젝트 클론
3. 백엔드 및 프론트엔드 의존성 설치
4. 개발 서버 실행

## 라이센스

MIT License
