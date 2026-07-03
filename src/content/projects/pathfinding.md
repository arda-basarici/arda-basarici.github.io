---
title: "Learning to Guess the Distance"
summary: >-
  A learned A* heuristic that looked like a wash — until the pooled average was split and two
  opposite effects appeared. One regime-tag feature turns it into 17% less search at a 0.2%
  cost; moved off its training distribution, it fails in two opposite ways. Two axes, never
  collapsed into one score.
demonstrates: >-
  Feature design, leakage guarding codified as tests, two-axis evaluation, and
  distribution-shift analysis — scikit-learn, gradient-boosted trees.
links:
  report: /reports/pathfinding_report.pdf
  code: /pathfinding-code
---

A* finds shortest paths fast when its heuristic — its guess of the distance still to go — is
good. Manhattan distance is the classic guess, but it's blind to walls. Can a model learn a
sharper one, and — the actual question of the project — how do you *know* whether it helped?
Labels are exact (one backward sweep from the goal computes true cost-to-go, so any error is
the model's, not the data's), and everything is measured on two axes never collapsed into one
score: search cost (nodes expanded) versus path quality (optimality gap).

## The average hides two opposite stories

Pooled over both maze types, the first model looked like a non-result: 7.6% fewer nodes at a
4.8% optimality cost. A wash. Split by maze type, it reversed into two real, opposite effects:
a clean win in corridor mazes (−10.9% nodes at 0.0% gap, where Manhattan is a weak guide) and
a real loss in open fields (a 9.6% gap, where Manhattan is already near-exact). Pool two
opposite effects and the average reports that nothing happened. The truth lives within the
groups.

The fix was one feature: global obstacle density — not a better estimate, a **regime tag**
telling the model which world it's in. With it: **17.3% fewer nodes at a 0.2% gap, 97% of
mazes solved optimally**, stable across seeds and confirmed on a 10,000-maze run. Three
features end up doing the work of seven.

## Breaking it on purpose

The two maze generators existed from day one precisely so the model could be trained on one
world and tested on the other. It didn't just get worse off-distribution — it failed in two
*opposite* ways. Trained on open fields, dropped into corridors: **limp** — it under-estimates
the long detours walls force, A* stops trusting it and slides back toward blind search (−2%
nodes, still optimal). Trained on corridors, dropped into open fields: **reckless** — it
over-estimates 99% of cells, making A* greedy: 40% less search, 14% longer paths. Fast, and
wrong.

The quiet tell underneath: off-distribution, the model's feature importances collapse toward
zero. It stops responding to its inputs and recites a mis-scaled answer memorized elsewhere.
A model is a compression of the distribution it trained on, and it's only trustworthy inside
it. "Limp" and "reckless" look nothing alike, but they're the same failure — confidently
applying yesterday's world to today's. The hard part was never training the model; it was
earning the right to say it worked.
