# tanalysis.co.kr Full Marketing Analysis Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Run all 10 market skills in parallel against https://tanalysis.co.kr/ and synthesize into one executive MARKETING-REPORT.md.

**Architecture:** Phase 1 dispatches all market sub-skills as simultaneous parallel agents. Each agent fetches the URL independently, runs its analysis, and saves its output file. Phase 2 invokes market-report to compile all outputs into a single polished report.

**Tech Stack:** Claude claude-opus-4-6, market skill suite (market-landing, market-copy, market-seo, market-brand, market-funnel, market-competitors, market-social, market-ads, market-emails, market-audit), WebFetch, Agent tool.

---

### Task 1: Fetch and cache page content for reference

**Files:**
- Create: `C:\Users\joons\work\marketing\page-cache.md` (raw page content for agent reference)

**Step 1: Fetch the landing page**

Use WebFetch on https://tanalysis.co.kr/ and save raw content to `page-cache.md`.

**Step 2: Verify content was retrieved**

Confirm page-cache.md is non-empty and contains readable HTML/text content.

---

### Task 2: Launch all market sub-skills in parallel (Phase 1)

**Files:**
- Create: `LANDING-CRO.md`
- Create: `COPY-SUGGESTIONS.md`
- Create: `SEO-AUDIT.md`
- Create: `BRAND-VOICE.md`
- Create: `FUNNEL-ANALYSIS.md`
- Create: `COMPETITOR-REPORT.md`
- Create: `SOCIAL-CALENDAR.md`
- Create: `AD-CAMPAIGNS.md`
- Create: `EMAIL-SEQUENCES.md`
- Create: `MARKETING-AUDIT.md`

**Step 1: Dispatch 10 parallel agents using superpowers:dispatching-parallel-agents**

Each agent receives:
- URL: https://tanalysis.co.kr/
- Model: claude-opus-4-6
- Skill to invoke
- Output file path

Agents to dispatch simultaneously:

| Agent | Skill | Output |
|-------|-------|--------|
| A1 | market-landing | LANDING-CRO.md |
| A2 | market-copy | COPY-SUGGESTIONS.md |
| A3 | market-seo | SEO-AUDIT.md |
| A4 | market-brand | BRAND-VOICE.md |
| A5 | market-funnel | FUNNEL-ANALYSIS.md |
| A6 | market-competitors | COMPETITOR-REPORT.md |
| A7 | market-social | SOCIAL-CALENDAR.md |
| A8 | market-ads | AD-CAMPAIGNS.md |
| A9 | market-emails | EMAIL-SEQUENCES.md |
| A10 | market-audit | MARKETING-AUDIT.md |

**Step 2: Wait for all agents to complete**

Confirm all 10 output files exist and are non-empty.

---

### Task 3: Synthesize into executive report (Phase 2)

**Files:**
- Create: `MARKETING-REPORT.md`

**Step 1: Invoke market-report skill**

Pass all 10 output files as source material. Model: claude-opus-4-6.
URL: https://tanalysis.co.kr/

**Step 2: Verify MARKETING-REPORT.md**

Confirm file contains:
- Executive summary with composite score
- Prioritized recommendations (High/Medium/Low)
- Before/after copy examples
- Score breakdown by category
- Top 10 actionable next steps

**Step 3: Report to user**

Print the file path and top-line findings to the terminal.

---

## Execution Options

**Plan complete and saved to `docs/plans/2026-03-07-tanalysis-marketing-analysis.md`. Two execution options:**

**1. Subagent-Driven (this session)** — dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — open new session with executing-plans, batch execution with checkpoints

**Which approach?**
