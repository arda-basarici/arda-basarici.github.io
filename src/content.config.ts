import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Link straight at the target — the hosted PDF (`/reports/<file>.pdf`) or the repo URL — so a
// click opens the thing itself and the link works in dev too. The short routes in REDIRECTS.md
// are for links that leave the site (posts, report covers), not for the site's own navigation.
// Shared by projects and series: a milestone owns its report, the arc owns the repo and
// the deployment.
const links = z
  .object({
    report: z.string().optional(),
    code: z.string().optional(),
    demo: z.string().optional(),
  })
  .default({});

// The published URL comes from frontmatter `slug`, never from the filename — so content
// files can be renamed and reorganized freely while /projects/<slug>/ stays put. Every
// project and series file states its slug explicitly; a URL should not be a side effect of
// where a file happens to sit. (See "URL contract" in README.md.)
const slugFromFrontmatter = ({ entry, data }: { entry: string; data: Record<string, unknown> }) => {
  const slug = data.slug;
  if (typeof slug !== 'string' || !slug) {
    throw new Error(`${entry} has no \`slug\` — the published URL must be stated, not inferred.`);
  }
  return slug;
};

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
    generateId: slugFromFrontmatter,
  }),
  schema: z.object({
      // The locked public URL: /projects/<slug>/. Change a filename freely; never this.
      slug: z.string(),
      title: z.string(),
      // Card-level one-paragraph pitch: the finding, not just the topic.
      summary: z.string(),
      // One line: what skills/toolset this project evidences.
      demonstrates: z.string().optional(),
      // Projects that build on each other share a series slug; seriesOrder is the
      // position in the arc. Series-level title/blurb live in src/content/series/.
      series: z.string().optional(),
      seriesOrder: z.number().int().positive().optional(),
      // Display order on /projects/ (ascending; unset sorts last, then by filename).
      // Series are ordered by their own `order`, not by their members'.
      order: z.number().int().optional(),
      // Two-or-three-word role shown in the arc ledger, e.g. "the instrument".
      seriesRole: z.string().optional(),
      // One-sentence explanation shown under the title in the arc ledger.
      seriesNote: z.string().optional(),
      links,
      date: z.coerce.date().optional(),
      draft: z.boolean().default(false),
    }),
});

// A series groups projects that build on each other (matched via the projects'
// `series` field). The body is the overview shown at /projects/<slug>/.
const series = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/series',
    generateId: slugFromFrontmatter,
  }),
  schema: z.object({
    // The locked public URL: /projects/<slug>/. Members point at it via their `series`.
    slug: z.string(),
    title: z.string(),
    // Card-level one-paragraph pitch for the whole arc.
    blurb: z.string(),
    // One line: what skills/toolset the series evidences end-to-end.
    demonstrates: z.string().optional(),
    // Display order on /projects/ (ascending; unset sorts last, then by filename).
    order: z.number().int().optional(),
    // Arc-level links: the repo behind the whole system, and its deployment once live.
    // A milestone's report belongs to that milestone's page, not here.
    links,
    // Milestones that don't exist yet: listed in the arc ledger after the built ones,
    // unlinked and marked, so an in-flight arc shows where it's going without implying
    // there's something to read. A milestone graduates by becoming a project file.
    roadmap: z
      .array(
        z.object({
          title: z.string(),
          // One sentence: what this milestone asks. Never a delivery date.
          note: z.string().optional(),
        })
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
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

export const collections = { projects, series, writings };
