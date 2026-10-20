---
slug: leave-impact-agent-investigator
title: 'Where the Single Call Stops'
seoTitle: 'Evaluating an LLM Agent Against Full-Context and Single-Shot Baselines Under a Fixed Output Budget'
ogSubtitle: An agent against one-call readers under one output budget
ogTags: [LLM Agent, Preregistered, Output Budget, LangGraph]
summary: >-
  Does an agent's reading loop earn its cost against one call shown every document?
  Four systems answered the same thirty leave scenarios on a constructed organization,
  at two corpus sizes, 240 runs for $9.96. At the base size the single call is correct
  on all thirty and the investigator on 24. At the padded size the single call stops at
  its 8,192-token output allowance on 24 of 30 calls and falls to 14, while the
  investigator holds its 24: a registered difference of 33 points, 20 to 47 at 95
  percent. The finding is about these systems under their registered budgets, and says
  nothing about agents in general.
demonstrates: >-
  A preregistered comparison of an agent against three baselines on a benchmark with
  ground truth by construction: the registration frozen before the measurement world
  was drawn, paired bootstrap intervals over scenarios, every claim graded by an
  evaluator that never re-reads a vendor, the stopped calls recorded call by call, and
  a report whose tables and figures are built from the committed results.
series: leave-impact-agent
seriesOrder: 2
seriesRole: the investigator, measured
seriesNote: >-
  The agent against three simpler ways of producing the same plan, on a world whose
  answer key was sealed first: where the one-call reader stops at its output
  allowance, recorded as a mechanism and not as evidence of an input limit.
links:
  code: https://github.com/arda-basarici/leave-impact-agent
  report: /reports/where-the-single-call-stops.pdf
date: 2026-10-20
---

The investigator is an LLM agent that reads an organization's HR system, issue tracker,
calendar and documents and drafts a coverage plan for an employee's leave, with the
evidence behind each claim. The report measures whether its reading loop earns its cost
against three simpler ways of producing the same plan, on an organization built so that
the right answer is known.

## What was found

A scenario counts as correct whole when every required claim is present and right,
nothing unexpected is claimed, and no finding stands against the plan.

| System | Base | Padded |
|---|---:|---:|
| Investigator | 24 of 30 | 24 of 30 |
| Full context, one call | 30 of 30 | 14 of 30 |
| Single shot, one retrieval then one call | 22 of 30 | 10 of 30 |
| Rules only, no model | 10 of 30 | 10 of 30 |

The rules pass exactly the structured tier and nothing else, so twenty scenarios are
where any model-reading system can differ. The investigator misses the same six at both
levels.

At the padded level the single call stops at its output allowance on 24 of its 30
calls, the cap on what it may write and not on what it may read, and 15 of its 16
failures coincided with a stopped call; one did not. The registered primary comparison,
the investigator against full context at the padded level, is an observed difference of
33 percentage points of scenarios with a paired interval of 20 to 47 points at 95
percent. The investigator wrote 47,806 output tokens across its thirty padded runs
against full context's 211,989, because a loop states the facts its searches returned
where the one call must state everything it was shown.

## Four systems, one answer key

Every system begins with the same frozen prefetch of the structured records and
composes its report with the same deterministic rules; they differ only in what
documents reach the model and how. *Rules only* reads the prefetch and no document, and
calls no model. *Single shot* runs one fixed full-text query, then one model call that
states facts from what came back. *Full context* puts every document of the corpus into
one call. The *investigator* runs a tool loop, reading in turns through role-scoped
tools and a full-text search over document sections, then is asked once, at the end, to
state the facts it read with the words they came from. One model, Claude Haiku 4.5,
played every role in every system, at temperature zero, with the same 8,192-token
output maximum per call.

The organization has 28 people in five teams and thirty planted leave scenarios in
three tiers: answerable from records alone, dependent on facts that live only in prose,
and built around a trap. Its answer key was written before any system ran, and the
comparison was registered before the measurement world existed. The evaluation ran
once at two corpus levels, the base corpus and a padded one: 240 runs for $9.96 in
model calls.

## Where the investigator still fails

The investigator's six misses are the same six scenarios at both levels, all in the
fragmented tier, where the needed facts live only in prose. Its mechanism measure
follows each needed fact through four stages: whether a document carrying it was
returned to the run, whether the model emitted the fact, whether the record admitted
it, and whether the rules could use it. At the padded level the stages read 31, 26, 26,
25 of 31 needed facts. Every needed carrier was returned, so retrieval is complete and
the losses occur after it: five facts were returned and not emitted, and one was emitted
and admitted but the rules could not use it. Six missing facts and six failed scenarios
are different units, and the equal totals are a coincidence the report does not lean on.

## How the result was held to account

The registration was frozen at a commit before the measurement world was drawn. It
fixed each system's call and token caps from a calibration on a development world, one
run per scenario, a retry only after an infrastructure failure, and a counted attempt
chosen by a rule over the run's own log. No reported run reached its call cap or its
token cap, and every run closed on its first attempt; what many one-call runs reached
is the per-call output maximum. The evaluator grades a run claim by claim against the
sealed key, replays its conclusions from what the run itself read, and runs under its
own identity: it reads exports and never re-reads a vendor. The report's tables,
figures and result numbers are generated from the committed results by a pinned build;
a few numbers about the instrument and the calibration are quoted from cited records.

## What it refuses to claim

One world, one model, one run per scenario: the intervals are over scenarios of one
synthetic organization of 28 people and say nothing about run-to-run variability or
about another model. The padded level's size was chosen, before the measurement world
existed, so that the single call would fail on a development world; the padded result
is a finding about that regime. The single call's stop is output saturation under the
8,192-token allowance every system ran with, a mechanism the exports record call by
call; it is not evidence of an input-context limit, and the report makes no claim that
the model could not read the padded request. The two kinds of system were not tuned
alike, and a reader who suspects the one-call readers could be prompted past their stop
is entitled to; the evaluation did not try. The prose the systems read is near-template,
because a text enters the world only when a second model can extract exactly its
planted facts, so the results test reading what is stated and say nothing about
inference. Four outage cells were registered and decided not run, and four supporting
comparisons registered and decided not built, before any result was seen. The
organization is synthetic and small; it is not a study of any real workforce.
