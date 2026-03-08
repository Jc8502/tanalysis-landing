# Marketing Dashboard Design — tanalysis.co.kr
**Date:** 2026-03-07
**Stack:** Vite + React + TypeScript + Recharts + Tailwind CSS
**Language:** Korean (전체 UI 한국어)
**Launch:** `npm run dev` → localhost:5173

## Goal
Interactive web dashboard visualizing all 10 marketing analysis results for tanalysis.co.kr in Korean.

## Architecture

```
C:\Users\joons\work\marketing\dashboard\
├── src/
│   ├── App.tsx
│   ├── data/analysisData.ts     # all analysis data baked in
│   ├── components/
│   │   ├── ScoreCard.tsx
│   │   ├── RadarChart.tsx
│   │   ├── CategoryBar.tsx
│   │   ├── ActionPlan.tsx
│   │   ├── RevenueTable.tsx
│   │   ├── CompetitorMatrix.tsx
│   │   └── Sidebar.tsx
│   └── pages/
│       ├── Overview.tsx
│       ├── CategoryDetail.tsx
│       ├── ActionPlanPage.tsx
│       ├── Competitors.tsx
│       └── Revenue.tsx
├── package.json
└── index.html
```

## Pages

| 탭 | 내용 |
|----|------|
| 종합 개요 | 전체 점수(59/100), 레이더 차트, Top 3 즉시 실행 항목 |
| 카테고리 분석 | 6개 카테고리 상세 — 점수, 발견 사항, 권장 사항 |
| 실행 계획 | 이번 주 / 이번 달 / 이번 분기 체크리스트 |
| 경쟁사 분석 | 7개 경쟁사 비교 매트릭스 |
| 수익 영향 | 20개 권장 사항별 월 예상 수익 (₩36–72M 범위) |

## Key Data (from analysis)
- Overall score: 59/100
- Category scores: Website 58, SEO 52, Content 54, Social 60, Email 55, Ads 60
- Top 3 actions: 정부 바우처 배너, H1 재작성, 가입 후 이메일 시퀀스
- Revenue uplift: ₩36–72M/month estimated
- Competitors: KIPRIS, Keywert, WIPS ON, NOISE, PatSeer, Lens.org, Patsnap/Derwent
