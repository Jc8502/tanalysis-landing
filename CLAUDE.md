# Tanalysis Marketing Project

## Target
- **Company:** 타날리시스 (Tanalysis)
- **URL:** https://tanalysis.co.kr/
- **Product:** B2B SaaS — AI-Powered Patent Intelligence Platform
- **Audience:** Korean patent attorneys (변리사), in-house IP teams, R&D teams

## Project Structure

```
marketing/
├── reports/                # Marketing analysis reports (11 files)
│   ├── MARKETING-REPORT.md # Master consolidated report
│   ├── MARKETING-AUDIT.md  # Full site audit (score: 61/100)
│   ├── BRAND-VOICE.md      # Brand voice guidelines
│   ├── COMPETITOR-REPORT.md
│   ├── COPY-SUGGESTIONS.md
│   ├── EMAIL-SEQUENCES.md
│   ├── FUNNEL-ANALYSIS.md
│   ├── LANDING-CRO.md      # Landing page CRO analysis
│   ├── SEO-AUDIT.md
│   ├── SOCIAL-CALENDAR.md
│   └── AD-CAMPAIGNS.md
├── landing-page/           # Redesigned landing page
│   ├── index.html          # Self-contained HTML+CSS (no build step)
│   ├── LANDING-PAGE-CHANGES.md  # Detailed changelog
│   └── screenshots/
├── design/                 # Extracted design system
│   ├── DESIGN-SYSTEM.json  # 92KB, 65+ CSS tokens extracted via Playwright
│   └── screenshots/        # Original site screenshots (desktop/mobile)
├── reference/              # Source data
│   └── page-cache.md       # Full text extraction from tanalysis.co.kr
├── scripts/                # Playwright extraction scripts
│   ├── extract_design.py
│   ├── extract_design_deep.py
│   ├── playwright-cro.mjs
│   └── playwright-seo.mjs
├── docs/plans/             # Planning documents
├── dashboard/              # React+Vite marketing dashboard app
└── .claude/                # Skills & agents for marketing suite
```

## Key Facts

- **Design system** was extracted from live site using Playwright (Python), capturing all computed styles: 24 text colors, 16 bg colors, 17 gradients, 3 font families, 20 spacing values, 14 border radii, 3 shadow types, 6 transitions, 3 animations
- **Primary font:** Pretendard Variable (weight 1000 on most elements) + Noto Sans KR
- **Brand color:** `#6541f2` (rgb 101,65,242) — vivid purple
- **Landing page** is a single self-contained HTML file — no build, no dependencies
- **Landing page** implements 10 changes from the marketing audit: new headline, urgency banner, stat strip, comparison table repositioned, weekly report CTA, search demo, pricing section, CTA hierarchy, trust bar, design fidelity
- Reports were generated using `/market` skill suite (10 parallel agents + synthesis)

## Tools & Dependencies

- **Playwright (Python):** `pip install playwright && python -m playwright install chromium` — for design extraction and screenshots
- **Dashboard:** React + Vite + Tailwind in `dashboard/` — `cd dashboard && npm install && npm run dev`

## Conventions

- Marketing reports use uppercase filenames: `REPORT-NAME.md`
- Plans use dated filenames: `docs/plans/YYYY-MM-DD-topic.md`
- All Korean content preserves original text from tanalysis.co.kr
- Design tokens in landing page CSS use `--` custom properties with comments showing extracted rgb values, hex, source element, and usage count
