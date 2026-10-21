// Renders the CV from src/data into public/cv-adam-borowski.pdf (one A4 page).
// Usage: npm run cv
import { chromium } from 'playwright'
import { PROFILE, SUMMARY, SKILL_GROUPS, EXPERIENCE, INDEPENDENT_ROLE, EDUCATION, CERTIFICATIONS, LANGUAGES } from '../src/data/cv.ts'
import { PROJECTS } from '../src/data/projects.ts'

const root = new URL('..', import.meta.url)
const fontDir = new URL('node_modules/@fontsource-variable/inter/files/', root).href
const outPath = new URL('public/cv-adam-borowski.pdf', root).pathname

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const bare = url => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const link = url => `<a href="${url}">${esc(bare(url))}</a>`

const projectBullet = p =>
  `<strong>${esc(p.name)}</strong> <span class="meta">(${link(p.liveUrl)})</span>: ${esc(p.cvSummary)}`

const role = (r, extra = []) => `
  <div class="entry">
    <div class="row"><strong>${esc(r.role)} — <span class="accent">${esc(r.company)}</span></strong><span class="date">${esc(r.period)}</span></div>
    <ul>${[...extra, ...r.bullets.map(esc)].map(b => `<li>${b}</li>`).join('')}</ul>
  </div>`

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Inter; src: url(${fontDir}inter-latin-wght-normal.woff2) format('woff2'); font-weight: 100 900; unicode-range: U+0000-00FF, U+2000-206F, U+2190-21FF; }
  @font-face { font-family: Inter; src: url(${fontDir}inter-latin-ext-wght-normal.woff2) format('woff2'); font-weight: 100 900; unicode-range: U+0100-024F, U+1E00-1EFF; }
  @page { size: A4; margin: 11mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 8.9pt/1.38 Inter, sans-serif; color: #1f2933; }
  a { color: inherit; text-decoration: none; }
  h1 { font-size: 23pt; font-weight: 700; color: #1d4a7a; margin: 0 0 1pt; letter-spacing: -0.01em; }
  .title { font-size: 11pt; margin: 0 0 3pt; }
  .contact { color: #5b6672; font-size: 8.8pt; margin: 0; }
  h2 { font-size: 9.6pt; font-weight: 700; color: #1d4a7a; letter-spacing: 0.06em; text-transform: uppercase;
       margin: 9pt 0 4pt; padding-bottom: 2pt; border-bottom: 1.2pt solid #c9d6e4; }
  p { margin: 0; }
  .accent { color: #2563a6; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .date { color: #5b6672; white-space: nowrap; font-weight: 400; }
  .entry { margin-bottom: 4pt; }
  ul { margin: 2pt 0 0; padding-left: 13pt; }
  li { margin-bottom: 0.5pt; }
  li::marker { color: #2563a6; }
  .skills p { margin-bottom: 1.5pt; }
  .meta { color: #5b6672; }
  .edu .row { margin-bottom: 1.5pt; }
</style></head><body>
  <h1>${esc(PROFILE.name)}</h1>
  <p class="title">${esc(PROFILE.title)} | ${esc(PROFILE.focus.replace(/ · /g, ' • '))}</p>
  <p class="contact">${esc(PROFILE.location)} • ${esc(PROFILE.phone)} • <a href="mailto:${PROFILE.email}">${esc(PROFILE.email)}</a></p>
  <p class="contact">${link(PROFILE.linkedin)} • ${link('https://adamborowski.com')} • ${link(PROFILE.github)}</p>

  <h2>Professional Summary</h2>
  <p>${esc(SUMMARY)}</p>

  <h2>Technical Skills</h2>
  <div class="skills">${SKILL_GROUPS.map(([g, s]) => `<p><strong>${esc(g)}:</strong> ${esc(s.join(', '))}</p>`).join('')}</div>

  <h2>Professional Experience</h2>
  ${role(INDEPENDENT_ROLE, PROJECTS.map(projectBullet))}
  ${EXPERIENCE.map(r => role(r)).join('')}

  <h2>Education, Certifications &amp; Languages</h2>
  <div class="edu">${EDUCATION.map(e => `<div class="row"><span><strong>${esc(e.degree)}</strong> — ${esc(e.institution)}</span><span class="date">${esc(e.period)}</span></div>`).join('')}</div>

  <p style="margin-top: 4pt"><strong>Certifications:</strong> ${esc(CERTIFICATIONS.join('; '))}</p>
  <p><strong>Languages:</strong> ${esc(LANGUAGES.map(([l, lv]) => `${l} (${lv})`).join(', '))}</p>
</body></html>`

const browser = await chromium.launch({ channel: 'chrome' })
// Viewport width = A4 minus horizontal margins, so the height check reflects real line wrapping.
const page = await browser.newPage({ viewport: { width: 680, height: 1000 } })
await page.goto(new URL('scripts/', root).href) // file:// origin so the local fonts load
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const height = await page.evaluate(() => document.body.scrollHeight)
await page.pdf({ path: outPath, format: 'A4', printBackground: true, preferCSSPageSize: true })
await browser.close()

// A4 at 96dpi minus 22mm of vertical margin ≈ 1040px of usable height.
console.log(`Wrote ${outPath} (content height ${height}px of ~1040px)`)
if (height > 1040) console.warn('Warning: CV overflows onto a second page.')
