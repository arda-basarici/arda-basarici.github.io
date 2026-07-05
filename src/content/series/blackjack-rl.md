---
title: "Blackjack RL"
blurb: >-
  A four-part research arc: a measurement instrument that had to earn trust first, then one
  question asked three times with the ground truth progressively removed — can learning
  rediscover optimal play as a table, as a network, and finally as a bet-sizing rule whose
  signal is buried fifty-deep in per-hand noise?
demonstrates: >-
  Evaluation-first ML end-to-end — instrument validation, reference-anchored audits,
  controlled ablations, adversarial self-falsification — Python, PyTorch, tabular and deep RL.
---

Four studies, one experimental design: give a learning system a domain where the truth is
exactly known, ask whether it can rediscover what we can prove — and then ask again, each time
with a piece of the answer key taken away.

Blackjack is the rare domain that makes this honest. Optimal play is exactly computable, the
house edge is published to decimal places, and card counting provides a genuine, precisely
measurable edge. Every claim in the series can be checked against ground truth — never "the
agent seems good," always a measured distance from provably optimal.

## How the arc unfolds

It starts with the **instrument**, because if the measuring device is wrong, nothing built on
it means anything: a from-scratch simulator validated against published blackjack mathematics
across ~80 million hands, which every later result is measured on.

Then the question, three times. With the **full answer key** on the table, tabular Monte-Carlo
control rediscovers ~93% of optimal play — and the audit traces the missing 7% to coverage,
not method. With the key held at arm's length, a **neural network** takes on the same game:
generalization repairs the table's coverage gaps and pays for the smoothness exactly at the
policy's sharp boundaries — capability as a measured trade, not an upgrade. And finally with
**no key at all**, an agent must learn bet sizing over whole sessions, where the optimum is
derivable (Kelly, 1956) but was never learned — and proving *why* it fails, with an oracle
control and two falsified explanations, became the result.

## What it demonstrates end-to-end

The series is less about blackjack than about a method: validate the instrument before
believing its output; audit against a reference instead of a vibe; treat capability as a
trade to be measured; and when something fails, test the failure like a success — controls,
falsifiable predictions, and the honest gap between "the effect is real" and "the effect is
learnable."
