# arda-basarici.github.io — portfolio hub + stable link redirects

This repo is my **stable link layer**. Published posts and PDFs point at URLs _here_, never at deep
repo paths — so when a project repo moves or gets restructured, I edit **one file here** instead of
chasing every published link.

- **Landing page:** https://arda-basarici.github.io — browsable portfolio (put this in bios).
- **Per-project redirects:** short, stable URLs that forward to the current artifact (put these in
  specific posts / PDF covers):
  - https://arda-basarici.github.io/pathfinding
  - https://arda-basarici.github.io/blackjack-betting
  - https://arda-basarici.github.io/steam-reviews
  - https://arda-basarici.github.io/blackjack-sim

## How it works

Each redirect is one tiny HTML file (`<project>/index.html`) with a `<meta http-equiv="refresh">`
that forwards to the real URL. The short URL never changes; only the redirect _target_ does.

## When a repo moves (the whole point)

1. Edit the `url=` in the affected `<project>/index.html` (and its fallback `<a href>`).
2. Update the matching link on `index.html` (the landing page).
3. Commit. Every published link that points here now resolves to the new location — **no post edits,
   no PDF rebuilds.**

## One-time setup (do at the end, when ready)

1. Create a **public** repo named exactly `arda-basarici.github.io`.
2. Push these files to its `main` branch.
3. Settings → Pages → Source: `main` / root → Save. Live at https://arda-basarici.github.io within a minute.
4. (Optional) Add a custom domain in Settings → Pages for `ardabasarici.dev/...`-style links —
   GitHub-independent and even more future-proof.
