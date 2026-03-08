# Landing Page Changes: Original Site → New Landing Page

**Source:** https://tanalysis.co.kr/
**New Page:** `landing-page/index.html`
**Date:** 2026-03-08
**Design System:** `DESIGN-SYSTEM.json` (92KB, extracted via Playwright)

---

## 1. Headline Rewrite (Audit Quick Win #1)

**Before:** "업무 효율화, 정확한 특허 검색·분석부터" — generic efficiency claim that every B2B SaaS makes.

**After:** "심사관 수준의 정확도로 특허를 검색·분류하는 AI" — leads with the specific performance differentiator. The 85% recall stat is now the first thing a visitor sees, not buried 3 scrolls down.

---

## 2. Government Voucher Urgency Banner (Audit Quick Win #8)

**Before:** The 최대 90% government subsidy (마감 3/31) was only visible on the `/reportbymail` page — invisible to homepage visitors.

**After:** Purple gradient banner at the very top of every page. This is the strongest buying trigger in Korean B2B SaaS — financial incentive + deadline urgency. Was completely wasted being hidden on a subpage.

---

## 3. Stat Strip in Hero (Audit Quick Win #5)

**Before:** The numbers (85%, 8천만, 90%+, 30초) existed on feature subpages but not the homepage hero.

**After:** Four-column stat bar immediately below the CTA buttons. Numbers create instant credibility — prose cannot do this. Professional buyers scan for quantified claims.

---

## 4. Comparison Table Moved Up (Audit Quick Win #4)

**Before:** The "도입 전/후" table was buried deep in the page — 3+ scrolls down.

**After:** Section #2, immediately after the hero. This table is the single clearest articulation of Tanalysis's value. Pain-point comparison tables are the highest-converting B2B SaaS content format. It now uses color-coded columns (red for "before", purple for "after") to make the contrast visceral.

---

## 5. Weekly Report as Co-Equal CTA (Audit Quick Win #2)

**Before:** The Weekly Report product was buried in secondary navigation. No homepage presence.

**After:** A full dedicated section with a mock report card showing real sample data (NAVER/KAKAO/NAVER LABS). The audit identified this as "the most strategically interesting product on the site" — it's a lower-friction entry point for executives who aren't ready for a full trial. Uses the blue/green/red status signal colors extracted from the site.

---

## 6. Search Input Demo

**Before:** No interactive element on the homepage — purely informational.

**After:** A replica of the actual search input (extracted styles: `#f0f1f5` bg, `8px` radius, `16px 20px` padding) with the original placeholder text. Clicking the button routes to signup. Gives visitors a tactile sense of the product before committing.

---

## 7. Pricing Section (Audit Strategic Rec #4)

**Before:** Pricing was hidden inside an FAQ at `/faq/point-guide` — the audit called this "the most conversion-hostile possible location."

**After:** A three-tier pricing section (Free 20pt/일, Business 1,000pt/월, Premium 협의) with feature comparison, directly on the landing page. The Business tier is highlighted as "가장 많이 선택" with the brand gradient background.

---

## 8. CTA Hierarchy Standardized (Audit Quick Win #6)

**Before:** 9 different CTAs used interchangeably across the site ("무료로 시작하기", "지금 가입하면 무료", "소개자료 받기", "도입 문의", "타날리시스팀 문의", "무료 상담 신청", etc.)

**After:** Three-level hierarchy:
- **Primary:** "무료로 시작하기" (brand gradient button → signup)
- **Secondary:** "소개자료 받기" / "도입 문의" (glass button)
- **Tertiary:** "리포트 샘플 보기" (pill ghost link)

Each CTA appears in the right context. No competing CTAs at any decision point.

---

## 9. Trust Bar

**Before:** "앞서가는 전문가들은 이미 타날리시스를 도입했습니다" — a social proof tease with no substance on the homepage.

**After:** A concrete trust bar listing actual customer types (국내 상위 화학기업, 자율주행 업체, 바이오 대기업, 특허법인) plus the 데이터바우처 공급기업 credential. Placed immediately after the hero to catch visitors before they bounce.

---

## 10. Design System Fidelity

No design changes were invented. Every visual element was pixel-matched to the extracted `DESIGN-SYSTEM.json`:

- **Font:** Pretendard Variable at weight 1000 (the actual site weight, not 700/900)
- **Buttons:** Exact `12px 18px` padding, `11px` radius, `rgba(180,156,197,0.08) 0 0 16px 4px` lavender glow shadow
- **Colors:** All 24 text colors, 16 backgrounds, 17 gradients used verbatim
- **Animations:** `fadeIn 0.5s ease-out` and `buttonPop 1.5s ease-in-out` from the original site
- **Spacing:** The exact 20-value padding system and 16-value gap system

---

## What Was NOT Changed

- Brand identity, logo treatment, color palette — all preserved
- Footer content, legal info, contact details — verbatim from original
- Testimonial text — exact quotes from the site
- Product feature descriptions — derived from page cache content
- All external links point to actual tanalysis.ai/tanalysis.co.kr URLs

---

## Files

| File | Description |
|---|---|
| `landing-page/index.html` | New landing page (self-contained HTML+CSS) |
| `DESIGN-SYSTEM.json` | Full extracted design system (92KB, 3034 lines) |
| `landing-page/preview-v2.png` | Full-page screenshot |
| `landing-page/preview-hero.png` | Hero viewport screenshot |
| `MARKETING-AUDIT.md` | Source marketing audit with all recommendations |
| `page-cache.md` | Original site content cache |
