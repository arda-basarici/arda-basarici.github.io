# Redirects & locked URLs

Stable short-URLs (`arda-basarici.github.io/<route>`) used in posts + report covers. Each is a
folder under `public/` with an `index.html` meta-refresh (copied verbatim into the build).
This file is the registry of ALL claimed routes — check it before adding any new top-level
route or `/apps/…` entry to avoid collisions.

## Reports (targets on-site since 2026-07-05: frozen copies in `public/reports/`)
- `/blackjack-betting` → /reports/betting-against-the-noise.pdf  — LOCKED (in posts)
- `/table-to-network` → /reports/from-table-to-network.pdf
- `/policy-audit` → /reports/blackjack-rl-policy-audit.pdf
- `/pathfinding` → /reports/pathfinding_report.pdf
- `/steam-reviews` → /reports/steam_review_report.pdf
- `/blackjack-sim` → /reports/blackjack_analysis_report.pdf

Canonical PDFs live in the project repos; when one is re-rendered (e.g. the cover-link fix),
refresh its copy in `public/reports/` too.

## Site pages (claimed by the Astro site, not redirects)
- `/projects` (+ `/projects/<slug>`), `/about`, `/writings` (+ `/writings/<slug>`)
- reserved for future app redirects: `/apps/<name>`
- **`/projects/<id>/` URLs are LOCKED once published in a post** — the id is the content
  filename; never rename a published project/series markdown file (titles may change via
  frontmatter). See "URL contract" in README.md.

## Repos (targets under `github.com/arda-basarici/ai-journey`; repoint on repo move)
- `/blackjack-rl-code` → phase3-deep-learning/blackjack-rl
- `/blackjack-sim-code` → phase2-data/blackjack-sim
- `/pathfinding-code` → phase2-data/pathfinding-ml
- `/steam-reviews-code` → phase2-data/steam-reviews
