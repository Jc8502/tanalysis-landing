# Marketing Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Vite + React + TypeScript + Recharts + Tailwind CSS interactive marketing dashboard in Korean for tanalysis.co.kr analysis results, launchable with `npm run dev`.

**Architecture:** Single-page app with a sidebar nav and 5 page components. All analysis data is statically typed and baked into `analysisData.ts`. Recharts handles all charts (radar, bar, table). Tailwind CSS for styling.

**Tech Stack:** Vite 5, React 18, TypeScript, Recharts 2, Tailwind CSS 3, react-router-dom 6

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `C:\Users\joons\work\marketing\dashboard\` (project root)

**Step 1: Create project**

Run:
```bash
cd "C:\Users\joons\work\marketing"
npm create vite@latest dashboard -- --template react-ts
cd dashboard
npm install
```

Expected: `dashboard/` directory with `src/`, `index.html`, `vite.config.ts`

**Step 2: Install dependencies**

```bash
npm install recharts react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 3: Configure Tailwind — edit `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Step 4: Replace `src/index.css` with Tailwind directives**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 5: Verify dev server starts**

Run: `npm run dev`
Expected: `localhost:5173` loads default Vite React page

**Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold vite react ts dashboard with recharts and tailwind"
```

---

### Task 2: Create `analysisData.ts` with all marketing data

**Files:**
- Create: `src/data/analysisData.ts`

**Step 1: Create the data file**

```typescript
// src/data/analysisData.ts

export const overallScore = 59;
export const grade = "C";
export const gradeLabel = "기능적이나 성장 잠재력 미활용";

export const categoryScores = [
  { category: "웹사이트 & 전환", score: 56, weight: 25, sourceFile: "LANDING-CRO.md + FUNNEL-ANALYSIS.md", color: "#6366f1" },
  { category: "SEO & 자연 유입", score: 52, weight: 20, sourceFile: "SEO-AUDIT.md", color: "#8b5cf6" },
  { category: "콘텐츠 & 메시지", score: 67, weight: 15, sourceFile: "COPY-SUGGESTIONS.md + BRAND-VOICE.md", color: "#06b6d4" },
  { category: "소셜 미디어", score: 60, weight: 15, sourceFile: "SOCIAL-CALENDAR.md", color: "#10b981" },
  { category: "이메일 & 자동화", score: 65, weight: 15, sourceFile: "EMAIL-SEQUENCES.md", color: "#f59e0b" },
  { category: "유료 광고", score: 62, weight: 10, sourceFile: "AD-CAMPAIGNS.md", color: "#ef4444" },
];

export const radarData = [
  { subject: "웹사이트", score: 56, fullMark: 100 },
  { subject: "SEO", score: 52, fullMark: 100 },
  { subject: "콘텐츠", score: 67, fullMark: 100 },
  { subject: "소셜", score: 60, fullMark: 100 },
  { subject: "이메일", score: 65, fullMark: 100 },
  { subject: "광고", score: 62, fullMark: 100 },
];

export const top3Actions = [
  {
    rank: 1,
    title: "홈페이지에 정부 바우처 긴급 배너 추가",
    impact: "₩15–25M 즉시 효과 (기한 임박)",
    effort: "2시간",
    deadline: "3월 31일 마감",
    description: "데이터바우처 프로그램으로 중소기업 최대 ₩3,000만 원 (90%) 지원 가능 — 홈페이지 방문자에게 노출되지 않고 있음.",
    copy: "[데이터바우처] 중소기업이라면 최대 ₩3,000만 원 정부 지원으로 도입 가능 — 신청 마감 3월 31일 → 상담 신청하기",
    urgent: true,
  },
  {
    rank: 2,
    title: "홈페이지 히어로 헤드라인을 '재현율 85%' 중심으로 재작성",
    impact: "₩12–20M/월 (트라이얼 전환율 향상)",
    effort: "4시간",
    deadline: null,
    description: "현재 H1 '업무 효율화'는 모든 B2B SaaS에 해당하는 문구. 85% 재현율 — 핵심 차별화 지표 — 이 홈페이지에 전혀 없음.",
    copy: "다른 DB가 놓친 선행문헌, 타날리시스는 찾아냅니다. 재현율 85%.",
    urgent: false,
  },
  {
    rank: 3,
    title: "가입 후 공백 구간 해소 (이메일 브릿지 + 온보딩 시퀀스)",
    impact: "₩9–18M/월 (트라이얼→유료 전환율 향상)",
    effort: "10시간",
    deadline: null,
    description: "수동 승인 대기 (1 영업일)로 가장 중요한 전환 순간에 24시간 침묵 발생. 업계 데이터에 따르면 지연 시 첫 사용률 50% 이상 감소.",
    copy: "신청 완료! 영업일 1일 이내로 승인 안내를 드립니다. 그 사이 소개자료를 먼저 확인해보세요.",
    urgent: false,
  },
];

export const revenueImpact = [
  { priority: 1, recommendation: "정부 바우처 배너 (홈페이지)", monthlyImpact: "₩15–25M", confidence: "높음", effort: "낮음" },
  { priority: 2, recommendation: "히어로 헤드라인 재작성 (85% 재현율)", monthlyImpact: "₩12–20M", confidence: "높음", effort: "낮음" },
  { priority: 3, recommendation: "가입 후 이메일 온보딩 시퀀스", monthlyImpact: "₩9–18M", confidence: "높음", effort: "보통" },
  { priority: 4, recommendation: "공개 가격 페이지 구축 + 셀프서브 결제", monthlyImpact: "₩8–15M", confidence: "높음", effort: "높음" },
  { priority: 5, recommendation: "홈페이지 소셜 증거 추가 (고객 후기)", monthlyImpact: "₩5–10M", confidence: "보통", effort: "낮음" },
  { priority: 6, recommendation: "CTA 구조 단순화 (2개로 압축)", monthlyImpact: "₩4–8M", confidence: "보통", effort: "낮음" },
  { priority: 7, recommendation: "무료 티어 한도 상향 (20pt→50pt/일)", monthlyImpact: "₩3–7M", confidence: "보통", effort: "보통" },
  { priority: 8, recommendation: "Naver Search Advisor 등록 + 블로그 개설", monthlyImpact: "₩2–5M", confidence: "보통", effort: "낮음" },
  { priority: 9, recommendation: "FAQ 스키마 마크업 추가", monthlyImpact: "₩2–4M", confidence: "낮음", effort: "낮음" },
  { priority: 10, recommendation: "경쟁사 비교 랜딩 페이지 (vs KIPRIS, vs 키워트)", monthlyImpact: "₩1–4M", confidence: "낮음", effort: "보통" },
];

export const competitors = [
  { name: "타날리시스", website: 7, seo: 5, content: 7, social: 4, overall: "2위", threat: "기준" },
  { name: "KIPRIS", website: 6, seo: 8, content: 5, social: 6, overall: "1위", threat: "낮음" },
  { name: "키워트 (Keywert)", website: 7, seo: 7, content: 8, social: 7, overall: "1위", threat: "높음" },
  { name: "WIPS ON", website: 7, seo: 7, content: 6, social: 5, overall: "2위", threat: "보통" },
  { name: "NOISE (SNU)", website: 5, seo: 4, content: 6, social: 3, overall: "3위", threat: "낮음" },
  { name: "PatSeer", website: 8, seo: 7, content: 7, social: 6, overall: "1위", threat: "보통" },
  { name: "Patsnap/Derwent", website: 9, seo: 9, content: 9, social: 8, overall: "1위", threat: "낮음" },
];

export interface ActionItem {
  text: string;
  impact: "높음" | "보통" | "낮음";
  effort: string;
  revenue: string;
  done: boolean;
}

export const quickWins: ActionItem[] = [
  { text: "홈페이지 최상단에 데이터바우처 긴급 배너 추가 (3월 31일 마감)", impact: "높음", effort: "2시간", revenue: "₩15–25M", done: false },
  { text: "홈페이지 H1을 '재현율 85%' 중심으로 재작성", impact: "높음", effort: "4시간", revenue: "₩12–20M/월", done: false },
  { text: "가입 후 확인 페이지에 소개자료 + 영상 링크 추가", impact: "높음", effort: "2시간", revenue: "₩9–18M/월", done: false },
  { text: "홈페이지에 신뢰 통계 바 추가 (85% · 8천만건 · 90% · 4.3/5)", impact: "높음", effort: "2시간", revenue: "₩5–10M/월", done: false },
  { text: "특허 검색 페이지 고객 후기 3개를 홈페이지로 이동", impact: "높음", effort: "1시간", revenue: "₩5–10M/월", done: false },
  { text: "Google Search Console + Naver Search Advisor 사이트맵 등록", impact: "보통", effort: "30분", revenue: "₩2–5M/월", done: false },
  { text: "메타 설명 전체 확장 (현재 ~70자 → 150자)", impact: "보통", effort: "1시간", revenue: "₩2–4M/월", done: false },
];

export const mediumTermItems: ActionItem[] = [
  { text: "가격 페이지 신설 — Business 플랜 금액 공개 + 셀프서브 결제", impact: "높음", effort: "1주", revenue: "₩8–15M/월", done: false },
  { text: "5통 온보딩 이메일 시퀀스 구축 및 ESP 연동", impact: "높음", effort: "2주", revenue: "₩9–18M/월", done: false },
  { text: "주간 리포트 페이지에 이메일 캡처 게이트 설치 (기업 리드마그넷)", impact: "높음", effort: "1주", revenue: "₩3–8M/월", done: false },
  { text: "홈페이지 CTA 2개로 통합 (무료로 시작하기 / 도입 상담)", impact: "보통", effort: "3시간", revenue: "₩4–8M/월", done: false },
  { text: "FAQ 스키마 마크업 추가 (Framer custom code)", impact: "보통", effort: "4시간", revenue: "₩2–4M/월", done: false },
  { text: "Naver 블로그 개설 + 첫 4개 포스트 작성", impact: "보통", effort: "2주", revenue: "₩2–5M/월", done: false },
];

export const strategicItems: ActionItem[] = [
  { text: "경쟁사 비교 랜딩 페이지 4개 제작 (vs KIPRIS, vs 키워트, vs WIPS ON, vs Patsnap)", impact: "높음", effort: "1개월", revenue: "₩1–4M/월", done: false },
  { text: "업종별 사용 사례 가이드 4종 (바이오, 자율주행, 반도체, 로펌)", impact: "높음", effort: "1개월", revenue: "₩2–5M/월", done: false },
  { text: "85% 재현율 제3자 검증 및 공식 벤치마크 발표", impact: "높음", effort: "분기", revenue: "₩5–15M/월", done: false },
  { text: "LinkedIn 콘텐츠 캘린더 실행 (주 5회, 5주 테마)", impact: "보통", effort: "지속", revenue: "₩1–3M/월", done: false },
  { text: "Google Ads + LinkedIn Ads 캠페인 런칭 (₩5M/월 예산)", impact: "보통", effort: "2주 설정", revenue: "₩3–8M/월", done: false },
];

export const categoryDetails = [
  {
    id: "website",
    title: "웹사이트 & 전환",
    score: 56,
    weight: 25,
    working: [
      "특허 검색 페이지의 Before/After 비교표 — 최고의 콘텐츠 자산",
      "/patent-search 페이지: 강력한 소셜 증거, 85% 재현율 통계, 실제 고객 후기",
      "주간 리포트 페이지의 '경쟁사가 어디로 가는지 이제 찾아보지 않아도 됩니다' — 사이트 최고 헤드라인",
    ],
    gaps: [
      { issue: "9개의 경쟁적 CTA — 명확한 우선순위 없음", severity: "심각" },
      { issue: "현재 메인 히어로 CTA '소개자료 받기'가 전환 경로에서 이탈 유도", severity: "심각" },
      { issue: "수동 트라이얼 승인 (1 영업일) — 가장 큰 마찰 지점", severity: "심각" },
      { issue: "홈페이지에 소셜 증거 없음 (고객 후기가 서브페이지에만 존재)", severity: "높음" },
    ],
    recommendations: [
      "히어로 CTA를 '무료로 시작하기' 단일 CTA로 통합",
      "즉각적인 온보딩 이메일로 수동 승인 마찰 완화",
      "고객 후기 3개를 홈페이지로 이동",
      "정부 바우처 긴급 배너 추가",
    ],
  },
  {
    id: "seo",
    title: "SEO & 자연 유입",
    score: 52,
    weight: 20,
    working: [
      "기술적 전문 콘텐츠가 E-E-A-T 신호 제공",
      "고품질 FAQ 콘텐츠 (12개 항목)",
      "Framer 기반 사이트로 모바일 반응형 대응",
    ],
    gaps: [
      { issue: "Naver 검색 완전 부재 — 한국 검색 트래픽의 핵심 채널", severity: "심각" },
      { issue: "홈페이지당 H1 태그 최대 6개 — Google 주제 파악 불가", severity: "심각" },
      { issue: "스키마 마크업 부재 (FAQ, Organization, SoftwareApplication)", severity: "높음" },
      { issue: "메타 설명 평균 ~70자 — 설득 공간 절반 낭비", severity: "보통" },
    ],
    recommendations: [
      "Google Search Console + Naver Search Advisor 사이트맵 즉시 등록",
      "홈페이지 H1 단일화 (Framer 헤딩 태그 감사)",
      "FAQ 스키마 마크업 추가",
      "선행기술조사, FTO 분석 등 고검색량 키워드 타겟 블로그 개설",
    ],
  },
  {
    id: "content",
    title: "콘텐츠 & 메시지",
    score: 67,
    weight: 15,
    working: [
      "브랜드 일관성 점수 8/10 — 초기 한국 SaaS로서 이례적으로 높음",
      "주요 차별화 지표가 내부 페이지에 효과적으로 활용됨",
      "'변리사와 AI 전문가가 만들었습니다' — 최강 신뢰 신호",
    ],
    gaps: [
      { issue: "카피 점수 54/100 — 홈페이지 히어로 섹션 5초 테스트 실패", severity: "심각" },
      { issue: "KIPO 학습 데이터 주장 (최고 차별화 요소)이 홈페이지에 없음", severity: "심각" },
      { issue: "수치 데이터가 내부 페이지에만 집중, 홈페이지는 거의 없음", severity: "높음" },
    ],
    recommendations: [
      "히어로 헤드라인을 85% 재현율 중심으로 재작성",
      "모든 제품 페이지에 창업 신뢰 신호 배치",
      "CTA 어휘 표준화 (현재 미묘한 불일치 존재)",
      "주간 리포트 제품에 대한 임원급 보이스 레이어 개발",
    ],
  },
  {
    id: "social",
    title: "소셜 미디어",
    score: 60,
    weight: 15,
    working: [
      "LinkedIn이 한국 B2B IP 전문가 주요 채널로 올바르게 식별됨",
      "제품 통계가 콘텐츠 전반에 효과적으로 활용됨",
    ],
    gaps: [
      { issue: "현재 소셜 미디어 존재감이 없거나 최소화됨", severity: "심각" },
      { issue: "Naver 블로그/포스트 전혀 없음 — 한국 B2B 필수 채널", severity: "높음" },
      { issue: "커뮤니티 구축 활동 없음", severity: "보통" },
    ],
    recommendations: [
      "LinkedIn 주 5회 발행 캘린더 실행",
      "Naver 블로그 개설 + SEO 최적화 포스트 4종",
      "5주 테마: 인식 → 제품 심층 → 신뢰 → 전환 → 전략적 IP",
      "3월 31일 이전 정부 바우처 게시물 부스팅",
    ],
  },
  {
    id: "email",
    title: "이메일 & 자동화",
    score: 65,
    weight: 15,
    working: [
      "16통 완성 이메일 시퀀스 (웰컴 5통, 육성 7통, 재참여 3통, 기능 알림 1통)",
      "합쇼체 톤 — IP 전문가 대상 적절한 격식체",
      "'변리사가 만든' 반복 신뢰 앵커",
    ],
    gaps: [
      { issue: "현재 가입 후 이메일 시퀀스 없음 — 수동 승인 사각지대", severity: "심각" },
      { issue: "이메일 캡처 게이트 없음 — 주간 리포트 리드마그넷 미활용", severity: "높음" },
      { issue: "세분화 없음 — 변리사 vs 인하우스 IP팀 vs R&D 동일 메시지", severity: "보통" },
    ],
    recommendations: [
      "5통 온보딩 시퀀스 즉시 구축 및 ESP 연동",
      "주간 리포트 페이지에 이메일 캡처 게이트 설치",
      "육성 시퀀스 N-5에 데이터바우처 긴급성 이메일 포함",
      "3월 31일 이후 바우처 날짜 업데이트 필수",
    ],
  },
  {
    id: "ads",
    title: "유료 광고",
    score: 62,
    weight: 10,
    working: [
      "5개 캠페인 완성 (Google 검색, LinkedIn 2개 타겟, 디스플레이/리타겟팅, 카피 뱅크)",
      "₩5M/월 (스타터) 및 ₩15M/월 (성장) 예산 배분 완성",
      "A/B 테스트 로드맵 우선순위화",
    ],
    gaps: [
      { issue: "현재 유료 캠페인 실행 없음 — 경쟁 환경에서 취약점", severity: "높음" },
      { issue: "리타겟팅 인프라 미구축 (픽셀, 오디언스)", severity: "높음" },
      { issue: "Google + LinkedIn 전환 추적 없음", severity: "보통" },
    ],
    recommendations: [
      "Google Ads 선행기술조사 광고 그룹 즉시 런칭",
      "LinkedIn 후원 콘텐츠로 변리사 + 인하우스 IP팀 타겟팅",
      "데이터바우처 마감 긴급성을 3단계 리타겟팅 트리거로 활용",
      "전환 추적 및 Attribution 셋업 우선 진행",
    ],
  },
];
```

**Step 2: Verify file is created and TypeScript compiles**

Run: `npm run build` from `dashboard/`
Expected: No TypeScript errors

---

### Task 3: Create layout components (Sidebar + App shell)

**Files:**
- Create: `src/components/Sidebar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Step 1: Create `src/components/Sidebar.tsx`**

```tsx
// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "종합 개요", icon: "📊" },
  { path: "/categories", label: "카테고리 분석", icon: "🔍" },
  { path: "/actions", label: "실행 계획", icon: "✅" },
  { path: "/competitors", label: "경쟁사 분석", icon: "🏆" },
  { path: "/revenue", label: "수익 영향", icon: "💰" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col py-6 px-3 fixed left-0 top-0">
      <div className="mb-8 px-3">
        <h1 className="text-lg font-bold text-white leading-tight">타날리시스</h1>
        <p className="text-xs text-gray-400 mt-1">마케팅 분석 대시보드</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-3 pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-500">분석일: 2026-03-07</p>
        <p className="text-xs text-gray-500 mt-1">모델: claude-opus-4-6</p>
      </div>
    </aside>
  );
}
```

**Step 2: Replace `src/App.tsx`**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import CategoryDetail from "./pages/CategoryDetail";
import ActionPlanPage from "./pages/ActionPlanPage";
import CompetitorsPage from "./pages/CompetitorsPage";
import RevenuePage from "./pages/RevenuePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="ml-56 flex-1 p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/categories" element={<CategoryDetail />} />
            <Route path="/actions" element={<ActionPlanPage />} />
            <Route path="/competitors" element={<CompetitorsPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

**Step 3: Update `src/main.tsx`**

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Step 4: Create stub page files (so routing doesn't crash)**

Create each of these with a simple placeholder:

`src/pages/Overview.tsx`:
```tsx
export default function Overview() { return <div>종합 개요</div>; }
```
`src/pages/CategoryDetail.tsx`:
```tsx
export default function CategoryDetail() { return <div>카테고리 분석</div>; }
```
`src/pages/ActionPlanPage.tsx`:
```tsx
export default function ActionPlanPage() { return <div>실행 계획</div>; }
```
`src/pages/CompetitorsPage.tsx`:
```tsx
export default function CompetitorsPage() { return <div>경쟁사 분석</div>; }
```
`src/pages/RevenuePage.tsx`:
```tsx
export default function RevenuePage() { return <div>수익 영향</div>; }
```

**Step 5: Verify routing works**

Run: `npm run dev`
Expected: Sidebar visible, nav links switch pages, no console errors

**Step 6: Commit**

```bash
git add src/
git commit -m "feat: add sidebar navigation and app routing shell"
```

---

### Task 4: Build Overview page (종합 개요)

**Files:**
- Modify: `src/pages/Overview.tsx`

**Step 1: Write full Overview page**

```tsx
// src/pages/Overview.tsx
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { overallScore, grade, gradeLabel, radarData, categoryScores, top3Actions } from "../data/analysisData";

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? "#10b981" : score >= 55 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-8"
        style={{ borderColor: color }}
      >
        <span className="text-4xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-500">/100</span>
      </div>
      <span className="mt-2 text-lg font-semibold text-gray-700">등급: {grade}</span>
      <span className="text-sm text-gray-500">{gradeLabel}</span>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">종합 마케팅 개요</h2>
        <p className="text-gray-500 mt-1">tanalysis.co.kr · 분석일 2026-03-07</p>
      </div>

      {/* Score + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <h3 className="text-base font-semibold text-gray-700 mb-4">전체 마케팅 점수</h3>
          <ScoreGauge score={overallScore} />
          <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
            탁월한 제품, 마케팅 인프라가 따라오지 못하는 상태. 상위 이슈 해결 시 90일 내 ₩36–72M ARR 추가 가능.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-4">카테고리별 레이더 차트</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="점수" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category bar chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-4">카테고리별 점수</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryScores} layout="vertical" margin={{ left: 16, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`${v}/100`, "점수"]} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {categoryScores.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">즉시 실행 Top 3</h3>
        <div className="grid grid-cols-1 gap-4">
          {top3Actions.map((action) => (
            <div
              key={action.rank}
              className={`bg-white rounded-2xl shadow p-5 border-l-4 ${
                action.urgent ? "border-red-500" : "border-indigo-500"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white bg-indigo-600 rounded-full w-5 h-5 flex items-center justify-center">
                      {action.rank}
                    </span>
                    {action.urgent && (
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        긴급 · {action.deadline}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  <div className="mt-2 bg-gray-50 rounded-lg p-2 text-sm text-gray-700 italic">
                    "{action.copy}"
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-emerald-600">{action.impact}</p>
                  <p className="text-xs text-gray-400 mt-1">작업 {action.effort}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify Overview page renders correctly**

Run: `npm run dev` and navigate to `/`
Expected: Score gauge, radar chart, bar chart, and 3 action cards visible

**Step 3: Commit**

```bash
git add src/pages/Overview.tsx
git commit -m "feat: add overview page with score gauge, radar chart, and top 3 actions"
```

---

### Task 5: Build CategoryDetail page (카테고리 분석)

**Files:**
- Modify: `src/pages/CategoryDetail.tsx`

**Step 1: Write full CategoryDetail page**

```tsx
// src/pages/CategoryDetail.tsx
import { useState } from "react";
import { categoryDetails, categoryScores } from "../data/analysisData";

const severityColor: Record<string, string> = {
  심각: "bg-red-100 text-red-700",
  높음: "bg-orange-100 text-orange-700",
  보통: "bg-yellow-100 text-yellow-700",
};

export default function CategoryDetail() {
  const [active, setActive] = useState(categoryDetails[0].id);
  const detail = categoryDetails.find((c) => c.id === active)!;
  const scoreInfo = categoryScores.find((c) => c.id === active || c.category === detail.title);
  const barColor = detail.score >= 70 ? "#10b981" : detail.score >= 55 ? "#f59e0b" : "#ef4444";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">카테고리별 분석</h2>
        <p className="text-gray-500 mt-1">카테고리를 선택하여 상세 분석을 확인하세요</p>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2 flex-wrap">
        {categoryDetails.map((cat) => {
          const score = cat.score;
          const color = score >= 70 ? "text-emerald-600" : score >= 55 ? "text-amber-600" : "text-red-600";
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                active === cat.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {cat.title}
              <span className={`ml-2 font-bold ${active === cat.id ? "text-white" : color}`}>
                {score}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">{detail.title}</h3>
          <div
            className="w-24 h-24 rounded-full border-8 flex flex-col items-center justify-center"
            style={{ borderColor: barColor }}
          >
            <span className="text-3xl font-bold" style={{ color: barColor }}>{detail.score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
          <p className="mt-3 text-xs text-gray-400 text-center">가중치: {detail.weight}%</p>
          {scoreInfo && <p className="text-xs text-gray-400 text-center mt-1">출처: {scoreInfo.sourceFile}</p>}
        </div>

        {/* Working well */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="font-semibold text-emerald-700 mb-3">✅ 잘 되고 있는 것</h4>
          <ul className="space-y-2">
            {detail.working.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Gaps */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="font-semibold text-red-700 mb-3">❌ 핵심 문제점</h4>
          <ul className="space-y-2">
            {detail.gaps.map((gap, i) => (
              <li key={i} className="text-sm">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${severityColor[gap.severity]}`}>
                  {gap.severity}
                </span>
                <span className="text-gray-700">{gap.issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h4 className="font-semibold text-indigo-700 mb-3">💡 권장 사항</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {detail.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-2 items-start bg-indigo-50 rounded-lg p-3">
              <span className="text-indigo-500 font-bold shrink-0">{i + 1}.</span>
              <p className="text-sm text-indigo-900">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify category tabs work**

Run: `npm run dev` → navigate to `/categories`
Expected: 6 category tabs, clicking each updates the detail panel

**Step 3: Commit**

```bash
git add src/pages/CategoryDetail.tsx
git commit -m "feat: add category detail page with tabbed analysis panels"
```

---

### Task 6: Build ActionPlan page (실행 계획)

**Files:**
- Modify: `src/pages/ActionPlanPage.tsx`

**Step 1: Write full ActionPlanPage**

```tsx
// src/pages/ActionPlanPage.tsx
import { useState } from "react";
import { quickWins, mediumTermItems, strategicItems, ActionItem } from "../data/analysisData";

const impactColor: Record<string, string> = {
  높음: "bg-red-100 text-red-700",
  보통: "bg-yellow-100 text-yellow-700",
  낮음: "bg-gray-100 text-gray-600",
};

function ActionList({ items, title, accent }: { items: ActionItem[]; title: string; accent: string }) {
  const [checklist, setChecklist] = useState(items.map((i) => i.done));
  const done = checklist.filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-base font-semibold ${accent}`}>{title}</h3>
        <span className="text-sm text-gray-400">{done}/{items.length} 완료</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
        <div
          className="bg-indigo-500 h-1.5 rounded-full transition-all"
          style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }}
        />
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={checklist[i]}
              onChange={() => setChecklist((prev) => { const next = [...prev]; next[i] = !next[i]; return next; })}
              className="mt-0.5 w-4 h-4 rounded accent-indigo-600 cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${checklist[i] ? "line-through text-gray-400" : "text-gray-800"}`}>{item.text}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactColor[item.impact]}`}>
                  영향 {item.impact}
                </span>
                <span className="text-xs text-gray-400">⏱ {item.effort}</span>
                <span className="text-xs text-emerald-600 font-medium">{item.revenue}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ActionPlanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">우선순위 실행 계획</h2>
        <p className="text-gray-500 mt-1">이번 주 / 이번 달 / 이번 분기 별 실행 항목</p>
      </div>

      <ActionList items={quickWins} title="⚡ 즉시 실행 (이번 주)" accent="text-red-600" />
      <ActionList items={mediumTermItems} title="📅 단기 실행 (이번 달)" accent="text-amber-600" />
      <ActionList items={strategicItems} title="🎯 전략적 실행 (이번 분기)" accent="text-indigo-600" />

      {/* 30-60-90 roadmap */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">30-60-90일 로드맵</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { period: "1–30일: 기반 구축", color: "border-red-400", items: ["즉시 실행 항목 전체 완료", "트래킹 + 애널리틱스 기준선 설정", "이메일 온보딩 시퀀스 런칭", "가격 페이지 신설"] },
            { period: "31–60일: 성장 + 최적화", color: "border-amber-400", items: ["A/B 테스트 프로그램 시작 (히어로 헤드라인)", "Google Ads + LinkedIn Ads 캠페인 런칭", "Naver 블로그 콘텐츠 발행 시작", "주간 리포트 이메일 캡처 게이트 활성화"] },
            { period: "61–90일: 확장", color: "border-indigo-400", items: ["성과 좋은 채널 확장, 비효율 채널 제거", "경쟁사 비교 랜딩 페이지 4종 제작", "업종별 사용 사례 가이드 발행", "분기 성과 리뷰 + 전략 업데이트"] },
          ].map((phase) => (
            <div key={phase.period} className={`border-l-4 ${phase.color} pl-4`}>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{phase.period}</h4>
              <ul className="space-y-1">
                {phase.items.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-1">
                    <span>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify checkboxes and progress bar work**

Run: `npm run dev` → `/actions`, check/uncheck items
Expected: Progress bar updates, items get strikethrough

**Step 3: Commit**

```bash
git add src/pages/ActionPlanPage.tsx
git commit -m "feat: add action plan page with interactive checklist and 30-60-90 roadmap"
```

---

### Task 7: Build Competitors page (경쟁사 분석)

**Files:**
- Modify: `src/pages/CompetitorsPage.tsx`

**Step 1: Write full CompetitorsPage**

```tsx
// src/pages/CompetitorsPage.tsx
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend, ResponsiveContainer,
} from "recharts";
import { competitors } from "../data/analysisData";

const threatColor: Record<string, string> = {
  높음: "bg-red-100 text-red-700",
  보통: "bg-yellow-100 text-yellow-700",
  낮음: "bg-green-100 text-green-700",
  기준: "bg-indigo-100 text-indigo-700",
};

const radarCompData = [
  { subject: "웹사이트", 타날리시스: 7, KIPRIS: 6, "키워트": 7, "WIPS ON": 7 },
  { subject: "SEO", 타날리시스: 5, KIPRIS: 8, "키워트": 7, "WIPS ON": 7 },
  { subject: "콘텐츠", 타날리시스: 7, KIPRIS: 5, "키워트": 8, "WIPS ON": 6 },
  { subject: "소셜", 타날리시스: 4, KIPRIS: 6, "키워트": 7, "WIPS ON": 5 },
];

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">경쟁사 분석</h2>
        <p className="text-gray-500 mt-1">7개 경쟁사 비교 분석 · 주요 위협: 키워트 (Keywert Insight 런칭)</p>
      </div>

      {/* Radar comparison */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-4">주요 경쟁사 레이더 비교 (상위 4개)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarCompData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
            <Radar name="타날리시스" dataKey="타날리시스" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            <Radar name="KIPRIS" dataKey="KIPRIS" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
            <Radar name="키워트" dataKey="키워트" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} />
            <Radar name="WIPS ON" dataKey="WIPS ON" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor matrix table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <h3 className="text-base font-semibold text-gray-700 mb-4">경쟁사 비교 매트릭스</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 text-gray-600 font-semibold">경쟁사</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">웹사이트</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">SEO</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">콘텐츠</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">소셜</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">위협도</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => (
              <tr key={i} className={`border-b ${c.name === "타날리시스" ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
                <td className="py-2 pr-4 font-medium text-gray-800">{c.name}</td>
                {[c.website, c.seo, c.content, c.social].map((val, j) => (
                  <td key={j} className="py-2 px-3 text-center">
                    <span className={`font-semibold ${val >= 8 ? "text-emerald-600" : val >= 6 ? "text-amber-600" : "text-red-500"}`}>
                      {val}/10
                    </span>
                  </td>
                ))}
                <td className="py-2 px-3 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${threatColor[c.threat]}`}>
                    {c.threat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-2xl p-5">
          <h4 className="font-semibold text-emerald-800 mb-3">✅ 경쟁 우위</h4>
          <ul className="space-y-2 text-sm text-emerald-700">
            <li>• KIPO 심사 데이터 학습 — 업계 유일</li>
            <li>• 85% 재현율 — 경쟁사 대비 4배</li>
            <li>• 변리사 + AI 전문가 공동 창업 — 강력한 신뢰 신호</li>
            <li>• 데이터바우처 공급기업 인증</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-2xl p-5">
          <h4 className="font-semibold text-red-800 mb-3">⚠️ 경쟁 열위</h4>
          <ul className="space-y-2 text-sm text-red-700">
            <li>• 데이터베이스 규모: 8천만 건 vs 키워트 3억 건</li>
            <li>• SEO 가시성 낮음 (52/100)</li>
            <li>• 소셜 미디어 존재감 거의 없음</li>
            <li>• 공개 가격 정보 없음</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5">
          <h4 className="font-semibold text-blue-800 mb-3">🎯 선점 기회</h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• 한국어 경쟁사 비교 페이지 (아무도 없음)</li>
            <li>• 업종별 사용 사례 가이드 4종</li>
            <li>• 키워트 Insight 런칭 전 포지셔닝 강화</li>
            <li>• 제3자 벤치마크 발표로 85% 주장 공인화</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify competitor page renders**

Run: `npm run dev` → `/competitors`
Expected: Radar comparison chart, matrix table, 3 insight cards

**Step 3: Commit**

```bash
git add src/pages/CompetitorsPage.tsx
git commit -m "feat: add competitors page with radar comparison and matrix table"
```

---

### Task 8: Build Revenue page (수익 영향)

**Files:**
- Modify: `src/pages/RevenuePage.tsx`

**Step 1: Write full RevenuePage**

```tsx
// src/pages/RevenuePage.tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { revenueImpact } from "../data/analysisData";

const confidenceColor: Record<string, string> = {
  높음: "bg-emerald-100 text-emerald-700",
  보통: "bg-yellow-100 text-yellow-700",
  낮음: "bg-gray-100 text-gray-600",
};

const effortColor: Record<string, string> = {
  낮음: "bg-green-100 text-green-700",
  보통: "bg-yellow-100 text-yellow-700",
  높음: "bg-red-100 text-red-700",
};

// Parse mid-point of range for chart (e.g. "₩15–25M" → 20)
function parseMidM(s: string): number {
  const nums = s.replace(/[₩M월\/]/g, "").split("–").map(Number);
  return nums.length === 2 ? (nums[0] + nums[1]) / 2 : nums[0];
}

const chartData = revenueImpact.slice(0, 8).map((r) => ({
  name: r.recommendation.length > 16 ? r.recommendation.slice(0, 16) + "…" : r.recommendation,
  value: parseMidM(r.monthlyImpact),
}));

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">수익 영향 분석</h2>
        <p className="text-gray-500 mt-1">권장 사항 실행 시 예상 월 추가 수익 · 90일 내 ₩36–72M ARR 가능</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "예상 월 추가 수익 (보수적)", value: "₩36M+", color: "text-emerald-600" },
          { label: "예상 월 추가 수익 (낙관적)", value: "₩72M+", color: "text-indigo-600" },
          { label: "즉시 실행 항목 수", value: `${revenueImpact.filter((r) => r.effort === "낮음").length}개`, color: "text-amber-600" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-4">항목별 예상 월 수익 영향 (상위 8개, 단위: M₩)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} unit="M" />
            <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`₩${v}M`, "예상 월 수익"]} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={i === 0 ? "#ef4444" : i < 3 ? "#6366f1" : "#8b5cf6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Full table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <h3 className="text-base font-semibold text-gray-700 mb-4">전체 권장 사항 수익 영향 테이블</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-2 text-gray-600 font-semibold w-6">#</th>
              <th className="text-left py-2 pr-4 text-gray-600 font-semibold">권장 사항</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">예상 월 수익</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">신뢰도</th>
              <th className="text-center py-2 px-3 text-gray-600 font-semibold">난이도</th>
            </tr>
          </thead>
          <tbody>
            {revenueImpact.map((r, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-2 text-gray-400 font-mono text-xs">{r.priority}</td>
                <td className="py-2 pr-4 text-gray-800">{r.recommendation}</td>
                <td className="py-2 px-3 text-center font-semibold text-emerald-600">{r.monthlyImpact}</td>
                <td className="py-2 px-3 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${confidenceColor[r.confidence]}`}>
                    {r.confidence}
                  </span>
                </td>
                <td className="py-2 px-3 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${effortColor[r.effort]}`}>
                    {r.effort}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={2} className="py-3 pr-4 font-bold text-gray-800">합계 추정 월 수익 영향</td>
              <td className="py-3 px-3 text-center font-bold text-emerald-700">₩36–72M</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
```

**Step 2: Verify revenue page renders**

Run: `npm run dev` → `/revenue`
Expected: Summary cards, bar chart, full revenue table with total row

**Step 3: Commit**

```bash
git add src/pages/RevenuePage.tsx
git commit -m "feat: add revenue impact page with bar chart and full recommendations table"
```

---

### Task 9: Polish, verify, and launch

**Files:**
- Modify: `index.html` (Korean title)

**Step 1: Update `index.html` title**

```html
<title>타날리시스 마케팅 대시보드</title>
```

**Step 2: Run full build to check for errors**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors

**Step 3: Launch dev server**

```bash
npm run dev
```
Expected: `localhost:5173` opens, all 5 pages load, charts render, Korean text displays correctly

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete tanalysis marketing dashboard - 5 pages, korean UI, recharts"
```
