import React, { useState, useRef, useEffect } from "react";

// ── 변경사항 데이터 ──
const changes = [
  {
    id: 1, num: "1", priority: "high",
    title: "헤드라인 재작성",
    subtitle: "감사 즉시적용 #1 · 히어로 섹션",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "카피", type: "copy" }],
    before: { text: '"업무 효율화, 정확한 특허 검색·분석부터"', desc: "모든 B2B SaaS가 쓰는 일반적인 효율성 문구" },
    after: { text: '"심사관 수준의 정확도로 특허를 검색·분류하는 AI"', desc: "구체적인 성능 차별점을 전면에 배치" },
    analysis: [
      { type: "metric", text: "재현율 85%", suffix: " 수치가 방문자가 가장 먼저 보는 요소로 변경" },
      { type: "text", text: "혜택 중심의 초구체적 헤드라인 (심사관 수준의 정확도)" },
      { type: "text", text: "10단어 이내 — 5초 이해도 테스트 통과" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+15-25%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "섹션 점수", value: "5 → 8", color: "green" },
    ],
    mockBefore: { headline: "업무 효율화,\n정확한 특허 검색·분석부터", style: "generic" },
    mockAfter: { headline: "심사관 수준의 정확도로\n특허를 검색·분류하는 AI", style: "optimized" },
  },
  {
    id: 2, num: "2", priority: "high",
    title: "데이터바우처 긴급 배너",
    subtitle: "감사 즉시적용 #8 · 첫 화면 상단",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "UX", type: "ux" }],
    before: { text: "없음", desc: "기존 홈페이지에는 긴급 배너가 없었습니다. 보조금 정보는 /reportbymail 페이지에 숨겨져 있었습니다." },
    after: { text: "보라색 그라데이션 배너", desc: "페이지 최상단에 항상 노출" },
    analysis: [
      { type: "highlight", text: "최대 90% 정부 보조금", suffix: " (마감 3/31) 정보가 홈페이지 방문자에게는 보이지 않았습니다." },
      { type: "text", text: "한국 B2B SaaS에서 가장 강력한 구매 트리거 — 금전적 혜택 + 마감 긴급성의 조합" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+10-20%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "긴급성 점수", value: "2 → 8", color: "green" },
    ],
    mockBefore: { type: "empty", text: "긴급 배너 없음" },
    mockAfter: { type: "banner", text: "🎯 2025 데이터바우처 사업 — 최대 90% 정부 지원  마감 3/31" },
  },
  {
    id: 3, num: "3", priority: "high",
    title: "히어로 핵심 수치 바",
    subtitle: "감사 즉시적용 #5 · 사회적 증거",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "디자인", type: "design" }],
    before: { text: "하위 페이지에만 존재", desc: "핵심 수치가 기능 하위 페이지에만 있었고 홈페이지 히어로에는 없었습니다." },
    after: { text: "4열 수치 바", desc: "CTA 버튼 바로 아래에 배치" },
    analysis: [
      { type: "text", text: "숫자는 즉각적인 신뢰를 형성합니다 — 문장으로는 불가능한 효과입니다." },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+10-15%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "신뢰 점수", value: "4 → 8", color: "green" },
    ],
    mockBefore: { type: "empty", text: "수치 없음" },
    mockAfter: { type: "stats", items: [
      { value: "85%", label: "재현율" },
      { value: "8천만+", label: "학습 데이터" },
      { value: "90%+", label: "분류 정확도" },
      { value: "30초", label: "검색 속도" },
    ]},
  },
  {
    id: 4, num: "4", priority: "high",
    title: "비교 테이블 상단 이동",
    subtitle: "감사 즉시적용 #4 · 가치 제안",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "UX", type: "ux" }],
    before: { text: "스크롤 3회+ 아래", desc: '"도입 전/후" 테이블이 가치를 가장 명확하게 전달하지만 묻혀 있었음' },
    after: { text: "섹션 #2 (히어로 바로 다음)", desc: "색상 구분 컬럼으로 직관적인 대비" },
    analysis: [
      { type: "text", text: "빨간색 = 도입 전, 보라색 = 도입 후로 직관적인 대비를 구현" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+15-25%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "가치 제안 점수", value: "5 → 9", color: "green" },
    ],
    mockBefore: { type: "table-buried", text: "스크롤 3회 이상 아래 위치" },
    mockAfter: { type: "table", rows: [
      { category: "검색 방식", before: "수동 키워드 검색", after: "AI 자동 분류" },
      { category: "소요 시간", before: "3-5일", after: "30초" },
      { category: "정확도", before: "담당자 역량 의존", after: "재현율 85%" },
    ]},
  },
  {
    id: 5, num: "5", priority: "mid",
    title: "주간리포트 CTA 동등 배치",
    subtitle: "감사 즉시적용 #2 · 전환 퍼널",
    tags: [{ label: "전략적", type: "strategic" }, { label: "디자인", type: "design" }],
    before: { text: "보조 내비게이션에 숨겨짐", desc: "홈페이지에는 전혀 노출되지 않았습니다." },
    after: { text: "전용 섹션 + 모의 리포트 카드", desc: "실제 샘플 데이터(NAVER/KAKAO/NAVER LABS) 포함" },
    analysis: [
      { type: "highlight", text: "사이트에서 전략적으로 가장 흥미로운 제품", suffix: "으로 식별됨" },
      { type: "text", text: "풀 트라이얼을 아직 고려하지 않는 임원진을 위한 낮은 진입 장벽의 접점" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+5-10%", color: "green" },
      { label: "구현 난이도", value: "보통", color: "yellow" },
      { label: "퍼널 다양성", value: "1 → 2", color: "green" },
    ],
    mockBefore: { type: "empty", text: "홈페이지 노출 없음" },
    mockAfter: { type: "report-card" },
  },
  {
    id: 6, num: "6", priority: "new",
    title: "검색 입력 데모",
    subtitle: "신규 기능 · 인터랙티브 요소",
    tags: [{ label: "신규", type: "strategic" }, { label: "UX", type: "ux" }],
    before: { text: "없음", desc: "홈페이지에 인터랙티브 요소가 없었습니다. 순수 정보 제공 콘텐츠만 존재." },
    after: { text: "검색 입력창 복제본", desc: "실제 검색 스타일 (#f0f1f5 bg, 8px radius) 적용" },
    analysis: [
      { type: "text", text: "버튼 클릭 시 회원가입으로 연결. 방문자에게 가입 전 제품의 실제 느낌을 체험하게 합니다." },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+5-10%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "사용자 참여", value: "수동 → 능동", color: "green" },
    ],
    mockBefore: { type: "empty", text: "인터랙티브 요소 없음" },
    mockAfter: { type: "search-input" },
  },
  {
    id: 7, num: "7", priority: "high",
    title: "가격 섹션",
    subtitle: "감사 전략적 권고 #4 · 이의 처리",
    tags: [{ label: "전략적", type: "strategic" }, { label: "디자인", type: "design" }],
    before: { text: "FAQ에 숨겨짐", desc: '/faq/point-guide — "전환에 가장 적대적인 위치"' },
    after: { text: "3단계 요금제 전용 섹션", desc: "Free / Business / Premium 비교" },
    analysis: [
      { type: "highlight", text: "가장 많이 선택", suffix: "으로 Business 요금제 강조. 가격 앵커링으로 중간 요금제가 가장 합리적으로 느껴지게 설계" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+15-30%", color: "green" },
      { label: "구현 난이도", value: "보통", color: "yellow" },
      { label: "이의 처리 점수", value: "3 → 8", color: "green" },
    ],
    mockBefore: { type: "empty", text: "FAQ 안에 숨겨짐" },
    mockAfter: { type: "pricing" },
  },
  {
    id: 8, num: "8", priority: "mid",
    title: "CTA 체계 표준화",
    subtitle: "감사 즉시적용 #6 · 전환",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "카피", type: "copy" }],
    before: { text: "9개의 CTA 혼용", desc: '"무료로 시작하기", "지금 가입하면 무료", "소개자료 받기", "도입 문의" 등' },
    after: { text: "3단계 체계", desc: "주요 / 보조 / 부가" },
    analysis: [
      { type: "text", text: '주요: "무료로 시작하기" (브랜드 그라데이션 → 가입)' },
      { type: "text", text: '보조: "소개자료 받기" / "도입 문의" (글래스 버튼)' },
      { type: "text", text: '부가: "리포트 샘플 보기" (필 고스트 링크)' },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+10-15%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "CTA 점수", value: "4 → 8", color: "green" },
    ],
    mockBefore: { type: "cta-chaos" },
    mockAfter: { type: "cta-hierarchy" },
  },
  {
    id: 9, num: "9", priority: "mid",
    title: "신뢰 지표 바",
    subtitle: "사회적 증거 강화",
    tags: [{ label: "즉시 적용", type: "quick" }, { label: "카피", type: "copy" }],
    before: { text: "추상적 문구", desc: '"앞서가는 전문가들은 이미 타날리시스를 도입했습니다" — 실질적 내용 없음' },
    after: { text: "구체적 고객 유형 명시", desc: "화학기업, 자율주행, 바이오, 특허법인 + 데이터바우처 공급기업" },
    analysis: [
      { type: "text", text: "실제 고객 유형과 공식 자격을 명시한 구체적 신뢰 지표 바로 교체" },
    ],
    impact: [
      { label: "예상 전환율 영향", value: "+5-10%", color: "green" },
      { label: "구현 난이도", value: "낮음", color: "yellow" },
      { label: "신뢰 점수", value: "4 → 7", color: "green" },
    ],
    mockBefore: { type: "trust-vague" },
    mockAfter: { type: "trust-specific" },
  },
  {
    id: 10, num: "10", priority: "new",
    title: "디자인 시스템 일관성",
    subtitle: "65+ CSS 커스텀 속성 · 픽셀 매칭",
    tags: [{ label: "디자인", type: "design" }],
    before: { text: "Framer CMS 원본", desc: "클라이언트 사이드 렌더링, 동적 클래스" },
    after: { text: "65+ 디자인 토큰 추출 적용", desc: "Playwright로 computed style 추출" },
    analysis: [
      { type: "text", text: "Pretendard Variable weight 1000 (실제 사이트 weight)" },
      { type: "text", text: "버튼: 12px 18px 패딩, 11px 라운드, 라벤더 글로우" },
      { type: "text", text: "텍스트 24색, 배경 16색, 그라데이션 17개 원본 그대로" },
      { type: "text", text: "fadeIn 0.5s ease-out 및 buttonPop 1.5s ease-in-out" },
    ],
    impact: [
      { label: "CSS 커스텀 속성", value: "65+", color: "brand" },
      { label: "고유 색상", value: "57", color: "brand" },
      { label: "그라데이션", value: "17", color: "brand" },
      { label: "추출 방법", value: "Playwright", color: "brand" },
    ],
    mockBefore: { type: "design-before" },
    mockAfter: { type: "design-after" },
  },
];

const navItems = [
  { label: "요약 및 점수", href: "overview", icon: "📊" },
  { label: "변경사항 상세", href: "changes", icon: "🔄" },
];

// ── 색상 팔레트 ──
const palette = [
  { name: "--brand", hex: "#6541f2" },
  { name: "--brand-deep", hex: "#312080" },
  { name: "--brand-light", hex: "#8b6cff" },
  { name: "--lavender", hex: "#c29ef0" },
  { name: "--brand-muted", hex: "#5d50ae" },
  { name: "--t-primary", hex: "#0e0e0e" },
  { name: "--bg-light", hex: "#f0f1f5" },
  { name: "--bg-dark", hex: "#121822" },
  { name: "--border", hex: "#e3e5eb" },
];

// ── 스타일 정의 ──
const c = {
  brand: "#6541f2", brandDeep: "#312080", brandLight: "#8b6cff", lavender: "#c29ef0",
  bgDark: "#0f1117", bgCard: "#1a1c25", bgSurface: "#14161e",
  border: "rgba(255,255,255,0.06)", borderActive: "rgba(101,65,242,0.4)",
  textPrimary: "#f0f0f5", textSecondary: "#a0a0b0", textMuted: "#6b6b80",
  green: "#22c55e", greenBg: "rgba(34,197,94,0.1)",
  red: "#ef4444", redBg: "rgba(239,68,68,0.1)",
  yellow: "#eab308", yellowBg: "rgba(234,179,8,0.1)",
};

const tagColors = {
  quick: { bg: c.greenBg, color: c.green },
  strategic: { bg: "rgba(101,65,242,0.15)", color: c.brandLight },
  copy: { bg: c.yellowBg, color: c.yellow },
  design: { bg: "rgba(59,130,246,0.1)", color: "#60a5fa" },
  ux: { bg: "rgba(168,85,247,0.1)", color: "#c084fc" },
};

// ── Mock 컴포넌트들 ──
function MockBefore({ data }) {
  if (!data) return null;
  if (data.type === "empty") return <div style={{ padding: 40, textAlign: "center", color: c.textMuted, fontSize: "0.85rem", background: "#0a0b0f", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>{data.text}</div>;
  if (data.headline) return (
    <div style={{ background: "#fafafa", padding: "40px 32px", minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#333", whiteSpace: "pre-line", lineHeight: 1.4 }}>{data.headline}</div>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <div style={{ padding: "8px 16px", borderRadius: 8, background: "#e5e5e5", color: "#666", fontSize: "0.8rem", fontWeight: 600 }}>무료로 시작하기</div>
      </div>
    </div>
  );
  if (data.type === "table-buried") return (
    <div style={{ background: "#0a0b0f", padding: "30px 20px", minHeight: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ fontSize: "2rem", opacity: 0.3 }}>↓↓↓</div>
      <div style={{ color: c.textMuted, fontSize: "0.8rem" }}>{data.text}</div>
    </div>
  );
  if (data.type === "cta-chaos") return (
    <div style={{ background: "#fafafa", padding: "20px 16px", minHeight: 120, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "center" }}>
      {["무료로 시작하기","지금 가입하면 무료","소개자료 받기","도입 문의","타날리시스팀 문의","무료 상담 신청","지금 시작","문의하기","더 알아보기"].map((t,i)=>
        <div key={i} style={{ padding: "5px 10px", borderRadius: 6, background: i%3===0?"#6541f2":i%3===1?"#e5e5e5":"transparent", color: i%3===0?"white":i%3===1?"#333":"#6541f2", fontSize: "0.65rem", fontWeight: 600, border: i%3===2?"1px solid #6541f2":"none" }}>{t}</div>
      )}
    </div>
  );
  if (data.type === "trust-vague") return (
    <div style={{ background: "#fafafa", padding: "30px 20px", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#999", fontSize: "0.85rem", fontStyle: "italic" }}>"앞서가는 전문가들은 이미 타날리시스를 도입했습니다"</div>
    </div>
  );
  if (data.type === "design-before") return (
    <div style={{ background: "#fafafa", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 50 }}>
      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#333" }}>TANALYSIS</div>
      <div style={{ display: "flex", gap: 16 }}>
        {["특허검색","특허분류","주간리포트","FAQ"].map((t,i)=><span key={i} style={{ fontSize: "0.75rem", color: "#666" }}>{t}</span>)}
      </div>
      <div style={{ padding: "5px 12px", borderRadius: 8, background: "#5d50ae", color: "white", fontSize: "0.7rem", fontWeight: 600 }}>무료로 시작하기</div>
    </div>
  );
  return null;
}

function MockAfter({ data }) {
  if (!data) return null;
  if (data.headline) return (
    <div style={{ background: "linear-gradient(180deg, #fafafa 0%, #f0f0ff 100%)", padding: "32px 32px 24px", minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0e0e0e", whiteSpace: "pre-line", lineHeight: 1.4 }}>{data.headline}</div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <div style={{ padding: "8px 16px", borderRadius: 11, background: "linear-gradient(140deg, #312080, #6541f2, #c29ef0)", color: "white", fontSize: "0.8rem", fontWeight: 700 }}>무료로 시작하기</div>
        <div style={{ padding: "8px 16px", borderRadius: 11, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: "1px solid #e3e5eb", color: "#333", fontSize: "0.8rem", fontWeight: 600 }}>소개자료 받기</div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
        {[{v:"85%",l:"재현율"},{v:"8천만+",l:"데이터"},{v:"90%+",l:"정확도"},{v:"30초",l:"속도"}].map((s,i)=>
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1rem", fontWeight: 900, color: "#6541f2" }}>{s.v}</div>
            <div style={{ fontSize: "0.6rem", color: "#999" }}>{s.l}</div>
          </div>
        )}
      </div>
    </div>
  );
  if (data.type === "banner") return (
    <div style={{ background: "linear-gradient(140deg, #312080, #6541f2)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 40 }}>
      <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}>{data.text}</span>
    </div>
  );
  if (data.type === "stats") return (
    <div style={{ background: "linear-gradient(180deg, #f8f8ff, #fff)", padding: "24px 20px", display: "flex", justifyContent: "space-around" }}>
      {data.items.map((s,i)=>(
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#6541f2" }}>{s.value}</div>
          <div style={{ fontSize: "0.7rem", color: "#999", marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
  if (data.type === "table") return (
    <div style={{ background: "#fff", padding: "16px 12px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem" }}>
        <thead><tr>
          <th style={{ padding: "6px 8px", textAlign: "left", color: "#999", fontWeight: 600, borderBottom: `1px solid #eee` }}>항목</th>
          <th style={{ padding: "6px 8px", textAlign: "center", color: c.red, fontWeight: 700, borderBottom: `1px solid #eee` }}>도입 전</th>
          <th style={{ padding: "6px 8px", textAlign: "center", color: "#6541f2", fontWeight: 700, borderBottom: `1px solid #eee` }}>도입 후</th>
        </tr></thead>
        <tbody>{data.rows.map((r,i)=>(
          <tr key={i}>
            <td style={{ padding: "8px", fontWeight: 600, color: "#333" }}>{r.category}</td>
            <td style={{ padding: "8px", textAlign: "center", background: "rgba(239,68,68,0.05)", color: "#b91c1c" }}>{r.before}</td>
            <td style={{ padding: "8px", textAlign: "center", background: "rgba(101,65,242,0.05)", color: "#6541f2" }}>{r.after}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
  if (data.type === "report-card") return (
    <div style={{ background: "#f8f9fb", padding: "20px 16px" }}>
      <div style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#333", marginBottom: 10 }}>주간 특허 모니터링 리포트</div>
        {[{name:"NAVER",status:"신규 출원 3건",color:"#1d4ed8"},{name:"KAKAO",status:"등록 완료",color:"#15803d"},{name:"NAVER LABS",status:"이의신청 접수",color:"#d93025"}].map((r,i)=>(
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i<2?"1px solid #f0f0f0":"none" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#333" }}>{r.name}</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: r.color, background: r.color+"15", padding: "2px 8px", borderRadius: 4 }}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (data.type === "search-input") return (
    <div style={{ background: "#fafafa", padding: "30px 24px", display: "flex", gap: 8, alignItems: "center" }}>
      <input readOnly placeholder="키워드, 출원번호, 출원인을 입력하세요" style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid #e3e5eb", background: "#f0f1f5", fontSize: "0.8rem", color: "#999", outline: "none" }} />
      <div style={{ padding: "12px 20px", borderRadius: 8, background: "#5d50ae", color: "white", fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap" }}>검색</div>
    </div>
  );
  if (data.type === "pricing") return (
    <div style={{ background: "#f8f9fb", padding: "16px 12px", display: "flex", gap: 8 }}>
      {[
        { name: "Free", price: "20pt/일", highlight: false },
        { name: "Business", price: "1,000pt/월", highlight: true },
        { name: "Premium", price: "협의", highlight: false },
      ].map((p,i)=>(
        <div key={i} style={{ flex: 1, borderRadius: 12, padding: "16px 12px", textAlign: "center", background: p.highlight ? "linear-gradient(140deg, #312080, #6541f2, #c29ef0)" : "white", color: p.highlight ? "white" : "#333", border: p.highlight ? "none" : "1px solid #e3e5eb" }}>
          {p.highlight && <div style={{ fontSize: "0.55rem", fontWeight: 700, marginBottom: 4, opacity: 0.9 }}>가장 많이 선택</div>}
          <div style={{ fontSize: "0.85rem", fontWeight: 800 }}>{p.name}</div>
          <div style={{ fontSize: "0.7rem", marginTop: 4, opacity: 0.8 }}>{p.price}</div>
        </div>
      ))}
    </div>
  );
  if (data.type === "cta-hierarchy") return (
    <div style={{ background: "#fafafa", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ padding: "10px 24px", borderRadius: 11, background: "linear-gradient(140deg, #312080, #6541f2, #c29ef0)", color: "white", fontSize: "0.8rem", fontWeight: 700 }}>무료로 시작하기</div>
      <div style={{ padding: "8px 20px", borderRadius: 11, background: "rgba(255,255,255,0.5)", border: "1px solid #e3e5eb", color: "#333", fontSize: "0.75rem", fontWeight: 600 }}>소개자료 받기</div>
      <div style={{ color: "#6541f2", fontSize: "0.7rem", fontWeight: 600, textDecoration: "underline" }}>리포트 샘플 보기</div>
    </div>
  );
  if (data.type === "trust-specific") return (
    <div style={{ background: "#fafafa", padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
      {["국내 상위 화학기업","자율주행 업체","바이오 대기업","특허법인","데이터바우처 공급기업"].map((t,i)=>(
        <div key={i} style={{ padding: "4px 10px", borderRadius: 6, background: i===4?"rgba(101,65,242,0.1)":"#f0f1f5", color: i===4?"#6541f2":"#333", fontSize: "0.7rem", fontWeight: 600 }}>{t}</div>
      ))}
    </div>
  );
  if (data.type === "design-after") return (
    <div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 50, borderBottom: "1px solid #e3e5eb" }}>
      <div style={{ fontWeight: 900, fontSize: "0.9rem", color: "#0e0e0e" }}>TANALYSIS</div>
      <div style={{ display: "flex", gap: 16 }}>
        {["특허검색","특허분류","주간리포트","FAQ"].map((t,i)=><span key={i} style={{ fontSize: "0.75rem", color: "rgba(84,82,94,0.83)", fontWeight: 1000 }}>{t}</span>)}
      </div>
      <div style={{ padding: "5px 12px", borderRadius: 8, background: "#5d50ae", color: "white", fontSize: "0.7rem", fontWeight: 700, boxShadow: "rgba(180,156,197,0.08) 0 0 16px 4px" }}>무료로 시작하기</div>
    </div>
  );
  return null;
}

// ── 메인 컴포넌트 ──
export default function CRODashboard() {
  const [openCards, setOpenCards] = useState(new Set([1]));
  const [activeNav, setActiveNav] = useState("overview");

  const toggleCard = (id) => {
    setOpenCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenCards(new Set(changes.map(c => c.id)));
  const collapseAll = () => setOpenCards(new Set());

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', background: c.bgDark, color: c.textPrimary, minHeight: "100vh", lineHeight: 1.6 }}>
      {/* ── 상단 바 ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(15,17,23,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 900, fontSize: "1rem", background: "linear-gradient(135deg, #8b6cff, #c29ef0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CRO 대시보드</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.yellowBg, border: "2px solid rgba(234,179,8,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", color: c.yellow }}>61</div>
          <div><div style={{ fontSize: "0.65rem", color: c.textMuted }}>기존 점수</div><div style={{ fontSize: "0.8rem", fontWeight: 700 }}>61 / 100</div></div>
        </div>
        <div style={{ fontSize: "1.2rem", color: c.textMuted }}>→</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.greenBg, border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", color: c.green }}>84</div>
          <div><div style={{ fontSize: "0.65rem", color: c.textMuted }}>예상 점수</div><div style={{ fontSize: "0.8rem", fontWeight: 700 }}>84 / 100</div></div>
        </div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: c.greenBg, color: c.green }}>+23 pts</span>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: "0.7rem", color: c.textMuted, textAlign: "right" }}>
          <div>분석일: 2026-03-08</div>
          <div>10개 변경 · 7개 즉시 적용</div>
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        {/* ── 개요 KPI 그리드 ── */}
        <div id="overview" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "감사 점수", value: "61 → 84", sub: "+23점 개선", vColor: c.yellow, spanColor: c.green, hasSpan: true },
            { label: "변경 항목", value: "10", sub: "즉시 적용 7개, 전략적 3개", vColor: c.textPrimary },
            { label: "예상 전환율 영향", value: "+40-60%", sub: "약 2%에서 약 3-3.2%로", vColor: c.green },
            { label: "디자인 토큰", value: "65+", sub: "DESIGN-SYSTEM.json 기반", vColor: c.brandLight },
            { label: "CTA 표준화", value: "9 → 3", sub: "주요 / 보조 / 부가", vColor: c.textPrimary },
            { label: "페이지 유형", value: "B2B SaaS", sub: "목표 전환율: 3-7%", vColor: c.lavender, small: true },
          ].map((s, i) => (
            <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: "0.65rem", color: c.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              <div style={{ fontSize: s.small ? "1rem" : "1.5rem", fontWeight: 900, marginTop: 4, color: s.vColor }}>
                {s.hasSpan ? <>61 → <span style={{ color: s.spanColor }}>84</span></> : s.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: c.textSecondary, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── 전체 열기/닫기 ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800 }}>변경사항 상세 (10)</h3>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={expandAll} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${c.border}`, background: "transparent", color: c.textSecondary, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>전체 펼치기</button>
            <button onClick={collapseAll} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${c.border}`, background: "transparent", color: c.textSecondary, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>전체 접기</button>
          </div>
        </div>

        {/* ── 변경사항 카드 ── */}
        {changes.map((ch, idx) => {
          const isOpen = openCards.has(ch.id);
          return (
            <div key={ch.id} style={{ background: c.bgCard, border: `1px solid ${isOpen ? c.borderActive : c.border}`, borderRadius: 12, marginBottom: 16, overflow: "hidden", transition: "border-color 0.2s", animation: `fadeInUp 0.4s ease-out ${idx * 0.05}s both` }}>
              {/* 카드 헤더 */}
              <div onClick={() => toggleCard(ch.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer", userSelect: "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8rem", flexShrink: 0, background: ch.priority === "high" ? c.greenBg : ch.priority === "mid" ? c.yellowBg : "rgba(101,65,242,0.15)", color: ch.priority === "high" ? c.green : ch.priority === "mid" ? c.yellow : c.brandLight }}>{ch.num}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>{ch.title}</div>
                  <div style={{ fontSize: "0.7rem", color: c.textMuted, marginTop: 1 }}>{ch.subtitle}</div>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  {ch.tags.map((t, ti) => (
                    <span key={ti} style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: tagColors[t.type]?.bg, color: tagColors[t.type]?.color }}>{t.label}</span>
                  ))}
                </div>
                <svg width={16} height={16} viewBox="0 0 20 20" fill={c.textMuted} style={{ flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
              </div>

              {/* 카드 바디 */}
              {isOpen && (
                <div style={{ padding: "0 20px 20px" }}>
                  {/* 비교 영역 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${c.border}` }}>
                      <div style={{ padding: "6px 12px", fontSize: "0.65rem", fontWeight: 800, background: c.redBg, color: c.red }}>● 변경 전</div>
                      <MockBefore data={ch.mockBefore} />
                    </div>
                    <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${c.border}` }}>
                      <div style={{ padding: "6px 12px", fontSize: "0.65rem", fontWeight: 800, background: c.greenBg, color: c.green }}>● 변경 후</div>
                      <MockAfter data={ch.mockAfter} />
                    </div>
                  </div>

                  {/* 분석 */}
                  <div style={{ background: c.bgSurface, borderRadius: 8, padding: 16 }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 800, color: c.brandLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>변경 내용</h4>
                    {ch.before && <p style={{ fontSize: "0.8rem", color: c.textSecondary, lineHeight: 1.7, marginBottom: 4 }}><strong>변경 전:</strong> {ch.before.text} — {ch.before.desc}</p>}
                    {ch.after && <p style={{ fontSize: "0.8rem", color: c.textSecondary, lineHeight: 1.7, marginBottom: 8 }}><strong>변경 후:</strong> {ch.after.text} — {ch.after.desc}</p>}
                    <ul style={{ paddingLeft: 16, marginTop: 4 }}>
                      {ch.analysis.map((a, ai) => (
                        <li key={ai} style={{ fontSize: "0.8rem", color: c.textSecondary, lineHeight: 1.7, marginBottom: 3 }}>
                          {a.type === "metric" && <span style={{ display: "inline-block", background: c.greenBg, color: c.green, fontWeight: 700, padding: "1px 6px", borderRadius: 4, fontSize: "0.75rem" }}>{a.text}</span>}
                          {a.type === "highlight" && <span style={{ color: c.lavender, fontWeight: 700 }}>{a.text}</span>}
                          {a.type === "text" && a.text}
                          {a.suffix}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 영향도 */}
                  <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                    {ch.impact.map((imp, ii) => (
                      <div key={ii} style={{ background: c.bgSurface, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: "0.6rem", color: c.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{imp.label}</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 900, marginTop: 3, color: imp.color === "green" ? c.green : imp.color === "yellow" ? c.yellow : imp.color === "brand" ? c.brandLight : c.textPrimary }}>{imp.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* 10번 카드: 색상 팔레트 */}
                  {ch.id === 10 && (
                    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 6 }}>
                      {palette.map((p, pi) => (
                        <div key={pi} style={{ background: p.hex === "#f0f1f5" || p.hex === "#e3e5eb" ? p.hex : p.hex, padding: "10px 8px", borderRadius: 6, textAlign: "center", fontSize: "0.6rem", fontWeight: 700, color: ["#f0f1f5","#e3e5eb","#c29ef0"].includes(p.hex) ? "#333" : "white" }}>
                          {p.name}<br/>{p.hex}
                        </div>
                      ))}
                      <div style={{ background: "linear-gradient(140deg,#312080,#6541f2,#c29ef0)", padding: "10px 8px", borderRadius: 6, textAlign: "center", fontSize: "0.6rem", fontWeight: 700, color: "white" }}>--g-brand<br/>gradient</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 키프레임 애니메이션 ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
