---
title: "Betting Against the Noise"
summary: >-
  Can an RL agent learn Kelly bet-sizing from nothing but its own wins and losses? No — it
  collapses to the minimum bet, and proving why became the result: an oracle control and two
  falsified explanations show the wall is informational. A prize worth ~1% per session, buried
  in noise fifty times larger, carried by hands that almost never occur.
demonstrates: >-
  Adversarial self-falsification, positive and negative controls, and multi-axis risk
  evaluation — PyTorch, Kelly / log-growth analysis.
series: blackjack-rl
seriesOrder: 4
seriesRole: Kelly vs. RL
seriesNote: >-
  The capstone: the edge is real and measured — and provably too thin, rare, and noise-buried
  for end-to-end learning to hear.
links:
  report: /blackjack-betting
  code: /blackjack-rl-code
---

You have a genuine edge on a bet — how much should you wager? There's a formula for the
optimal amount, known since 1956: the Kelly criterion. This study asks whether a model could
learn that sizing rule on its own — from nothing but its own wins and losses — instead of
being handed the formula. Blackjack is the cleanest possible testbed: card counting is a rare
case where the edge can be measured precisely (here, over 20 million hands — break-even lands
at true count +0.76, right where the folklore says) and the optimal bet ladder is cleanly
derivable.

The learned agent never found it. Across longer training, bigger batches, and every standard
fix, it collapsed to the same policy: bet the minimum, every time. It sometimes drifted
through Kelly-shaped sizing curves — an orbit that visits and leaves — but head-to-head, those
wanderings lost to betting flat.

## Testing the failure like a success

A model that fails isn't a finding; the reason is. First, a tempting story: the network's
internal representation, plotted, split into beautiful clean clusters — by bankroll, not by
the edge. Obvious conclusion: it had learned to bet on how much money it had. Then the story
was tested instead of believed. Remove the bankroll input entirely: no change. Retrain across
every bankroll: no change. The beautiful explanation was wrong, twice — nothing wealth-shaped
was load-bearing.

That left two suspects: the machinery or the signal. An oracle control settled it — the same
network fed a denoised reward learns the Kelly ladder immediately and holds it. The wall
wasn't the model. It was the information.

## The information is brutal

Three counts. The prize is tiny: over a 1,000-hand session, perfect sizing beats flat betting
by about 1% of growth. The signal is buried: it must be estimated through per-hand noise
roughly fifty times larger than the strongest edge. And the carriers are rare: the counts
holding most of the edge appear in under 1% of hands. The model isn't under-powered — it's
being asked to hear a whisper, in a storm, that almost never speaks.

The 1956 formula wins by using the same information differently: measure the edge once,
offline, then derive the bet. "The edge is real" and "the edge is learnable from experience"
are different claims, and the gap between them is measurable. When the optimum is derivable,
derive it — and thin, rare, sub-noise edges are exactly what outcome data looks like almost
everywhere people point learning algorithms at money.
