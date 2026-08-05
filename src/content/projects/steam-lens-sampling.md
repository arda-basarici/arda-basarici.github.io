---
slug: steam-lens-sampling
title: 'Sampling Without Random Access'
summary: >-
  A live product cannot spend a census on every query. This milestone measures that it never
  has to: a fresh game's report needs at most 2,000 fetched reviews, and every displayed share
  carries an interval whose 95% promise is itself measured — 0.958 coverage on-corpus, 0.971 on
  the held-out check — with the price of every sampling shortcut priced rather than assumed.
demonstrates: >-
  Statistical validation against known ground truth: an offline race of implementable draws against uniform sampling, measured interval coverage instead of an assumed 95%, a held-out size rule, contamination floors, and two human checks bounding the reference's own error.
series: steam-lens
seriesOrder: 2
seriesRole: the sampling study
seriesNote: >-
  How few reviews a report actually needs: a size rule validated on games it never trained on,
  with the distance from uniform sampling measured and priced instead of pretended away.
links:
  report: /reports/sampling-without-random-access.pdf
  code: https://github.com/arda-basarici/steam-lens
date: 2026-08-05
---

Milestone 1 left SteamLens with a census: 135,260 labeled reviews across 49 games, where the true share of anything is computable. A live product cannot buy that per query, and Steam offers no uniform random access — so SteamLens does not pretend that it does: the resulting bias is measured, and its cost is included in the reported uncertainty. Milestone 2 spends the census as an answer key — every implementable way of fetching, sizing, and bounding a sample raced offline against ground truth — and replaces the founding plan's guesses with measurements, or with a named refusal to claim.

## The findings, first

**A fresh game's report needs at most 2,000 fetched reviews.** Pools of 2,000 or fewer are read whole and quoted exactly; larger pools are sampled at n = 1,000, and every displayed share carries an interval whose 95% promise is itself measured: **0.958 calibration coverage on-corpus, 0.971 on the held-out check** — three fresh games the rule had never seen, two reproduced exactly, one sampled.

## Five questions

**1 · Steam gives no random access — how do we pick reviews?** Every implementable draw was raced against true uniform sampling, offline, where the census knows the right answer. Time-proportional windowed drawing won on every slice; Steam's native newest-first order survives only as a fallback with a disclosed, separately priced bias.

**2 · How many reviews do we need?** Sample 1,000; read everything at 2,000 or fewer. Validated held-out on three fresh games.

**3 · How do we keep the error bars honest?** More data quietly makes a textbook interval _less_ honest here, because the draw's bias does not shrink with sample size. The shipped bar adds a measured price for that bias, switched on only for burst-shaped pools; a 24-game long-tail probe measured overwhelmingly calm, so deployed reports should mostly quote plain Wilson bars.

**4 · What happens when the sample is polluted?** The certified promise survives 2% review-bomb material and is broken by 5% — and the error bars break before the numbers look wrong. Steam's default bomb-window blanking is thereby certified load-bearing, not cosmetic.

**5 · How good is the ground truth itself?** Two human checks measured the machine reference's imperfections: review-level agreement 0.557 [0.477–0.634], reading lowest on the material the study newly trusts, and 11.6% [6.6–19.6] of displayed claims misattributed, nearly all sibling-label mix-ups. Polarity is near-clean; label ownership at family boundaries is the soft spot.

## What it refuses to claim

The sampling is not uniform — its deviation from uniform is measured and priced, not eliminated. The spiky-regime allowance is validated on-corpus only. The gap between 2% and 5% contamination is unresolved on purpose: no product decision changes inside it, so resolution was deliberately not bought. A bomb nobody marked bypasses the blanking and cannot be counted by any query. The reference's imperfection is bounded, not absent — and agreement is not accuracy; adjudicating who errs where the readers part is still pending. Nothing is deployed yet.
