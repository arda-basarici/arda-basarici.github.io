// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The sitemap covers rendered routes automatically; the report PDFs are content
// (the flagship artifacts), not assets, so they are added explicitly. Redirect
// stubs under public/ stay out — they are link-preserving forwards, not pages.
const reportPdfs = [
  'betting-against-the-noise.pdf',
  'from-table-to-network.pdf',
  'blackjack-rl-policy-audit.pdf',
  'pathfinding_report.pdf',
  'steam_review_report.pdf',
  'blackjack_analysis_report.pdf',
  'the-instrument-around-the-model.pdf',
  'sampling-without-random-access.pdf',
].map((f) => `https://ardabasarici.dev/reports/${f}`);

export default defineConfig({
  site: 'https://ardabasarici.dev',
  integrations: [mdx(), sitemap({ customPages: reportPdfs })],
});