// Captures project screenshots into public/projects using the local Chrome install.
// Usage: npm run screenshots [-- <filter>]   e.g. npm run screenshots -- broncalc
import { chromium } from 'playwright';
const OUT = new URL('../public/projects', import.meta.url).pathname;
const only = process.argv[2];

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const VOTER = 'https://voter-trip-git-main-adborowskis-projects.vercel.app';
const RENTAL = 'https://central-rental-redo.vercel.app';

async function bronSetup(p) {
  const input = (ph) => p.locator(`input[placeholder="${ph}"]`);
  await p.getByRole('tab', { name: 'Advanced' }).or(p.getByRole('button', { name: 'Advanced' })).first().click();
  await input('Paste a glazy.org recipe link').fill('https://glazy.org/recipes/1000');
  await p.getByRole('button', { name: /Import/ }).first().click();
  await p.waitForTimeout(4000);
  await input('e.g. 11.5').fill('11.5', { timeout: 5000 });
  const sgInputs = p.locator('input[placeholder^="1."]');
  await sgInputs.first().fill('1.52');
  await p.waitForTimeout(500);
  await p.evaluate(() => { document.activeElement?.blur(); getSelection()?.removeAllRanges(); });
  await p.waitForTimeout(800);
}

const SHOTS = [
  ['sejmograf/desktop-home', 'https://www.sejmograf.pl/', DESKTOP],
  ['sejmograf/desktop-mp-profile', 'https://www.sejmograf.pl/mep/403', DESKTOP],
  ['sejmograf/desktop-ministries', 'https://www.sejmograf.pl/ministerstwa', DESKTOP],
  ['sejmograf/mobile-home', 'https://www.sejmograf.pl/', MOBILE],
  ['voter-trip/desktop-map', `${VOTER}/map?originId=19`, DESKTOP],
  ['voter-trip/desktop-landing', `${VOTER}/`, DESKTOP],
  ['voter-trip/mobile-landing', `${VOTER}/`, MOBILE],
  ['broncalc/desktop-advanced', 'https://broncalc.vercel.app/', DESKTOP, bronSetup],
  ['broncalc/mobile-advanced', 'https://broncalc.vercel.app/', MOBILE, bronSetup],
  ['central-rental/desktop-home', `${RENTAL}/en`, DESKTOP],
  ['central-rental/desktop-apartments', `${RENTAL}/en/apartments`, DESKTOP],
  ['central-rental/mobile-home', `${RENTAL}/en`, MOBILE],
];

const b = await chromium.launch({ channel: 'chrome' });
await Promise.all(SHOTS.filter(([n]) => !only || n.includes(only)).map(async ([name, url, ctxOpts, setup]) => {
  const ctx = await b.newContext({ ...ctxOpts, locale: 'pl-PL', reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'load', timeout: 60000 });
    await p.waitForTimeout(6000);
    if (setup) await setup(p);
    await p.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 85 });
    console.log('ok', name);
  } catch (e) { console.log('FAIL', name, e.message.split('\n').slice(0,12).join('\n')); }
  await ctx.close();
}));
await b.close();
