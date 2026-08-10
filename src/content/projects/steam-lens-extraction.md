---
slug: steam-lens-extraction
title: 'The Instrument Around the Model'
seoTitle: 'Evaluating LLM Extraction Against a Human Gold Set'
ogTags: [Gold Set, LLM-as-Judge, Aspect Extraction]
summary: >-
  Does the model reading 135,260 Steam reviews actually work, and how would anyone know? Every
  usable review across 49 games, labeled end to end for $3.80, with the labeler's measured
  performance published beside the numbers: F1 0.766 [0.713–0.811] against a human-adjudicated
  reference, measured because a model call alone doesn't tell you whether a pipeline can be
  trusted.
demonstrates: >-
  Versioned aspect extraction, comparative model selection, census-scale data buying, and human-anchored evaluation: 135,260 usable reviews, a $3.80 census, production F1 0.766 [0.713–0.811], and every published number regenerated from the run that produced it.
series: steam-lens
seriesOrder: 1
seriesRole: extraction + evaluation
seriesNote: >-
  The measuring device before the product: a census labeled for $3.80, and its error measured
  against human judgment rather than asserted.
links:
  report: /reports/the-instrument-around-the-model.pdf
  code: https://github.com/arda-basarici/steam-lens
date: 2026-07-31
---

SteamLens will eventually be deployed. Milestone 1, extraction and evaluation, is the system that decides whether the product’s numbers deserve to exist.

The report follows four investigations: what the system should count, which model should do the reading, how a census can become a trustworthy artifact, and how the resulting numbers can be evaluated without letting the pipeline grade its own homework. The conclusion is the project’s central claim: the model call was the smallest part; the instrument around it was the work.

## What the census cost, and what it's worth

**135,260 usable reviews across 49 games were processed end to end:** 135,259 successfully labeled, and one review the provider persistently refused, logged rather than silently dropped. The complete labeling bill was **$3.80.**

The resulting artifact contains **170,532 aspect mentions and 163,842 stored evidence spans**, with zero non-verbatim spans surviving to storage. Every label records the model that produced it and the version of the codebook it was read under (the codebook is the instruction set defining each aspect's boundaries), and every displayed statistic is produced by one deterministic fold. The value is not merely that the corpus was labeled cheaply; it is that the corpus became a versioned measurement record.

## Four investigations

The vocabulary investigation replaced unstable open extraction with a hybrid system: **51 pinned aspects** for stable counting, plus a candidate channel for concepts the schema misses.

The labeler investigation compared **14 models across 32 full evaluation runs**, each candidate labeling the complete reference set, with frozen metrics, paired bootstrap comparisons, and per-model batch-size tuning. The selected budget model was not declared “best”: a stronger alternative exists under matched conditions, and at the selected model's tuned settings the remaining gap was too small for the available sample to resolve.

The scale investigation turned an intended sample into a census once measurement showed that the entire usable pool cost single-digit dollars. Durable caching, a purchase ledger, refusal-as-data, budget guards, and resumable execution allowed the buy to survive both a provider refusal and a live SQLite contention failure.

The trust investigation anchored the system to a **250-review human-adjudicated gold set**, calibrated an independent second annotator, audited a separate 1,000-review census sample, and uncovered a more important operational finding: identical temperature-zero requests moved by roughly **0.02–0.03 F1** across buy dates. The labeler is therefore treated as a point-in-time instrument, not a permanently stable piece of code.

## What it refuses to claim

The report does not claim that the labels are simply right; it measures their performance against human judgment. The chosen model is never called the best, since a stronger alternative performed better under matched conditions. Agreement between models is not passed off as accuracy, because human adjudication of the disagreements remains pending, and reviews are read as what they are: the people who chose to write one, not a representative sample of all players. Nothing is claimed to be deployed yet.
