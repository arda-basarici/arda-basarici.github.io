---
title: "The Policy Audit"
summary: >-
  Can tabular Monte-Carlo control rediscover blackjack's proven-optimal strategy table from
  win/loss alone? It recovers ~93% — and forcing coverage of rare states collapses the genuine
  disagreements 30 → 9, all near-ties: the residual was the cost of experience, not the method.
series: blackjack-rl
seriesOrder: 2
figure: ../../assets/projects/policy-audit.png
figureAlt: >-
  Bar charts: forcing coverage with exploring starts collapses genuine disagreements with basic
  strategy across hard/soft/pair hands, and the largest genuine EV gap falls from 0.217 to 0.059.
links:
  report: /policy-audit
  code: /blackjack-rl-code
---

Can tabular Monte-Carlo control rediscover blackjack's proven-optimal strategy table from
win/loss alone? It recovers ~93% — and forcing coverage of rare states collapses the genuine
disagreements 30 → 9, all near-ties: the residual was the cost of experience, not the method.

<!-- TODO(write-up): full story — the finding, why it's hard, what it demonstrates. -->
