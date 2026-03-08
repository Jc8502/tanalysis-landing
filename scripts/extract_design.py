"""
Extract complete design system from tanalysis.co.kr using Playwright.
Captures: colors, typography, spacing, layout, components, shadows, borders.
"""
import json
import asyncio
from playwright.async_api import async_playwright

async def extract_design():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        print("Loading https://tanalysis.co.kr/ ...")
        await page.goto("https://tanalysis.co.kr/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)  # Let Framer render

        design = await page.evaluate("""
        () => {
            const result = {
                colors: {},
                typography: {},
                spacing: {},
                components: {},
                layout: {},
                animations: {},
                raw_computed: []
            };

            // Helper: get computed style
            const cs = (el) => window.getComputedStyle(el);

            // ---- COLLECT ALL UNIQUE COLORS ----
            const colorSet = new Set();
            const bgSet = new Set();
            const borderSet = new Set();

            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                const color = s.color;
                const bg = s.backgroundColor;
                const border = s.borderColor;
                if (color && color !== 'rgba(0, 0, 0, 0)') colorSet.add(color);
                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(0, 0, 0)') bgSet.add(bg);
                if (border && border !== 'rgba(0, 0, 0, 0)') borderSet.add(border);
            });
            result.colors.text = [...colorSet];
            result.colors.backgrounds = [...bgSet];
            result.colors.borders = [...borderSet];

            // ---- TYPOGRAPHY ----
            const fontFamilies = new Set();
            const fontSizes = new Set();
            const fontWeights = new Set();
            const lineHeights = new Set();
            const letterSpacings = new Set();

            document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,li,label').forEach(el => {
                const s = cs(el);
                fontFamilies.add(s.fontFamily);
                fontSizes.add(s.fontSize);
                fontWeights.add(s.fontWeight);
                lineHeights.add(s.lineHeight);
                letterSpacings.add(s.letterSpacing);
            });
            result.typography.fontFamilies = [...fontFamilies];
            result.typography.fontSizes = [...fontSizes].sort((a,b) => parseFloat(a)-parseFloat(b));
            result.typography.fontWeights = [...fontWeights].sort();
            result.typography.lineHeights = [...lineHeights];
            result.typography.letterSpacings = [...letterSpacings];

            // ---- SPECIFIC ELEMENT STYLES ----
            const elements = {
                h1: document.querySelector('h1'),
                h2: document.querySelector('h2'),
                h3: document.querySelector('h3'),
                p: document.querySelector('p'),
                nav: document.querySelector('nav') || document.querySelector('[class*="nav"]'),
                primaryBtn: document.querySelector('a[href*="signup"], a[href*="start"], button') || document.querySelector('a'),
            };

            result.typography.elements = {};
            for (const [name, el] of Object.entries(elements)) {
                if (!el) continue;
                const s = cs(el);
                result.typography.elements[name] = {
                    fontFamily: s.fontFamily,
                    fontSize: s.fontSize,
                    fontWeight: s.fontWeight,
                    lineHeight: s.lineHeight,
                    letterSpacing: s.letterSpacing,
                    color: s.color,
                    textTransform: s.textTransform,
                };
            }

            // ---- BUTTONS / CTAs ----
            const buttons = [];
            document.querySelectorAll('a, button').forEach(el => {
                const s = cs(el);
                const bg = s.backgroundColor;
                const text = el.textContent.trim().substring(0, 50);
                if (!text) return;
                buttons.push({
                    tag: el.tagName.toLowerCase(),
                    text,
                    href: el.href || '',
                    backgroundColor: bg,
                    color: s.color,
                    borderRadius: s.borderRadius,
                    padding: s.padding,
                    paddingTop: s.paddingTop,
                    paddingRight: s.paddingRight,
                    paddingBottom: s.paddingBottom,
                    paddingLeft: s.paddingLeft,
                    fontSize: s.fontSize,
                    fontWeight: s.fontWeight,
                    border: s.border,
                    boxShadow: s.boxShadow,
                    display: s.display,
                });
            });
            result.components.buttons = buttons.slice(0, 30);

            // ---- LAYOUT / SPACING ----
            const sections = [];
            document.querySelectorAll('section, div[class*="section"], main > div, [class*="hero"], [class*="container"]').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                if (rect.height < 10) return;
                sections.push({
                    tag: el.tagName,
                    classes: el.className.substring(0, 100),
                    backgroundColor: s.backgroundColor,
                    padding: s.padding,
                    paddingTop: s.paddingTop,
                    paddingBottom: s.paddingBottom,
                    maxWidth: s.maxWidth,
                    width: s.width,
                    display: s.display,
                    flexDirection: s.flexDirection,
                    gap: s.gap,
                    height: rect.height,
                });
            });
            result.layout.sections = sections.slice(0, 20);

            // ---- GRADIENTS ----
            const gradients = new Set();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                const bg = s.backgroundImage;
                if (bg && bg !== 'none' && bg.includes('gradient')) {
                    gradients.add(bg.substring(0, 200));
                }
            });
            result.colors.gradients = [...gradients];

            // ---- BOX SHADOWS ----
            const shadows = new Set();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                if (s.boxShadow && s.boxShadow !== 'none') {
                    shadows.add(s.boxShadow);
                }
            });
            result.components.shadows = [...shadows];

            // ---- BORDER RADII ----
            const radii = new Set();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                if (s.borderRadius && s.borderRadius !== '0px') {
                    radii.add(s.borderRadius);
                }
            });
            result.components.borderRadii = [...radii];

            // ---- NAVIGATION ----
            const navEl = document.querySelector('nav') || document.querySelector('header');
            if (navEl) {
                const s = cs(navEl);
                result.layout.nav = {
                    backgroundColor: s.backgroundColor,
                    height: navEl.getBoundingClientRect().height,
                    position: s.position,
                    boxShadow: s.boxShadow,
                    backdropFilter: s.backdropFilter,
                    padding: s.padding,
                    borderBottom: s.borderBottom,
                };
            }

            // ---- PAGE BACKGROUND ----
            const body = document.body;
            const bs = cs(body);
            result.layout.body = {
                backgroundColor: bs.backgroundColor,
                backgroundImage: bs.backgroundImage,
                fontFamily: bs.fontFamily,
                fontSize: bs.fontSize,
                color: bs.color,
            };

            // ---- CSS CUSTOM PROPERTIES (design tokens) ----
            const styleSheets = [...document.styleSheets];
            const cssVars = {};
            try {
                styleSheets.forEach(sheet => {
                    try {
                        [...sheet.cssRules].forEach(rule => {
                            if (rule.selectorText === ':root' || rule.selectorText === 'html') {
                                const text = rule.cssText;
                                const matches = text.match(/--[^:]+:[^;]+/g);
                                if (matches) {
                                    matches.forEach(m => {
                                        const [k, v] = m.split(':');
                                        cssVars[k.trim()] = v.trim();
                                    });
                                }
                            }
                        });
                    } catch(e) {}
                });
            } catch(e) {}
            result.tokens = cssVars;

            // ---- CARD COMPONENTS ----
            const cards = [];
            document.querySelectorAll('[class*="card"], [class*="feature"], [class*="box"]').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                if (rect.height < 20 || rect.width < 20) return;
                cards.push({
                    classes: el.className.substring(0, 100),
                    backgroundColor: s.backgroundColor,
                    borderRadius: s.borderRadius,
                    boxShadow: s.boxShadow,
                    padding: s.padding,
                    border: s.border,
                    width: rect.width,
                    height: rect.height,
                });
            });
            result.components.cards = cards.slice(0, 15);

            return result;
        }
        """)

        # Also take a screenshot
        await page.screenshot(path="C:/Users/joons/work/marketing/tanalysis_screenshot.png", full_page=True)
        print("Screenshot saved.")

        # Save to file
        with open("C:/Users/joons/work/marketing/design_extract.json", "w", encoding="utf-8") as f:
            json.dump(design, f, ensure_ascii=False, indent=2)
        print("Design data saved to design_extract.json")

        await browser.close()
        return design

asyncio.run(extract_design())
