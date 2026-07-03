---
title: "From Table to Network"
summary: >-
  Does neural generalization repair the table's coverage gaps? Some — and it distorts the sharp
  boundaries in exchange, paying for smoothness exactly where one point flips the correct
  action. Capability is a trade, not an upgrade; blackjack is clean enough to measure the
  exchange.
demonstrates: >-
  PyTorch DQN engineering, controlled one-variable ablations, and measurement discipline under
  seed variance.
series: blackjack-rl
seriesOrder: 3
seriesRole: DQN vs. table
seriesNote: >-
  A network repairs the table's coverage gaps — and pays for the smoothness exactly at the
  policy's sharp boundaries.
links:
  report: /reports/from-table-to-network.pdf
  code: /blackjack-rl-code
---

The policy audit ended with a diagnosis: the tabular learner's errors pool in coverage-starved
cells. A neural network is the natural thing to test against that — not because blackjack
needs deep learning, but because a network shares information across similar states instead of
learning each one independently. Generalization should fill the gaps the table left empty.
That was the hypothesis. What it bought wasn't a clean fix.

## The trade, measured

The table's gaps were empty cells — but a network doesn't blur the empty ones, it blurs the
sharp ones. Blackjack's optimal policy isn't smooth: a total one point higher can flip the
correct action. A table stores each cell independently, so a hard boundary costs it nothing; a
network learns one continuous function over the grid, pressuring neighbouring states to agree
— and pays for that at the sharp edges.

The numbers: the tabular learner reaches ~92.8% agreement with basic strategy; a naive DQN
starts near 82.1%; the best configuration claws back to ~91.1% — but only under a full stack
of stabilizers (Double DQN, target networks, weight averaging, careful readout), while the
table is simple and direct. Complete the game — add split and surrender, growing the grid from
240 to 340 cells with hard-edged actions — and the DQN falls ~11 points behind.

## The sharpest single result

Two networks trained identically, differing only in input encoding: smooth (totals as ordered
numbers) vs. sharp (totals as separate categories), with the *double* action masked until
partway through training. While only hit and stand existed, the smooth encoding led —
interpolation is an asset when boundaries are soft. The instant the double entered — a narrow,
hard-edged decision — the sharp encoding overtook it and never gave the lead back. The cost of
smooth approximation stayed invisible until a hard boundary tested it.

The lesson isn't "simpler is better." It's that capability is a trade, never a free upgrade:
the table is not more intelligent — it is better matched to the shape of the problem. The same
generalization that costs you at sharp boundaries is exactly what you need when the state
space outgrows any table — which is where the arc goes next.
