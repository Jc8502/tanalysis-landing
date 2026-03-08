"""Patch remaining English text in the dashboard HTML."""
import re

PATCHES = [
    # === MARKETING AUDIT — QUICK WINS ===
    ("1. Rewrite the Homepage H1 Around the Core Proof Point", "1. 홈페이지 H1을 핵심 증거 중심으로 재작성"),
    ("2. Add Weekly Report as a Second Homepage CTA", "2. 주간 리포트를 홈페이지 보조 CTA로 추가"),
    ("3. Set Explicit Approval Timeline Expectations at Signup", "3. 가입 시 승인 대기 시간을 명확히 안내"),
    ("4. Move the 기능 비교 Table to Above the Fold", "4. 기능 비교 표를 스크롤 없는 위치로 이동"),
    ("5. Add Quantified Numbers to the Homepage Hero", "5. 홈페이지 히어로에 정량적 수치 추가"),
    ("6. Fix CTA Language Inconsistency", "6. CTA 문구 일관성 개선"),
    ("7. Add Alt Text and Structured Meta to All Feature 페이지s", "7. 모든 기능 페이지에 Alt 텍스트 및 구조화 메타 추가"),
    ("8. Add Government Voucher CTA to Homepage", "8. 홈페이지에 정부 바우처 CTA 추가"),
    ("9. Add Named Testimonial Attribution Where Missing", "9. 미표기 추천사에 실명 출처 추가"),
    ("10. Add a Demo Video or GIF to the 히어로 섹션", "10. 히어로 섹션에 데모 영상 또는 GIF 추가"),
    ("<strong>Strategic 권장 사항 (This Month) — 6 Items</strong>", "<strong>전략적 권장 사항 (이번 달) — 6개 항목</strong>"),
    ("1. Build a Dedicated Comparison Landing 페이지", "1. 전용 비교 랜딩 페이지 구축"),
    ("2. Create a Segmented Landing 페이지 Per Buyer Persona", "2. 구매자 페르소나별 세분화 랜딩 페이지 제작"),
    ("3. Build a Post-Signup Onboarding Email 시퀀스", "3. 가입 후 온보딩 이메일 시퀀스 구축"),
    ("4. Develop a Pricing 페이지 with Clear Tier Articulation", "4. 명확한 플랜 구분이 있는 가격 페이지 개발"),
    ("5. Establish a LinkedIn + Professional Community Presence", "5. LinkedIn 및 전문가 커뮤니티 활동 구축"),
    ("6. Add 스키마 마크업 for SaaS/Software Product", "6. SaaS/소프트웨어 제품용 스키마 마크업 추가"),
    ("<strong>Long-Term Initiatives (This Quarter) — 3 Items</strong>", "<strong>장기 이니셔티브 (이번 분기) — 3개 항목</strong>"),
    ("1. SEO Content Strategy — Korean IP Professional Search Capture", "1. SEO 콘텐츠 전략 — 한국 IP 전문가 검색 트래픽 확보"),
    ("2. Customer Success Case Study Program", "2. 고객 성공 사례 연구 프로그램"),
    ("3. Enterprise Sales Motion + Account-Based Marketing", "3. 엔터프라이즈 영업 프로세스 + 어카운트 기반 마케팅"),
    ("<strong>Detailed 분석 by 카테고리</strong>", "<strong>카테고리별 상세 분석</strong>"),
    ("Content &amp; Messaging 분석 — 점수: 58/100", "콘텐츠 &amp; 메시징 분석 — 점수: 58/100"),
    ("Conversion Optimization 분석 — 점수: 55/100", "전환 최적화 분석 — 점수: 55/100"),
    ("SEO &amp; Discoverability 분석 — 점수: 62/100", "SEO &amp; 검색 노출 분석 — 점수: 62/100"),
    ("Competitive Positioning 분석 — 점수: 65/100", "경쟁 포지셔닝 분석 — 점수: 65/100"),
    ("Brand &amp; Trust 분석 — 점수: 68/100", "브랜드 &amp; 신뢰도 분석 — 점수: 68/100"),
    ("Growth &amp; Strategy 분석 — 점수: 60/100", "성장 &amp; 전략 분석 — 점수: 60/100"),

    # === SEO SECTION ===
    ("<strong>Playwright Technical Audit (2026-03-08)</strong>", "<strong>Playwright 기술 감사 (2026-03-08)</strong>"),
    ("Title Tag — Homepage", "타이틀 태그 — 홈페이지"),
    ("Title Tags — Inner 페이지s", "타이틀 태그 — 내부 페이지"),
    ("Meta Descriptions", "메타 설명"),
    ("Heading Hierarchy — Fail", "헤딩 계층 구조 — 미충족"),
    ("Image Optimization", "이미지 최적화"),
    ("Internal Linking — Needs Work", "내부 링크 — 개선 필요"),
    ("URL Structure", "URL 구조"),
    ("<strong>Content Quality (E-E-A-T)</strong>", "<strong>콘텐츠 품질 (E-E-A-T)</strong>"),
    ("Primary Keyword 평가 — Homepage", "핵심 키워드 평가 — 홈페이지"),
    ("목표 Keyword Clusters by Audience", "타겟 키워드 클러스터 (청중별)"),
    ("<strong>Technical SEO</strong>", "<strong>기술적 SEO</strong>"),
    ("Framer JS Rendering — 핵심 문제", "Framer JS 렌더링 — 핵심 문제"),
    ("스키마 마크업 — Fail (missing)", "스키마 마크업 — 미충족 (누락)"),
    ("페이지 Speed — Framer Sites (추정치d)", "페이지 속도 — Framer 사이트 (추정치)"),
    ("<strong>로컬 SEO — Korean Market</strong>", "<strong>로컬 SEO — 한국 시장</strong>"),
    ("<strong>Prioritized 권장 사항</strong>", "<strong>우선순위별 권장 사항</strong>"),
    ("<strong>빠른 개선 항목 Summary Table</strong>", "<strong>빠른 개선 항목 요약 표</strong>"),

    # === CRO SECTION ===
    ("🔬 Playwright Visual CRO Audit (2026-03-08)", "🔬 Playwright 시각적 CRO 감사 (2026-03-08)"),
    ("📸 Screenshots Captured", "📸 캡처된 스크린샷"),
    ("🖥️ Above-the-Fold 분석 (Desktop 1440x900)", "🖥️ 스크롤 없는 영역 분석 (데스크톱 1440x900)"),
    ("👁️ Visual Hierarchy 평가", "👁️ 시각적 계층 구조 평가"),
    ("🔘 CTA Visual 분석", "🔘 CTA 시각적 분석"),
    ("📱 Mobile Experience (390x844 — iPhone 14 Pro)", "📱 모바일 경험 (390x844 — iPhone 14 Pro)"),
    ("🛡️ Trust Signals Visibility", "🛡️ 신뢰 신호 가시성"),
    ("🔄 Key Visual 발견 사항s vs Text-Only Audit", "🔄 주요 시각적 발견 사항 vs 텍스트 감사"),
    ("📊 Revised CRO 점수 (Visual)", "📊 수정된 CRO 점수 (시각적)"),
    ("🔍 Section-by-Section 분석", "🔍 섹션별 분석"),
    ("2. Value Proposition", "2. 가치 제안"),
    ("4. Features and Benefits", "4. 기능 및 이점"),
    ("6. Call-to-조치", "6. 행동 유도"),
    ("7. Footer and Secondary 요소s", "7. 푸터 및 보조 요소"),
    ("📌 Prioritized Fix List", "📌 우선순위 수정 목록"),
    ("🖼️ 이전/이후 Wireframe Suggestions", "🖼️ 이전/이후 와이어프레임 제안"),
    ("📊 Summary 점수 Card", "📊 요약 점수 카드"),

    # === COMPETITOR SECTION ===
    ("경쟁사 Overview", "경쟁사 개요"),
    ("Detailed 경쟁사 프로필", "경쟁사 상세 프로필"),
    ("6. Lens.org", "6. Lens.org"),
    ("Comparison Tables", "비교 표"),
    ("Positioning Map", "포지셔닝 맵"),
    ("Content and SEO Gap 분석", "콘텐츠 및 SEO 갭 분석"),
    ("SWOT 분석 &mdash; Tanalysis", "SWOT 분석 &mdash; 타날리시스"),
    ("Alternative 페이지s to Create", "새로 만들 페이지 대안"),
    ("Switching Narratives", "전환 내러티브"),
    ("Competitive Monitoring Plan", "경쟁사 모니터링 계획"),

    # === COPY SECTION ===
    ("<strong>10 헤드라인 Alternatives (Ranked)</strong>", "<strong>10가지 헤드라인 대안 (순위순)</strong>"),
    ("<strong>Voice &amp; Tone Profile</strong>", "<strong>보이스 &amp; 톤 프로필</strong>"),

    # === BRAND VOICE SECTION ===
    ("<strong>Brand Personality</strong>", "<strong>브랜드 개성</strong>"),
    ("<strong>Tone by Context</strong>", "<strong>상황별 톤</strong>"),
    ("<strong>Vocabulary</strong>", "<strong>어휘 가이드</strong>"),
    ("<strong>Voice Chart — IS vs IS NOT</strong>", "<strong>보이스 차트 — 해야 할 것 vs 하지 말 것</strong>"),
    ("<strong>Brand Messaging Hierarchy</strong>", "<strong>브랜드 메시징 계층 구조</strong>"),
    ("<strong>Full Brand Story</strong>", "<strong>브랜드 전체 스토리</strong>"),
    ("<strong>Copy Samples in Brand Voice (10 Examples)</strong>", "<strong>브랜드 보이스 카피 샘플 (10가지 예시)</strong>"),
    ("<strong>Consistency Audit</strong>", "<strong>일관성 감사</strong>"),

    # === ADS SECTION ===
    ("<strong>Audience 목표ing — 4 Segments</strong>", "<strong>타겟 오디언스 — 4개 세그먼트</strong>"),
    ("<strong>Campaign 1: 구글 광고 — Patent Search (특허 검색)</strong>", "<strong>캠페인 1: 구글 광고 — 특허 검색</strong>"),
    ("Ad Group 1: 선행기술조사 / Prior Art Search", "광고 그룹 1: 선행기술조사"),
    ("Ad Group 2: 특허 분류 / Patent Classification", "광고 그룹 2: 특허 분류"),
    ("Ad Group 3: 경쟁사 특허 모니터링 / Competitive Patent Intelligence", "광고 그룹 3: 경쟁사 특허 모니터링"),
    ("Ad Group 4: 브랜드 검색 / Brand Terms", "광고 그룹 4: 브랜드 검색"),
    ("Performance Max Campaign — Asset Group", "Performance Max 캠페인 — 에셋 그룹"),
    ("<strong>Campaign 2: 링크드인 광고 — IP Professionals (Korea)</strong>", "<strong>캠페인 2: 링크드인 광고 — IP 전문가 (한국)</strong>"),
    ("목표ing Configuration", "타겟팅 설정"),
    ("Sponsored Content Ads (3 Variants)", "스폰서드 콘텐츠 광고 (3가지 변형)"),
    ("Message Ads (InMail) — 2 Variants", "메시지 광고 (InMail) — 2가지 변형"),
    ("Text Ads (4 Variants)", "텍스트 광고 (4가지 변형)"),
    ("Document Ads (PDF Carousel) + Lead Gen Form", "문서 광고 (PDF 카루셀) + 리드 생성 폼"),
    ("<strong>Campaign 3: Display &amp; Retargeting (3-단계 Funnel)</strong>", "<strong>캠페인 3: 디스플레이 &amp; 리타겟팅 (3단계 퍼널)</strong>"),
    ("<strong>Campaign 4: Ad Copy Bank — Korean &amp; English</strong>", "<strong>캠페인 4: 광고 카피 뱅크 — 한국어 &amp; 영어</strong>"),
    ("<strong>Campaign 5: A/B 테스트 계획</strong>", "<strong>캠페인 5: A/B 테스트 계획</strong>"),
    ("<strong>Landing 페이지 Alignment &amp; Message Match</strong>", "<strong>랜딩 페이지 정렬 &amp; 메시지 일치</strong>"),
    ("<strong>Strategic 권장 사항 (8 Points)</strong>", "<strong>전략적 권장 사항 (8가지)</strong>"),

    # === EMAIL SECTION ===
    ("<h3>시퀀스 2: Trial-to-Paid Nurture — 무료 → Business 전환</h3>", "<h3>시퀀스 2: 트라이얼→유료 전환 — 무료 → Business</h3>"),
    ("<h3>Compliance &amp; Implementation</h3>", "<h3>컴플라이언스 &amp; 구현</h3>"),
    ("<h3>Brand Context</h3>", "<h3>브랜드 맥락</h3>"),

    # === SOCIAL CALENDAR SECTION ===
    ("<h3>Supplementary Posts (Days 25-30 / Fill-in)</h3>", "<h3>보충 포스트 (25-30일차 / 보충용)</h3>"),
    ("<h3>채널-Specific KPIs</h3>", "<h3>채널별 KPI</h3>"),
    ("<h3>Content Production 비고</h3>", "<h3>콘텐츠 제작 비고</h3>"),
    ("<h3>Content Calendar Summary</h3>", "<h3>콘텐츠 캘린더 요약</h3>"),

    # === EXECUTIVE REPORT SECTION ===
    ("<h3>Playwright Audit Update (2026-03-08)</h3>", "<h3>Playwright 감사 업데이트 (2026-03-08)</h3>"),
    ("<h3>Part 3: Detailed 발견 사항s by 카테고리</h3>", "<h3>파트 3: 카테고리별 상세 발견 사항</h3>"),
    ("<h4>3.1 Website &amp; Conversion (점수: 54/100)</h4>", "<h4>3.1 웹사이트 &amp; 전환 (점수: 54/100)</h4>"),
    ("<h4>3.3 Content &amp; Messaging (점수: 67/100)</h4>", "<h4>3.3 콘텐츠 &amp; 메시징 (점수: 67/100)</h4>"),
    ("<h4>3.5 Email &amp; Automation (점수: 65/100)</h4>", "<h4>3.5 이메일 &amp; 자동화 (점수: 65/100)</h4>"),
    ("<h4>3.6 Paid Advertising (점수: 62/100)</h4>", "<h4>3.6 유료 광고 (점수: 62/100)</h4>"),
    ("<h3>Part 5: SEO Snapshot</h3>", "<h3>파트 5: SEO 스냅샷</h3>"),
    ("<h3>Part 6: Conversion Optimization Summary</h3>", "<h3>파트 6: 전환 최적화 요약</h3>"),
    ("<h3>Part 8: Prioritized 조치 Plan</h3>", "<h3>파트 8: 우선순위 조치 계획</h3>"),
    ("<h3>Part 9: 30-60-90 Day Roadmap</h3>", "<h3>파트 9: 30-60-90일 로드맵</h3>"),
    ("<h3>Part 10: Appendix</h3>", "<h3>파트 10: 부록</h3>"),

    # === TOPBAR ===
    ("Tanalysis <span>마케팅 종합 대시보드</span>", "Tanalysis <span>마케팅 종합 대시보드</span>"),

    # === MISC ===
    ("Strategic 권장 사항", "전략적 권장 사항"),
    (">Strategic 권장 사항<", ">전략적 권장 사항<"),
    ("Competitive Positioning65", "경쟁 포지셔닝 65"),
    ("차별화 요소s exist but no dedicated comparison page", "차별화 요소 존재하나 전용 비교 페이지 없음"),
    ("TOTAL100%60.45/100Rounded to 61/100", "합계 100% / 60.45/100 → 반올림 61/100"),
    ("Conversion Optimization55", "전환 최적화 55"),
    ("Add Government Subsidy Banner to Homepage (This Week)", "홈페이지에 정부 보조금 배너 추가 (이번 주)"),
]

if __name__ == '__main__':
    with open(r'C:\Users\joons\work\marketing\landing-page\reports-dashboard\index.html',
              encoding='utf-8') as f:
        content = f.read()

    count = 0
    for en, ko in PATCHES:
        if en in content:
            content = content.replace(en, ko)
            count += 1

    with open(r'C:\Users\joons\work\marketing\landing-page\reports-dashboard\index.html',
              'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Applied {count}/{len(PATCHES)} patches")
