# arda-basarici.github.io — portfolio site + stable link layer

Two jobs in one repo:

1. **Portfolio site** — `https://arda-basarici.github.io` presents the projects.
2. **Stable link layer** — published posts and PDFs point at URLs _here_, never at deep repo paths, so
   when a project repo moves or gets restructured I edit **one file here** instead of chasing every
   published link.

- **Landing page:** https://arda-basarici.github.io — put this in bios.
- **Per-project redirects** (put these in specific posts / PDF covers):
  - https://arda-basarici.github.io/pathfinding
  - https://arda-basarici.github.io/blackjack-betting
  - https://arda-basarici.github.io/steam-reviews
  - https://arda-basarici.github.io/blackjack-sim

## How the redirects work

Each redirect is one tiny HTML file (`public/<project>/index.html`) with a
`<meta http-equiv="refresh">` that forwards to the real URL. Everything in `public/` is copied
into the build output verbatim, so the short URL never changes; only the redirect _target_ does.

## When a repo moves

1. Edit the `url=` in the affected `public/<project>/index.html` (and its fallback `<a href>`).
2. Update the matching link on the landing page (`src/pages/index.astro`) and REDIRECTS.md.
3. Commit. Every published link that points here now resolves to the new location — no post edits, no
   PDF rebuilds.

## Setup

The site is built with [Astro](https://astro.build) and deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main` (Settings → Pages → Source must be
“GitHub Actions”).

- `src/pages/` — site pages (Astro)
- `public/` — copied verbatim into the build: redirect stubs, `.nojekyll`
- Local dev: `npm install`, then `npm run dev`; `npm run build` writes `dist/`.

_(Optional later: a custom domain in Settings → Pages for `ardabasarici.dev/...`-style links.)_
