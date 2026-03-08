"""
Translate English text in the marketing dashboard HTML to Korean.
Uses regex-based replacement for known phrases + per-section translation.
"""
import re
import sys

# ─────────────────────────────────────────────
# COMPREHENSIVE ENGLISH → KOREAN DICTIONARY
# ─────────────────────────────────────────────
TRANSLATIONS = {
    # === SECTION TITLES / SUMMARIES ===
    "Executive Summary": "핵심 요약",
    "Score Breakdown": "점수 분석",
    "Quick Wins": "빠른 개선 항목",
    "Quick Wins (This Week)": "빠른 성과 (이번 주)",
    "Medium-Term Improvements": "중기 개선 사항",
    "Strategic Improvements": "전략적 개선 사항",
    "Detailed Category Analysis": "카테고리별 상세 분석",
    "Competitor Comparison": "경쟁사 비교",
    "Revenue Impact Summary": "매출 영향 요약",
    "Critical Issues": "핵심 문제점",
    "What Works": "잘 되고 있는 것",
    "Recommendations": "권장 사항",
    "Implementation Roadmap": "실행 로드맵",
    "Priority Actions": "우선 조치 사항",
    "Technical Audit Results": "기술 감사 결과",
    "Keyword Analysis": "키워드 분석",
    "Content Gap Analysis": "콘텐츠 갭 분석",
    "On-Page SEO Checklist": "페이지 내 SEO 체크리스트",
    "Funnel Map": "퍼널 맵",
    "Funnel Map — Self-Serve Track": "퍼널 맵 — 셀프서브 트랙",
    "Funnel Map — Enterprise Track": "퍼널 맵 — 엔터프라이즈 트랙",
    "Page-by-Page Analysis": "페이지별 분석",
    "Funnel Metrics (Estimated)": "퍼널 지표 (추정치)",
    "Revenue Impact Analysis": "매출 영향 분석",
    "Optimization Recommendations": "최적화 권장 사항",
    "Freemium-to-Paid Conversion Friction Map": "프리미엄→유료 전환 마찰 맵",
    "Churn Risk Analysis": "이탈 위험 분석",
    "Email Nurture Integration Map": "이메일 육성 통합 맵",
    "Pricing Page Audit (2/12 criteria met)": "가격 페이지 감사 (12개 기준 중 2개 충족)",
    "Pricing Page Audit": "가격 페이지 감사",
    "Summary Scorecard": "종합 점수표",
    "Voice & Tone Profile": "보이스 & 톤 프로필",
    "Voice Dimensions": "보이스 특성",
    "Voice Summary": "보이스 요약",
    "Brand Archetypes": "브랜드 아키타입",
    "Vocabulary Analysis": "어휘 분석",
    "Writing Guidelines": "작성 지침",
    "Competitor Voice Comparison": "경쟁사 보이스 비교",
    "Campaign Strategy Overview": "캠페인 전략 개요",
    "Audience Segments": "타겟 세그먼트",
    "Google Ads": "구글 광고",
    "LinkedIn Ads": "링크드인 광고",
    "Display & Retargeting": "디스플레이 & 리타겟팅",
    "Budget Allocation": "예산 배분",
    "Performance Benchmarks": "성과 벤치마크",
    "A/B Testing Plan": "A/B 테스트 계획",
    "Creative Brief": "크리에이티브 브리프",
    "Welcome Sequence": "웰컴 시퀀스",
    "Trial-to-Paid Sequence": "트라이얼→유료 전환 시퀀스",
    "Re-engagement Sequence": "재참여 시퀀스",
    "Feature Announcement Template": "기능 발표 템플릿",
    "Segmentation Strategy": "세그먼테이션 전략",
    "Compliance Checklist": "컴플라이언스 체크리스트",
    "Content Calendar Overview": "콘텐츠 캘린더 개요",
    "Content Pillars": "콘텐츠 기둥",
    "Scheduled Posts": "예약 포스트",
    "Hashtag Strategy": "해시태그 전략",
    "Engagement Playbook": "인게이지먼트 플레이북",
    "Repurposing Strategy": "재활용 전략",
    "Channel KPIs": "채널 KPI",
    "Competitive Analysis": "경쟁 분석",
    "Competitive Scoring Matrix": "경쟁사 점수 매트릭스",
    "Unique Differentiators": "고유 차별화 요소",
    "Market Positioning": "시장 포지셔닝",
    "Competitor Profiles": "경쟁사 프로필",
    "Feature Comparison": "기능 비교",
    "Pricing Comparison": "가격 비교",
    "SWOT Analysis": "SWOT 분석",
    "Value Proposition Analysis": "가치 제안 분석",
    "Headline Recommendations": "헤드라인 권장안",
    "Section-by-Section Copy Suggestions": "섹션별 카피 제안",
    "CTA Optimization": "CTA 최적화",
    "Before/After Examples": "이전/이후 예시",
    "Swipe File": "스와이프 파일",
    "Implementation Priority": "실행 우선순위",
    "Featured Snippet Opportunities": "추천 스니펫 기회",
    "Schema Markup": "스키마 마크업",
    "Internal Linking Strategy": "내부 링크 전략",
    "Technical SEO Checklist": "기술 SEO 체크리스트",
    "Mobile & Page Speed": "모바일 & 페이지 속도",
    "Local SEO": "로컬 SEO",
    "Hero Section": "히어로 섹션",
    "Social Proof": "소셜 증거",
    "Features & Benefits": "기능 & 이점",
    "Objection Handling": "이의 처리",
    "Call to Action": "행동 유도",
    "Form Audit": "폼 감사",
    "Mobile Audit": "모바일 감사",
    "A/B Test Recommendations": "A/B 테스트 권장안",
    "Heat Map Guidance": "히트맵 가이드",
    "Next Steps": "다음 단계",
    "Traffic Sources": "트래픽 소스",
    "Upgrade Trigger Recommendations": "업그레이드 트리거 권장안",
    "Lead Magnet Assessment": "리드 마그넷 평가",

    # === TABLE HEADERS ===
    "Category": "카테고리",
    "Score": "점수",
    "Weight": "가중치",
    "Weighted Score": "가중 점수",
    "Key Finding": "핵심 발견",
    "Notes": "비고",
    "Priority": "우선순위",
    "Impact": "효과",
    "Effort": "작업량",
    "Action": "조치",
    "Current": "현재",
    "Target": "목표",
    "Benchmark": "벤치마크",
    "Status": "상태",
    "Platform": "플랫폼",
    "Type": "유형",
    "Format": "형식",
    "Budget": "예산",
    "Metric": "지표",
    "Estimate": "추정치",
    "Stage": "단계",
    "Friction": "마찰 요인",
    "Root Cause": "근본 원인",
    "Est. Loss": "예상 손실",
    "Sequence": "시퀀스",
    "Emails": "이메일 수",
    "Risk": "리스크",
    "Scenario": "시나리오",
    "Mitigation": "완화 방법",
    "Component": "구성요소",
    "Criteria": "기준",
    "Framework": "프레임워크",
    "Dimension": "차원",
    "Assessment": "평가",
    "Issue": "문제",
    "Recommended": "권장",
    "Recommendation": "권장 사항",
    "CTA Text": "CTA 텍스트",
    "Location": "위치",
    "Recommended Alternative": "권장 대안",
    "Trigger Event": "트리거 이벤트",
    "Prompt Message": "알림 메시지",
    "CTA": "CTA",
    "Funnel Stage": "퍼널 단계",
    "Intent": "의도",
    "Current Entry": "현재 진입점",
    "Recommended Entry": "권장 진입점",
    "Strength": "강점",
    "Weakness": "약점",
    "Opportunity": "기회",
    "Threat": "위협",
    "Headline": "헤드라인",
    "Analysis": "분석",
    "Rationale": "이유",
    "Load Time": "로딩 시간",
    "Conversion Impact": "전환 영향",
    "Field count": "필드 수",
    "Element": "요소",
    "Best Practice": "모범 사례",
    "Page": "페이지",
    "Source": "소스",
    "Channel": "채널",
    "Competitor": "경쟁사",
    "Differentiator": "차별화 요소",
    "Relevance": "관련성",
    "Specificity": "구체성",
    "Perceived value": "인지 가치",
    "Quick win": "빠른 성과",
    "Product alignment": "제품 적합성",
    "Opt-in friction": "옵트인 마찰",

    # === BADGES / PILLS / LABELS ===
    "FAIL": "미충족",
    "PASS": "충족",
    "PARTIAL": "부분 충족",
    "HIGH": "높음",
    "MEDIUM": "중간",
    "LOW": "낮음",
    "High": "높음",
    "Medium": "중간",
    "Low": "낮음",
    "CRITICAL": "긴급",
    "Critical": "긴급",
    "P1 — Do Now (This Week)": "P1 — 지금 실행 (이번 주)",
    "P2 — Plan (This Month)": "P2 — 계획 (이번 달)",
    "P3 — Strategic (This Quarter)": "P3 — 전략적 (이번 분기)",
    "Do Now (This Week)": "지금 실행 (이번 주)",
    "Plan (This Month)": "계획 (이번 달)",
    "Strategic (This Quarter)": "전략적 (이번 분기)",
    "Quick Wins (implement this week)": "빠른 성과 (이번 주 실행)",
    "Medium-Term (implement this month)": "중기 (이번 달 실행)",
    "Strategic (implement this quarter)": "전략적 (이번 분기 실행)",
    "primary self-serve": "1차 셀프서브",
    "lower-friction": "저마찰",
    "enterprise": "엔터프라이즈",
    "curiosity-driven": "호기심 유도",
    "weekly report": "주간 리포트",

    # === COMMON PHRASES ===
    "Before": "이전",
    "After": "이후",
    "Before (Table Heading):": "이전 (표 제목):",
    "After (Section Headline + Table Heading):": "이후 (섹션 헤드라인 + 표 제목):",
    "WHY:": "이유:",
    "Rank ": "순위 ",
    "Analysis Date:": "분석일:",
    "Business Type:": "비즈니스 유형:",
    "Target Audience:": "타겟 고객:",
    "Primary Objective:": "주요 목표:",
    "Recommended Platforms:": "권장 플랫폼:",
    "Model Used:": "사용 모델:",
    "Date:": "날짜:",
    "URL:": "URL:",
    "Business:": "비즈니스:",
    "Sequences Generated:": "생성된 시퀀스:",
    "LANGUAGE NOTE:": "언어 안내:",
    "Traffic Metrics": "트래픽 지표",
    "Conversion Metrics": "전환 지표",
    "Expected Lift:": "예상 향상:",
    "Annual ARR Impact:": "연간 ARR 영향:",
    "Effort:": "작업량:",
    "Expected:": "예상:",
    "Expected lift:": "예상 향상:",
    "Combined Impact": "통합 효과",
    "Score:": "점수:",
    "Page Score:": "페이지 점수:",
    "Overall Funnel Health:": "전체 퍼널 건강도:",
    "Potential Health After P1 Fixes:": "P1 수정 후 예상 건강도:",
    "Potential Health After All Fixes:": "전체 수정 후 예상 건강도:",
    "Overall Visitor → Paid:": "전체 방문자 → 유료 전환:",
    "PRIORITY ACTION:": "우선 조치:",
    "Recommended implementation:": "권장 구현 방법:",
    "Score: 2/12 criteria met": "점수: 12개 기준 중 2개 충족",
    "Traffic Metrics:": "트래픽 지표:",
    "Current State:": "현재 상태:",
    "Assumptions:": "가정:",
    "Monthly Visitors:": "월간 방문자:",
    "Traffic Sources (estimated):": "트래픽 소스 (추정):",
    "Primary:": "주요:",
    "Secondary:": "보조:",
    "Tertiary:": "3차:",
    "Problem:": "문제:",
    "Solution:": "해결책:",
    "Unique Mechanism:": "고유 메커니즘:",
    "Key Benefit:": "핵심 이점:",
    "Proof:": "증거:",
    "Gaps in Current Copy:": "현재 카피의 부족한 점:",
    "TARGET CUSTOMER:": "타겟 고객:",
    "PROBLEM:": "문제:",
    "SOLUTION:": "해결책:",
    "UNIQUE MECHANISM:": "고유 메커니즘:",
    "KEY BENEFIT:": "핵심 이점:",
    "PROOF:": "증거:",
    "GAPS IN CURRENT COPY:": "현재 카피의 부족한 점:",
    "Voice Recommendation:": "보이스 권장사항:",
    "Evidence:": "근거:",
    "Issues:": "문제점:",
    "Recommended Hero Copy:": "권장 히어로 카피:",
    "Recommended Copy:": "권장 카피:",
    "Recommended Feature Headlines:": "권장 기능 헤드라인:",
    "Recommended Framing:": "권장 프레이밍:",
    "Recommended (minor refinement):": "권장 (소폭 수정):",
    "Recommended Meta Description:": "권장 메타 설명:",
    "Assessment:": "평가:",
    "Headline Score:": "헤드라인 점수:",
    "Current Primary Headline (H1)": "현재 기본 헤드라인 (H1)",
    "Current H1": "현재 H1",
    "10 Alternative Headlines (Ranked)": "10가지 대안 헤드라인 (순위순)",
    "5 Subheadline Alternatives": "5가지 서브헤드라인 대안",
    "5 CTA Button Alternatives": "5가지 CTA 버튼 대안",
    "3 Meta Description Alternatives": "3가지 메타 설명 대안",
    "3 Social Proof Framing Alternatives": "3가지 소셜 증거 프레이밍 대안",
    "3 Pricing/Plan Headline Alternatives": "3가지 가격/플랜 헤드라인 대안",
    "Current CTA Inventory and Issues": "현재 CTA 목록 및 문제점",
    "CTA Hierarchy Recommendation": "CTA 계층 권장안",
    "For self-serve visitors (free tier):": "셀프서브 방문자 (무료 플랜):",
    "For enterprise/firm visitors:": "기업/법인 방문자:",
    "For weekly report page:": "주간 리포트 페이지:",

    # === SECTION NAMES ===
    "종합 개요": "종합 개요",  # keep Korean
    "Marketing Audit": "마케팅 감사",
    "Landing Page CRO Analysis": "랜딩 페이지 CRO 분석",
    "Landing Page CRO": "랜딩 페이지 CRO",
    "Funnel Analysis": "퍼널 분석",
    "Competitor Analysis": "경쟁사 분석",
    "Copy Analysis &amp; Suggestions": "카피 분석 및 제안",
    "Copy Analysis & Suggestions": "카피 분석 및 제안",
    "Brand Voice Guidelines": "브랜드 보이스 가이드라인",
    "Ad Campaigns: Tanalysis (타날리시스)": "광고 캠페인: 타날리시스",
    "Email Sequences: 타날리시스 (Tanalysis)": "이메일 시퀀스: 타날리시스",
    "Consistency: 8/10": "일관성: 8/10",
    "16 Emails | 4 Sequences": "16개 이메일 | 4개 시퀀스",
    "EMAIL-SEQUENCES.md": "이메일 시퀀스",
    "AD-CAMPAIGNS.md": "광고 캠페인",

    # === ANALYSIS TEXT ===
    "What Works": "잘 되고 있는 것",
    "Critical Issue": "핵심 문제",
    "Recommendation": "권장 사항",
    "Finding": "발견 사항",
    "Key Takeaway": "핵심 요점",
    "Impact:": "효과:",
    "Effort:": "작업량:",
    "Expected impact:": "예상 효과:",
    "Expected lift:": "예상 향상:",
}

def translate_text(text, translations):
    """Apply all translations to a text string."""
    for en, ko in sorted(translations.items(), key=lambda x: -len(x[0])):
        text = text.replace(en, ko)
    return text

def translate_html(html_content, translations):
    """
    Translate English text in HTML while preserving HTML structure.
    Targets content inside: <summary>, <th>, <h2>, <h3>, <h4>,
    badges, pills, and selected <p>/<li> short labels.
    """
    # Translate <summary> content
    def replace_summary(m):
        inner = m.group(1)
        inner = translate_text(inner, translations)
        return f'<summary>{inner}</summary>'

    html_content = re.sub(
        r'<summary>(.*?)</summary>',
        replace_summary,
        html_content,
        flags=re.DOTALL
    )

    # Translate <th> content
    def replace_th(m):
        inner = m.group(1)
        inner = translate_text(inner, translations)
        return f'<th>{inner}</th>'

    html_content = re.sub(
        r'<th>(.*?)</th>',
        replace_th,
        html_content,
        flags=re.DOTALL
    )

    # Translate <h2> headings
    def replace_h2(m):
        attrs = m.group(1) or ''
        inner = m.group(2)
        inner = translate_text(inner, translations)
        return f'<h2{attrs}>{inner}</h2>'

    html_content = re.sub(
        r'<h2([^>]*)>(.*?)</h2>',
        replace_h2,
        html_content,
        flags=re.DOTALL
    )

    # Translate <h3> headings
    def replace_h3(m):
        attrs = m.group(1) or ''
        inner = m.group(2)
        inner = translate_text(inner, translations)
        return f'<h3{attrs}>{inner}</h3>'

    html_content = re.sub(
        r'<h3([^>]*)>(.*?)</h3>',
        replace_h3,
        html_content,
        flags=re.DOTALL
    )

    # Translate <h4> headings
    def replace_h4(m):
        attrs = m.group(1) or ''
        inner = m.group(2)
        inner = translate_text(inner, translations)
        return f'<h4{attrs}>{inner}</h4>'

    html_content = re.sub(
        r'<h4([^>]*)>(.*?)</h4>',
        replace_h4,
        html_content,
        flags=re.DOTALL
    )

    # Translate .badge content
    def replace_badge(m):
        inner = m.group(1)
        inner = translate_text(inner, translations)
        return f'class="badge">{inner}<'

    html_content = re.sub(
        r'class="badge">(.*?)<',
        replace_badge,
        html_content
    )

    # Translate sidebar links text
    def replace_sidebar(m):
        before = m.group(1)
        text = m.group(2)
        text = translate_text(text, translations)
        return f'{before}{text}</a>'

    html_content = re.sub(
        r'(</span>\s*)(.*?)</a>',
        replace_sidebar,
        html_content
    )

    # Translate topbar date
    html_content = html_content.replace(
        'class="date">분석일:', 'class="date">분석일:'
    )

    # Global string replacements for common phrases
    html_content = translate_text(html_content, translations)

    return html_content


if __name__ == '__main__':
    input_file = r'C:\Users\joons\work\marketing\landing-page\reports-dashboard\index_clean.html'
    output_file = r'C:\Users\joons\work\marketing\landing-page\reports-dashboard\index_ko.html'

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_len = len(content)
    content = translate_html(content, TRANSLATIONS)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Done. {original_len:,} → {len(content):,} chars. Written to {output_file}")
