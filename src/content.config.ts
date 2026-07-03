import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Card-level one-paragraph pitch: the finding, not just the topic.
    summary: z.string(),
    // One line: what skills/toolset this project evidences.
    demonstrates: z.string().optional(),
    // Projects that build on each other share a series id; seriesOrder is the
    // position in the arc. Series-level title/blurb live in src/data/series.ts.
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    // Always route through the stable short-URLs (see REDIRECTS.md), never deep repo paths.
    links: z
      .object({
        report: z.string().optional(),
        code: z.string().optional(),
        demo: z.url().optional(),
      })
      .default({}),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // One-sentence summary: shown on the index and used as the meta description.
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Drafts build nowhere: excluded from the index and from route generation.
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, articles };
