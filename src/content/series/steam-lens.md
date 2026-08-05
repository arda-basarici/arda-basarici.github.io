---
slug: steam-lens
title: 'SteamLens'
blurb: >-
  What do Steam reviews actually praise and criticize and how much trust should you place in the answer? SteamLens is an evaluation-first review analysis system planned across four milestones, the first two delivered. It turns unstructured reviews into measured, aspect-level evidence, then builds the product around a labeler whose quality, cost, and failure modes are published.
demonstrates: >-
  Evaluation-first LLM engineering: a human-anchored gold set, an independently calibrated
  judge model, bootstrap CIs on measured statistics, and an eval harness that gates CI.
  Python, structured extraction at census scale.
order: 1
links:
  code: https://github.com/arda-basarici/steam-lens
roadmap:
  - title: 'The Deployed Product'
    note: >-
      Put the measured pipeline behind a public URL: per-game reports, traceable evidence, budget controls, and an       evaluation gate deciding what is allowed to ship.
  - title: 'Interrogating the Report'
    note: >-
      A grounded chat over labeled structure and verbatim evidence, allowing a finished report to be questioned without letting the model invent its statistics.
---

Most review-analysis products begin with the interface: choose a game, summarize some reviews, ship. SteamLens begins with the harder question: what would make any percentage in that report worth believing?

The system turns unstructured Steam reviews into aspect-level counts, sentiment, and verbatim evidence. But the model doing the reading is not treated as an oracle. Its performance is measured against a human reference, its operating point is selected experimentally, and only one deterministic component is allowed to turn its labels into displayed statistics.

## How it's being built

Evaluation first, deliberately. The obvious way to build this is to write the prompt, ship a
demo, and find out later whether its output was any good. The order here is reversed: before
there was any product surface, there was a hand-labeled reference set, an independently
calibrated judge, and a harness that fails the build when quality moves. That instrument is
what the first milestone delivered, and it is the part that survives a model swap.

What comes next is scoped the same way, one question at a time, each answered on the record.
The second milestone answered the first of those questions: how few reviews a report actually
needs before its numbers stop moving, with the error bars' 95% promise measured rather than
assumed. Next the product itself, behind a public URL. Then a grounded chat that lets you
interrogate a finished report against the labeled corpus rather than against a model's memory.

**Milestones 1 and 2 (extraction and evaluation, then the sampling study) are built and
measured; nothing is deployed yet.** This page will say a system is running when one is.

## What it demonstrates

The engineering is in the places a code reader looks: evals that gate CI rather than decorate
it, a judge treated as an instrument with its own measured error rather than as a second
opinion, statistical integrity enforced by structure so the reference set can't leak into the
numbers it certifies, and boundaries drawn where change is likely (the model provider is the
most obvious thing that will change). Cost decisions are run as experiments, with the
losing options and their margins published.
