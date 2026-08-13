---
slug: steam-lens
title: 'SteamLens'
seoTitle: 'SteamLens: LLM Aspect Extraction from Steam Reviews'
ogTags: [LLM Evaluation, Sampling, Deployment]
blurb: >-
  What do Steam reviews actually praise and criticize and how much trust should you place in the answer? SteamLens is an evaluation-first review analysis system planned across four milestones and closed complete at the third: the report product is live. It turns unstructured reviews into measured, aspect-level evidence, with the labeler's quality, cost, and failure modes published beside the numbers.
demonstrates: >-
  Type a Steam game name and get an evidence-backed report of what players praise and criticize. Evaluation-first LLM engineering: a human-anchored gold set, an independently calibrated
  judge model, bootstrap CIs on measured statistics, and an eval harness that gates CI,
  carried to production on a self-managed VPS: Docker behind Caddy and Cloudflare,
  approval-gated delivery, spend gates, the instrument's numbers shipped inside the product.
order: 1
links:
  app: https://steamlens.ardabasarici.dev
  code: https://github.com/arda-basarici/steam-lens
---

Most review-analysis products begin with the interface: choose a game, summarize some reviews, ship. SteamLens begins with the harder question: what would make any percentage in that report worth believing?

The system turns unstructured Steam reviews into aspect-level counts, sentiment, and verbatim evidence. But the model doing the reading is not treated as an oracle. Its performance is measured against a human reference, its operating point is selected experimentally, and only one deterministic component is allowed to turn its labels into displayed statistics.

## How it was built

Evaluation first, deliberately. The obvious way to build this is to write the prompt, ship a
demo, and find out later whether its output was any good. The order here is reversed: before
there was any product surface, there was a hand-labeled reference set, an independently
calibrated judge, and a harness that fails the build when quality moves. That instrument is
what the first milestone delivered, and it is the part that survives a model swap.

The rest was scoped the same way, one question at a time, each answered on the record. The
second milestone answered how few reviews a report actually needs before its numbers stop
moving, with the error bars' 95% promise measured rather than assumed. The third put the
product behind a public URL: type a game name, watch the analysis narrate itself live, and
read a report whose narrative cannot introduce numbers its own pipeline didn't compute.
The instrument's error rates display in the report's own trust panel, admission gates
decide who may start a paid analysis, and the delivery pipeline ships only what a
human approved.

**Milestones 1–3 (extraction and evaluation, the sampling study, deployment) are built,
measured, and live at [steamlens.ardabasarici.dev](https://steamlens.ardabasarici.dev).**
The fourth, the grounded report-interrogation chat, is designed and deliberately deferred:
taking it up is weighed against new work rather than assumed.

## What it demonstrates

The engineering is in the places a code reader looks: evals that gate CI rather than decorate
it, a judge treated as an instrument with its own measured error rather than as a second
opinion, statistical integrity enforced by structure so the reference set can't leak into the
numbers it certifies, and boundaries drawn where change is likely (the model provider is the
most obvious thing that will change). Cost decisions are run as experiments, with the
losing options and their margins published. The deployment keeps the same discipline:
explicit trust boundaries (an origin that answers only Cloudflare, a deploy key that can run
one script and nothing else), spend journaled as billed truth, and an ops dashboard that is
itself a public page over the same store.
