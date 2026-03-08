# Funnel Analysis: 타날리시스 (Tanalysis)
**URL:** https://tanalysis.co.kr/
**Date:** 2026-03-07
**Business Type:** Korean B2B SaaS — AI-powered patent search, analysis, and classification
**Funnel Type:** Hybrid: SaaS Freemium Trial + Enterprise Lead Gen (Demo/Sales)
**Overall Funnel Health: 54/100**

---

## Executive Summary

Tanalysis operates a dual-track funnel: a freemium self-serve path (Free tier → Business plan upgrade) and a high-touch enterprise path (inquiry → team meeting → Premium contract). The self-serve track targets individual patent attorneys and R&D professionals who can sign up immediately; the enterprise track targets in-house IP teams, law firms, and large corporate IP managers who need organizational adoption and may qualify for government data voucher subsidies.

The funnel's strongest asset is its differentiation story — a patent-specialist AI model trained on KIPO/KIPRIS examination and invalidation data, with a credible 85% recall rate claim backed by testimonials from named companies. This is a compelling moat that the homepage communicates reasonably well. However, the funnel suffers from three critical structural failures: (1) there is no visible standalone pricing page — pricing is buried in an FAQ subpage (/faq/point-guide), making the free-to-paid upgrade journey completely opaque; (2) the freemium tier's daily 20pt allowance permits only 2 searches or analyses per day, which is insufficient to demonstrate core value and creates artificial frustration rather than upgrade urgency; and (3) the onboarding and trial activation path is invisible from the public site — there is no guided "first success" experience described anywhere.

The biggest single bottleneck is the freemium-to-paid conversion gap. Users who sign up on the free plan will encounter the 20pt/day cap almost immediately during real patent work, but instead of being prompted to upgrade with clear pricing and value framing, they are left to discover the FAQ point guide on their own. Fixing this — by creating a visible pricing page, adding in-app upgrade triggers at the point of cap exhaustion, and designing a proper onboarding sequence — is estimated to lift paid conversion by 25-40% at minimal development cost.

The top three revenue opportunities are: (1) a dedicated pricing page with plan comparison and clear upgrade CTA, estimated +30% lift on free-to-paid conversion; (2) a structured onboarding email sequence that drives users to their first "aha moment" within 72 hours of signup, estimated +15-20% reduction in free tier churn; and (3) repositioning the Weekly Report (/reportbymail) as a standalone lead magnet for the enterprise track, with a dedicated nurture sequence, estimated to double qualified enterprise pipeline.

---

## Funnel Map

```
VISITOR JOURNEY MAP — TANALYSIS
================================

SELF-SERVE TRACK (Free → Business)
------------------------------------

[Organic Search / Referral / Direct]
  |
  v
[Homepage /] ──────────────────────────── 100% of visitors
  |  "무료로 시작하기" CTA (Start for Free)
  |  "소개자료 받기" CTA (Request Brochure)
  |
  +──────────[Feature Pages] ←──── ~25% explore features
  |          /patent-search
  |          /classification
  |          /reportbymail
  |
  v
[Signup / 무료 가입] ─────────────────── ~10-15% attempt signup
  |  (Manual approval required — 1 business day)
  |
  v
[Email Verification + Approval Wait] ──── ~8-12% complete
  |  24hr email expiry window
  |  FRICTION: approval delay, no onboarding email
  |
  v
[Free Tier Active — 20pt/day] ──────── ~6-10% activate
  |  2 searches OR 2 analyses per day
  |  No AI Classification access
  |  No upgrade prompt visible (gap)
  |
  v
[Point Exhaustion / Discovery of Limits] ── ~4-6% hit cap regularly
  |  User must self-navigate to /faq/point-guide
  |  No in-product upgrade path described
  |
  v
[Business Plan Upgrade] ────────────────── ~1-2% convert to paid
  |  1,000pt/month
  |  Conversion path: customer support inquiry (no self-serve evident)
  |
  v
[Premium / Enterprise Inquiry] ────────── <0.5% of total visitors

ESTIMATED OVERALL: ~1-2% visitor-to-paid conversion


ENTERPRISE / LEAD GEN TRACK (Inquiry → Premium)
-------------------------------------------------

[Homepage / Feature Pages / Weekly Report Page]
  |
  v
[타날리시스팀 문의 / 도입 문의] ─── ~2-5% of B2B visitors click
  |  Multiple CTA variants across pages
  |
  v
[Team Meeting Request /team-meeting] ──── conversion unknown
  |  2-week team trial offered
  |
  v
[Sales Call / Demo]
  |
  v
[Premium Contract Negotiation] ────────── low volume, high ACV

DATA VOUCHER TRACK (Government Subsidy)
----------------------------------------

[/reportbymail page]
  |  "최대 3,000만 원 정부 지원" CTA
  v
[/data-voucher] ─── consultation request form
  |
  v
[Tanalysis sales + voucher application support]
  |
  v
[Subsidized Premium Contract]
```

---

## Page-by-Page Analysis

### Step 1: Homepage (/)

**URL:** https://tanalysis.co.kr/
**Page Type:** SaaS Homepage / Top-of-Funnel Landing Page
**Primary Action:** Click "무료로 시작하기" (Start for Free)
**Next Step:** Signup page
**Exit Points:** "소개자료 받기" (lead magnet detour), feature page exploration, blog

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 7/10 | Value prop is present: AI patent search/analysis/classification. H1 is split across multiple lines ("업무 효율화, 정확한 특허 검색·분석부터") which dilutes impact. |
| Continuity | 6/10 | Good intro to features, but jump from hero to CTAs lacks a logical "why now" bridge. |
| Motivation | 6/10 | Comparison table (Before/After) is strong. Social proof section exists but testimonials are generic ("앞서가는 전문가들은 이미 도입했습니다") without named quotes visible on homepage. |
| Friction | 7/10 | Primary CTA is above the fold and repeated. However, "소개자료 받기" competes with the free signup CTA and may siphon mid-funnel intent. |
| Trust | 7/10 | "변리사와 AI 전문가가 직접 만들어" is a strong credibility claim. TIPS Town S2 address adds legitimacy. Phone number visible. |

**Page Score: 6.6/10**

**Critical Issues:**
- No pricing visible anywhere on homepage — not even a link to the pricing/plan page
- Two competing primary CTAs ("무료로 시작하기" and "소개자료 받기") split intent
- The H1 "업무 효율화" is too generic — it does not name the user's specific pain (e.g., patent search taking hours, incomplete prior art)
- No mention of what happens after free signup — users don't know they get 20pt/day or what that means
- AI Classification positioned as a premium feature in body copy ("프리미엄 기능") but no upgrade path is shown

**What Works:**
- Before/After feature comparison table is highly effective for the target audience
- Multiple export features listed (claim chart export, Excel download) are practical proof points
- Clear multilingual coverage (KR, US, JP, EP, CN, PCT) addresses real attorney workflow needs

**Recommendations:**
- Rewrite hero headline to name a specific pain: "선행기술 조사, 하루 몇 시간 쓰고 계세요?" (How many hours a day do you spend on prior art searches?)
- Add a pricing anchor in the nav or hero: "무료로 시작 — 유료 전환 시 월 [X]원"
- Consolidate CTA hierarchy: make "무료로 시작하기" the single primary CTA; demote "소개자료 받기" to secondary/text link
- Add a "What you get for free" callout box below the hero: "무료 플랜: 매일 20포인트, 검색 2회"

---

### Step 2: Patent Search Feature Page (/patent-search)

**URL:** https://tanalysis.co.kr/patent-search
**Page Type:** Feature/Product Page — Mid-Funnel
**Primary Action:** Click "지금 가입하면 무료" (Sign Up Free Now) or "도입 문의"
**Next Step:** Signup or enterprise contact
**Exit Points:** Homepage, classification page, FAQ pages

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 8/10 | Very strong feature articulation. "85% 검색 재현율" stat and "심사관 인용 문헌" framing are highly specific and credible for patent professionals. |
| Continuity | 7/10 | Flows well from homepage. "다 같은 AI가 아닙니다" directly addresses the objection that this is just another ChatGPT wrapper. |
| Motivation | 9/10 | Four real testimonials from named company types (상위 화학기업, 자율주행 업체, 바이오 대기업). 85% recall stat. 8천만 건 database scope. Extremely strong for B2B. |
| Friction | 7/10 | "지금 가입하면 무료" CTA is clear. However, the page has three competing CTAs (팀 문의, 도입 문의, 가입하면 무료) without clear segmentation of who should click which. |
| Trust | 9/10 | Best trust page on the site. Specific stats, named industry testimonials, model training methodology disclosed. |

**Page Score: 8.0/10**

**Critical Issues:**
- Three CTAs without audience segmentation create decision paralysis: individual attorneys should be directed to free signup; enterprise IP teams to team meeting/demo; neither knows which CTA is for them
- No pricing mention — a user highly motivated by this page cannot quickly assess cost/benefit
- "30초 내 (2천 건 기준)" speed claim should be more prominent — this is a major differentiator

**What Works:**
- 85% recall vs. competitors is the single most powerful conversion claim on the entire site
- Full-text search vs. abstract-only (competitors) is a genuine differentiator that resonates with practitioners
- Use case fields (Algorithm/UX, Chemistry/Pharma, Mechanical, Electrical) allow audience self-identification

**Recommendations:**
- Add audience segmentation above CTAs: "개인 변리사/연구원이세요? → 무료로 시작하기 | 팀/기업 도입 검토 중이세요? → 도입 문의"
- Surface pricing anchor: "개인 무료 플랜으로 오늘 바로 시작하세요 — Business 플랜은 월 [X]원"
- Make the 85% / 30초 / 8천만건 stats into a visual stats bar earlier in the page flow

---

### Step 3: AI Classification Page (/classification)

**URL:** https://tanalysis.co.kr/classification
**Page Type:** Feature/Product Page — Mid-Funnel (Premium Feature)
**Primary Action:** "도입문의" (Enterprise contact) — this page skews enterprise
**Next Step:** Team meeting or sales inquiry
**Exit Points:** Other feature pages, homepage

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 8/10 | "10,000건 / 5분 / 90% 이상 / 4.3점" stat block is excellent. Two-mode classification (user-defined vs. AI-defined) is clearly explained. |
| Continuity | 6/10 | Feels like a separate product rather than a natural upgrade from patent search. The connection "you already search with Tanalysis → now classify at scale" is not made explicitly. |
| Motivation | 8/10 | Pain points for three audiences (law firms, in-house IP, R&D) are well-targeted. Visualization features (13+ graphs) are a real enterprise differentiator. |
| Friction | 5/10 | This is a Premium-only feature, but there is no clear "how to get access" path. The CTA is "도입문의" (enterprise inquiry) with no mention of whether Business plan users can access Lite classification. |
| Trust | 7/10 | 4.3/5 satisfaction score is good. Could be stronger with named enterprise case studies. |

**Page Score: 6.8/10**

**Critical Issues:**
- Classification Lite (40pt) is listed in the point guide as Premium-tier only, but this page's CTAs push everyone to enterprise inquiry — no free trial or self-serve entry point for individual users
- The "무료 체험: 고객센터 문의 시 최초 1회 제공" mechanism (from FAQ) is not surfaced on the classification page itself — this is a lost conversion opportunity
- No explicit connection to the patent search workflow: users may not realize classification is the logical "next step" after a search session

**Recommendations:**
- Add a "AI 분류 무료 체험하기" CTA linking to the customer support contact with pre-filled subject line — this removes friction for the free trial offer
- Add a workflow diagram: "검색 → 분석 → 분류" showing how the three features build on each other
- Surface the "1회 무료 체험" offer prominently on this page — it is currently buried in the FAQ

---

### Step 4: Weekly Report Page (/reportbymail)

**URL:** https://tanalysis.co.kr/reportbymail
**Page Type:** Product/Service Landing Page — Enterprise Lead Gen
**Primary Action:** "도입 문의" or "무료 상담 신청"
**Next Step:** /data-voucher consultation or /team-meeting
**Exit Points:** Homepage, other feature pages

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 9/10 | The three pain points ("경쟁사 특허 봐야 하는데", "리포트가 너무 두꺼워요", "이미 늦었을 수도 있어요") are highly specific and emotionally resonant for the target audience. |
| Continuity | 5/10 | This page feels disconnected from the main product. It reads like a separate service offering rather than an extension of the Tanalysis platform. |
| Motivation | 9/10 | "매주 월요일 아침, 인박스 도착" is a powerful concrete promise. The Naver/Kakao sample report data makes it tangible. Government subsidy angle (최대 3,000만 원) is a major incentive for SMBs. |
| Friction | 6/10 | CTA to "도입 문의" is clear, but the government subsidy CTA (3/31 deadline) creates urgency confusion — is this the same product or a different offering? |
| Trust | 7/10 | "10년 경력의 변리사와 함께" is credible. Could add more named client examples. |

**Page Score: 7.2/10**

**Critical Issues:**
- Government subsidy deadline (3/31) creates manufactured urgency that will expire — the page needs a non-expiring trust anchor for after this date
- No clear pricing or cost range for the Weekly Report service — enterprise buyers need to qualify cost before committing to a consultation
- The data voucher CTA (최대 90% 지원) and the standard inquiry CTA are not clearly differentiated — SMBs eligible for vouchers may not self-identify

**Recommendations:**
- Add a "이런 기업에 적합합니다" qualification box so that SMBs and large enterprises self-segment before the CTA
- After 3/31, replace the government subsidy urgency CTA with a "무료 샘플 리포트 받기" lead magnet CTA
- Add a starting price range or "월 [X]원부터" anchor to reduce enterprise inquiry drop-off caused by pricing anxiety

---

### Step 5: Signup / Registration Flow

**URL:** (app.tanalysis.co.kr or similar — not directly visible from public site)
**Page Type:** Registration/Onboarding Entry
**Primary Action:** Create account
**Next Step:** Email verification → manual approval → active account

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 5/10 | The FAQ reveals that signup requires manual approval within 1 business day. This is not communicated on the public site before users attempt to sign up. |
| Continuity | 4/10 | Users click "무료로 시작하기" expecting instant access — a 1-business-day approval wait is a significant expectation mismatch. |
| Motivation | 4/10 | No described "what to expect next" email or onboarding sequence after signup. Users are left to wait without engagement. |
| Friction | 3/10 | Manual approval + 24-hour email expiry window is the single highest-friction element in the entire funnel. A user who doesn't check email within 24 hours must restart. |
| Trust | 6/10 | Email verification is a standard trust signal. The approval process implies quality control, which could be framed positively but currently is not. |

**Page Score: 4.4/10 — CRITICAL BOTTLENECK**

**Critical Issues:**
- Manual approval (영업일 기준 1일 이내) before access is granted creates a 24-48 hour dead zone where signup intent cools dramatically — industry research shows signup-to-first-use drops by 50%+ when there is any delay
- 24-hour email verification expiry is unusually short; industry standard is 48-72 hours
- No described welcome email or onboarding sequence during the approval wait period
- No social/SSO login option mentioned (Google, Kakao, Naver login would dramatically reduce friction for Korean B2B users)
- Users have no way to preview the product before completing the approval process

**Recommendations:**
- If manual approval serves a quality/spam control purpose, implement it silently post-access: grant immediate limited access (e.g., 3 free searches, no approval required) and use the 1-day window to approve full free tier access
- Extend email verification window to 72 hours
- Send an immediate "Your application is being reviewed" email with a video walkthrough of the product so users remain engaged during the wait
- Add Google/Kakao SSO to reduce form abandonment
- Add "What happens next" messaging on the post-signup confirmation page

---

### Step 6: Free Tier (Active User → Point Exhaustion)

**URL:** (in-app — not directly assessable from public site)
**Page Type:** Product Usage / Activation Stage
**Primary Action:** Complete first successful patent search
**Next Step:** Repeat use → plan upgrade

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 4/10 | 20pt/day = 2 searches or 2 analyses per day. This is described only in the FAQ, not in any onboarding context. Users may not know they are about to hit a wall. |
| Continuity | 4/10 | No in-product upgrade prompt described. Users who hit the cap must independently find the pricing information buried in /faq/point-guide. |
| Motivation | 3/10 | 2 searches/day is too low to demonstrate the "aha moment" of the product's core value (bulk analysis, comprehensive prior art coverage). Real patent work requires 5-20 searches per session. |
| Friction | 2/10 | Points do not carry over to the next day. No ability to earn additional points. No described in-app notification when points are low. Upgrade path requires a customer support inquiry. |
| Trust | 5/10 | N/A at this stage — trust has been established. The issue is upgrade path friction. |

**Page Score: 3.6/10 — MOST CRITICAL OPTIMIZATION OPPORTUNITY**

**Critical Issues:**
- 20pt/day cap (2 searches/day) is below the minimum viable usage for a professional use case. A patent attorney doing a single invalidation search may need 10-15 prior art searches in one session. The free tier creates frustration before value demonstration.
- No rollover of unused points means users who don't use the product daily are penalized (perceived loss)
- AI Classification (the highest-value feature) requires Premium and can only be trial-accessed via customer support inquiry — there is no self-serve trial path
- No described upgrade CTA within the product at point exhaustion
- Business plan upgrade path appears to require customer support contact rather than self-serve checkout

**Recommendations:**
- Increase free tier to 50pt/day (5 searches) — enough for a real work session but still creates upgrade motivation for power users
- Add rollover for unused daily points (up to a monthly cap, e.g., 200pt) to reduce perceived loss and increase retention
- Implement an in-product "You've used your daily points" modal with a direct upgrade CTA showing Business plan price and benefits
- Create a self-serve upgrade checkout (not just "고객센터 문의") for Business plan — this is a critical revenue leak
- Add a "Refer a colleague" point-earning mechanism to extend free tier viral loops

---

### Step 7: Pricing Page (/faq/point-guide)

**URL:** https://tanalysis.co.kr/faq/point-guide
**Page Type:** FAQ Subpage (incorrectly serving as the only pricing reference)
**Primary Action:** Understand plan pricing (no purchase CTA exists on this page)
**Next Step:** Customer support inquiry to upgrade

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 5/10 | The point system is explained clearly in the table. However, the actual Business plan price (월 [X]원) is not listed anywhere on the public site. |
| Continuity | 2/10 | This page is only reachable by navigating through the FAQ section — it is not linked from the homepage, nav, or any feature page CTA. |
| Motivation | 1/10 | There is no upgrade CTA on this page. Users who find it must still contact support to upgrade. |
| Friction | 1/10 | Complete absence of self-serve upgrade. Business plan pricing is unknown. Premium requires "협의" (negotiation). |
| Trust | 5/10 | The point table itself is clear and transparent, which is good. |

**Page Score: 2.8/10 — HIGHEST PRIORITY FIX**

**Critical Issues:**
- Business plan price is completely invisible on the public site — this is a fundamental SaaS funnel failure. Pricing opacity in self-serve SaaS reduces conversion by 30-50% because users cannot make a purchase decision without a sales conversation
- No dedicated /pricing page with plan comparison, feature matrix, and upgrade CTA
- "Premium: 협의" (negotiation) is expected for enterprise, but the Business plan must have a self-serve price
- No annual plan discount visible — annual billing is a standard conversion lever (typically 15-25% of paid users choose annual when shown the discount)
- The only upgrade mechanism described is contacting the customer support center — there is no mentioned in-app or website checkout

**Recommendations (HIGHEST PRIORITY):**
- Create a dedicated /pricing page with three plans: Free, Business (with specific monthly price), Premium (Enterprise — custom)
- Show annual vs. monthly pricing toggle with annual savings highlighted (e.g., "2개월 무료")
- Add feature comparison matrix on the pricing page
- Include a plan recommendation quiz or "어떤 플랜이 맞나요?" helper
- Add 3 customer testimonials (one per target persona) alongside the pricing table
- Enable self-serve credit card checkout for the Business plan
- Link the /pricing page from the main navigation (between "왜 타날리시스" and "로그인")

---

### Step 8: Team Meeting / Enterprise Demo (/team-meeting)

**URL:** https://tanalysis.co.kr/team-meeting
**Page Type:** Enterprise Lead Capture
**Primary Action:** Request team meeting
**Next Step:** Sales call + 2-week team trial

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | 7/10 | The offer is clear: "팀 미팅을 진행하시면 본인 포함 팀 전체에 2주간 Trial을 제공" — a 2-week full team trial is a compelling enterprise offer. |
| Continuity | 6/10 | Accessible from multiple feature pages. Reasonable continuation for enterprise-intent visitors. |
| Motivation | 6/10 | The 2-week team trial offer is good but under-marketed. It should be on the homepage and feature pages as a second-tier CTA for enterprise visitors. |
| Friction | 6/10 | Standard meeting request form. Unknown number of fields. |
| Trust | 7/10 | "10년 경력 변리사" credibility supports the consultation offer. |

**Page Score: 6.4/10**

**Critical Issues:**
- The 2-week team trial offer is only visible on the /team-meeting page itself — it is not prominently featured as an enterprise entry point on the homepage or feature pages
- No described follow-up sequence after meeting request submission

**Recommendations:**
- Add "팀/기업 도입 검토 중이세요? 2주 무료 팀 Trial 신청하기" as a secondary CTA on the homepage and all feature pages
- Set up an automated confirmation email with calendar invite and pre-meeting prep questions
- Add a "what to expect in the meeting" summary on the /team-meeting page

---

## Funnel Metrics

```
FUNNEL METRICS (Estimated — Korean B2B SaaS Benchmarks Applied)
===============================================================

Traffic Metrics (Estimated):
  Monthly Visitors: 3,000–8,000 (early-stage B2B SaaS, niche professional market)
  Traffic Sources (estimated):
    Organic search: ~50% (patent attorney / IP professional queries)
    Direct: ~25% (brand awareness, word of mouth)
    Referral: ~15% (professional communities, bar associations)
    Paid/Social: ~10%

Conversion Metrics (Current Estimated vs. Benchmark):
  Visitor → Free Signup Attempt:   8-12%   (benchmark: 10-15% for SaaS free tier)
  Signup Attempt → Active Account: 60-70%  (benchmark: 80-90% — manual approval hurts this)
  Active Free → Regular User:      30-40%  (benchmark: 40-60% — 20pt/day cap hurts retention)
  Free User → Business Plan:       1-3%    (benchmark: 5-10% for well-optimized freemium)
  Enterprise Inquiry → Customer:   15-25%  (benchmark: 20-35% for demo-to-close)

Overall Visitor → Paid:             ~0.5-1.5%  (benchmark for optimized SaaS: 2-4%)

Revenue Metrics (Estimated):
  Business Plan AOV:               Unknown (price not public) — assumed ₩50,000–₩150,000/month
  Premium Plan ACV:                Unknown — assumed ₩5,000,000–₩20,000,000/year
  Customer LTV (Business):         Assumed 18-24 months tenure × monthly fee
  LTV:CAC ratio:                   Unknown — likely 2:1 to 4:1 (estimated)

Key Gap: Overall conversion is estimated at 0.5-1.5% vs. an optimized benchmark of 2-4%.
Closing half this gap (reaching 2%) would roughly double current paid user count.
```

---

## Revenue Impact Analysis

```
REVENUE OPPORTUNITY CALCULATION
================================

Assumptions:
  Monthly visitors: 5,000 (midpoint estimate)
  Current visitor-to-paid rate: 1%
  Current paid customers from self-serve: ~50/month accumulated
  Business plan price: ₩100,000/month (assumed midpoint)
  Average customer tenure: 20 months
  LTV per Business customer: ₩2,000,000

Current State:
  Monthly new paid users: ~50 visitors × 1% = ~50 (cumulative)
  Monthly recurring revenue contribution: estimated ₩5,000,000–₩15,000,000 MRR

SCENARIO 1: Fix pricing page + self-serve checkout
  Expected lift: +30% in free-to-paid conversion rate (1% → 1.3%)
  Additional monthly new paid users: +15 users/month
  Annual MRR impact: +15 × ₩100,000 × 12 = ₩18,000,000/year ARR
  Effort: Medium (2-4 weeks dev + design)

SCENARIO 2: Fix free tier (50pt/day + rollover) + onboarding email
  Expected lift: +20% in free tier activation and retention
  +25% increase in users reaching the "aha moment" and hitting upgrade trigger
  Combined with pricing fix: cumulative conversion lift to ~1.6%
  Additional ARR: ₩12,000,000–₩18,000,000/year
  Effort: Low-Medium (1-2 weeks)

SCENARIO 3: Weekly Report as enterprise lead magnet
  Expected new enterprise qualified leads: +3-5/month from organic + content
  Enterprise deal close rate: 20%
  New enterprise customers/month: ~0.6–1
  Average Premium ACV: ₩10,000,000/year
  Annual ARR impact: ₩6,000,000–₩12,000,000/year
  Effort: Low (repositioning existing page + lead nurture emails)

COMBINED IMPACT (all three scenarios):
  Total estimated additional ARR: ₩36,000,000–₩48,000,000/year
  Estimated implementation cost: 4-8 weeks of dev/design/content work
  ROI: Very High
```

---

## Optimization Recommendations

### Priority 1 — Do Now (This Week)

**1.1 Create a Dedicated /pricing Page**
- Build a standalone pricing page with three tiers: Free (20pt/day), Business (1,000pt/month — show the actual price), Premium (Enterprise — 문의)
- Include a feature comparison matrix
- Add "Most Popular" badge on Business plan
- Add 2-3 testimonials from Business plan users
- Link from main navigation and all feature page CTAs
- **Expected lift: +25-35% on free-to-paid conversion**
- **Effort: 1-3 days design + dev**

**1.2 Surface the Business Plan Price**
- Even before building the full pricing page, add a pricing anchor to the homepage hero and the /faq/point-guide page: "Business 플랜 월 [X]원으로 시작"
- Add a direct upgrade CTA button on /faq/point-guide
- **Expected lift: +10-15% on upgrade intent**
- **Effort: 2 hours copy + code**

**1.3 Add "무료 AI 분류 체험" CTA on /classification Page**
- The free classification trial offer (고객센터 문의 시 최초 1회) is only discoverable via FAQ. Surface it with a prominent CTA on the classification page itself.
- Pre-fill the support contact subject line: "AI 분류 무료 체험 신청"
- **Expected lift: +40-60% on classification trial requests**
- **Effort: 1 hour**

---

### Priority 2 — Plan (This Month)

**2.1 Implement Self-Serve Business Plan Checkout**
- Current upgrade path requires contacting the customer support center — this is a critical revenue leak for a self-serve SaaS product
- Integrate a payment gateway (Toss Payments or KG Inicis for Korean market) for Business plan subscription
- Add an in-product upgrade modal triggered when daily points are exhausted: show pricing, features, and a one-click upgrade button
- **Expected lift: +40-60% on upgrade completion rate (current requirement to call support loses most would-be upgraders)**
- **Effort: 1-3 weeks (payment integration)**

**2.2 Build Free Tier Onboarding Email Sequence**
- Email 1 (immediately on signup approval): Welcome + "your first search in 3 minutes" quick-start guide
- Email 2 (Day 2): Feature spotlight — claim chart export and its use for invalidation work
- Email 3 (Day 4): Case study — "how a chemical firm found prior art they missed everywhere else"
- Email 4 (Day 7): Feature spotlight — component-based analysis (구성 카드) and how it replaces manual claim mapping
- Email 5 (Day 14): Soft upgrade prompt — "You've done [X] searches. Power users on Business get 1,000pt/month to complete full invalidation studies in one session."
- **Expected impact: +15-20% reduction in free tier churn, +10-15% lift in upgrade conversion**
- **Effort: 1 week (copywriting + email automation setup)**

**2.3 Increase Free Tier Daily Allowance to 50pt**
- 20pt/day (2 searches) is not enough for a professional to experience real value in a single session
- 50pt/day (5 searches or 3 searches + 1 analysis) allows a meaningful prior art search in one session
- The goal is to create genuine upgrade desire ("I wish I had more points") rather than frustrated abandonment ("this is too limited to be useful")
- **Expected impact: +20-30% improvement in free tier Day-7 and Day-30 retention**
- **Effort: 1 hour (system configuration)**

**2.4 Extend Email Verification Window to 72 Hours**
- Current 24-hour window causes unnecessary signup abandonment for users who don't check email immediately (common in professional settings with email overload)
- **Expected lift: +5-10% on signup completion rate**
- **Effort: 1 hour (configuration)**

**2.5 Add Audience Segmentation to CTAs on Feature Pages**
- On /patent-search and /classification, split the CTA block into two clear tracks:
  - "개인 변리사 / 연구원: 무료로 시작하기"
  - "팀 / 기업 도입: 2주 무료 팀 Trial 신청"
- This prevents enterprise visitors from going through the self-serve free signup funnel (wrong track) and vice versa
- **Expected lift: +15-25% on enterprise lead quality and volume**
- **Effort: 2-4 hours copy + design**

---

### Priority 3 — Strategic (This Quarter)

**3.1 Reposition Weekly Report as Enterprise Lead Magnet + Content Strategy**
- The /reportbymail page has the strongest emotionally resonant pain points on the entire site ("경쟁사가 조용히 핵심 기술에 특허를 쌓고 있는 동안")
- Create a free "competitor patent intelligence" report for one company a month — offered as a lead magnet on the page. Visitor provides their competitor's name and company email; Tanalysis delivers a sample monitoring report.
- This replaces the expiring government subsidy urgency with a permanent, high-value lead capture mechanism
- Follow up with a 4-email nurture sequence positioning the full Weekly Report service
- **Expected impact: +3-8 new enterprise qualified leads/month**
- **Effort: 2-3 weeks (lead magnet creation + email sequence)**

**3.2 Build Interactive Product Demo (No Signup Required)**
- Current funnel requires manual approval to see the product — this kills evaluation-stage intent from enterprise buyers and skeptical individual users alike
- Build a sandboxed interactive demo with 3 pre-loaded patent search scenarios (by field: chemical, mechanical, software) that anyone can try without signup
- Link from homepage hero as a third CTA: "먼저 체험해보기 (가입 불필요)"
- **Expected lift: +20-30% improvement in signup-to-approval completion (users who have already seen the product are more motivated to complete the approval process)**
- **Effort: 3-6 weeks (product sandbox development)**

**3.3 Introduce Annual Billing Option for Business Plan**
- Offer Business plan at a 15-20% discount for annual prepayment (e.g., 10개월 금액으로 12개월 이용)
- Annual plans dramatically reduce churn risk and improve cash flow
- Surface annual option prominently on the /pricing page with monthly equivalent price shown
- **Expected impact: 20-30% of new paid users choose annual → reduces monthly churn by ~40% for that cohort**
- **Effort: 1-2 weeks (billing system update)**

**3.4 Add In-Product Upgrade Triggers at Key Moments**
- Trigger 1: "Daily points exhausted" modal with upgrade prompt and one-click checkout
- Trigger 2: When a user tries to access AI Classification (Premium feature), show a comparison of what they're missing with upgrade CTA
- Trigger 3: At 7-day and 30-day milestones, show usage stats ("You've completed 14 patent searches with Tanalysis") with a personalized upgrade suggestion based on usage pattern
- **Expected lift: +20-30% improvement in free-to-paid conversion among active users**
- **Effort: 2-4 weeks (product development)**

**3.5 Publish SEO-Optimized Prior Art Search Guides**
- Target high-intent Korean search queries:
  - "선행기술 조사 방법" (prior art search methods)
  - "특허 무효자료 조사" (patent invalidation research)
  - "FTO 분석 도구" (FTO analysis tools)
  - "변리사 특허 검색 AI" (patent search AI for attorneys)
- These queries have commercial intent from the exact target personas and currently may be underserved by Tanalysis content
- Each blog post leads to a relevant feature page CTA
- **Expected impact: +30-50% organic traffic growth over 6 months; +15-20 new free signups/month**
- **Effort: 1-2 blog posts per week, ongoing**

---

## Pricing Page Assessment

```
PRICING PAGE AUDIT CHECKLIST
==============================

Current State: No dedicated pricing page exists. Pricing information
is buried in /faq/point-guide as an FAQ item with no purchase CTA.

[X] Headline frames value, not cost
    FAIL — No pricing page headline exists

[X] Plans limited to 3 (or 3 + enterprise)
    PASS (conceptually: Free, Business, Premium) — but not presented as plans

[X] One plan highlighted as "Most Popular" or "Best Value"
    FAIL — No plan recommendation

[X] Annual pricing shown first with savings highlighted
    FAIL — No annual pricing option visible anywhere

[X] Features are benefit-oriented (not jargon)
    PARTIAL — Point system table is clear but dry

[X] Social proof near pricing
    FAIL — No testimonials adjacent to pricing

[X] FAQ addresses top 5 pricing objections
    PARTIAL — Basic point FAQ exists but not on a pricing page

[X] Money-back guarantee or free trial prominently displayed
    FAIL — Free tier is the trial but it is not framed as a "try before you buy" offer

[X] Plan names are aspirational
    FAIL — "Free / Business / Premium" are generic

[X] CTA buttons use action language
    FAIL — No upgrade CTAs exist on any pricing reference page

[X] Comparison with cost of not buying (ROI framing)
    FAIL — No ROI calculator or cost-of-manual-work comparison

[X] "Help me choose" option for undecided visitors
    FAIL

SCORE: 2/12 criteria met

PRIORITY ACTION: Build /pricing page from scratch.
Recommended implementation:
  - URL: /pricing (add to main nav)
  - H1: "내 업무에 맞는 플랜을 선택하세요"
  - Plan names: 스타터(Free) / 프로(Business) / 엔터프라이즈(Premium)
  - Add ROI calculator: "현재 선행조사에 월 몇 시간 사용하시나요?"
  - Add annual/monthly toggle with "2개월 무료" annual label
  - Position Business plan as "Most Popular" with highlighted border
  - Add 3 testimonials: one from solo attorney, one from in-house team, one from R&D
```

---

## Lead Magnet Assessment

Tanalysis currently has two lead magnet mechanisms:

**Lead Magnet 1: 소개자료 받기 (Product Brochure)**

| Criteria | Score | Notes |
|----------|-------|-------|
| Relevance | 7/10 | Relevant to enterprise evaluators |
| Specificity | 4/10 | "소개자료" (brochure) is generic — not a specific deliverable |
| Perceived value | 4/10 | Brochures are perceived as sales materials, not high-value content |
| Quick win | 3/10 | User receives sales collateral, not actionable insight |
| Product alignment | 8/10 | Naturally leads to sales conversation |
| Opt-in friction | Unknown | Form fields unknown |

**Score: 4.3/10 — Below average effectiveness**

**Lead Magnet 2: Weekly Report Sample (리포트 샘플 보기)**

| Criteria | Score | Notes |
|----------|-------|-------|
| Relevance | 10/10 | Directly shows the service output — highest relevance |
| Specificity | 9/10 | Naver/Kakao sample with real data points is highly specific |
| Perceived value | 9/10 | A live competitive intelligence report has clear monetary value |
| Quick win | 8/10 | Reader gets competitor insight in under 2 minutes |
| Product alignment | 10/10 | The sample IS the product — perfect alignment |
| Opt-in friction | Unknown | No opt-in form currently visible — missed capture opportunity |

**Score: 9.3/10 — Excellent content, but no lead capture mechanism**

**Recommendations:**
- Gate the Weekly Report sample behind an email capture form: "무료 샘플 리포트 받기 → 이메일 입력"
- This converts a passive page element into an active enterprise lead generator
- Replace the generic "소개자료 받기" CTA on the homepage with a more specific offer: "경쟁사 특허 동향 샘플 리포트 받기"

---

## Freemium-to-Paid Conversion Friction Analysis

This is the most critical section for Tanalysis's revenue growth.

```
FREEMIUM CONVERSION FRICTION MAP
==================================

Stage               | Friction Level | Root Cause
--------------------|----------------|------------------------------------------
Signup              | HIGH           | Manual approval + 24hr email expiry
                    |                | No social login (Google/Kakao)
                    |                | Approval delay kills momentum
--------------------|----------------|------------------------------------------
First use           | HIGH           | Users don't know they have 20pt/day
                    |                | No onboarding tour or first-use guide
                    |                | No "try this first" guided task
--------------------|----------------|------------------------------------------
Daily limit hit     | CRITICAL       | No in-app upgrade prompt
                    |                | No visible pricing at point of frustration
                    |                | Upgrade requires support contact (massive friction)
--------------------|----------------|------------------------------------------
Upgrade decision    | CRITICAL       | No public-facing pricing page
                    |                | Business plan price unknown until inquiry
                    |                | No self-serve checkout
                    |                | No annual plan / discount incentive
--------------------|----------------|------------------------------------------
Feature discovery   | HIGH           | AI Classification trial requires
                    |                | separate support contact (not self-serve)
                    |                | Premium features invisible until FAQ research
--------------------|----------------|------------------------------------------

ESTIMATED CONVERSION LOSS BY STAGE:
  Signup friction:           ~20-30% of potential signups lost
  First-use abandonment:     ~30-40% of approved accounts never activated
  Daily limit frustration:   ~60-70% of cap-hitting users leave without upgrading
  Pricing opacity:           ~40-50% of upgrade-intent users abandon before completing
  No self-serve checkout:    ~50-60% of would-be upgraders abandon at support contact step

Cumulative: Only ~5-8% of users who have genuine upgrade intent successfully complete
            the purchase journey with current friction levels.
```

---

## Churn Risk Analysis

```
CHURN RISK POINTS
==================

Risk 1: FREE TIER EXHAUSTION WITHOUT VALUE REALIZATION (HIGH RISK)
  Scenario: User signs up, completes 2 searches on Day 1, hits the 20pt cap,
            cannot do more until tomorrow, loses momentum, never returns.
  Likelihood: Very High (20pt/day is below professional session length)
  Mitigation: Raise free tier to 50pt/day; add onboarding email sequence

Risk 2: APPROVAL DELAY ABANDONMENT (HIGH RISK)
  Scenario: User attempts signup, doesn't check email within 24 hours, link expires,
            never completes registration.
  Likelihood: Moderate-High (professional email users often have delayed checking)
  Mitigation: Extend to 72 hours; send reminder email at 12 hours

Risk 3: FEATURE DISCOVERY FAILURE (MEDIUM RISK)
  Scenario: Business plan user pays monthly but only uses basic search,
            never discovers 구성 카드 analysis, classification, or export features.
            Perceived value stays low → cancels after 2-3 months.
  Likelihood: Moderate (no onboarding sequence described)
  Mitigation: Build onboarding email sequence with feature deep-dives;
              add in-product feature discovery prompts

Risk 4: POINT EXPIRY FRUSTRATION (MEDIUM RISK)
  Scenario: Business plan user accumulates 800pt by month-end, loses all
            non-rollover points, perceives the subscription as wasteful.
  Likelihood: Moderate (especially for occasional-use professionals)
  Mitigation: Offer rollover of up to 500pt; send "you have 200 points expiring soon" email

Risk 5: COMPETITIVE DISPLACEMENT (MEDIUM RISK)
  Scenario: LexisNexis, Orbit Intelligence, or a well-funded Korean competitor
            launches a comparable Korean patent AI with better UX.
  Likelihood: Medium (market is growing, competition will increase)
  Mitigation: Invest in moat-building content (case studies, accuracy benchmarks,
              attorney community relationships)
```

---

## Email Nurture Integration

```
FUNNEL-TO-EMAIL MAPPING
========================

Funnel Stage                → Recommended Email Sequence
--------------------------------------------------------
Signup submitted            → "Your account is being reviewed" (immediate)
                              Content: What to expect, product video walkthrough,
                              "while you wait" blog post on AI patent search tips

Account approved (Day 0)    → Welcome + Quick Start sequence (5 emails)
                              Email 1 (Day 0): Welcome + "complete your first search in 3 min"
                              Email 2 (Day 2): Feature spotlight: 구성 카드 analysis
                              Email 3 (Day 4): Case study: invalidation research success story
                              Email 4 (Day 7): Feature spotlight: claim chart export
                              Email 5 (Day 10): Feature spotlight: TANA-GPT document Q&A

Active free user            → Upgrade Nurture sequence (triggered by usage patterns)
(Day 14+)                     Email 1: "You've done 10+ searches — here's what power users do"
                              Email 2: "Still on the free plan? Here's what you're missing"
                              Email 3: Direct upgrade offer with limited-time incentive
                                       (e.g., "첫 달 20% 할인" — first month 20% off)

Inactive free user          → Re-engagement sequence (triggered: 7 days no login)
(no activity >7 days)         Email 1: "Is patent search still on your plate?"
                              Email 2: New feature announcement or case study
                              Email 3: "Your account is still active — try this one thing"
                              Email 4: Final "we'll keep your account ready" note

Business plan customer      → Onboarding + Expansion sequence
                              Month 1: Feature adoption emails (one deep-dive per week)
                              Month 2: "How are you using Tanalysis?" check-in
                              Month 3: Team expansion offer ("invite a colleague for free")
                              Month 6: Annual plan upgrade offer with savings calculation

Enterprise prospect         → Post-team-meeting nurture
(post /team-meeting form)     Email 1: Meeting confirmation + prep materials
                              Email 2 (post-meeting): Proposal follow-up
                              Email 3 (1 week): Case study relevant to their industry
                              Email 4 (2 weeks): Trial expiry reminder + upgrade offer

Weekly Report prospect      → Enterprise intelligence nurture
(email capture from sample)   Email 1: Deliver sample report + "here's how to read it"
                              Email 2: "What your competitors filed last month" teaser
                              Email 3: ROI framing: "cost of missing a competitor's patent"
                              Email 4: Consultation offer with 변리사 expert
```

---

## Traffic Source Alignment

```
TRAFFIC SOURCE RECOMMENDATIONS
================================

Source              | Intent | Current Entry | Recommended Entry | Priority
--------------------|--------|---------------|-------------------|----------
Branded search      | High   | Homepage      | /pricing or signup| Move pricing to nav
(타날리시스)         |        |               |                   |

Non-branded search  | Medium | Unknown       | Feature page or   | Build SEO content
(특허 AI 검색 등)   |        |               | SEO blog post     | targeting these terms

Patent attorney     | High   | Unknown       | /patent-search    | Create attorney-specific
queries             |        |               | with attorney CTA | landing page

R&D / corporate IP  | Medium | Unknown       | /classification   | Create use-case landing
queries             |        |               | or /reportbymail  | pages by industry

Referral            | High   | Homepage      | /patent-search    | Add referral program
(attorney community)|        |               |                   | with referrer credit

Direct              | High   | Homepage      | No change         | Optimize homepage CTA
(return visitors)   |        |               |                   | for logged-out users

LinkedIn/Social     | Low    | Homepage      | /reportbymail     | Weekly Report is best
(IP professionals)  |        |               | as lead magnet    | social content hook

Government voucher  | Medium | Unknown       | /data-voucher     | Target 중소기업
(데이터바우처)       |        |               |                   | HR/IP keywords
```

---

## Upgrade Trigger Recommendations

The following moments should trigger an upgrade prompt in-product:

| Trigger Event | Prompt Message | CTA |
|---------------|---------------|-----|
| Daily points = 0 | "오늘의 포인트를 모두 사용했습니다. Business 플랜으로 업그레이드하면 월 1,000pt로 이어서 작업하실 수 있습니다." | "지금 업그레이드" (self-serve checkout) |
| Attempt to access AI Classification | "AI 분류는 Premium 기능입니다. 무료 체험 또는 Premium 플랜 문의를 신청하세요." | "무료 체험 신청" / "Premium 문의" |
| 7-day active user milestone | "지난 7일간 [N]건의 특허를 검색하셨습니다. Business 플랜으로 업그레이드하면 한 달 내내 제한 없이 업무하실 수 있습니다." | "플랜 보기" |
| Points expiring in 3 days (Business) | "이번 달 포인트가 3일 후 만료됩니다. [N]pt 남았습니다 — 지금 활용하세요." | "남은 포인트로 검색하기" |
| 30-day free user with 10+ searches | "한 달간 [N]건을 검색하신 적극적인 사용자이십니다. Business 플랜 첫 달 20% 할인 혜택을 드립니다." | "할인 적용 업그레이드" |

---

## Next Steps

1. **This Week — Create /pricing page and surface Business plan price publicly.** This is the single highest-leverage action available. Every day without a visible pricing page is lost conversion. Design and launch a three-tier pricing page, add it to the main nav, and link it from all feature page CTAs. Target completion: 3-5 business days.

2. **This Week — Add upgrade CTA to /faq/point-guide.** While the full pricing page is in development, immediately add a "Business 플랜으로 업그레이드" button on the existing point guide FAQ page. Takes 1-2 hours and captures intent from users who have already found the pricing FAQ.

3. **This Month — Implement self-serve Business plan checkout and in-product upgrade flow.** The current requirement to contact customer support to upgrade is killing conversion. Integrate a payment gateway and build the in-product "points exhausted" upgrade modal. This single change is estimated to contribute the largest share of revenue impact among all recommendations.

4. **This Month — Build and launch the 5-email free tier onboarding sequence.** Users who understand and experience the product's value before they hit the free tier ceiling are dramatically more likely to upgrade. Write and automate the welcome sequence targeting Day 0, 2, 4, 7, and 14 touchpoints.

5. **This Month — Increase free tier to 50pt/day and extend email verification to 72 hours.** Both are low-effort configuration changes that reduce the two highest-friction points in the early funnel.

6. **This Quarter — Build no-signup interactive product demo.** Enterprise buyers and skeptical individual users need to see the product before committing to the manual approval process. A sandboxed demo eliminates the evaluation barrier entirely.

---

## Summary Scorecard

| Funnel Component | Current Score | Target Score | Priority |
|-----------------|---------------|--------------|----------|
| Homepage messaging | 6.6/10 | 8.5/10 | P2 |
| Patent search page | 8.0/10 | 9.0/10 | P3 |
| Classification page | 6.8/10 | 8.5/10 | P2 |
| Weekly report page | 7.2/10 | 8.5/10 | P2 |
| Signup / registration | 4.4/10 | 8.0/10 | P1 |
| Free tier experience | 3.6/10 | 7.5/10 | P1 |
| Pricing page | 2.8/10 | 9.0/10 | P1 (CRITICAL) |
| Enterprise demo path | 6.4/10 | 8.0/10 | P2 |
| Email nurture | 0/10 | 8.0/10 | P1 |
| Upgrade flow | 1.0/10 | 9.0/10 | P1 (CRITICAL) |

**Overall Funnel Health: 54/100**
**Potential Health After P1 Fixes: 72/100**
**Potential Health After All Fixes: 85/100**

---

*Analysis performed using the market-funnel skill. For copy optimization of specific pages, run `/market copy`. For email sequence drafts, run `/market emails`. For a competitive funnel comparison, run `/market competitor`.*
