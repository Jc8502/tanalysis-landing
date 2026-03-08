import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const url = 'https://tanalysis.co.kr/';
const screenshotsDir = 'C:\\Users\\joons\\work\\marketing\\screenshots';
mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

// === DESKTOP ===
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
});
const desktopPage = await desktop.newPage();
await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await desktopPage.waitForTimeout(3000);

// Full page screenshot
await desktopPage.screenshot({ path: `${screenshotsDir}\\desktop-full.png`, fullPage: true });

// Above-the-fold only
await desktopPage.screenshot({ path: `${screenshotsDir}\\desktop-fold.png`, fullPage: false });

// Extract visual/layout data
const desktopData = await desktopPage.evaluate(() => {
  // Find hero/above-fold elements
  const viewport = { w: window.innerWidth, h: window.innerHeight };

  // All buttons and CTAs with position
  const ctaElements = [...document.querySelectorAll('a, button')].map(el => {
    const rect = el.getBoundingClientRect();
    const text = el.textContent?.trim();
    if (!text || text.length > 100) return null;
    return {
      text,
      tag: el.tagName,
      aboveFold: rect.top < viewport.h,
      top: Math.round(rect.top),
      visible: rect.width > 0 && rect.height > 0
    };
  }).filter(Boolean).filter(el => el.visible);

  // First visible heading
  const firstH1 = document.querySelector('h1')?.textContent?.trim();
  const firstH2 = document.querySelector('h2')?.textContent?.trim();

  // Check for sticky/fixed nav
  const fixedElements = [...document.querySelectorAll('*')].filter(el => {
    const style = window.getComputedStyle(el);
    return (style.position === 'fixed' || style.position === 'sticky') && el.offsetHeight > 0;
  }).map(el => ({ tag: el.tagName, class: el.className?.toString().slice(0, 50) }));

  // Forms
  const forms = [...document.querySelectorAll('form, input[type="email"], input[type="text"]')].map(el => ({
    type: el.tagName,
    placeholder: el.getAttribute('placeholder'),
    visible: el.offsetWidth > 0
  }));

  // Social proof indicators
  const testimonialTexts = [...document.querySelectorAll('blockquote, [class*="testimonial"], [class*="review"], [class*="quote"]')]
    .map(el => el.textContent?.trim()?.slice(0, 100));

  // Trust badges/logos
  const logoCount = document.querySelectorAll('[class*="logo"], [class*="badge"], [class*="partner"], [class*="trust"]').length;

  // Video elements
  const videos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length;

  // Chat widgets
  const chatWidgets = document.querySelectorAll('[class*="chat"], [id*="chat"], [class*="intercom"], [class*="crisp"]').length;

  return {
    viewport,
    firstH1,
    firstH2,
    ctaElements: ctaElements.slice(0, 30),
    aboveFoldCTAs: ctaElements.filter(el => el.aboveFold),
    fixedElements: fixedElements.slice(0, 5),
    forms,
    testimonialTexts,
    logoCount,
    videos,
    chatWidgets,
    totalLinks: document.querySelectorAll('a').length,
  };
});

// === MOBILE ===
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
});
const mobilePage = await mobile.newPage();
await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await mobilePage.waitForTimeout(3000);
await mobilePage.screenshot({ path: `${screenshotsDir}\\mobile-fold.png`, fullPage: false });
await mobilePage.screenshot({ path: `${screenshotsDir}\\mobile-full.png`, fullPage: true });

const mobileData = await mobilePage.evaluate(() => {
  const firstH1 = document.querySelector('h1')?.textContent?.trim();
  const aboveFoldCTAs = [...document.querySelectorAll('a, button')]
    .filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && el.textContent?.trim() && rect.width > 0;
    })
    .map(el => el.textContent?.trim())
    .filter(t => t && t.length < 50);

  // Check if mobile menu exists
  const hasMobileMenu = !!document.querySelector('[class*="hamburger"], [class*="mobile-menu"], [class*="menu-toggle"], button[aria-label*="menu"]');

  // Font sizes
  const h1FontSize = document.querySelector('h1') ?
    window.getComputedStyle(document.querySelector('h1')).fontSize : null;

  return { firstH1, aboveFoldCTAs, hasMobileMenu, h1FontSize };
});

console.log(JSON.stringify({ desktop: desktopData, mobile: mobileData, screenshots: [
  'desktop-full.png', 'desktop-fold.png', 'mobile-fold.png', 'mobile-full.png'
]}, null, 2));

await browser.close();
