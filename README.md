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

Each redirect is one tiny HTML file (`<project>/index.html`) with a `<meta http-equiv="refresh">`
that forwards to the real URL. The short URL never changes; only the redirect _target_ does.

## When a repo moves

1. Edit the `url=` in the affected `<project>/index.html` (and its fallback `<a href>`).
2. Update the matching link on `index.html` (the landing page) and REDIRECTS.MD.
3. Commit. Every published link that points here now resolves to the new location — no post edits, no
   PDF rebuilds.

## Setup

Live on GitHub Pages at https://arda-basarici.github.io. _(Optional later: a custom domain in
Settings → Pages for `ardabasarici.dev/...`-style links.)_
