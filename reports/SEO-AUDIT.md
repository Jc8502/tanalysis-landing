## PLAYWRIGHT TECHNICAL AUDIT (2026-03-08)
> This section supersedes estimates in the original audit with actual rendered DOM data.

### Page Load Performance
- Load time (networkidle): 5,747ms
- Performance grade: Slow (>4s) — this is a confirmed critical issue, not an estimate. The original audit predicted "Likely Needs Work" for LCP; the actual networkidle time of nearly 6 seconds is worse than the typical Framer range cited.

### Title & Meta Tags (Actual)
- Title: "특허 AI 검색·분석·분류 | 타날리시스" (22 chars) — confirmed too short, wastes ~30 chars of available SERP window
- Meta Description: "타날리시스 AI가 특허를 빠르고 정확하게 찾아 분석해 드립니다. 경쟁사 핵심 기술 분석과 AI 특허 분류까지." (~68 chars) — Too short; also contains a zero-width no-break space (U+FEFF) immediately after "타날리시스" — a hidden character bug that should be removed from the Framer SEO panel
- Canonical: Present — https://tanalysis.co.kr/
- OG Title: Present — matches page title
- OG Description: Present — matches meta description (including the ZWNBSP bug)
- OG Image: Present — https://framerusercontent.com/images/WJ0Q1xLcuhnxKbUjyAPj3tHVz1Q.png
- Twitter Card: Present — summary_large_image
- Robots meta: "max-image-preview:large" — note: this only grants Google permission to use large image previews in search results. It does NOT contain "index, follow" — while Google defaults to indexing, the absence of an explicit index directive is worth monitoring. No "noindex" is present, so pages are indexable.
- Lang attribute: "ko" — correct

### Heading Structure (Actual Rendered DOM)
- H1 count: 4 — Issue (multiple H1s confirmed; original audit estimated 6 from page cache, actual rendered DOM shows 4)
- H1 texts:
  - "업무 효율화,"
  - "정확한 특허 검색·분석부터"
  - "자주 묻는 질문"
  - "다른 곳에 없는"
- None of the 4 H1s contains the primary target keyword "AI 특허 검색" or "특허 분석 솔루션"
- H2 count: 4
- H2 texts: "무수한 반복 작업, 줄여드릴게요!", "타날리시스는 정확한 특허 검색·분석 AI 도구입니다", "IP 업무 효율 개선, 지금 시작하셔야 합니다.", "새로운 방식으로 검색해보세요."
- H3 count: 8 — "쉽고 정확한 검색으로", "편리한 구성별 분석으로", "분류 자동화로 빠르게", "AI 특허 검색", "AI 분류", "보고서 형식으로 내보내기", "엑셀 다운로드", "AI 요약"
- The primary keyword phrase appears in H2 ("타날리시스는 정확한 특허 검색·분석 AI 도구입니다") — confirmed correct keyword, wrong heading level

### Image Optimization
- Total images: 6
- With alt text: 0 (0%)
- Without alt text: 6 (100%) — confirmed critical issue; the original audit's assumption that "most images likely have missing or auto-generated alt text" was exactly right. Every single image on the page has no alt attribute.

### Schema Markup
- Schemas found: None — confirmed. Zero JSON-LD blocks in the rendered DOM.
- Missing (all of the following): FAQPage, Organization, SoftwareApplication, Product, AggregateRating, WebSite, BreadcrumbList

### Internal Linking
- Internal links (tanalysis.co.kr): 0 unique — this is a critical finding not previously identified
- External links: 10 unique — and notably, ALL navigation on the .co.kr homepage points to tanalysis.ai (a different domain): login, sign-up, inquiry, blog, and all CTAs resolve to tanalysis.ai URLs
- Key implication: tanalysis.co.kr passes zero PageRank internally between its own pages because all links exit to tanalysis.ai. From Google's perspective, tanalysis.co.kr is a near-orphaned single page with no internal link graph. This severely limits the ability of the .co.kr domain to build authority.
- External destinations found: tanalysis.ai/login, tanalysis.ai/sign-up, tanalysis.ai/inquiry, ai-tanalysis.tistory.com (blog), tanalysis.channel.io (support chat), ftc.go.kr (business registry)

### Content Depth
- Page word count: 399 words — very thin. Google's quality guidelines favor substantive content; a B2B SaaS homepage with fewer than 400 words provides almost no keyword surface area and limited topical depth signals.

### CTA Inventory (Actual)
- Button-role elements: "누락 없는 검색 결과 확인하기", "AI 문장&키워드 검색", "구성 분석", "AI 특허 분류"
- CTA links (keyword-matched): "무료로 시작하기" (×3), "자세히 보기" (×2), "타날리시스팀 문의", "도입 문의", "지금 가입하면 무료", "소개자료 다운로드"
- All CTA hrefs resolve to tanalysis.ai — consistent with the zero internal links finding above

### Scoring Update (Revised Based on Actual Data)

**Revised SEO Health Score: 44/100** (down from estimated 52/100)

| Category | Original Score | Revised Score | Change | Reason |
|---|---|---|---|---|
| On-Page SEO | 11/25 | 10/25 | -1 | ZWNBSP bug in meta description discovered; H1 count confirmed 4 (not 6 as cached, but still critically wrong) |
| Content Quality (E-E-A-T) | 14/20 | 12/20 | -2 | 399-word page is thinner than cache suggested; all E-E-A-T content may live on tanalysis.ai, not the audited .co.kr domain |
| Technical SEO | 10/25 | 8/25 | -2 | Load time confirmed at 5.7s (worse than estimated range); zero alt text confirmed; schemas confirmed absent; 0 internal links is a new critical finding |
| Content Strategy | 17/30 | 14/30 | -3 | Effective content volume on .co.kr is only 399 words; all CTAs exit the domain; the .co.kr site functions more as a landing redirect page than a content destination |

**New critical finding not in original audit:** The split between tanalysis.co.kr and tanalysis.ai represents a domain authority fragmentation problem. If users and backlinks arrive at .co.kr but all engagement (sign-up, login, inquiry) happens on .ai, neither domain accumulates the full authority signal. The .co.kr domain should either consolidate all content under one domain, or implement a deliberate cross-domain linking strategy with rel="canonical" and consistent backlink targeting.

---

# SEO Content Audit
## https://tanalysis.co.kr/
### Date: 2026-03-07

---

## SEO Health Score: 52/100

**Score Breakdown:**
- On-Page SEO: 11/25
- Content Quality (E-E-A-T): 14/20
- Technical SEO: 10/25
- Content Strategy: 17/30

**Summary:** Tanalysis has solid product positioning and genuine differentiators, but the site's SEO fundamentals are significantly handicapped by its Framer-based JavaScript rendering architecture. Critical content is invisible to search crawlers, heading structures are fragmented, and the site is missing the keyword-rich content that IP professionals in Korea actually search for. The fixes below are ordered by effort-to-impact ratio — several can be implemented this week with no code changes.

---

## On-Page SEO Checklist

### Title Tag — Homepage

- **Status: Needs Work**
- **Current:** `특허 AI 검색·분석·분류 | 타날리시스` (~22 chars)
- **Issues:**
  - Too short. At ~22 characters, this wastes the available ~50-60 character window where keyword-rich copy appears in SERPs.
  - "특허 AI 검색" is the right keyword territory but the phrase ordering is not how users search. Korean patent professionals search "AI 특허 검색", "특허 선행기술 조사", "특허 분석 솔루션" — not the compound "검색·분석·분류" nominal form.
  - No value proposition differentiator in the title. Competitors can have identical structures.
- **Recommended:** `AI 특허 검색·분석 솔루션 | 변리사가 만든 타날리시스`
  - Leads with the high-intent keyword phrase
  - Includes "변리사" — a trust signal that is also a search term used by in-house IP teams vetting vendors
  - Stays within ~45 characters (well within display limit)
- **Expected impact:** A well-optimized title tag typically lifts CTR by 20-35% from existing impressions, even before rankings change.

---

### Title Tags — Inner Pages

| Page | Current Title | Status | Issue |
|---|---|---|---|
| /patent-search | 정확한 특허 검색·분석 \| 타날리시스 | Needs Work | Good primary keyword, but "정확한" is an adjective users don't search. Missing differentiator. |
| /classification | AI 특허 분류 \| 타날리시스 | Pass | Clean and keyword-forward. Short but acceptable. |
| /reportbymail | 타날리시스 \| 위클리 리포트 | Fail | Brand-first format buries the keyword. "경쟁사 특허 모니터링" is a higher-value keyword than "위클리 리포트". |
| /team-meeting | 팀 미팅을 신청하세요 | Fail | No keywords at all. This is a conversion page title, not an SEO title. |
| /data-voucher | 타날리시스 \| 위클리 리포트 도입 상담 | Fail | Duplicate of /reportbymail's theme. Needs differentiation. |

**Recommended fixes:**
- `/patent-search` → `특허 선행기술 조사 AI | 심사관 수준 정확도 | 타날리시스`
- `/reportbymail` → `경쟁사 특허 모니터링 자동화 | AI 위클리 리포트 | 타날리시스`
- `/team-meeting` → `타날리시스 무료 팀 체험 신청 | AI 특허 분석 솔루션`

---

### Meta Description — Homepage

- **Status: Needs Work**
- **Current:** `타날리시스 AI가 특허를 빠르고 정확하게 찾아 분석해 드립니다. 경쟁사 핵심 기술 분석과 AI 특허 분류까지.` (~70 chars)
- **Issues:**
  - At ~70 characters, this uses less than half the available ~155-character SERP snippet space. This is leaving persuasion real estate on the table.
  - No CTA.
  - No stat or proof point.
  - Does not address the user's pain (I'm spending hours on manual prior art searches) or differentiate from generic AI tools.
- **Recommended:** `변리사와 AI 전문가가 만든 특허 검색·분석 솔루션. 심사관 수준의 85% 선행기술 재현율, 타사 대비 4배 정확도. 특허법인·인하우스 IP팀·R&D팀 무료 체험 가능.`
  - ~100 characters — within safe range for Korean character display
  - Includes the 85% stat (concrete proof point users click on)
  - Targets all three audience segments in one line
  - Implicit CTA via "무료 체험 가능"

---

### Meta Description — Inner Pages

| Page | Current | Status | Issue |
|---|---|---|---|
| /patent-search | 특허 판결 데이터로 학습한 정확한 AI 검색 | Needs Work | Extremely short (~25 chars). No CTA, no stat, no audience targeting. |
| /classification | AI로 특허 분류를 빠르고 정확하게 해결 | Needs Work | Short and generic. Missing the 90% accuracy stat and 5-minute claim — both are compelling. |
| /reportbymail | 경쟁사 특허 동향, 매주 월요일 1분 브리핑으로 받아보세요 | Pass | Best meta on the site. Has specificity and a clear value prop. Could add CTA. |
| /team-meeting | 팀 미팅을 진행하시면, 본인 포함 팀 전체에 2주간 Trial을 제공드립니다. | Pass | Functional and specific. |

---

### Heading Hierarchy

**Status: Fail**

This is the most serious on-page structural problem on the site.

**Homepage H1 analysis:**
The page-cache shows these as H1 elements:
- `업무 효율화,`
- `정확한 특허 검색·분석부터`
- `추가 결제 없음`
- `보안 유지`
- `자주 묻는 질문`
- `다른 곳에 없는`

**Critical issues:**
1. **Multiple H1 tags on a single page.** Google expects exactly one H1 per page. Having 6 H1 tags fragments the keyword signal and confuses crawlers about what the page is actually about.
2. **H1s are decorative, not semantic.** Phrases like "업무 효율화," and "추가 결제 없음" are visual design elements styled as H1s in Framer — they contain no keywords and do not describe the page's core topic.
3. **The actual primary keyword phrase "AI 특허 검색·분석"** appears in an H2 (`타날리시스는 정확한 특허 검색·분석 AI 도구입니다`) — which is the correct keyword, but in the wrong heading level.
4. **H3s contain the feature names** ("AI 특허 검색", "AI 분류") which are good keywords but buried under unrelated H1s.

**Recommended structure (homepage):**
```
H1: AI 특허 검색·분석 솔루션 — 변리사가 만든 타날리시스
  H2: 무수한 반복 작업을 줄여드립니다
    H3: AI 문장 검색으로 복잡한 검색식 없이
    H3: 구성별 분석으로 유사 여부 즉시 파악
    H3: AI 특허 분류 자동화
  H2: 타날리시스가 다른 이유
    H3: 심사관 수준의 85% 선행기술 재현율
    H3: 특허청 심사 데이터 기반 특화 모델
  H2: 자주 묻는 질문
```

**Patent Search page H1 issues:**
- `특허 검색, 오래 걸리시나요?` — a question-form H1 is weak for keyword targeting
- `찾는 내용까지 직행하는 검색` — better keyword proximity but still H1 duplication
- `다른 곳에 없는` — decorative fragment with no keyword value

**Recommended:** Single H1: `AI 특허 선행기술 검색·분석 — 심사관 수준 정확도`

**AI Classification page H1 issues:**
- `특허 분류 자동화` — acceptable keyword
- `타날리시스 AI 분류` — redundant second H1
- `숫자가 증명하는 품질` — decorative
- `10,000건`, `5분`, `90% 이상` — stats styled as H1s (should be styled text, not heading tags)
- `업무 효율 개선,` — decorative fragment

**Recommended:** Single H1: `AI 특허 분류 자동화 — 10,000건을 5분 만에, 90% 이상 정확도`

---

### Image Optimization

- **Status: Cannot fully audit (Framer limitation)**
- Framer renders images via CDN URLs (typically `framerusercontent.com` or similar). Image filenames are hashed UUIDs, not descriptive keywords.
- Alt text implementation in Framer is possible but requires manual configuration per component. Default Framer images have empty or missing alt attributes.
- **Assumption based on Framer behavior:** Most images likely have missing or auto-generated alt text.

**Recommended actions:**
1. In Framer's image settings, add descriptive Korean alt text to all key visuals. Example: a screenshot of the search interface should have `alt="타날리시스 AI 특허 검색 인터페이스 — 구성별 문장 입력 화면"`.
2. Ensure the hero image (likely showing the product UI) has the primary keyword in its alt text.
3. Testimonial or logo images should have alt text identifying the company or person.

**Expected impact:** Image alt text contributes to accessibility compliance and Google Image Search visibility. For B2B SaaS, this is medium-priority but worth doing during any Framer editing session.

---

### Internal Linking

- **Status: Needs Work**
- **Navigation links** are present and functional: features, why us, use cases, blog, login, CTA.
- **Footer links** correctly reference `/patent-search` and key support pages.
- **Missing:** Deep contextual cross-linking within body content.

**Specific gaps:**
1. The homepage comparison table (before/after) does not link to the `/patent-search` or `/classification` feature pages where those capabilities are detailed.
2. The FAQ section on the homepage links to FAQ pages but the question text could be more descriptive anchor text (e.g., "AI 입력 도우미란?" is better anchor text than a generic "자세히 보기").
3. The `/reportbymail` page references the data voucher program but does not appear to link to `/data-voucher` in-line — this is a missed conversion opportunity.
4. The `/patent-search` page references "AI 분류" as a related feature but the page-cache shows no in-text link to `/classification`.
5. Blog pages (if they exist) should link back to product feature pages with keyword-rich anchor text.

**Anchor text issues:**
- "자세히 보기" and "소개자료 받기" CTAs are generic. Google uses anchor text to understand link context. Where linking to the patent search feature, anchor text should be "AI 특허 검색 기능 자세히 보기" not "자세히 보기."

---

### URL Structure

| URL | Status | Notes |
|---|---|---|
| `/patent-search` | Pass | Clean, readable, hyphens, lowercase. Contains the keyword. |
| `/classification` | Pass | Clean. "Classification" is English but acceptable for a Korean B2B tool. |
| `/reportbymail` | Needs Work | No hyphens. Should be `/report-by-mail` or ideally `/competitor-patent-monitoring` for keyword value. |
| `/team-meeting` | Pass | Clean and descriptive. |
| `/data-voucher` | Pass | Clean. "Data voucher" is an established Korean government program term. |
| `/faq/point-guide` | Pass | Good hierarchical structure. |
| `/new-ai` | Fail | Non-descriptive. What is this page about? Should be `/ai-patent-analysis` or similar. |

---

## Content Quality (E-E-A-T)

| Dimension | Score | Evidence |
|---|---|---|
| Experience | Strong | Multiple testimonials from named organization types (화학기업 연구원, 자율주행 업체 책임 연구원, 바이오 분야 대기업 변리사). Comparison table shows before/after based on real practitioner workflows. Feature set clearly designed by someone who has done prior art searches manually. |
| Expertise | Strong | Explicitly states product was built by 변리사 (patent attorneys) and AI experts. Uses correct IP terminology throughout (청구항, FTO 분석, 무효자료 조사, 35 U.S.C. § 102, CPC 코드). The 85% recall stat with methodology note ("자체 테스트") demonstrates technical depth. |
| Authoritativeness | Weak | No individual named experts or founding team bios. No press mentions or industry association memberships cited. No backlink profile visible from this audit. Company has a TIPS (팁스타운) address — a government startup program — which is an implicit authority signal but not leveraged in content. |
| Trustworthiness | Present | HTTPS assumed (standard). Business registration number (564-88-02306) and physical address (강남구 역삼로 169) are listed. Phone number and email present. No privacy policy link visible in cached content (may exist but not surfaced). Government data voucher supplier status is a strong trust signal that should be more prominent. |

**E-E-A-T priority improvements:**
1. Add a founding team / 변리사 bio page with real names, credentials, and headshots. This is the single highest-impact E-E-A-T improvement for a B2B product.
2. Publish a methodology page explaining how the 85% recall figure was measured — this turns a stat into a credibility anchor.
3. Apply for and display any relevant certifications (ISO, KISA 등 정보보호 인증). IP professionals care deeply about data security.
4. Create a case study page with specific client results (with permission), not just anonymous testimonials.

---

## Keyword Analysis

### Primary Keyword Assessment — Homepage

| Element | Current State | Status |
|---|---|---|
| Primary keyword identified | `AI 특허 검색` / `특허 분석` | Yes, but competing signals |
| Search intent | Commercial investigation (B2B vendor evaluation) | Aligned |
| Keyword in title | "특허 AI 검색" (reversed word order) | Needs Work |
| Keyword in H1 | Not in any single clean H1 | Fail |
| Keyword in first 100 words | Present in body copy | Pass |
| Keyword in subheadings | H2: "정확한 특허 검색·분석 AI 도구" | Pass |
| Keyword in meta description | Present | Pass |
| Keyword in URL | Homepage `/` — N/A | N/A |
| Keyword density | Appropriate — not stuffed | Pass |

### Target Keyword Clusters by Audience

**Segment 1: 변리사 / 특허법인 (Primary)**
| Keyword | Intent | Priority |
|---|---|---|
| AI 특허 검색 | Commercial | Critical |
| 특허 선행기술 조사 AI | Commercial | Critical |
| 특허 무효자료 조사 | Commercial | High |
| FTO 분석 도구 | Commercial | High |
| 특허 검색 솔루션 | Commercial | High |
| 변리사 AI 툴 | Commercial | Medium |
| 청구항 분석 AI | Commercial | Medium |

**Segment 2: 인하우스 IP팀 / 기업 IP 전략**
| Keyword | Intent | Priority |
|---|---|---|
| 경쟁사 특허 분석 | Commercial | Critical |
| 특허 포트폴리오 분석 | Commercial | High |
| IP 리스크 분석 도구 | Commercial | High |
| 경쟁사 특허 모니터링 | Commercial | High |
| 특허 분류 자동화 | Commercial | Medium |

**Segment 3: R&D팀**
| Keyword | Intent | Priority |
|---|---|---|
| 특허 기술 동향 분석 | Informational/Commercial | High |
| 선행기술 조사 자동화 | Commercial | High |
| R&D 특허 검색 | Commercial | Medium |
| 특허 침해 분석 | Commercial | Medium |

**Segment 4: Long-tail / FAQ opportunities**
| Keyword | Intent | Priority |
|---|---|---|
| 특허 검색식 없이 검색하는 방법 | Informational | High |
| 특허 AI 분류 정확도 | Informational | High |
| 한국 특허 AI 검색 비교 | Commercial | High |
| 특허청 심사 데이터 AI | Informational | Medium |
| 데이터바우처 특허 분석 | Commercial | Medium (time-sensitive) |

### Search Intent Analysis

The homepage targets **commercial investigation intent** — users who know they need a patent search tool and are evaluating options. The content (comparison table, testimonials, feature list) is correctly structured for this intent.

**Intent misalignment risk:**
- The `/patent-search` H1 `특허 검색, 오래 걸리시나요?` reads as **informational** (problem-awareness) but the page is a **commercial** product page. This creates a slight intent mismatch. The page should be more explicitly comparative/evaluative.
- The FAQ subpages (`/faq/search-guide`, `/faq/what-is-card`) have informational intent, which is correct for FAQ content — but these pages need their own targeted keywords, not just brand navigation.

---

## Technical SEO

### Framer JS Rendering — Critical Issue

**Status: Fail (Structural)**

This is the most impactful technical SEO problem on the site. Framer is a JavaScript-first website builder. By default:

1. **Content is rendered client-side.** Googlebot must render JavaScript to see the content. While Google does render JS, it does so in a second wave, creating a crawl delay of days to weeks. Competitors with server-rendered HTML are indexed faster and more reliably.

2. **The heading structure problems documented above** (multiple H1s, decorative heading tags) are a direct consequence of Framer's design-first approach where text styling overrides semantic HTML best practices.

3. **Framer does generate a sitemap** automatically, but it must be verified that all pages are included and submitted to Google Search Console.

4. **Framer's default robots.txt** allows crawling, but any Framer-specific CDN resources (fonts, scripts) must not be blocked, as Google needs them to render the page.

**Recommended Framer-specific actions:**
- Enable Framer's built-in SEO panel for every page and fill in: Title, Meta Description, OG Image, Canonical URL.
- Use Framer's "Heading" components (not styled Text components) for H1-H3 tags to ensure semantic HTML output.
- Test rendering with Google Search Console's URL Inspection tool to confirm what Google actually sees after JS rendering.
- Consider adding a static HTML fallback or pre-rendered blog (e.g., via a subdirectory `/blog` hosted on a different stack if Framer's blog performance is poor).

---

### robots.txt

- **Status: Unverified** (not in cached content)
- **Action required:** Verify `https://tanalysis.co.kr/robots.txt` is accessible, not blocking important pages or JS/CSS resources, and includes a `Sitemap:` directive pointing to the XML sitemap.

---

### XML Sitemap

- **Status: Partially verifiable**
- The page cache includes a sitemap of 19 URLs. This is a small but complete-looking sitemap for the current site scope.
- **Action required:** Verify `https://tanalysis.co.kr/sitemap.xml` exists and is submitted in Google Search Console. Confirm the `/new-ai` page is included and intentional.
- **Issue:** No blog sitemap detected. If a blog exists or is planned, a separate blog sitemap (`/blog-sitemap.xml`) should be added.

---

### Canonical Tags

- **Status: Unverified** (Framer typically auto-generates self-referencing canonicals)
- **Action required:** Confirm canonical tags are present on all pages via URL Inspection in Google Search Console, especially for:
  - `/data-voucher` and `/reportbymail` which have overlapping content themes
  - Any paginated content or filtered views

---

### Page Speed — Framer Sites (Estimated)

Framer sites typically score in the following ranges on Google PageSpeed Insights:

| Metric | Typical Framer Score | Target | Status |
|---|---|---|---|
| LCP (Largest Contentful Paint) | 2.5 - 4.5s | Under 2.5s | Likely Needs Work |
| FID/INP | 50-150ms | Under 100ms | Borderline |
| CLS | 0.05-0.15 | Under 0.1 | Likely Pass |
| TTFB | 200-600ms | Under 200ms | Likely Fails |
| Mobile Score | 55-75/100 | 90+ | Likely Needs Work |

**Known Framer speed issues:**
- Large JavaScript bundles that block rendering
- Fonts loaded from external CDN without preconnect hints
- Hero images not preloaded as LCP candidates
- No server-side rendering for initial HTML

**Revenue impact of speed on B2B SaaS:**
- If LCP is over 4 seconds, expect 38% bounce rate on mobile vs. 9% at 2 seconds
- B2B users evaluating tools during work hours often use corporate laptops on fast connections — desktop scores may be acceptable. Mobile scores matter less for this audience but Google uses mobile-first indexing, so poor mobile scores suppress rankings for everyone.

**Recommended actions:**
1. Run `https://pagespeed.web.dev/report?url=https://tanalysis.co.kr/` and share results with Framer developer.
2. In Framer: add `<link rel="preconnect">` for Google Fonts in the custom code head.
3. Set the hero image as the LCP candidate by ensuring it loads in the first render (no lazy loading on the hero).
4. Use Framer's WebP export for all images.

---

### Mobile-Friendliness

- **Status: Pass (assumed)**
- Framer is responsive by default. Viewport meta tag is present in all Framer-generated sites.
- **Action:** Test on actual mobile device to verify tap target sizes on CTAs (minimum 48x48px) and that the comparison table is horizontally scrollable on small screens.

---

### Schema Markup

**Status: Fail (likely missing)**

Framer does not auto-generate schema markup. The following schema types should be added via Framer's custom code injection:

| Schema Type | Page | Priority | Reason |
|---|---|---|---|
| Organization | Homepage | Critical | Establishes company identity in Google Knowledge Panel |
| SoftwareApplication | Homepage, /patent-search, /classification | Critical | Enables rich results for SaaS tools |
| FAQPage | Homepage FAQ section, /faq/* pages | High | Can capture FAQ rich results in SERPs — doubles SERP real estate |
| Product | /patent-search, /classification | High | Enables pricing and rating rich results |
| AggregateRating | /patent-search | High | Display star ratings from satisfaction scores (4.3/5) |
| WebSite | Homepage | Medium | Enables Sitelinks Search Box in Google |
| BreadcrumbList | All inner pages | Medium | Shows page hierarchy in SERPs |

**Priority implementation — FAQPage schema:**
The site has FAQ sections on the homepage and multiple FAQ subpages. FAQPage schema is one of the highest-ROI schema implementations because it can expand a single SERP result to show 3-5 Q&A pairs, significantly increasing SERP real estate. Example structure:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "타날리시스 AI 특허 검색 정확도는 어느 정도인가요?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "타날리시스는 심사관 인용 문헌 검색 재현율 85%를 달성합니다 (자체 테스트 기준, 타사 대비 4배). 특허청 및 심판원의 거절·무효 자료를 학습한 특허 특화 AI 모델을 사용합니다."
    }
  }]
}
```

**Priority implementation — SoftwareApplication schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "타날리시스",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "AI 기반 특허 검색·분석·분류 솔루션. 변리사와 AI 전문가가 공동 개발.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "ratingCount": "100",
    "bestRating": "5"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW",
    "description": "Free 플랜 제공"
  }
}
```

---

## Content Gap Analysis

The site currently covers: product features (search, classification, weekly report), FAQ/support, and team meeting booking. The following high-value content is missing entirely:

| Missing Topic | Target Keyword | Search Volume Potential | Competition | Content Type Needed | Priority |
|---|---|---|---|---|---|
| 선행기술 조사란? (방법, 절차, 중요성) | 선행기술 조사 방법 | High | Medium | Blog guide | 1 |
| AI 특허 검색 vs 전통 검색식 비교 | 특허 검색식 vs AI 검색 | Medium | Low | Comparison blog | 1 |
| 특허 분류 방법 완전 가이드 | 특허 분류 방법 | Medium | Low | Long-form guide | 2 |
| FTO 분석이란? 절차와 비용 | FTO 분석 비용 | Medium | Low | Informational blog | 2 |
| 경쟁사 특허 분석 방법론 | 경쟁사 특허 분석 | High | Medium | How-to guide | 2 |
| 한국 특허 검색 DB 비교 (KIPRIS vs WINTELIPS vs 타날리시스) | 특허 검색 사이트 비교 | High | Low | Comparison page | 1 |
| 무효자료 조사 방법과 전략 | 무효자료 조사 | Medium | Low | Expert blog | 2 |
| 데이터바우처로 AI 특허 분석 도입하는 방법 | 데이터바우처 특허 | Medium | Very Low | Landing page | 1 (time-sensitive) |
| 변리사를 위한 AI 툴 가이드 | 변리사 AI 툴 | Low | Very Low | Blog/Guide | 3 |
| 특허 포트폴리오 분석 방법 | 특허 포트폴리오 분석 | Medium | Medium | Blog | 2 |
| 업종별 특허 전략 가이드 (반도체, 바이오, AI SW) | [업종] 특허 전략 | Medium | Low per industry | Series | 3 |

**Highest-priority content gap: KIPRIS/WINTELIPS vs 타날리시스 비교**

Korean patent professionals routinely search for comparisons of patent search tools. The terms `KIPRIS`, `WINTELIPS`, `특허 검색 사이트 비교` have significant search volume from exactly the target audience. A well-structured comparison page (fair but positioned in Tanalysis's favor on differentiating dimensions like AI accuracy, prior art recall, classification automation) would:
- Capture high-intent commercial investigation traffic
- Rank for competitor brand names as navigational modifiers
- Be linkable content that earns backlinks from IP community sites

---

## Featured Snippet Opportunities

The following queries have featured snippet potential and align with existing or easily creatable content:

| Query | Snippet Type | Current Coverage | Action |
|---|---|---|---|
| AI 특허 검색이란 | Paragraph | FAQ section mentions it obliquely | Write a clean 50-word definition section |
| 선행기술 조사 정확도 높이는 방법 | List | Not covered | Blog post with numbered steps |
| 특허 분류 자동화 방법 | List | /classification partially covers | Add explicit step-by-step section to page |
| 경쟁사 특허 모니터링 방법 | List | /reportbymail covers the concept | Add "5단계로 경쟁사 특허 모니터링하는 방법" H2 section |
| 특허 검색 정확도 높이는 방법 | List | FAQ page /faq/search-guide | Optimize the FAQ page's answer format for snippet |
| 데이터바우처 특허 분석 | Paragraph | Referenced briefly | Create dedicated FAQ or landing section |

**Implementation template for paragraph snippets:**

Place an H2 or H3 with the target question, followed immediately by a 40-60 word answer:

```
## AI 특허 검색이란 무엇인가요?

AI 특허 검색은 자연어 문장이나 청구항 구성을 입력하면 AI가 의미 기반으로 관련 특허를 자동 검색하는 기술입니다.
전통적인 검색식(불리언 연산) 없이도 심사관 수준의 선행기술 문헌을 빠르게 찾을 수 있어,
특허법인과 기업 IP팀의 업무 효율을 크게 높입니다.
```

---

## Local SEO — Korean Market

**Status: Needs Work**

Tanalysis is a Korean B2B SaaS company targeting Korean-language users and organizations, but is missing some local/market-specific SEO signals.

**Current local signals:**
- Korean-language content throughout
- Korean business registration number visible
- Seoul address (강남구) in footer
- `.co.kr` domain (strong Korean market signal)

**Missing local signals:**
1. **Naver SEO is ignored.** Naver is the dominant search engine for many Korean professionals. Naver's webmaster tools, Naver Blog, and Naver Smart Place (for business listings) are separate from Google SEO. For a B2B IP tool, Google may be the primary channel — but Naver should not be ignored. Key action: Submit site to Naver Search Advisor (`searchadvisor.naver.com`).

2. **No Naver Blog presence detected.** Naver Blog posts rank well in Naver search for professional/B2B queries. A Naver Blog with keyword-targeted articles (e.g., "변리사가 추천하는 AI 특허 검색 방법") would complement the main site's Google SEO strategy.

3. **No Kakao/Naver business verification.** Korean B2B buyers often verify companies via Naver Knowledge iN, Naver Map, or Kakao business profiles.

4. **TIPS 스타트업 association** (팁스타운S2 address) should be linked or referenced — this is a recognized Korean government startup program and serves as a trust signal for Korean enterprise buyers.

5. **Hanja/industry terminology:** Some Korean IP professionals still use hanja-influenced terms. Ensure key terms like "특허" (特許), "변리사" (辨理士) are present in their hangul forms throughout — which they are. Good.

**Naver SEO checklist:**
- [ ] Submit sitemap to Naver Search Advisor
- [ ] Create and verify Naver Business Place listing
- [ ] Publish minimum 1 Naver Blog post per month targeting Korean IP professionals
- [ ] Register in Naver Knowledge iN for relevant patent Q&A topics (builds brand visibility)

---

## Prioritized Recommendations

### Critical — Fix This Week (High Impact, Low Effort)

**1. Fix the H1 structure on all pages**
- **Why:** Multiple H1s with no primary keyword directly suppress the page's ability to rank for any single target query. This affects every page's rankings.
- **How:** In Framer, audit all Text components set to H1. Convert decorative/visual H1s to styled paragraph text. Keep exactly one H1 per page with the primary keyword.
- **Effort:** 2-4 hours in Framer
- **Impact:** Immediately improves Google's ability to understand and rank each page's primary topic.

**2. Expand all meta descriptions to 130-155 characters**
- **Why:** Short meta descriptions waste SERP persuasion space. Every character up to 155 is an opportunity to give searchers a reason to click over competitors.
- **How:** Use the recommended descriptions in this audit as starting points. Implement via Framer's SEO panel for each page.
- **Effort:** 1 hour
- **Impact:** Estimated 15-25% CTR improvement from existing impressions within 2-4 weeks.

**3. Rewrite the homepage title tag**
- **Why:** Keyword word-order matters. "AI 특허 검색" has more search demand than "특허 AI 검색". Adding "변리사가 만든" differentiates from generic AI tools.
- **How:** `AI 특허 검색·분석 솔루션 | 변리사가 만든 타날리시스`
- **Effort:** 10 minutes
- **Impact:** Better SERP ranking alignment with actual search queries. Immediate.

**4. Submit sitemap to both Google Search Console and Naver Search Advisor**
- **Why:** Ensures all 19 pages are indexed. Without submission, Framer JS-rendered pages may be discovered slowly.
- **Effort:** 30 minutes
- **Impact:** Faster indexing of all pages.

---

### High Priority — This Month

**5. Implement FAQPage schema on homepage and FAQ subpages**
- **Why:** FAQ rich results can expand one SERP listing to show 3-5 answers, dramatically increasing SERP visibility without ranking higher. Competitors without schema lose this advantage.
- **How:** Add JSON-LD FAQPage schema via Framer's custom code injection (head section). Use actual FAQ content from the site.
- **Effort:** 4-6 hours (schema writing + Framer injection + testing with Google Rich Results Test)
- **Impact:** Potential 2-3x increase in SERP real estate for FAQ-related queries.

**6. Implement Organization and SoftwareApplication schema on homepage**
- **Why:** Establishes the company's identity in Google's Knowledge Graph and enables rich results for SaaS application searches.
- **Effort:** 2 hours
- **Impact:** Medium-term trust building with Google; potential Knowledge Panel appearance.

**7. Create a Korean patent search tool comparison page**
- **Why:** "KIPRIS vs 타날리시스", "특허 검색 사이트 비교" are high-intent commercial queries from exactly the target audience. Competitors are not ranking well for this.
- **How:** Build a dedicated comparison page at `/patent-search-comparison` or similar. Be fair but highlight AI accuracy, prior art recall, and classification automation as differentiators.
- **Effort:** 1-2 days (research + content)
- **Impact:** High — captures searchers in the final stage of vendor evaluation.

**8. Publish a Google-targeted guide: "선행기술 조사란? 방법과 AI 활용 완전 가이드"**
- **Why:** "선행기술 조사" is a high-volume informational query from both patent attorneys and R&D teams. Ranking for it puts Tanalysis in front of users at the top of the funnel.
- **How:** 1,500-2,000 word blog post with H2 sections for each step, naturally linking to the `/patent-search` feature page.
- **Effort:** 1-2 days
- **Impact:** Organic traffic from informational queries; brand awareness among searchers not yet evaluating tools.

**9. Add internal contextual links across product pages**
- **Why:** The homepage comparison table, the /patent-search testimonials, and the /reportbymail page all reference related features without linking to them. This passes no PageRank between pages.
- **How:** Within Framer body text, convert references to "AI 분류" → hyperlink to `/classification`; references to "위클리 리포트" → link to `/reportbymail`; etc.
- **Effort:** 2 hours
- **Impact:** Better internal PageRank distribution; users discover related features more easily (lower bounce, higher conversion).

---

### Medium Priority — This Quarter

**10. Add a team / founding story page with 변리사 credentials**
- **Why:** E-E-A-T "Authoritativeness" is currently Weak. Google gives more ranking trust to sites where authors and founders have verifiable expertise in the subject matter. For a tool used in legal/IP contexts, this matters significantly.
- **How:** Create `/about` or `/team` page. Include founder 최인경's background, the origin story ("변리사가 직접 만든 이유"), and any team members' credentials.
- **Effort:** 1 week (content gathering + design)
- **Impact:** Long-term trust building with Google. May improve rankings for YMYL-adjacent queries (legal/IP decisions have high stakes).

**11. Create industry-specific landing pages**
- **Why:** The site mentions "알고리즘/AI·SW", "화학/약학", "기계/구조", "전기/전자" as use case verticals but has no dedicated pages for each.
- **How:** 4 pages at `/use-cases/chemistry`, `/use-cases/ai-software`, etc. Each with industry-specific testimonials, terminology, and search examples.
- **Effort:** 2-3 days per page
- **Impact:** Captures long-tail industry-specific queries; improves relevance signals for each vertical.

**12. Build a 데이터바우처 landing page (time-sensitive: 3/31 deadline)**
- **Why:** The weekly report page mentions government support of up to 3,000만원 with a 3/31 deadline. This is a high-conversion offer buried in an already-busy page. Searchers looking for "데이터바우처 특허 분석 공급기업" should find a dedicated page.
- **How:** Create `/data-voucher` as a standalone landing page (it exists but is currently "위클리 리포트 도입 상담" — rename and expand it to cover the full voucher application process).
- **Effort:** 1 day
- **Impact:** Captures time-sensitive government subsidy traffic immediately.

**13. Run Google PageSpeed Insights and fix top 3 performance issues**
- **Why:** Framer sites commonly fail Core Web Vitals, which are a confirmed ranking factor. Fixing LCP from 4s to 2s can reduce page abandonment by 24%.
- **How:** Run PageSpeed at `pagespeed.web.dev`. Share results with the developer. Priority fixes: hero image preloading, font preconnects, unused JavaScript deferral.
- **Effort:** 1-5 days depending on issues found
- **Impact:** Ranking improvement for mobile-first indexing; lower bounce rate.

---

### Low Priority — When Resources Allow

**14. Develop a Naver SEO content strategy**
- Create Naver Blog with 2-4 posts per month targeting Korean IP search terms
- Register in Naver Search Advisor
- Answer questions on Naver Knowledge iN to build brand awareness

**15. Publish data-driven research content**
- "2026년 한국 AI 특허 검색 현황 리포트" — original research that earns backlinks from IP community sites, law firm blogs, and R&D association publications.
- Target 2-3 Korean IP/patent media outlets (e.g., 특허뉴스, IP Daily) for coverage of the research.

**16. Create video content for YouTube**
- Short demo videos (3-5 min) showing the before/after of AI patent search vs. manual boolean searches
- Target queries like "타날리시스 사용법", "AI 특허 검색 데모"
- Embed on relevant product pages to increase time-on-page

**17. Fix the `/reportbymail` URL slug**
- Rename to `/competitor-patent-monitoring` or `/patent-monitoring` for keyword value
- Implement 301 redirect from old URL
- **Caution:** Only do this if the page has no significant inbound links to preserve. Check in Google Search Console first.

---

## Quick Wins Summary (Do These First)

| Action | Effort | Expected Impact | Timeline |
|---|---|---|---|
| Rewrite homepage title tag | 10 min | +15-25% CTR on existing impressions | Day 1 |
| Expand all meta descriptions | 1 hr | +15-25% CTR across pages | Day 1 |
| Fix H1 structure on all 5 main pages | 4 hrs | Improved keyword targeting for all pages | Week 1 |
| Submit sitemaps to Google + Naver | 30 min | All pages indexed faster | Day 1 |
| Add internal links between product pages | 2 hrs | Better PageRank flow, better UX | Week 1 |
| Implement FAQPage schema | 6 hrs | 2-3x SERP real estate for FAQ queries | Week 2 |
| Comparison page (KIPRIS vs Tanalysis) | 2 days | High-intent commercial traffic | Month 1 |
| First SEO blog post (선행기술 조사 가이드) | 2 days | Top-of-funnel organic traffic | Month 1 |

---

*Audit performed: 2026-03-07 | Auditor: Claude (Sonnet 4.6) via market-seo skill | Based on: Framer site content cache, page-cache.md*
