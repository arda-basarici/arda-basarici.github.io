---
slug: steam-lens-deployment
title: 'The Instrument Goes Live'
seoTitle: 'Deploying an LLM Review-Analysis App: Grounded Prose, Spend Gates, Approval-Gated CD'
ogTags: [LLM Serving, Grounding Gates, Spend Control, CI/CD]
summary: >-
  A measured pipeline is only half the product; the other half is serving strangers without
  losing its guarantees. Milestone 3 puts SteamLens behind a public URL: a cold analysis runs
  as a narrated, minutes-scale job; the composed narrative passes deterministic grounding
  gates before it may persist; admission gates cap what the public can spend (a live report
  settles at $0.007–0.017 against a $1 per-job cap); and delivery ships only the exact build
  a human approved.
demonstrates: >-
  Production serving of an LLM pipeline on a self-managed VPS: FastAPI with SSE narration, deterministic grounding gates on model prose, count-based spend admission over a billed-truth ledger, Docker behind Caddy and Cloudflare with a hidden origin, approval-gated delivery over a forced-command key, prompt-injection canaries, and a public ops dashboard reading the same journals.
series: steam-lens
seriesOrder: 3
seriesRole: deployment
seriesNote: >-
  The measured pipeline behind a public URL: narrated live analysis, a fenced narrative,
  spend gates, and a deploy pipeline that ships only what a human approved.
links:
  app: https://steamlens.ardabasarici.dev
  code: https://github.com/arda-basarici/steam-lens
date: 2026-08-12
---

The first two milestones built a measurement instrument and priced its sampling. This one
serves strangers with it, and the constraint that shaped every decision is that a public
request spends real money on a small budget: a cold analysis is a minutes-long job that
fetches reviews under Steam's rate courtesy, buys labels, and composes prose. The milestone's
question is how much of the offline rigor survives contact with a public URL. The answer
built here: all of it, or the report doesn't publish.

## One box, one job at a time

Cold analyses serialize deliberately: concurrent jobs would share the single Steam politeness
budget anyway, making both slower and the narration timings misleading. A request for a game
already being analyzed attaches to the running job (one fetch, one spend, any number of
viewers), and a game with a published report answers instantly from persistence, its analysis
date worn openly rather than passed off as fresh. While a job runs, the page is the
narration: typed events stream over SSE with full-history replay on reconnect, so the
analysis is watched, not spinner-hidden. Inside the job, fetch and classify overlap through a
producer-consumer seam, and every statistical leg is the certified instrument composed
unchanged: the fetch plan from the sampling study's own compiler, the classify worker the
census bought labels with.

## The narrative is fenced, not trusted

The report's prose is written by a model and then refused the chance to freelance. A
numeric-grounding gate derives, from the job's own outputs, the whitelist of every number the
prose may state: a numeral must match at its own precision (honest rounding passes; "roughly
40%" over a 27% aggregate dies: the laundering case the gate exists for), and every
quotation must be a verbatim substring of the supplied evidence. Failures degrade honestly:
one corrective retry, then offending sentences drop, then the report renders numbers and
quotes only, with the rung recorded. A pass is a certificate, not a verdict: the gate emits
the matched spans, and the page renders model voice and minted fact visibly distinct. A
versioned prompt-injection canary set measures the walls from both sides; at the first live
readings every wall held, and the instrument's first catch was the composer bending quote
punctuation to fit its prose: refused, and fixed in the prompt.

## Spending in public

The submit gate counts jobs, not dollars, because a dollar ledger settles too late to stop a
burst: each visitor gets a daily allowance of fresh analyses, a pooled daily cap bounds the
whole day, and the ledger's settled spend backstops runaway pathology. Behind the gate, every
job carries its own budget cap, reserved atomically before each call. The ledger records
billed truth rather than list price (the provider's cache discount is read off the wire per
call, after list pricing was measured overstating costs roughly fivefold), and every row
joins its job, so the public ops dashboard's spend figures reconcile against the provider's
bill. Live reports settle at $0.007–0.017.

## The box and the pipeline

The app runs as a Docker stack on a small self-managed VPS behind one box-owned Caddy, with
Cloudflare in front and the origin hidden: the DNS record is proxied, and a firewall layer
installed before Docker starts admits only Cloudflare's published ranges to the one open web
port. Delivery is approval-gated rather than continuous: CI mints the image, a required
review holds the deploy until a deliberate click, and the pipeline's SSH key is
forced-command: it can trigger the box's deploy script and do nothing else. The job
ships the exact reviewed SHA-tagged image, the script refuses to deploy while a visitor's analysis
is live, and rollback is the previous tag. The database is bind-mounted on the host,
backed up nightly off-box, and the backup was verified by restoring it, not by uploading it.
Monitoring lives off the box; the richer observability is `/ops`, a public product page over
the same journals: aggregates only, IP-free by construction.

## What it refuses to claim

A cached report is served as the dated artifact it is, not refreshed silently: a public
refresh trigger is a spend amplifier and deliberately does not exist yet. Episode markers on
the timeline state span, magnitude, and counts, and attribute no cause. The grounding gate
proves every number real and every quote verbatim; it does not prove a truthful quote was
used fairly in context; that failure class is measured separately by the human
misattribution audit, and its automated counterpart belongs to the deferred chat milestone.
The canary pass measures that the walls held on a versioned attack set at a point in time; it
is not a certificate against novel attacks. And the scale claims stop at one box: the seams
state where replicas would slot, and nothing beyond that is claimed until it is built.
