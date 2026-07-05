---
title: "When a Value Won't Settle"
description: >-
  Six ideas sharpened by a stubborn DQN investigation — encoding, averaging, risk, feedback
  loops, objective vs. estimator, and the irreducible floor — each traced from first instinct
  to its correction.
date: 2026-07-05
---

*A conceptual case study in reinforcement learning.*

This is not a report on a project. It is a record of how a set of ideas got sharpened.

The occasion was an investigation into why a neural value-based agent (a DQN) underperformed a
simple tabular agent on a small, fully-known problem — but the project is only the soil here,
not the subject. What follows are the concepts that surfaced while staring at an estimate that
refused to converge, and the path each one took from a first rough instinct to something
precise. The value is in the *turns* — the places where an intuition was almost right, went
one step wrong, and had to be corrected. Each arc ends where the idea connects to something
the field already named, because a recurring experience in this investigation was reaching a
technique by instinct and only afterward learning it had a name.

The arcs follow the order the investigation took them up, weighted toward the moments that
taught the most — not everything is here, and not at equal length. The shape of the whole is
worth saying in advance: it began as a question about *representation* — was the network
simply unable to express the answer? — and only when that was ruled out did the real subject
emerge, which was variance, and the many places it does its damage.

## 1. An encoding is a hypothesis about how values relate

The investigation opened with a symptom that looked damning. The network's estimates smeared:
fed the player's hand total as a single number, it responded to a total of sixteen and a total
of seventeen as though they were nearly the same situation, blurring across the exact places
where the correct action flips. The optimal policy for this game is not smooth — neighbouring
totals can demand opposite actions — and the first reading of the smear was bleak: if the
network cannot draw a sharp line where one is needed, perhaps a network is simply the wrong
instrument for a problem whose answer is a table of sharp boundaries.

That conclusion was too strong, and the claim under it — that you cannot have smooth
interpolation and sharp boundaries from the same function — is simply false. Networks draw
sharp boundaries constantly; every classifier that cleanly separates one category from another
is doing exactly that. A network can represent a near-step from one action to another between
two adjacent totals. The smearing was not evidence that networks cannot be sharp. It was
evidence that *this* network had been told the wrong thing about its input. Feeding the total
as a single scalar — one number whose magnitude is the value — means the first thing the
network computes is a weight times that number, a quantity that necessarily changes smoothly
as the total changes. The scalar input does not merely permit smoothness; it imposes it. The
network was forced to respond similarly to neighbouring totals, and the smear was that
imposition showing through exactly where the true policy was sharp.

A second idea arrived in the same spirit and is worth recording because it failed for an
instructive reason. Since the answer is naturally a grid — hand total against dealer card —
why not feed the state as a grid, a small image, and let the network read it that way? The
trouble is that a grid invites the assumptions a convolutional reading makes: that nearby
cells are related, and that a pattern means the same thing wherever it appears. Neither holds
here. Adjacency in the table is exactly where the action flips, and absolute position in the
table is everything, not a motif to be recognised anywhere. Worse, shaping the input to mirror
the known answer imports the structure of the *solution* into the design of the *inputs* —
which builds a method that only works when you already possess the answer to copy, the
opposite of what learning is for.

What both missteps share, and what the correction crystallised, is that an encoding is a
*hypothesis about how a feature's values relate to one another*. A scalar says: these values
lie on a line, nearby means similar, the relationship is smooth and ordered. One distinct
input per value says: these are separate categories with no built-in relationship, and any can
differ from any other as sharply as the data demands. Choosing between them is choosing what
to tell the network about the structure of the problem before it sees a single example. And
the right choice follows from one question — does the feature's *meaning*, the correct action,
vary smoothly with its value, or jump? The hand total jumps, so it wants the categorical
encoding; so does the dealer's card. A quantity that genuinely does vary smoothly — a running
count, where neighbouring values really do behave alike — wants the scalar. The same problem
can hold features demanding opposite encodings, because the features have opposite structure.

These are named choices, and the space is larger than the two that mattered here. The
categorical encoding is one-hot; between it and the scalar sits the thermometer or ordinal
encoding, which keeps order while allowing sharp per-threshold cuts; for features that wrap,
like time of day or an angle, a cyclic encoding places the values on a circle so the ends
meet; and where a feature has many values whose relationships are genuinely unknown, an
embedding *learns* the relationships rather than asserting them. That last one marks the real
boundary of the lesson. Handing a network raw, unstructured input and letting it discover its
own features is the right instinct exactly when the good features are unknown — the domain of
text and images, where no one can hand-engineer the right representation. It is the wrong
instinct when the sufficient features are already known and few, because then raw input only
asks the network to rediscover, badly, a structure you could have simply handed it.

One more thing earned the encoding question its place at the start of the story: the fix
worked and the problem stayed. Giving the totals their categorical encoding removed the
smearing it was meant to remove — and the agent's overall agreement with the known-correct
policy barely moved. A fix that does not fix tells you something the symptom alone could not:
the thing you repaired was not the bottleneck. The representation was a real issue, and it was
not the disease. That negative result is what turned the investigation away from
representation and toward the learning dynamics — the territory the rest of these arcs explore.

## 2. You can average noise away, but only if it is noise around a settling point

With representation ruled out and the instability now clearly visible — one action's estimate
swinging violently while the others sat still — the next idea borrowed a tool from a different
field: keep a moving average of recent estimates, the way a trailing average smooths a
financial chart, always covering the most recent stretch of training and sliding forward as
the agent learns. The reasoning was that since the agent improves over time, the recent window
reflects the better, later state of the model, so a trailing average should track that
improvement rather than being dragged back by the noisy early days.

The reasoning is sound — for a quantity that is improving toward a stable point. A trailing
window discards stale early estimates and keeps the recent, better ones, so it follows the
trend instead of being anchored to the past. The trouble is the premise. For the calm actions,
which had converged, "recent is better" held. For the volatile action — the one that mattered —
it did not, because that estimate was not improving at all. It was oscillating around a fixed
centre, as wild late in training as early. There was no trend to track, only noise to average.
And against pure oscillation a short trailing window is the wrong instrument: it captures only
a fragment of the swing, so it averages out *less* of the noise than a longer window would.
The intuition was optimised for the converging case and was exactly backwards for the
oscillating one — for a quantity that won't settle, you want to average over *more* of the
swing, not over the most recent slice of it.

The sharpened understanding separates two questions that "use a moving average" had run
together: whether the quantity is *converging* or merely *oscillating*, and accordingly
whether *recent* or *more* is what you want. A tabular running mean is guaranteed to converge —
each new sample pulls it monotonically toward the truth, the noise shrinking with the square
root of the sample count. Function approximation with a bootstrapped, moving target carries no
such guarantee, and here it simply did not converge. Against a converging quantity, favour
recent. Against an oscillating one, favour breadth. The window length is not a free knob; it
should be matched to whether there is a trend or only a swing.

A second, subtler version of the same idea proved more interesting than smoothing the final
readout. Averaging the *output* at the end is cosmetic — it cleans up a finished-but-noisy
estimate without changing how the estimate was formed. But folding the average into the
*target the agent learns from* changes the training dynamics themselves: a smoothed target
stops chasing the instantaneous noisy estimate, which can damp the very instability that
generates the oscillation. The estimate might then converge rather than swing — better updates
begetting better updates, the virtuous mirror of the vicious cycle. This is not a fringe
trick; a slowly-averaged copy of the network used to compute the learning target is precisely
what a target network is, and the soft, continuously-averaged form of it is Polyak averaging —
the same idea that recurs as weight averaging across modern training under other names. The
instinct "average the recent estimates" was reaching, without the vocabulary, for the
distinction between smoothing an answer and stabilising the process that produces it.

## 3. Risk is already inside the expected value

The volatile action raised a more basic question: does the model *know* it is taking a risk?
When the bet paid off big, did the agent register "this is good"; when it lost big, "this is
bad"; and was it aware, somehow, that the swing itself was the point?

The honest answer is that the model has no concept of risk at all. It does not perceive
volatility, does not flinch at a loss, does not represent the spread of outcomes. All it ever
does is average the rewards it sees. Its estimate of an action's value is the running mean of
what followed that action — and a mean carries no memory of how wild the road to it was.
Variance is simply invisible to it.

And yet — this is the turn — risk is *fully accounted for* anyway, without anything having to
consider it. The expected value of an action already weights every outcome by how often it
happens. The downside is in there, counted at its true frequency. If an action were too
dangerous to be worth it, the losses would drag its probability-weighted average below the
alternative, and the expected value would say so on its own. Risk is not considered separately
because it has already done its work on the mean. The model does not need to think about risk;
if it computes the average correctly, the risk is already priced in.

So the apparent paradox dissolves: the model ignores risk *and* risk is fully handled,
simultaneously, because the quantity it estimates already contains it. Which relocates the
real trouble precisely. The volatile action is not hard to value because the model is
risk-blind. It is hard to value because high variance makes the *mean itself* difficult to
estimate — to average large two-sided swings down to a stable number, you need many samples,
and until you have them the running average is yanked around by whichever outcomes happened to
arrive recently. The bug is estimation difficulty, not risk-blindness. Those feel similar and
are completely different diagnoses.

There is a real corner of the field where the rejected instinct becomes correct, and naming it
marks the boundary cleanly. When variance is not merely a nuisance for estimating the mean but
an *objective in its own right* — when a single bad swing can end the game, so you genuinely
should not maximise the average — the right approach does weigh risk separately from reward.
This is the domain of risk-sensitive reinforcement learning and, in its fuller form,
distributional reinforcement learning, which learns the entire distribution of returns rather
than only its mean. The instinct "the model should consider risk, not just the average" is
wrong when you play many rounds and variance washes out, and right the moment ruin enters —
when a loss is not just a number but the end. Knowing which regime you are in is the
difference between a sound objective and a corrupted one.

## 4. In reinforcement learning, the estimate chooses its own next lesson

A worry arose about timing: if the agent gets a lucky streak early and briefly believes the
volatile action is wonderful, does that early misjudgment poison the rest of training? The
intuition was that a wrong belief formed at one moment does not stay contained — it propagates
forward.

That intuition is correct, and the reason it is correct is sharper and more specific than "the
number is temporarily wrong." A value estimate in reinforcement learning is not an inert
readout. It decides which action the agent takes. And the action the agent takes decides which
experience it collects next. So a lucky early estimate inflates the agent's belief in the
action, which makes it take that action more, which means it gathers more experience of that
action and less of the alternative — and if the new experience is itself high-variance, the
estimate keeps getting thrown around, and the agent keeps acting on the thrown-around
estimate. The error does not merely persist; it steers the data collection that feeds it.

This is the feature that distinguishes reinforcement learning from ordinary supervised
learning. In supervised learning a noisy label is just a noisy label — it sits in the dataset
and the next example is unaffected. In reinforcement learning the estimate and the data form a
closed loop: estimate steers behaviour, behaviour steers data, data steers estimate. A
high-variance action is uniquely destabilising precisely because its noise enters this loop
rather than sitting quietly in an output. The instability is self-reinforcing in a way that
has no analogue in a fixed dataset.

The same loop, seen earlier in a different method, had produced the opposite symptom — which
is what revealed it as a single underlying mechanism rather than two unrelated bugs. In a
tabular version of the same problem, the loop had *suppressed* the volatile action:
under-explored, so under-valued, so under-chosen, so under-explored further — a
self-reinforcing starvation. In the neural version the same loop *amplified* the action's
variance into a sustained oscillation. Suppression and amplification look nothing alike on a
chart, but they are the same closed circuit — estimate, action, data, estimate — driven by the
same volatile action. The field's name for the cluster of conditions that make this loop
dangerous, when function approximation and bootstrapping and off-policy action selection
combine, is the "deadly triad." But the intuition came first, from simply noticing that in
this kind of learning, what you currently believe determines what you will next get to see.

## 5. The objective and the estimator are different things

By this point the failure was well understood, and the question turned practical: what can
actually be done? The first proposal was to *teach the model about the risk* — to feed the
reward in a way that reflected not just the payoff but the danger attached to it, so the agent
would stop over-committing to a volatile bet.

The instinct contained its own correction, and it surfaced almost immediately: if you bake
risk into the reward, the agent is no longer learning from the experiment — it is learning
from a number you shaped by hand. That hesitation was the right one to trust. The deeper
problem with the idea is that it quietly changes *what is being estimated*. The true expected
value of the volatile action is a specific, correct number. Penalise the action for being
volatile and the estimate now converges to something lower than the truth — a stable answer to
the wrong question. You would trade an unstable correct target for a stable incorrect one, and
teach the agent to avoid good-but-volatile choices it should be taking.

The second proposal was better, and pointed somewhere real: leave the reward alone, but temper
the *updates* — when an outcome was a big, lucky swing, move the weights only a little; when
it was a steady, reliable result, move them more. The sharpened understanding behind this is a
distinction that turned out to organise the entire investigation: the difference between the
*objective* — the thing you are trying to estimate — and the *estimator* — the process by
which you estimate it. The instability was never a problem with the objective. The target was
correct. The problem lived entirely in the estimator: a process that could not hold a steady
value for a noisy quantity. And that reframes every fix. You do not stabilise a shaky estimate
by moving the target; you stabilise it by making the *estimation* more robust to noise — by
refusing to let any single surprising sample dominate the update. The objective stays
untouched.

This is exactly what a family of standard techniques embodies, though the connection only
becomes obvious once the objective/estimator split is in hand. Robust loss functions — the
Huber loss is the common one — and gradient or temporal-difference clipping all do the same
thing: they bound how hard a single large error is allowed to move the weights, so one outlier
surprise produces a capped, not catastrophic, update. What unites them is a discipline of
*never touching the target*: the quantity being estimated remains the true mean; only the
estimator's vulnerability to noisy samples is reduced. The instinct to "include risk in the
reward" and the correct fix "make the estimator robust to noise" feel adjacent, but they sit
on opposite sides of this line — one corrupts the objective, the other hardens the estimator.
Telling them apart is the whole skill.

## 6. Robustness reduces the variance of an estimate; it cannot add signal

Every fix considered so far — bounding the influence of large errors, smoothing the target,
averaging the weights — shared a hope: that with the right stabilisation, the estimate would
finally settle onto the truth and the gap to the simpler agent would close. Tried in
combination, with the standard robust loss already quietly in place and a smoothed target
added, the swings did calm somewhat. The gap did not close.

That outcome is the most important concept in the investigation, and it is the one that no
technique can argue with. Stabilising an estimator reduces the *variance of the estimate* — it
stops the value from swinging, lets it converge, extracts the available signal as cleanly as
possible. What it cannot do is *add signal that is not in the data*. The true difference
between the volatile action and its alternative was tiny; the rewards from which that
difference had to be inferred were large and two-sided. A small signal read off a large noise
is, past a point, simply not identifiable — and no amount of estimator robustness changes the
information content of the reward. Better estimation reaches the best the data allows; it does
not improve the data.

This gives the gap a clean decomposition, and the decomposition is the finding. Part of the
shortfall was *fixable instability* — self-inflicted oscillation that stabilisation genuinely
removes. The remainder is an *irreducible floor* — the part set by the signal-to-noise ratio
of the problem itself, which is a property of the problem and not of the method. The same
floor had appeared in the tabular agent, where the residual errors after full coverage were
exactly the decisions whose two actions were genuinely near-tied — indistinguishable not
because the agent was weak but because the gap was smaller than any finite sample could
resolve. Two entirely different methods hit the same wall, which is how you know the wall
belongs to the problem.

The floor also reaches up and contaminates the very number used to measure success. If the
estimate is a snapshot of something still swinging, then the reported performance is itself a
draw from that swing — which is why, across many configurations, the results were
statistically indistinguishable from one another: their differences were smaller than the
noise in measuring them. This is the same reason one runs a configuration under several random
seeds rather than one. A single seed yields an anecdote; only the spread across seeds reveals
the noise floor, separates a property of the method from an accident of one run, and tells you
which apparent differences are real. The discipline at the end is the same as at the
beginning: a difference smaller than the noise that produced it is not a difference. Knowing
where that floor sits — and declining to claim anything beneath it — is not a limitation of
the analysis. It is the analysis.

## The thread

The investigation began as a question about representation — was the network simply unable to
express the answer? — and the first work went into fixing how the inputs were encoded. Only
when that fix worked and the problem survived did the real subject emerge: variance, and the
several places it does its harm. From there a single villain runs through every arc, but each
arc is really about *where* the variance does its damage and what follows from locating it
correctly. It does not live in the objective — the expected value already prices risk, so the
fix is never to move the target. It lives in the estimator, and in reinforcement learning the
estimator is wired into a feedback loop where it chooses its own next data, which is what
turns ordinary noise into self-reinforcing instability. That instability can be damped — by
hardening the estimator and by stabilising the process rather than smoothing the output — but
only down to a floor set by the information in the data, which no method can cross and which
the measurement itself inherits.

The through-line of the reasoning was a single repeated move: when something looked broken,
ask whether the trouble was in *what* was being estimated or in *how* — in the representation,
the objective, the estimator, or the data itself — and resist every fix that answered the
wrong one. Most of the wrong first guesses failed that test: a network declared the wrong tool
when the encoding was wrong; a reward reshaped to fix an estimator; a trailing average aimed
at a quantity that wasn't converging. The corrections, each time, came from putting the
trouble back where it belonged.
