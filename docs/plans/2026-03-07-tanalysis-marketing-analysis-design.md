# Design: Full Marketing Analysis — tanalysis.co.kr
**Date:** 2026-03-07
**Target URL:** https://tanalysis.co.kr/
**Model:** claude-opus-4-6

## Goal
Run all installed marketing skills against the tanalysis.co.kr landing page and synthesize results into a single executive marketing report.

## Architecture

### Phase 1 — Parallel Skill Execution (all simultaneous)
| Agent | Skill | Output File |
|-------|-------|-------------|
| 1 | market-landing | LANDING-CRO.md |
| 2 | market-copy | COPY-SUGGESTIONS.md |
| 3 | market-seo | SEO-AUDIT.md |
| 4 | market-brand | BRAND-VOICE.md |
| 5 | market-funnel | FUNNEL-ANALYSIS.md |
| 6 | market-competitors | COMPETITOR-REPORT.md |
| 7 | market-social | SOCIAL-CALENDAR.md |
| 8 | market-ads | AD-CAMPAIGNS.md |
| 9 | market-emails | EMAIL-SEQUENCES.md |
| 10 | market-audit | MARKETING-AUDIT.md (spawns its own 5 internal agents) |

### Phase 2 — Synthesis
- Invoke market-report skill to compile all Phase 1 outputs into MARKETING-REPORT.md
- Single polished executive report with scores, priorities, and actionable recommendations

## Output
Single file: `MARKETING-REPORT.md` in `C:\Users\joons\work\marketing\`

## Constraints
- All agents use claude-opus-4-6 model
- All output saved to C:\Users\joons\work\marketing\
