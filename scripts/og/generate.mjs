// Renders the share-card (og:image) PNGs into public/og/ — one card per content
// entry from card.html, plus the identity card from hero.html for the pages that
// are about me rather than about a work (landing, About, the index pages).
//
// Run `npm run og` after changing a title, seoTitle, ogSubtitle, or ogTags —
// the PNGs are committed, not built in CI, so a metadata edit without a
// regenerate ships a stale card.
//
// Rendering is plain headless Chrome, so the cards are pixel-identical to the
// site's own CSS. Set OG_CHROME to override the browser path.

import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

const root = resolve(import.meta.dirname, '..', '..');
const outDir = join(root, 'public', 'og');

const chrome =
  process.env.OG_CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// --- pure helpers -----------------------------------------------------------

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const frontmatter = (file) => {
  const text = readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) throw new Error(`${file}: no frontmatter block`);
  return parseYaml(match[1]);
};

// Subtitle contract (see content.config.ts): ogSubtitle wins; else seoTitle with
// a leading "<title>: " echo stripped. A page with neither has no card copy —
// fail loud so the gap is a decision, not an accident.
const subtitleFor = (data, file) => {
  if (data.ogSubtitle) return data.ogSubtitle;
  if (data.seoTitle) {
    const prefix = `${data.title}: `;
    return data.seoTitle.startsWith(prefix) ? data.seoTitle.slice(prefix.length) : data.seoTitle;
  }
  throw new Error(`${file}: no ogSubtitle and no seoTitle — add one for the share card`);
};

// The editorial title dominates the card; longer titles step down so two lines
// never crowd the subtitle out.
const titleSize = (title) => (title.length > 30 ? 62 : title.length > 22 ? 70 : 76);

const tagsHtml = (tags = []) =>
  tags.map(escapeHtml).join('<span class="sep">·</span>');

// --- collect the cards ------------------------------------------------------

const entries = (dir) =>
  readdirSync(join(root, 'src', 'content', dir))
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => ({ file: join(root, 'src', 'content', dir, f), data: frontmatter(join(root, 'src', 'content', dir, f)) }));

const seriesEntries = entries('series');
const seriesTitle = new Map(seriesEntries.map(({ data }) => [data.slug, data.title]));

const kickerFor = (data, kind) => {
  if (kind === 'writing') return 'Writing';
  if (kind === 'series') return 'Series';
  if (data.series && data.seriesOrder)
    return `${seriesTitle.get(data.series) ?? data.series} · ${String(data.seriesOrder).padStart(2, '0')}`;
  return 'Project';
};

const cards = [
  ...entries('projects').map((e) => ({ ...e, kind: 'project', id: e.data.slug })),
  ...seriesEntries.map((e) => ({ ...e, kind: 'series', id: e.data.slug })),
  // Writings publish under their filename (no slug field), matching the collection.
  ...entries('writings').map((e) => ({
    ...e,
    kind: 'writing',
    id: e.file.replace(/\\/g, '/').split('/').pop().replace(/\.mdx?$/, ''),
  })),
].filter((c) => !c.data.draft);

// --- render -----------------------------------------------------------------

const template = readFileSync(join(root, 'scripts', 'og', 'card.html'), 'utf8');
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(outDir, { recursive: true });

const render = (html, outName) => {
  const page = join(tmp, `${outName}.html`);
  writeFileSync(page, html);
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--force-device-scale-factor=1',
    `--screenshot=${join(outDir, `${outName}.png`)}`,
    '--window-size=1200,630',
    '--virtual-time-budget=8000',
    '--hide-scrollbars',
    `file:///${page.replace(/\\/g, '/')}`,
  ]);
  console.log(`og/${outName}.png`);
};

for (const card of cards) {
  const html = template
    .replace('{{KICKER}}', escapeHtml(kickerFor(card.data, card.kind)))
    .replace('{{TITLE_SIZE}}', String(titleSize(card.data.title)))
    .replace('{{TITLE}}', escapeHtml(card.data.title))
    .replace('{{SUBTITLE}}', escapeHtml(subtitleFor(card.data, card.file)))
    .replace('{{TAGS}}', tagsHtml(card.data.ogTags));
  render(html, card.id);
}

render(readFileSync(join(root, 'scripts', 'og', 'hero.html'), 'utf8'), 'default');
rmSync(tmp, { recursive: true, force: true });
console.log(`${cards.length + 1} cards rendered into public/og/`);
