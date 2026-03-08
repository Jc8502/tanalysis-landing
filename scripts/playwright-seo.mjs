import { chromium } from 'playwright';

const url = 'https://tanalysis.co.kr/';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
});
const page = await context.newPage();

// Measure load time
const startTime = Date.now();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const loadTime = Date.now() - startTime;

// Wait for JS rendering
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const getText = (sel) => document.querySelector(sel)?.textContent?.trim() || null;
  const getAttr = (sel, attr) => document.querySelector(sel)?.getAttribute(attr) || null;
  const getAll = (sel) => [...document.querySelectorAll(sel)].map(el => el.textContent?.trim()).filter(Boolean);
  const getAllAttr = (sel, attr) => [...document.querySelectorAll(sel)].map(el => el.getAttribute(attr)).filter(Boolean);

  // Title and meta
  const title = document.title;
  const metaDesc = getAttr('meta[name="description"]', 'content');
  const metaKeywords = getAttr('meta[name="keywords"]', 'content');
  const canonical = getAttr('link[rel="canonical"]', 'href');
  const ogTitle = getAttr('meta[property="og:title"]', 'content');
  const ogDesc = getAttr('meta[property="og:description"]', 'content');
  const ogImage = getAttr('meta[property="og:image"]', 'content');
  const twitterCard = getAttr('meta[name="twitter:card"]', 'content');

  // Headings
  const h1s = getAll('h1');
  const h2s = getAll('h2');
  const h3s = getAll('h3');

  // Images
  const images = [...document.querySelectorAll('img')];
  const imagesWithAlt = images.filter(img => img.alt && img.alt.trim()).length;
  const imagesWithoutAlt = images.filter(img => !img.alt || !img.alt.trim()).length;
  const totalImages = images.length;

  // Links
  const allLinks = [...document.querySelectorAll('a[href]')];
  const internalLinks = allLinks.filter(a => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('/') || href.includes('tanalysis.co.kr');
  }).map(a => a.getAttribute('href'));
  const externalLinks = allLinks.filter(a => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('http') && !href.includes('tanalysis.co.kr');
  }).map(a => a.getAttribute('href'));

  // Schema markup
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map(s => { try { return JSON.parse(s.textContent); } catch(e) { return null; } })
    .filter(Boolean);

  // Robots meta
  const robots = getAttr('meta[name="robots"]', 'content');

  // Viewport
  const viewport = getAttr('meta[name="viewport"]', 'content');

  // Lang attribute
  const lang = document.documentElement.lang;

  // CTAs (buttons and links with button-like text)
  const buttons = getAll('button, [role="button"], a.btn, a[class*="button"]');
  const ctaLinks = [...document.querySelectorAll('a')].filter(a => {
    const text = a.textContent?.trim().toLowerCase();
    return text && (text.includes('시작') || text.includes('무료') || text.includes('가입') || text.includes('문의') || text.includes('상담') || text.includes('신청') || text.includes('다운') || text.includes('자세히'));
  }).map(a => a.textContent?.trim());

  // Page word count
  const bodyText = document.body.innerText;
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  return {
    title, metaDesc, metaKeywords, canonical, ogTitle, ogDesc, ogImage, twitterCard,
    h1s, h2s, h3s,
    totalImages, imagesWithAlt, imagesWithoutAlt,
    internalLinks: [...new Set(internalLinks)],
    externalLinks: [...new Set(externalLinks)],
    schemas,
    robots, viewport, lang,
    buttons, ctaLinks,
    wordCount,
    h1Count: h1s.length,
    h2Count: h2s.length,
    h3Count: h3s.length,
  };
});

console.log(JSON.stringify({ loadTime, ...data }, null, 2));

await browser.close();
