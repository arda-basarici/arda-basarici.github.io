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
- `/steamlens-extraction` → /reports/the-instrument-around-the-model.pdf  — LOCKED (printed on
  the report's own cover, so the route can never be retired)

Canonical PDFs live in the project repos; when one is re-rendered (e.g. the cover-link fix),
refresh its copy in `public/reports/` too.

## Site pages (claimed by the Astro site, not redirects)
- `/projects` (+ `/projects/<slug>`), `/about`, `/writings` (+ `/writings/<slug>`)
- reserved for future app redirects: `/apps/<name>`
- **`/projects/<slug>/` URLs are LOCKED once published in a post** — the slug is frontmatter,
  not the filename (decoupled 2026-07-31), so files may be renamed freely; never change a
  published `slug`. See "URL contract" in README.md.

## Repos (standalone per-project repos since the 2026-07 restructure; ai-journey archived)
- `/blackjack-rl-code` → github.com/arda-basarici/blackjack-rl
- `/blackjack-sim-code` → github.com/arda-basarici/blackjack-sim
- `/pathfinding-code` → github.com/arda-basarici/pathfinding-ml
- `/steam-reviews-code` → github.com/arda-basarici/steam-reviews
- `/steam-lens-code` → github.com/arda-basarici/steam-lens

## Reserved, not yet live
- `/apps/steam-lens` — the SteamLens deployment, when M3 ships. No stub exists yet; a live
  link goes up only when there is something behind it. Claimed here so nothing else takes it.
