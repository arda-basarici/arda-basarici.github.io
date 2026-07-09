# arda-basarici.github.io — portfolio site + stable link layer

Two jobs in one repo:

1. **Portfolio site** — `https://arda-basarici.github.io` presents the projects.
2. **Stable link layer** — published posts and PDFs point at URLs _here_, never at deep repo paths, so
   when a project repo moves or gets restructured I edit **one file here** instead of chasing every
   published link.

- **Landing page:** https://arda-basarici.github.io — put this in bios.
- **Project pages** (put these in posts — they carry the pitch, a social preview card, and route
  onward to report/code): `https://arda-basarici.github.io/projects/<id>/`, e.g.
  `/projects/blackjack-betting/`, or `/projects/blackjack-rl/` for the whole series.
- **Short redirects** (for PDF covers and links published before the project pages existed):
  `/blackjack-betting`, `/pathfinding`, … — full registry in REDIRECTS.md.

## URL contract — what must never change

Once a URL appears in a post or a PDF it is **locked**:

1. **Short redirect routes** (`/<project>`, `/<project>-code`) — the route is permanent; only the
   redirect _target_ inside the stub may change.
2. **Project & series page URLs** (`/projects/<id>/`) — permanent from 2026-07-05 on. The `<id>`
   is the content filename (`src/content/projects/<id>.md`, `src/content/series/<id>.md`), so
   **renaming a content file breaks a published link** — don't rename; fix titles via the
   `title` frontmatter, which is free to change.

## How the redirects work

Each redirect is one tiny HTML file (`public/<project>/index.html`) with a
`<meta http-equiv="refresh">` that forwards to the real URL. Everything in `public/` is copied
into the build output verbatim, so the short URL never changes; only the redirect _target_ does.

## When a repo moves

Report PDFs are hosted on-site (`public/reports/`), so repo moves only affect the `-code` stubs:

1. Edit the `url=` in the affected `public/<project>-code/index.html` (and its fallback `<a href>`).
2. Update REDIRECTS.md.
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

## License

The site's code is released under the [MIT License](LICENSE). Site content — writings,
reports, and images — is © 2026 Arda Başarıcı, all rights reserved.
