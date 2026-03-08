"""
Capture section-by-section screenshots from both the original tanalysis.co.kr
and the new landing page for the CRO comparison dashboard.
"""
import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

BASE = Path(r"C:\Users\joons\work\marketing\landing-page\dashboard\screenshots")
ORIGINAL_DIR = BASE / "original"
NEW_DIR = BASE / "new"
LANDING_PAGE = Path(r"C:\Users\joons\work\marketing\landing-page\index.html")

# Sections to capture from the NEW landing page (CSS selectors + labels)
NEW_SECTIONS = [
    ("header .urgency-bar", "01-urgency-banner"),
    ("nav", "02-nav"),
    (".hero", "03-hero"),
    (".comparison", "04-comparison-table"),
    (".features", "05-features"),
    (".stats-section", "06-stats"),
    (".weekly", "07-weekly-report"),
    (".testimonials", "08-testimonials"),
    (".pricing", "09-pricing"),
    (".faq", "10-faq"),
    (".final-cta", "11-final-cta"),
    ("footer", "12-footer"),
]

# Sections to capture from the ORIGINAL site (best-effort selectors)
# Framer sites use dynamic class names, so we use broader strategies
ORIGINAL_URL = "https://tanalysis.co.kr/"


async def scroll_page(page):
    """Scroll to bottom to trigger all lazy loads."""
    prev_height = 0
    for _ in range(20):
        curr_height = await page.evaluate("document.body.scrollHeight")
        if curr_height == prev_height:
            break
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(0.5)
        prev_height = curr_height
    await page.evaluate("window.scrollTo(0, 0)")
    await asyncio.sleep(0.5)


async def capture_original(browser):
    """Capture viewport-sized chunks from the original site."""
    print("\n=== Capturing ORIGINAL site sections ===")
    page = await browser.new_page(viewport={"width": 1440, "height": 900})

    try:
        await page.goto(ORIGINAL_URL, wait_until="networkidle", timeout=30000)
    except Exception as e:
        print(f"Navigation warning (continuing): {e}")

    await scroll_page(page)
    await asyncio.sleep(1)

    # Capture full page
    await page.screenshot(path=str(ORIGINAL_DIR / "00-full-page.png"), full_page=True)
    print("  Captured: 00-full-page.png")

    # Capture sections by scrolling through the page in viewport-height chunks
    total_height = await page.evaluate("document.body.scrollHeight")
    viewport_h = 900
    chunk = 0
    y = 0
    while y < total_height:
        chunk += 1
        await page.evaluate(f"window.scrollTo(0, {y})")
        await asyncio.sleep(0.3)
        fname = f"section-{chunk:02d}.png"
        await page.screenshot(path=str(ORIGINAL_DIR / fname))
        print(f"  Captured: {fname} (y={y})")
        y += viewport_h

    # Also try to capture specific identifiable sections via text content
    identifiable = [
        ("nav", "02-nav"),
    ]

    # Try to find the nav element
    try:
        nav = await page.query_selector("nav")
        if nav:
            await nav.screenshot(path=str(ORIGINAL_DIR / "02-nav.png"))
            print("  Captured: 02-nav.png (element)")
    except Exception:
        pass

    # Capture hero area (first viewport)
    await page.evaluate("window.scrollTo(0, 0)")
    await asyncio.sleep(0.3)
    await page.screenshot(path=str(ORIGINAL_DIR / "03-hero.png"))
    print("  Captured: 03-hero.png (viewport)")

    await page.close()
    print(f"  Total original chunks: {chunk}")


async def capture_new(browser):
    """Capture each section from the new landing page."""
    print("\n=== Capturing NEW landing page sections ===")
    page = await browser.new_page(viewport={"width": 1440, "height": 900})
    file_url = LANDING_PAGE.as_uri()
    await page.goto(file_url, wait_until="load")
    await asyncio.sleep(1)

    # Full page screenshot
    await page.screenshot(path=str(NEW_DIR / "00-full-page.png"), full_page=True)
    print("  Captured: 00-full-page.png")

    for selector, name in NEW_SECTIONS:
        try:
            el = await page.query_selector(selector)
            if el:
                await el.screenshot(path=str(NEW_DIR / f"{name}.png"))
                print(f"  Captured: {name}.png")
            else:
                print(f"  SKIP (not found): {selector}")
        except Exception as e:
            print(f"  ERROR ({name}): {e}")

    # Also capture viewport chunks for comparison
    total_height = await page.evaluate("document.body.scrollHeight")
    viewport_h = 900
    chunk = 0
    y = 0
    while y < total_height:
        chunk += 1
        await page.evaluate(f"window.scrollTo(0, {y})")
        await asyncio.sleep(0.2)
        fname = f"section-{chunk:02d}.png"
        await page.screenshot(path=str(NEW_DIR / fname))
        print(f"  Captured: {fname} (y={y})")
        y += viewport_h

    await page.close()
    print(f"  Total new chunks: {chunk}")


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        await asyncio.gather(
            capture_original(browser),
            capture_new(browser),
        )
        await browser.close()
    print("\nDone! Screenshots saved to:", BASE)


if __name__ == "__main__":
    asyncio.run(main())
