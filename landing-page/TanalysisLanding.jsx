import React, { useState } from "react";

// ── Design Tokens (extracted from tanalysis.co.kr via Playwright) ──
const t = {
  brand: "#6541f2", brandDeep: "#312080", brandLight: "#8b6cff", lavender: "#c29ef0", brandMuted: "#5d50ae",
  tPrimary: "#0e0e0e", tBlack: "#000", tSecondary: "#333", tMuted: "rgba(84,82,94,0.83)",
  tSubtle: "#a19fad", tLight: "#73727a", tDim: "#666", tInput: "#545454", tGhost: "#b9b8bf",
  bgWhite: "#fff", bgGlass: "rgba(255,255,255,0.5)", bgGlassHeavy: "rgba(255,255,255,0.8)",
  bgLight: "#f0f1f5", bgSubtle: "#f7f7f8", bgDark: "#121822",
  bgRed: "#fde8e8", bgBlue: "#e0e7ff", bgGreen: "#dcfce7",
  red: "#d93025", redDark: "#b91c1c", blue: "#1d4ed8", green: "#15803d",
  border: "#e3e5eb",
  gBrand: "linear-gradient(140deg, rgb(49,33,128) 0%, rgb(101,65,242) 52%, rgb(194,158,240) 100%)",
  gBrandFlat: "linear-gradient(140deg, #6541f2 0%, #6541f2 50%, #6541f2 100%)",
  gSoftPurple: "linear-gradient(140deg, rgba(204,205,255,0.7) 4%, rgba(216,202,247,0.7) 60%, rgba(158,141,226,0.7) 103%)",
  gSectionUp: "linear-gradient(#f9fafb 0%, #fff 62%)",
  shadowGlow: "rgba(180,156,197,0.08) 0px 0px 16px 4px",
  shadowCard: "rgba(0,0,0,0.05) 0px 4px 20px 0px",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

// ── Comparison Table Data ──
const compareRows = [
  ["검색 입력", "복잡한 검색식 직접 작성", "구성별 문장 입력 (의미 기반 AI 검색)"],
  ["구성별 분석", "구성별 별도 검색 반복", "구성별 일괄 검색 + 원문 근거 자동 제공"],
  ["선행 문헌 검색", "불완전 — 요약부만 검색", "청구항 기반 전문(全文) 의미 검색"],
  ["AI 품질", "상용 LLM — 환각, 보안 우려", "심사 데이터 기반 특허 특화 모델 (환각 없음)"],
  ["재현율", "누락이 많거나, 노이즈가 많음", "85% — 심사관 수준 (타사 4배)"],
  ["특허 분류", "수작업 또는 사전학습 모델", "AI 자동화 — 10,000건을 5분에 90%+"],
  ["다국어 대응", "언어별 긴 검색식 별도 추가", "한국어로 KR·US·JP·EP·CN·PCT 검색"],
  ["보안", "외부 LLM에 특허 데이터 유출 위험", "IP 특화 보안 — 데이터 외부 전송 없음"],
];

// ── Features Data ──
const features = [
  { icon: "🔍", title: "AI 문장 검색·분석", body: "구성별로 문장을 입력하면 AI가 선행기술을 정확하게 찾습니다. 전문(全文) 검색으로 누락을 최소화합니다.", tag: "재현율 85% · 타사 4배" },
  { icon: "📊", title: "AI 특허 분류 자동화", body: "10,000건을 5분에 처리. 분류 기준이 있어도 없어도 즉시 가능. 13개+ 시각화 그래프로 인사이트 도출.", tag: "분류 정확도 90%+ · 프리미엄" },
  { icon: "📧", title: "경쟁사 위클리 리포트", body: "경쟁사를 등록하면 AI가 매주 새 특허를 분석해 월요일 아침 인박스로 전달합니다. 5분 설정.", tag: "매주 월요일 자동 발송" },
  { icon: "🃏", title: "구성 카드 분석", body: "문헌과 구성의 유사도를 수치와 원문 근거로 파악. 무효자료 조사, FTO 분석, 침해 판단에 활용.", tag: "심사관 수준 AI 분석" },
  { icon: "💬", title: "TANA-GPT 문헌 질문", body: "문헌 검토 중 궁금한 내용을 AI에게 바로 질문. 특허 특화 모델이라 환각 없는 답변을 제공합니다.", tag: "환각 없는 특허 AI" },
  { icon: "📤", title: "내보내기 · 협업 도구", body: "클레임차트 내보내기, 엑셀 다운로드, 링크 공유. 형광펜과 코멘트로 중요 내용 표시.", tag: "팀 협업 지원" },
];

// ── Stats Data ──
const stats = [
  { num: "85%", label: "심사관 인용 재현율", note: "자사 테스트 기준 · 타사 4배" },
  { num: "8천만", label: "학습 데이터 건수", note: "특허청·심판원 거절·무효 자료" },
  { num: "90%+", label: "AI 분류 정확도", note: "실제 수작업 대비 · 만족도 4.3/5" },
  { num: "6개국", label: "특허 검색 커버리지", note: "KR · US · JP · EP · CN · PCT" },
];

// ── Testimonials ──
const testimonials = [
  { body: "다른 DB에서 찾지 못했던 무효조사 자료를 타날리시스를 통해 확보할 수 있었습니다. 전문 검색 덕분에 기존 도구에서 놓쳤던 문헌을 잡아냈습니다.", avatar: "화", name: "책임 연구원", role: "국내 상위 화학기업" },
  { body: "선행 기술 조사 시 유사한 특허가 검색되어 불필요한 출원을 방지할 수 있었습니다. R&D 초기 단계에서의 FTO 분석에 핵심 도구가 되었습니다.", avatar: "자", name: "책임 연구원", role: "자율주행 업체" },
  { body: "특허분석 및 IP리스크 진단 측면에서 효율성을 극대화할 수 있습니다. 변리사 입장에서 검색 정확도는 타 서비스와 비교가 안 됩니다.", avatar: "바", name: "소속 변리사", role: "바이오 분야 대기업" },
  { body: "기술 검색에 필수적인 기능들을 모두 포함하고 있습니다. 구성카드 기능으로 청구항 비교 분석 시간이 절반 이하로 줄었습니다.", avatar: "IP", name: "IP 전략팀", role: "국내 대기업 인하우스" },
];

// ── Pricing Data ──
const pricing = [
  { tier: "Free", name: "무료 체험", points: "20pt", sub: "매일 지급 · 신용카드 불필요", features: ["AI 문장·키워드 검색 (10pt/회)","구성 카드 분석 (10pt/회)","KR·US·JP·EP·CN·PCT 검색","검색 결과 링크 공유","폴더·중요 문헌 저장"], btn: "무료로 시작하기", btnType: "ghost", featured: false },
  { tier: "Business", name: "비즈니스", points: "1,000pt", sub: "매월 지급 · 팀 단위 합산 가능", features: ["Free 플랜 모든 기능 포함","월 100건 AI 검색·분석","TANA-GPT 문헌 질문","클레임차트·결과 내보내기","엑셀 다운로드 무제한"], btn: "지금 가입하면 무료", btnType: "white", featured: true, badge: "가장 많이 선택" },
  { tier: "Premium", name: "엔터프라이즈", points: "협의", sub: "조직 규모 기반 맞춤 견적", features: ["Business 모든 기능 포함","AI 특허 분류 (10,000건/5분)","13개+ 시각화 그래프","위클리 리포트 통합","전담 변리사 팀 지원"], btn: "도입 문의", btnType: "dark", featured: false },
];

// ── FAQ Data ──
const faqs = [
  { q: "타날리시스 AI는 다른 AI 검색 도구와 어떻게 다른가요?", a: "타날리시스는 특허청(KIPO)과 심판원(IPTAB)의 실제 거절·무효 심사 데이터 8천만 건으로 학습한 유일한 특허 특화 AI입니다. ChatGPT 등 상용 LLM과 달리 환각이 없고, 전문(全文) 검색으로 재현율 85%를 달성합니다 (타사 대비 4배)." },
  { q: "가입 후 바로 사용할 수 있나요?", a: "가입 신청 후 영업일 기준 1일 이내에 승인 안내 메일을 발송합니다. 빠른 체험을 원하시면 팀 미팅을 신청해 주시면 팀 전체에 2주 Trial을 즉시 제공합니다." },
  { q: "포인트는 어떻게 사용되나요?", a: "검색·분석 1회당 10pt, AI 분류(Lite) 40pt, AI 분류(전체) 200pt가 차감됩니다. Free는 20pt/일, Business는 1,000pt/월이 지급됩니다. 충전일로부터 1개월 유효합니다." },
  { q: "특허 데이터 보안은 어떻게 관리되나요?", a: "상용 LLM과 달리 입력된 데이터가 외부로 전송되거나 학습에 사용되지 않습니다. 민감한 출원 전 기술 데이터를 안전하게 분석할 수 있습니다." },
  { q: "중소기업도 도입할 수 있나요?", a: "데이터바우처 공급기업으로 선정되어 있어 중소기업은 최대 3,000만원 (비용의 최대 90%)의 정부 지원을 받아 도입할 수 있습니다. 신청 마감은 3월 31일입니다." },
];

// ── Weekly Report Data ──
const weeklyRows = [
  { company: "NAVER", detail: "AI 추천 기술 · 12건 신규 출원", signal: "▲ 핵심 베팅", type: "up" },
  { company: "KAKAO", detail: "멀티모달 LLM · 7건 신규 출원", signal: "⚠ 주의", type: "warn" },
  { company: "NAVER LABS", detail: "자율주행 센서 · 4건 출원", signal: "✓ 지속", type: "ok" },
];

// ── Shared Styles ──
const container = { maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 40px" };
const sectionPad = { padding: "80px 0" };
const eyebrow = { fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, lineHeight: "16.8px", color: t.brand, textTransform: "uppercase", marginBottom: 12 };
const sTitle = { fontSize: 48, fontWeight: 1000, lineHeight: "57.6px", letterSpacing: -1.14, color: t.tBlack, marginBottom: 16 };
const sSub = { fontSize: 16, fontWeight: 1000, lineHeight: "24.8px", letterSpacing: -0.32, color: t.tMuted, maxWidth: 560 };
const btnPrimary = { backgroundImage: t.gBrand, backgroundColor: t.brand, borderRadius: 11, padding: "0 0 0 18px", boxShadow: t.shadowGlow, cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, height: 48, textDecoration: "none" };
const btnGlass = { background: t.bgGlass, borderRadius: 11, padding: "12px 18px", boxShadow: t.shadowGlow, cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, height: 48, textDecoration: "none" };
const btnText = { fontSize: 16, fontWeight: 1000, lineHeight: "22px", letterSpacing: -0.32 };

export default function TanalysisLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div style={{ fontFamily: t.font, fontSize: 16, lineHeight: "normal", color: t.tBlack, background: t.bgWhite, WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>

      {/* ═══ URGENCY BANNER ═══ */}
      <div style={{ backgroundImage: t.gBrand, color: "#fff", textAlign: "center", padding: "10px 24px", fontSize: 13, fontWeight: 600, letterSpacing: -0.26, lineHeight: "20.8px" }}>
        <strong style={{ fontWeight: 900 }}>정부 지원 마감 D-23</strong> — 중소기업 최대 3,000만원 지원 (데이터바우처, 3월 31일 마감)
        <span style={{ color: t.lavender, textDecoration: "underline", marginLeft: 8, fontWeight: 700, cursor: "pointer" }}>지금 신청하기 →</span>
      </div>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, height: 64, background: t.bgGlassHeavy, backdropFilter: "blur(10px)", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1440, width: "100%", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 32, borderRadius: 6, background: t.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 900 }}>T</div>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.5, color: t.brand }}>타날리시스</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["특허 검색·분석","AI 분류","위클리 리포트","왜 타날리시스?"].map((l,i)=>(
              <span key={i} style={{ fontSize: 16, fontWeight: 1000, lineHeight: "19.2px", letterSpacing: -0.16, color: t.tMuted, cursor: "pointer" }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...btnGlass, height: 40 }}><span style={{ ...btnText, fontSize: 14, color: t.tPrimary }}>로그인</span></div>
            <div style={{ ...btnPrimary, padding: "12px 18px", height: 40, backgroundImage: t.gBrandFlat }}><span style={{ ...btnText, fontSize: 14, color: "#fff" }}>무료로 시작하기</span></div>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 0 80px", background: t.bgWhite }}>
        <div style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 900, height: 700, background: "radial-gradient(50% 50%, rgba(42,0,255,0.5) 2.7%, rgba(209,211,255,0.5) 49%, rgba(255,255,255,0) 100%)", opacity: 0.15, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(101,65,242,0.06)", border: "1px solid rgba(101,65,242,0.12)", borderRadius: 100, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: t.brand, letterSpacing: -0.26, marginBottom: 24 }}>
            변리사가 만든 특허 특화 AI · 심사 데이터 8천만 건 학습
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 1000, lineHeight: "57.6px", letterSpacing: -1.14, color: t.tBlack, maxWidth: 820, margin: "0 auto 20px" }}>
            심사관 수준의 정확도로<br/><span style={{ backgroundImage: t.gBrand, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>특허를 검색·분류하는 AI</span>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 1000, lineHeight: "24.8px", letterSpacing: -0.32, color: t.tMuted, maxWidth: 580, margin: "0 auto 40px" }}>
            상용 LLM과 달리 환각이 없습니다. 특허청·심판원의 거절·무효 데이터로 학습한 유일한 특허 특화 모델.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 60 }}>
            <div style={{ ...btnPrimary }}><span style={{ ...btnText, color: "#fff" }}>무료로 시작하기</span><span style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>→</span></div>
            <div style={{ ...btnGlass }}><span style={{ ...btnText, color: t.tPrimary }}>소개자료 받기</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {[{n:"85%",l:"심사관 인용 재현율 (타사 4배)"},{n:"8천만",l:"학습 데이터 건수"},{n:"90%+",l:"AI 분류 정확도"},{n:"30초",l:"검색 결과 도출"}].map((s,i)=>(
              <div key={i} style={{ padding: "0 32px", textAlign: "center", borderRight: i<3?`1px solid ${t.border}`:"none" }}>
                <div style={{ fontSize: 32, fontWeight: 1000, letterSpacing: -1.28, lineHeight: "44.8px", color: t.brand, marginBottom: 2 }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, lineHeight: "16.8px", color: t.tLight }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEARCH DEMO ═══ */}
      <div style={{ background: t.bgWhite, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ background: t.bgWhite, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20, boxShadow: t.shadowCard }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.tSecondary, letterSpacing: -0.26, marginBottom: 10 }}>AI 문장 검색 체험</div>
            <input readOnly placeholder="찾으려는 기술 내용을 간단히 설명해주세요." style={{ width: "100%", background: t.bgLight, border: `1px solid ${t.border}`, borderRadius: 8, padding: "16px 20px", fontSize: 13, color: t.tInput, outline: "none", fontFamily: "inherit" }} />
            <button style={{ width: "100%", marginTop: 12, background: t.brandMuted, border: "none", borderRadius: 8, padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>누락 없는 검색 결과 확인하기</button>
          </div>
        </div>
      </div>

      {/* ═══ TRUST BAR ═══ */}
      <div style={{ background: t.bgSubtle, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "20px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 1000, color: t.tGhost, letterSpacing: 0.24 }}>도입 기업</span>
          {["국내 상위 화학기업","자율주행 업체","바이오 분야 대기업","특허법인 다수"].map((item,i)=>(
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: t.tSecondary, letterSpacing: -0.26 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.brand, flexShrink: 0 }} />{item}
            </span>
          ))}
          <span style={{ fontSize: 13, fontWeight: 900, color: t.brand }}>데이터바우처 공급기업</span>
        </div>
      </div>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section style={{ ...sectionPad, background: t.gSectionUp }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={eyebrow}>도입 전 vs 도입 후</p>
            <h2 style={sTitle}>다 같은 AI가 아닙니다</h2>
            <p style={{ ...sSub, margin: "0 auto", textAlign: "center" }}>타날리시스는 특허청 심사 데이터로 학습한 유일한 특허 특화 AI입니다.</p>
          </div>
          <div style={{ overflowX: "auto", borderRadius: 20, boxShadow: t.shadowCard }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: t.bgWhite }}>
              <thead>
                <tr>
                  <th style={{ padding: "20px 24px", fontSize: 14, fontWeight: 700, color: t.tMuted, textAlign: "left", borderBottom: `2px solid ${t.border}`, width: 160 }}>항목</th>
                  <th style={{ padding: "20px 24px", fontSize: 14, fontWeight: 900, textAlign: "left", borderBottom: `2px solid ${t.border}`, background: t.bgRed, color: t.red }}>기존 방식</th>
                  <th style={{ padding: "20px 24px", fontSize: 14, fontWeight: 900, textAlign: "left", borderBottom: `2px solid ${t.border}`, background: "rgba(101,65,242,0.06)", color: t.brand }}>타날리시스 도입 시</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([cat, before, after], i) => (
                  <tr key={i} style={{ borderBottom: i < compareRows.length - 1 ? `1px solid ${t.border}` : "none" }}>
                    <td style={{ padding: "16px 24px", fontSize: 13, fontWeight: 900, color: t.tPrimary, whiteSpace: "nowrap" }}>{cat}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: t.redDark, lineHeight: 1.6 }}>{before}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: t.brand, fontWeight: 700, lineHeight: 1.6 }}>{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ ...sectionPad, background: t.bgWhite }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={eyebrow}>기능 소개</p>
            <h2 style={sTitle}>반복 업무를 AI가 대신합니다</h2>
            <p style={{ ...sSub, margin: "0 auto", textAlign: "center" }}>특허 검색부터 분류·분석·모니터링까지, 하나의 플랫폼에서.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: t.bgGlass, border: `1px solid ${t.border}`, borderRadius: 11, padding: "28px 24px", position: "relative", overflow: "hidden", transition: "all 0.2s", cursor: "default" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "linear-gradient(107deg, #fff 0%, rgba(204,205,255,0.7) 100%)", opacity: 0.25, pointerEvents: "none" }} />
                <div style={{ width: 40, height: 40, backgroundImage: t.gBrand, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, position: "relative" }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 1000, lineHeight: "23.8px", letterSpacing: -0.34, color: t.tBlack, marginBottom: 8, position: "relative" }}>{f.title}</h3>
                <p style={{ fontSize: 16, fontWeight: 1000, lineHeight: "24.8px", letterSpacing: -0.32, color: t.tMuted, position: "relative" }}>{f.body}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(112,115,124,0.05)", borderRadius: 15, padding: "4px 12px 4px 8px", fontSize: 12, fontWeight: 600, color: t.brand, marginTop: 16, position: "relative" }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ ...sectionPad, background: t.bgDark, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 600, background: "radial-gradient(50% 50%, rgba(42,0,255,0.5) 2.7%, rgba(145,151,255,0.5) 49%, rgba(0,0,0,0) 100%)", opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ ...eyebrow, color: t.lavender }}>숫자가 증명하는 품질</p>
            <h2 style={{ ...sTitle, color: "#fff" }}>타날리시스가 다른 이유</h2>
            <p style={{ ...sSub, color: "rgba(255,255,255,0.55)", margin: "0 auto", textAlign: "center" }}>주장이 아닌 데이터로 증명합니다.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.44, lineHeight: 1, marginBottom: 8, backgroundImage: "linear-gradient(140deg, #fff 0%, #c29ef0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: -0.2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WEEKLY REPORT ═══ */}
      <section style={{ backgroundImage: t.gSoftPurple, borderTop: "1px solid rgba(101,65,242,0.08)", borderBottom: "1px solid rgba(101,65,242,0.08)", padding: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <p style={eyebrow}>위클리 리포트</p>
            <h2 style={sTitle}>경쟁사가 어디로 가는지<br/>이제 찾아보지 않아도 됩니다</h2>
            <p style={sSub}>경쟁사 또는 기술을 한 번만 등록하면, AI가 매주 분석해 월요일 아침 인박스로 전달합니다.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
              {[{n:"1",t:"5분 설정",d:"경쟁사 또는 기술 등록"},{n:"2",t:"AI 자동 분석",d:"매주 새 특허를 전략 시그널로 해석"},{n:"3",t:"월요일 아침 도착",d:"30초에 읽는 브리핑"}].map((s,i)=>(
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 28, height: 28, background: t.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{s.n}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: t.tSecondary, lineHeight: 1.6, paddingTop: 3 }}><strong style={{ fontWeight: 900, color: t.tPrimary }}>{s.t}</strong> — {s.d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <div style={{ background: t.brandMuted, border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 500, color: "#fff", cursor: "pointer" }}>무료 상담 신청 →</div>
              <div style={{ background: "rgba(112,115,124,0.05)", border: "none", borderRadius: 100, padding: "10px 12px 10px 14px", fontSize: 13, fontWeight: 600, color: t.tSecondary, cursor: "pointer" }}>리포트 샘플 보기 →</div>
            </div>
            <p style={{ fontSize: 12, color: t.tMuted, marginTop: 12 }}>정부 지원으로 최대 90% 비용 절감 (마감 3/31)</p>
          </div>
          <div>
            <div style={{ background: t.bgWhite, borderRadius: 20, padding: 28, boxShadow: "rgba(101,65,242,0.12) 0px 8px 40px", border: "1px solid rgba(101,65,242,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${t.border}` }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: t.tPrimary, letterSpacing: -0.3 }}>위클리 특허 리포트</div>
                  <div style={{ fontSize: 11, color: t.tGhost, marginTop: 2 }}>2026년 3월 3일 (월) · AI 자동 생성</div>
                </div>
                <span style={{ background: "rgba(101,65,242,0.08)", color: t.brand, borderRadius: 100, padding: "4px 10px", fontSize: 11, fontWeight: 900 }}>신규 분석</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 900, color: t.tMuted, letterSpacing: 0.24, marginBottom: 8 }}>경쟁사 동향</div>
              {weeklyRows.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < weeklyRows.length - 1 ? `1px solid ${t.bgLight}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: t.tPrimary }}>{r.company}</div>
                    <div style={{ fontSize: 12, color: t.tMuted, marginTop: 2 }}>{r.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", background: r.type === "up" ? t.bgBlue : r.type === "warn" ? t.bgRed : t.bgGreen, color: r.type === "up" ? t.blue : r.type === "warn" ? t.red : t.green }}>{r.signal}</span>
                </div>
              ))}
              <div style={{ background: "rgba(101,65,242,0.04)", border: "1px solid rgba(101,65,242,0.08)", borderRadius: 8, padding: 12, marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: t.brand, marginBottom: 4 }}>AI 인사이트</div>
                <div style={{ fontSize: 13, color: t.tSecondary, lineHeight: 1.55 }}>NAVER의 AI 추천 기술 집중 출원은 커머스 추천 엔진 강화 신호입니다. 관련 FTO 분석을 권장합니다.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ ...sectionPad, background: t.bgSubtle }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={eyebrow}>고객 후기</p>
            <h2 style={sTitle}>앞서가는 전문가들은<br/>이미 타날리시스를 도입했습니다</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {testimonials.map((tm, i) => (
              <div key={i} style={{ background: t.bgWhite, border: `1px solid ${t.border}`, borderRadius: 12, padding: 28, boxShadow: t.shadowCard, position: "relative" }}>
                <div style={{ position: "absolute", top: 18, right: 24, fontSize: 60, fontWeight: 900, color: "rgba(101,65,242,0.08)", lineHeight: 1 }}>{"\u201C"}</div>
                <p style={{ fontSize: 15, fontWeight: 500, color: t.tSecondary, lineHeight: 1.7, letterSpacing: -0.2, marginBottom: 20 }}>{tm.body}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundImage: t.gBrand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{tm.avatar}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 900, color: t.tPrimary }}>{tm.name}</div><div style={{ fontSize: 12, color: t.tMuted }}>{tm.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section style={{ ...sectionPad, background: t.bgWhite }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={eyebrow}>요금제</p>
            <h2 style={sTitle}>추가 결제 없이 시작하세요</h2>
            <p style={{ ...sSub, margin: "0 auto", textAlign: "center" }}>포인트제로 사용한 만큼만 차감됩니다.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
            {pricing.map((p, i) => (
              <div key={i} style={{ border: `1px solid ${p.featured ? t.brand : t.border}`, borderRadius: 20, padding: 32, position: "relative", ...(p.featured ? { backgroundImage: t.gBrand, color: "#fff", boxShadow: "rgba(101,65,242,0.2) 0px 8px 40px" } : {}) }}>
                {p.badge && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: t.brandLight, color: "#fff", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 900, whiteSpace: "nowrap" }}>{p.badge}</div>}
                <div style={{ fontSize: 12, fontWeight: 900, color: p.featured ? "rgba(255,255,255,0.6)" : t.brand, letterSpacing: 0.24, textTransform: "uppercase", marginBottom: 8 }}>{p.tier}</div>
                <div style={{ fontSize: 26, fontWeight: 1000, letterSpacing: -1.04, lineHeight: "36.4px", color: p.featured ? "#fff" : t.tBlack, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1.28, lineHeight: "44.8px", color: p.featured ? t.lavender : t.brand, marginBottom: 4 }}>{p.points}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: p.featured ? "rgba(255,255,255,0.5)" : t.tMuted, marginBottom: 24 }}>{p.sub}</div>
                <hr style={{ border: "none", borderTop: `1px solid ${p.featured ? "rgba(255,255,255,0.12)" : t.border}`, marginBottom: 20 }} />
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, listStyle: "none", padding: 0 }}>
                  {p.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: p.featured ? "rgba(255,255,255,0.8)" : t.tSecondary, lineHeight: 1.55 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: p.featured ? "#fff" : t.brand, background: p.featured ? "rgba(255,255,255,0.15)" : "rgba(101,65,242,0.08)", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={{ display: "block", width: "100%", textAlign: "center", padding: 13, borderRadius: 11, fontSize: 16, fontWeight: 1000, letterSpacing: -0.32, cursor: "pointer", border: p.btnType === "ghost" ? `1px solid ${t.border}` : "none", background: p.btnType === "ghost" ? t.bgGlass : p.btnType === "white" ? "#fff" : t.brandMuted, color: p.btnType === "ghost" ? t.tSecondary : p.btnType === "white" ? t.brand : "#fff", fontFamily: "inherit" }}>{p.btn}</button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: t.tMuted }}>
            데이터바우처로 최대 90% 지원 (3/31 마감) · <span style={{ color: t.brand, fontWeight: 700, cursor: "pointer" }}>지금 신청 →</span>
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ ...sectionPad, background: t.bgLight }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={eyebrow}>자주 묻는 질문</p>
            <h2 style={sTitle}>궁금한 점이 있으신가요?</h2>
          </div>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ background: t.bgWhite, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
                  <div onClick={() => setOpenFaq(isOpen ? -1 : i)} style={{ padding: "20px 24px", fontSize: 15, fontWeight: 900, letterSpacing: -0.2, color: isOpen ? t.brand : t.tPrimary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
                    {faq.q}
                    <span style={{ fontSize: 18, color: isOpen ? t.brand : t.tGhost, transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                  </div>
                  {isOpen && (
                    <div style={{ fontSize: 14, color: t.tMuted, lineHeight: 1.75, padding: "0 24px 20px" }}>{faq.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ background: t.bgDark, padding: "100px 0", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 1000, height: 600, background: "radial-gradient(50% 50%, rgba(42,0,255,0.5) 2.7%, rgba(145,151,255,0.5) 49%, rgba(0,0,0,0) 100%)", opacity: 0.5, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ ...eyebrow, color: t.lavender }}>지금 시작하세요</p>
          <h2 style={{ ...sTitle, color: "#fff" }}>새로운 방식으로<br/>검색해보세요.</h2>
          <p style={{ ...sSub, color: "rgba(255,255,255,0.55)", margin: "0 auto 40px", textAlign: "center" }}>무료로 시작하고, 심사관 수준의 AI 특허 검색을 직접 경험해보세요.</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ ...btnPrimary }}><span style={{ ...btnText, color: "#fff" }}>무료로 시작하기</span><span style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>→</span></div>
            <div style={{ ...btnGlass }}><span style={{ ...btnText, color: t.tPrimary }}>도입 문의</span></div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>팀 미팅 신청 시 팀 전체 2주 Trial 무료 · <span style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline", cursor: "pointer" }}>팀 미팅 신청</span></p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: t.bgDark, borderTop: "1px solid rgba(255,255,255,0.04)", padding: "48px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 1000, lineHeight: "20.8px", letterSpacing: -0.26, color: t.tLight, marginBottom: 8 }}>타날리시스 | 변리사가 만들어 더 정확한 AI 특허 분석</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 20 }}>특허청 심사 데이터 기반 유일한 특허 특화 AI<br/>변리사와 AI 전문가가 직접 만들어 정확도와 실무 적합도가 매우 높습니다.</div>
              <div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, lineHeight: "16.8px", color: "rgba(255,255,255,0.3)" }}>서울특별시 강남구 역삼로 169 (팁스타운S2)<br/>02-568-7222 · tanalysis@tanalysis.co.kr</div>
            </div>
            {[
              { title: "기능", links: ["특허 검색·분석","AI 특허 분류","위클리 리포트"] },
              { title: "자료", links: ["소개자료 다운로드","분야별 상세 사례","블로그"] },
              { title: "고객지원", links: ["자주 묻는 질문","고객센터","팀 미팅 신청","정부 지원 신청"] },
            ].map((col, ci) => (
              <div key={ci}>
                <div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l, li) => (
                    <span key={li} style={{ fontSize: 13, fontWeight: 1000, color: t.tMuted, cursor: "pointer" }}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, lineHeight: "16.8px", color: "rgba(255,255,255,0.2)" }}>
              (주)타날리시스 · 대표: 최인경 · 사업자등록번호: 564-88-02306
            </div>
            <div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 0.24, color: "rgba(255,255,255,0.2)" }}>
              &copy; 2025 Tanalysis. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
