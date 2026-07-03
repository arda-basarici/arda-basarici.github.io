---
title: "Steam Review Intelligence"
summary: >-
  What does a Steam rating actually measure? 298k reviews, 50 games, 30 languages — four
  findings about when players review, whether they stay, how they write, and who they are, each
  forced to reproduce game-by-game before being believed. One 42-point "finding" died under
  that test; that's why the survivors can be trusted.
demonstrates: >-
  Data engineering — idempotent resumable ingestion, pandera data contracts, atomic Parquet —
  and statistical hygiene at N≈300k, where everything is "significant".
links:
  report: /reports/steam_review_report.pdf
  code: /steam-reviews-code
---

Every game wears one number — "85% positive" — and it gets read as a verdict. This project
takes that number apart. Across 298,553 reviews from 50 games in 30 languages, the headline
score turns out to compress away *when* a player reviewed, *whether they stayed*, *how* they
wrote, and *who* they were.

## The method is the finding

Pooling 50 unequal games invites Simpson's paradox — a "pattern" no single game contains,
manufactured by whichever games dominate the sample. So every claim had to pass the
**within-game test**: computed inside each game first, believed only if it reproduces
title by title. The test earned its keep immediately: "Early Access reviews are harsher"
showed a 42-point effect pooled (44.8% vs. 87%) — and evaporated within-game. A finding that
big, killed by one honest check.

Four survived, each holding in 43–47 of the qualifying games:

- **When — the refund window.** Recommendation climbs through the sub-2-hour buckets (51.6% →
  56.3% → 68.9%) then locks flat above it (86.7%, 88.4%, 84.2%). A cliff at Steam's 2-hour
  refund deadline, not a slope.
- **Whether they stayed — a review is a goodbye.** Recommenders keep playing (median ~3h more
  after reviewing); 63% of negative reviewers never meaningfully return. A recommendation is a
  love letter written mid-relationship; a pan is a goodbye note on the way out.
- **How they wrote — negativity is verbose.** Median 83 characters for negative reviews vs. 35
  for positive. A positive review can be a reflex; a negative one tends to be an argument.
- **Who they were — the veteran is harsher.** Players with 200+ games recommend at 78.7% vs.
  92.7% for the smallest libraries — and the gap holds on the *same game*, ruling out
  selection.

## What it refused to claim

A whole chapter documents the discards: a review-bomb with no baseline to measure it against,
a price signal too fragile to trust, a helpfulness score that turned out hollow. What an
analysis refuses to claim is part of its credibility. And one honest boundary on the whole
project: we counted words; we never read them — the natural-language layer is future work.

Underneath it all: a three-module pipeline (fetch = I/O, clean = transform, validate = assert)
with resumable at-least-once ingestion from the Steam API, pandera schema contracts gating
atomic Parquet writes, and ~71 tests. Reproducible from two commands.
