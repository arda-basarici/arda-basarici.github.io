---
title: "The Policy Audit"
summary: >-
  Can tabular Monte-Carlo control rediscover blackjack's proven-optimal strategy from win/loss
  alone? ~93% — and the audit of the missing 7% is the real result. The agent isn't wrong where
  it's confident; it's wrong where it barely looked — and forcing coverage collapses the genuine
  disagreements 30 → 9, all near-ties.
demonstrates: >-
  Reference-anchored evaluation design, severity-over-count analysis, and pre-registered
  falsifiable predictions — tabular RL, Python.
series: blackjack-rl
seriesOrder: 2
seriesRole: tabular control
seriesNote: >-
  Tabular Monte-Carlo vs. the proven-optimal table: ~93% rediscovered, and the missing part
  traced to coverage, not method.
links:
  report: /reports/blackjack-rl-policy-audit.pdf
  code: https://github.com/arda-basarici/blackjack-rl
---

Blackjack's optimal strategy is exactly computable — a complete, trustworthy answer key. That
makes it a rare place to audit a learning agent properly: not *whether* tabular Monte-Carlo
control converges toward expert play from nothing but end-of-hand win/loss (it does), but
*where it falls short and why*, with every disagreement traced to a named cause.

## What the audit found

The agent rediscovers about **93%** of the table. That pooled number is true and nearly
useless. Conditioned on decision type, the error is anything but uniform — a 16× spread, with
hard totals near-perfect and the mistakes pooled in soft hands and doubles. Severity spans a
twenty-fold range: the game's most balanced decision (hard 16 vs. 10) is "wrong" on an EV gap
of ~0.001 after thousands of visits, while the worst outlier (soft 16 vs. 4) had its correct
action sampled in only ~23% of the state's rare visits.

The agent isn't wrong where it's confident — it's wrong where it barely looked.

## The trap, and the capstone

The obvious fix fails: raising exploration from 0.1 to 0.3 *relocates* error rather than
shrinking it, correcting roughly as many cells as it spoils. An on-policy learner's estimates
reflect the policy it plays — under-visited states stay badly estimated, a self-reinforcing
starvation that more randomness doesn't cure.

So the capstone was designed as a falsifiable prediction: if the residual is really coverage,
then *forcing* coverage — exploring starts, every state–action pair seeded uniformly — should
collapse the genuine disagreements. It did: **30 → 9**, the costly tail gone, every survivor a
near-tie now backed by ample visits. And usefully, not *everything* vanished — had it, the
coverage story would have been too clean to trust. What remained was the irreducible floor of
decisions that barely matter.

The residual was the cost of experience, not the method. The habits this study forced —
conditioning rather than pooling, severity over count, predictions locked before the run —
carry through the rest of the arc, where the answer key is progressively taken away.
