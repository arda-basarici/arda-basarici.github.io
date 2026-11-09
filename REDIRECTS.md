# Redirects & locked URLs

Stable short-URLs (`ardabasarici.dev/<route>`; the pre-2026-08-10 `arda-basarici.github.io`
form 301s to the same path) used in posts + report covers. Each is a
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

## Resume
- `/resume` → /resume/Arda_Basarici_Resume.pdf — the public resume (no phone), the file
  beside the stub; source and build in the career stream (`python build.py --public`). The
  saved filename matches the one sent to recruiters.

## Site pages (claimed by the Astro site, not redirects)
- `/projects` (+ `/projects/<slug>`), `/about`, `/writings` (+ `/writings/<slug>`)
- `/apps` — the apps page. Its cards link straight to each app's own hostname
  (`steamlens.ardabasarici.dev`, `leave-agent.ardabasarici.dev`), so there are no
  `/apps/<name>` stubs; the two once reserved here were never created or published.
- **`/projects/<slug>/` URLs are LOCKED once published in a post** — the slug is frontmatter,
  not the filename (decoupled 2026-07-31), so files may be renamed freely; never change a
  published `slug`. See "URL contract" in README.md.

## Repos (standalone per-project repos since the 2026-07 restructure; ai-journey archived)
- `/blackjack-rl-code` → github.com/arda-basarici/blackjack-rl
- `/blackjack-sim-code` → github.com/arda-basarici/blackjack-sim
- `/pathfinding-code` → github.com/arda-basarici/pathfinding-ml
- `/steam-reviews-code` → github.com/arda-basarici/steam-reviews
- `/steam-lens-code` → github.com/arda-basarici/steam-lens
- `/platform-code` → github.com/arda-basarici/platform
- `/leave-impact-agent-code` → github.com/arda-basarici/leave-impact-agent
