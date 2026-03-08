"""
Deep design extraction from tanalysis.co.kr using Playwright.
Captures every measurable design element across all visible sections.
"""
import json
import asyncio
from playwright.async_api import async_playwright

async def extract_deep():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        print("Loading tanalysis.co.kr ...")
        await page.goto("https://tanalysis.co.kr/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(4000)

        # Scroll to bottom to trigger lazy-loaded elements
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)

        design = await page.evaluate("""
        () => {
            const cs = (el) => window.getComputedStyle(el);
            const rgbToHex = (rgb) => {
                if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;
                const match = rgb.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                if (!match) return rgb;
                return '#' + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
            };

            const result = {};

            // ============================================================
            // 1. COLOR PALETTE — every unique color, categorized
            // ============================================================
            const textColors = new Map();
            const bgColors = new Map();
            const borderColors = new Map();
            const gradients = new Set();

            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0) return;

                // Text color
                const tc = s.color;
                if (tc && tc !== 'rgba(0, 0, 0, 0)') {
                    const hex = rgbToHex(tc);
                    if (hex && !textColors.has(hex)) textColors.set(hex, { rgb: tc, hex, usedBy: el.tagName });
                }
                // Background
                const bg = s.backgroundColor;
                if (bg && bg !== 'rgba(0, 0, 0, 0)') {
                    const hex = rgbToHex(bg);
                    if (hex) {
                        if (!bgColors.has(bg)) bgColors.set(bg, { rgb: bg, hex, usedBy: el.tagName });
                    }
                }
                // Background image (gradients)
                const bgImg = s.backgroundImage;
                if (bgImg && bgImg !== 'none') gradients.add(bgImg.substring(0, 300));

                // Border
                const bc = s.borderTopColor;
                if (bc && bc !== 'rgba(0, 0, 0, 0)' && s.borderTopWidth !== '0px') {
                    const hex = rgbToHex(bc);
                    if (hex && !borderColors.has(hex)) borderColors.set(hex, { rgb: bc, hex });
                }
            });

            result.colors = {
                text: [...textColors.values()],
                backgrounds: [...bgColors.values()],
                borders: [...borderColors.values()],
                gradients: [...gradients]
            };

            // ============================================================
            // 2. TYPOGRAPHY — full heading + body type scale
            // ============================================================
            const typeScale = {};
            const allFonts = new Set();
            ['h1','h2','h3','h4','h5','h6','p','span','a','button','li','label','strong','em','small'].forEach(tag => {
                const els = document.querySelectorAll(tag);
                if (els.length === 0) return;
                const samples = [];
                els.forEach((el, i) => {
                    if (i > 10) return; // limit per tag
                    const s = cs(el);
                    const text = el.textContent.trim().substring(0, 60);
                    if (!text) return;
                    allFonts.add(s.fontFamily);
                    samples.push({
                        text,
                        fontFamily: s.fontFamily,
                        fontSize: s.fontSize,
                        fontWeight: s.fontWeight,
                        lineHeight: s.lineHeight,
                        letterSpacing: s.letterSpacing,
                        color: s.color,
                        colorHex: rgbToHex(s.color),
                        textTransform: s.textTransform,
                        textDecoration: s.textDecorationLine,
                        fontStyle: s.fontStyle,
                        wordSpacing: s.wordSpacing,
                        textAlign: s.textAlign,
                    });
                });
                if (samples.length > 0) typeScale[tag] = samples;
            });

            result.typography = {
                fontFamiliesUsed: [...allFonts],
                typeScale
            };

            // ============================================================
            // 3. SPACING SYSTEM — measure gaps, paddings, margins
            // ============================================================
            const spacingValues = { paddings: new Set(), margins: new Set(), gaps: new Set() };
            document.querySelectorAll('section, div, main, header, footer, nav, article, aside').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                if (rect.height < 5) return;
                ['paddingTop','paddingRight','paddingBottom','paddingLeft'].forEach(p => {
                    const v = s[p];
                    if (v && v !== '0px') spacingValues.paddings.add(v);
                });
                ['marginTop','marginRight','marginBottom','marginLeft'].forEach(m => {
                    const v = s[m];
                    if (v && v !== '0px' && v !== 'auto') spacingValues.margins.add(v);
                });
                if (s.gap && s.gap !== 'normal' && s.gap !== '0px') spacingValues.gaps.add(s.gap);
                if (s.rowGap && s.rowGap !== 'normal' && s.rowGap !== '0px') spacingValues.gaps.add(s.rowGap);
                if (s.columnGap && s.columnGap !== 'normal' && s.columnGap !== '0px') spacingValues.gaps.add(s.columnGap);
            });
            const sortPx = arr => [...arr].sort((a,b) => parseFloat(a) - parseFloat(b));
            result.spacing = {
                paddings: sortPx(spacingValues.paddings),
                margins: sortPx(spacingValues.margins),
                gaps: sortPx(spacingValues.gaps)
            };

            // ============================================================
            // 4. BORDER RADII — every unique radius value
            // ============================================================
            const radii = new Map();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                const r = s.borderRadius;
                if (r && r !== '0px') {
                    if (!radii.has(r)) radii.set(r, { value: r, count: 1 });
                    else radii.get(r).count++;
                }
            });
            result.borderRadii = [...radii.values()].sort((a,b) => parseFloat(a.value) - parseFloat(b.value));

            // ============================================================
            // 5. SHADOWS — every unique box-shadow and text-shadow
            // ============================================================
            const boxShadows = new Map();
            const textShadows = new Map();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                if (s.boxShadow && s.boxShadow !== 'none') {
                    if (!boxShadows.has(s.boxShadow)) boxShadows.set(s.boxShadow, { value: s.boxShadow, count: 1 });
                    else boxShadows.get(s.boxShadow).count++;
                }
                if (s.textShadow && s.textShadow !== 'none') {
                    if (!textShadows.has(s.textShadow)) textShadows.set(s.textShadow, { value: s.textShadow, count: 1 });
                    else textShadows.get(s.textShadow).count++;
                }
            });
            result.shadows = {
                boxShadows: [...boxShadows.values()],
                textShadows: [...textShadows.values()]
            };

            // ============================================================
            // 6. BUTTONS & INTERACTIVE — every button/CTA with full styles
            // ============================================================
            const buttons = [];
            document.querySelectorAll('a, button').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                const text = el.textContent.trim().substring(0, 80);
                if (!text || rect.width === 0) return;
                buttons.push({
                    tag: el.tagName.toLowerCase(),
                    text,
                    href: el.href || null,
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                    styles: {
                        backgroundColor: s.backgroundColor,
                        backgroundColorHex: rgbToHex(s.backgroundColor),
                        color: s.color,
                        colorHex: rgbToHex(s.color),
                        borderRadius: s.borderRadius,
                        paddingTop: s.paddingTop,
                        paddingRight: s.paddingRight,
                        paddingBottom: s.paddingBottom,
                        paddingLeft: s.paddingLeft,
                        fontSize: s.fontSize,
                        fontWeight: s.fontWeight,
                        fontFamily: s.fontFamily,
                        letterSpacing: s.letterSpacing,
                        border: s.border,
                        borderWidth: s.borderWidth,
                        borderStyle: s.borderStyle,
                        borderColor: s.borderColor,
                        boxShadow: s.boxShadow,
                        display: s.display,
                        alignItems: s.alignItems,
                        justifyContent: s.justifyContent,
                        gap: s.gap,
                        textDecoration: s.textDecorationLine,
                        cursor: s.cursor,
                        opacity: s.opacity,
                        transition: s.transition,
                        overflow: s.overflow,
                        textTransform: s.textTransform,
                        whiteSpace: s.whiteSpace,
                        backgroundImage: s.backgroundImage !== 'none' ? s.backgroundImage.substring(0, 200) : null,
                    }
                });
            });
            result.buttons = buttons;

            // ============================================================
            // 7. SECTIONS — full layout analysis of every top-level section
            // ============================================================
            const sections = [];
            let sectionIndex = 0;
            document.querySelectorAll('section, nav, header, footer, [class*="banner"], [class*="hero"]').forEach(el => {
                const s = cs(el);
                const rect = el.getBoundingClientRect();
                if (rect.height < 10) return;
                const headings = [];
                el.querySelectorAll('h1,h2,h3').forEach(h => {
                    headings.push({ tag: h.tagName.toLowerCase(), text: h.textContent.trim().substring(0, 100) });
                });
                sections.push({
                    index: sectionIndex++,
                    tag: el.tagName.toLowerCase(),
                    classes: el.className.substring(0, 150),
                    role: el.getAttribute('role'),
                    id: el.id || null,
                    dimensions: {
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        top: Math.round(rect.top + window.scrollY),
                    },
                    styles: {
                        backgroundColor: s.backgroundColor,
                        backgroundColorHex: rgbToHex(s.backgroundColor),
                        backgroundImage: s.backgroundImage !== 'none' ? s.backgroundImage.substring(0, 300) : null,
                        paddingTop: s.paddingTop,
                        paddingRight: s.paddingRight,
                        paddingBottom: s.paddingBottom,
                        paddingLeft: s.paddingLeft,
                        marginTop: s.marginTop,
                        marginBottom: s.marginBottom,
                        display: s.display,
                        flexDirection: s.flexDirection,
                        alignItems: s.alignItems,
                        justifyContent: s.justifyContent,
                        gap: s.gap,
                        maxWidth: s.maxWidth,
                        position: s.position,
                        overflow: s.overflow,
                        borderTop: s.borderTop,
                        borderBottom: s.borderBottom,
                        backdropFilter: s.backdropFilter,
                        boxShadow: s.boxShadow !== 'none' ? s.boxShadow : null,
                    },
                    headings,
                });
            });
            result.sections = sections;

            // ============================================================
            // 8. NAVIGATION — detailed nav analysis
            // ============================================================
            const navEl = document.querySelector('nav') || document.querySelector('header');
            if (navEl) {
                const ns = cs(navEl);
                const navRect = navEl.getBoundingClientRect();
                const navLinks = [];
                navEl.querySelectorAll('a').forEach(a => {
                    const as = cs(a);
                    navLinks.push({
                        text: a.textContent.trim().substring(0, 50),
                        href: a.href || null,
                        fontSize: as.fontSize,
                        fontWeight: as.fontWeight,
                        color: as.color,
                        colorHex: rgbToHex(as.color),
                        backgroundColor: as.backgroundColor,
                        backgroundColorHex: rgbToHex(as.backgroundColor),
                        borderRadius: as.borderRadius,
                        padding: as.padding,
                    });
                });
                result.navigation = {
                    height: Math.round(navRect.height),
                    width: Math.round(navRect.width),
                    backgroundColor: ns.backgroundColor,
                    backgroundColorHex: rgbToHex(ns.backgroundColor),
                    backdropFilter: ns.backdropFilter,
                    webkitBackdropFilter: ns.webkitBackdropFilter,
                    position: ns.position,
                    top: ns.top,
                    zIndex: ns.zIndex,
                    padding: ns.padding,
                    borderBottom: ns.borderBottom,
                    boxShadow: ns.boxShadow !== 'none' ? ns.boxShadow : null,
                    display: ns.display,
                    alignItems: ns.alignItems,
                    justifyContent: ns.justifyContent,
                    links: navLinks,
                };
            }

            // ============================================================
            // 9. IMAGES & ICONS — all images and SVGs
            // ============================================================
            const images = [];
            document.querySelectorAll('img, svg, picture').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 2 || rect.height < 2) return;
                const entry = {
                    tag: el.tagName.toLowerCase(),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                    alt: el.alt || null,
                    src: el.src ? el.src.substring(0, 200) : null,
                };
                if (el.tagName === 'SVG') {
                    entry.viewBox = el.getAttribute('viewBox');
                    entry.fill = el.getAttribute('fill');
                }
                images.push(entry);
            });
            result.images = images.slice(0, 50);

            // ============================================================
            // 10. TABLES — detailed table design
            // ============================================================
            const tables = [];
            document.querySelectorAll('table').forEach(table => {
                const ts = cs(table);
                const rows = [];
                table.querySelectorAll('tr').forEach((tr, i) => {
                    if (i > 10) return;
                    const cells = [];
                    tr.querySelectorAll('th, td').forEach(cell => {
                        const cs2 = cs(cell);
                        cells.push({
                            tag: cell.tagName.toLowerCase(),
                            text: cell.textContent.trim().substring(0, 60),
                            backgroundColor: cs2.backgroundColor,
                            color: cs2.color,
                            fontWeight: cs2.fontWeight,
                            fontSize: cs2.fontSize,
                            padding: cs2.padding,
                            borderBottom: cs2.borderBottom,
                            textAlign: cs2.textAlign,
                        });
                    });
                    rows.push(cells);
                });
                tables.push({
                    width: Math.round(table.getBoundingClientRect().width),
                    borderCollapse: ts.borderCollapse,
                    backgroundColor: ts.backgroundColor,
                    rows
                });
            });
            result.tables = tables;

            // ============================================================
            // 11. ANIMATIONS & TRANSITIONS
            // ============================================================
            const transitions = new Set();
            const animations = new Set();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                if (s.transition && s.transition !== 'all 0s ease 0s' && s.transition !== 'none 0s ease 0s') {
                    transitions.add(s.transition);
                }
                if (s.animationName && s.animationName !== 'none') {
                    animations.add(s.animationName + ' ' + s.animationDuration + ' ' + s.animationTimingFunction);
                }
            });
            result.animations = {
                transitions: [...transitions],
                animations: [...animations],
            };

            // ============================================================
            // 12. Z-INDEX LAYERS
            // ============================================================
            const zLayers = new Map();
            document.querySelectorAll('*').forEach(el => {
                const s = cs(el);
                if (s.zIndex && s.zIndex !== 'auto') {
                    if (!zLayers.has(s.zIndex)) {
                        zLayers.set(s.zIndex, { value: s.zIndex, element: el.tagName + '.' + (el.className || '').substring(0, 50) });
                    }
                }
            });
            result.zIndexLayers = [...zLayers.values()].sort((a,b) => parseInt(a.value) - parseInt(b.value));

            // ============================================================
            // 13. BODY / HTML ROOT STYLES
            // ============================================================
            const body = document.body;
            const html = document.documentElement;
            result.root = {
                body: {
                    backgroundColor: cs(body).backgroundColor,
                    backgroundColorHex: rgbToHex(cs(body).backgroundColor),
                    color: cs(body).color,
                    colorHex: rgbToHex(cs(body).color),
                    fontFamily: cs(body).fontFamily,
                    fontSize: cs(body).fontSize,
                    lineHeight: cs(body).lineHeight,
                    letterSpacing: cs(body).letterSpacing,
                },
                html: {
                    fontSize: cs(html).fontSize,
                    scrollBehavior: cs(html).scrollBehavior,
                },
                pageHeight: document.body.scrollHeight,
                pageWidth: document.body.scrollWidth,
            };

            // ============================================================
            // 14. FORM ELEMENTS (if any)
            // ============================================================
            const forms = [];
            document.querySelectorAll('input, textarea, select').forEach(el => {
                const s = cs(el);
                forms.push({
                    tag: el.tagName.toLowerCase(),
                    type: el.type || null,
                    placeholder: el.placeholder || null,
                    backgroundColor: s.backgroundColor,
                    borderRadius: s.borderRadius,
                    border: s.border,
                    padding: s.padding,
                    fontSize: s.fontSize,
                    fontFamily: s.fontFamily,
                    color: s.color,
                    width: Math.round(el.getBoundingClientRect().width),
                    height: Math.round(el.getBoundingClientRect().height),
                });
            });
            result.formElements = forms;

            // ============================================================
            // 15. SCROLL / OVERFLOW BEHAVIOR
            // ============================================================
            result.scrollBehavior = {
                html: cs(html).overflowX + ' / ' + cs(html).overflowY,
                body: cs(body).overflowX + ' / ' + cs(body).overflowY,
            };

            return result;
        }
        """)

        # Also get all loaded external resources (fonts, scripts, stylesheets)
        resources = await page.evaluate("""
        () => {
            const res = { fonts: [], stylesheets: [], scripts: [] };
            document.querySelectorAll('link[rel*="stylesheet"], link[rel*="font"]').forEach(l => {
                res.stylesheets.push(l.href);
            });
            document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]').forEach(l => {
                res.fonts.push(l.href);
            });
            document.querySelectorAll('script[src]').forEach(s => {
                res.scripts.push(s.src);
            });
            // Performance entries for fonts
            if (performance && performance.getEntriesByType) {
                performance.getEntriesByType('resource').forEach(r => {
                    if (r.name.match(/\\.(woff2?|ttf|otf|eot)/i)) {
                        res.fonts.push(r.name.substring(0, 200));
                    }
                });
            }
            return res;
        }
        """)
        design['externalResources'] = resources

        with open("C:/Users/joons/work/marketing/DESIGN-SYSTEM.json", "w", encoding="utf-8") as f:
            json.dump(design, f, ensure_ascii=False, indent=2)
        print("Saved DESIGN-SYSTEM.json")
        print(f"Keys: {list(design.keys())}")
        print(f"Colors: {len(design['colors']['text'])} text, {len(design['colors']['backgrounds'])} bg, {len(design['colors']['gradients'])} gradients")
        print(f"Typography: {len(design['typography']['fontFamiliesUsed'])} font families")
        print(f"Sections: {len(design['sections'])}")
        print(f"Buttons: {len(design['buttons'])}")
        print(f"Shadows: {len(design['shadows']['boxShadows'])} box, {len(design['shadows']['textShadows'])} text")
        print(f"Border radii: {len(design['borderRadii'])}")
        print(f"Animations: {len(design['animations']['transitions'])} transitions, {len(design['animations']['animations'])} animations")
        print(f"Images/SVGs: {len(design['images'])}")
        print(f"Z-index layers: {len(design['zIndexLayers'])}")
        print(f"Page: {design['root']['pageWidth']}x{design['root']['pageHeight']}px")

        await browser.close()

asyncio.run(extract_deep())
