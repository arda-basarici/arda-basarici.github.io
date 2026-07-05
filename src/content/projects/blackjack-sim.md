---
title: "Monte Carlo Blackjack Simulator"
summary: >-
  A from-scratch blackjack engine validated against published ground truth before anything was
  built on it: ~80M hands, pluggable strategies, card counting, reproducible by construction.
  The measurement instrument the rest of the arc stands on.
demonstrates: >-
  Simulation engineering, experiment design, and statistical honesty — Python, pytest,
  reproducible by construction.
series: blackjack-rl
seriesOrder: 1
seriesRole: the instrument
seriesNote: >-
  A self-validating engine, checked against published blackjack mathematics — ~80M hands that
  every later claim is measured against.
links:
  report: /reports/blackjack_analysis_report.pdf
  code: https://github.com/arda-basarici/blackjack-sim
---

Every result in the blackjack series rests on one piece of infrastructure: a simulator whose
numbers can be trusted. Blackjack is one of the rare domains with published ground truth —
house edge, dealer bust rate, blackjack frequency are known to decimal places — so the engine
had to validate itself against the literature first. If those numbers didn't match, nothing
downstream would mean anything.

## The design

Any playing strategy — from a hard-coded rule set to a neural network — plugs in through one
method, `decide(state) → action`, against an immutable game state. Betting strategies,
counting systems (Hi-Lo, KO, Omega II), and casino rule sets swap independently. This is what
later made the RL work honest: every learned agent plugs in as a strategy object with no
engine changes, directly comparable to every result here — same instrument, same terms. Runs
are reproducible by construction: fixed seeds, independent random streams per strategy, and
one command that regenerates all ~80 million hands.

## What the instrument showed

- **Strategy is worth ~45 points of house edge.** Basic strategy plays at a 0.45% house edge;
  random play at 45.8%.
- **Avoiding busts is not the goal.** The strategy with the *lowest* bust rate (12.4%, vs.
  basic strategy's 15.8%) loses money twelve times faster. Maximizing expected value is the
  goal; busting less is just one term in it.
- **Betting systems move risk, not expectation.** Flat betting and Martingale lose the same
  money per 1,000 hands (−$45 vs. −$48) — but Martingale ruins 40.1% of sessions to flat's
  1.0%. Expected value and risk of ruin are independent levers; profit is not survival.
- **Counting is the only genuine edge** — roughly +1.3% per dollar wagered on a single deck.
  The information is the edge, not the betting pattern.

Getting there included a correctness audit that caught real, silent bugs — split hands scoring
only the first hand, split aces illegally re-hitting for a phantom ~0.28% of edge. The habit
of auditing the instrument before believing its output became the method for everything that
followed.
