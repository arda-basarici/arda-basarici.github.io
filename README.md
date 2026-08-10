# arda-basarici.github.io — portfolio site + stable link layer

Two jobs in one repo:

1. **Portfolio site** — `https://ardabasarici.dev` presents the projects. (The repo keeps its
   GitHub Pages origin name; every `arda-basarici.github.io` URL 301-redirects to the same
   path on the domain.)
2. **Stable link layer** — published posts and PDFs point at URLs _here_, never at deep repo paths, so
   when a project repo moves or gets restructured I edit **one file here** instead of chasing every
   published link.

- **Landing page:** https://ardabasarici.dev — put this in bios.
- **Project pages** (put these in posts — they carry the pitch, a social preview card, and route
  onward to report/code): `https://ardabasarici.dev/projects/<id>/`, e.g.
  `/projects/blackjack-betting/`, or `/projects/blackjack-rl/` for the whole series.
- **Apps:** `https://ardabasarici.dev/apps/` — the live layer: deployed apps and side
  projects; cards link out to the running things (list in `src/data/apps.ts`).
- **Short redirects** (for PDF covers and links published before the project pages existed):
  `/blackjack-betting`, `/pathfinding`, … — full registry in REDIRECTS.md.

## URL contract — what must never change

Once a URL appears in a post or a PDF it is **locked**:

1. **Short redirect routes** (`/<project>`, `/<project>-code`) — the route is permanent; only the
   redirect _target_ inside the stub may change.
2. **Project & series page URLs** (`/projects/<slug>/`) — permanent from 2026-07-05 on. The
   `<slug>` comes from the file's `slug` frontmatter, **not** from its filename (decoupled
   2026-07-31), so content files can be renamed and reorganized freely. Never change a
   published `slug`; `title` is free to change. A file without a `slug` fails the build.
3. **The domain** — `ardabasarici.dev` is canonical since 2026-08-10; new posts and covers
   use it. Everything published earlier used `arda-basarici.github.io`, and GitHub
   301-redirects every github.io path to the same path on the domain — but only while the
   custom domain stays configured in Settings → Pages, so that setting is itself part of
   the contract: removing it breaks every pre-2026-08-10 published link.

**Naming content files** (an internal concern, invisible to the URL): a series member's
filename starts with its series slug — `src/content/projects/<series>-<member>.md`, e.g.
`blackjack-rl-policy-audit.md` — so the arc a page belongs to is readable straight from the
file list. The blackjack four were renamed into this shape on 2026-07-31 while keeping their
published URLs (`/projects/policy-audit/` and friends) via their `slug` fields.

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

### Custom domain (live since 2026-08-10)

`ardabasarici.dev` is served by Pages via the repo's Settings → Pages → Custom domain
(+ Enforce HTTPS). DNS lives on Cloudflare:

- apex `@` and `www` — CNAME → `arda-basarici.github.io`, **DNS-only (grey cloud)**.
  Grey because GitHub's certificate automation must see the domain pointing directly at
  it, and there is no origin IP to hide — the origin is GitHub's public CDN. (The
  proxied orange `steamlens.` record guards a real box; different origin, different
  rule.) Cloudflare flattens the apex CNAME to A records automatically.
- `_github-pages-challenge-arda-basarici` TXT — the account-level domain verification
  (github.com → Settings → Pages → verified domains). It is re-checked periodically and
  must stay.

## License

The site's code is released under the [MIT License](LICENSE). Site content — writings,
reports, and images — is © 2026 Arda Başarıcı, all rights reserved.
