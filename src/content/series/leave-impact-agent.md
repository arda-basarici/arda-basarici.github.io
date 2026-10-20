---
slug: leave-impact-agent
title: 'Leave Impact Agent'
seoTitle: 'Leave Impact Agent: An LLM Agent Evaluated on a Constructed Organization'
ogTags: [LLM Agent, Ground Truth by Construction, Preregistered]
blurb: >-
  When an employee goes on leave, someone has to work out what the absence affects and
  who can cover it. The Leave Impact Agent reads the organization's HR system, issue
  tracker, calendar and documents and drafts that coverage plan with the evidence behind
  each claim, for a human to approve. It is measured on a synthetic organization whose
  answer key was written before any system ran; the world and the investigator are
  built and measured, the public demo is under way.
demonstrates: >-
  An LLM agent over real external tools (Frappe HR, Jira, Google Calendar) with the
  evaluation designed first: a generator that constructs the benchmark and seals its
  answer key, an evaluator that grades evidence recovery under a deterministic decision
  layer, a comparison registered before the measurement world existed, a LangGraph loop
  whose event log is the authority for recovery and audit, run on AWS through
  approval-gated delivery.
order: 2
links:
  code: https://github.com/arda-basarici/leave-impact-agent
roadmap:
  - title: 'The demo'
    note: >-
      A public, replay-first surface over the golden world: the report view with its
      evidence, the audit trail, the narration timeline; live runs capped and off by
      default.
  - title: 'The conversation'
    note: >-
      Questions over the same evidence base, answered with the same grounding and graded
      on the same scenarios; strictly after the demo.
---

Before a manager approves time off, someone works out what the absence affects: which
deadlines fall inside the window, which meetings lose their owner, whether the natural
replacement is away that same week. That context is spread across HR, the issue
tracker, the calendar and documents nobody reads until they must. The Leave Impact
Agent does that investigation across those systems and drafts a coverage plan with the
record behind each claim: this person covers Thursday's client call, that ticket moves
to someone who holds the skill, this need has no qualified cover and the plan says so.
The plan says where it stands: who is viable, what it assigns, and where an unknown or
a conflict remains. A human approves the coverage plan; the agent never makes the
employment decision.

The question the project is built around is how anyone would know the plan is right.
There is no real workforce to label, and a benchmark labeled after the fact inherits
its labeler's reading. So the organization is constructed, and its answer key is
written before any system runs.

## How it was built

The evaluation came first. The first milestone built the world. A generator constructs
a company of 28 people in five teams from a seed, plants thirty leave scenarios in three
tiers of ten, and writes the expected answer for each. A structured scenario can be
answered from records alone; a fragmented one depends on facts that live only in prose,
a qualification in a ticket comment or a staffing clause in a policy; an adversarial one
plants a trap, a stale record contradicted by a newer one or a need nobody can cover.
The world is projected into real systems, Frappe HR, Jira and Google Calendar, with a
document corpus beside them. Prose enters only through a gate: a model writes a comment
or a clause from a brief of facts, a model of a different family must extract exactly
those facts back and nothing else, and a lexical guard must find no name outside the
brief's scope, or the text is discarded. An independent
validator re-reads the live systems and approves a world only when every record equals
its planting, the first golden world was hand-audited scenario by scenario, and the
answer key is sealed where the application cannot reach it.

The second milestone built the investigator and measured it. The agent runs on
LangGraph over an event log that is the authority for recovery, audit and the run's
export. The model reads in turns through role-scoped tools over the records and a
full-text search over document sections, then states the facts it read in the words it
read them from, and deterministic rules compose every claim of the plan. The question
was whether that loop earns its cost against three simpler ways of producing the same
plan: the rules alone over the structured records, one retrieval then one call, and one
call shown every document. The comparison was registered before the measurement world
existed, the world was drawn from a secret seed, and the evaluation ran once: 240 runs
for $9.96 in model calls. The result is on
[the investigator milestone's page](/projects/leave-impact-agent-investigator/), with
[the report](/reports/where-the-single-call-stops.pdf).

**Milestone 1, the world, is built and audited; milestone 2, the investigator, is built
and measured, and the report is on [its page](/projects/leave-impact-agent-investigator/).
Milestone 3, the demo, is under way:** a replay-first
surface over the golden world behind a public URL, live runs capped and off by default.
A conversation over the same evidence base is committed strictly after it.

## What it demonstrates

The engineering is in the places a code reader looks. The benchmark is constructed,
not labeled, and the consistency check that every scenario passes shares its rules with
every system, so the audits are the check on the rules. The evaluator runs under its own
identity, reads exports and never re-reads a vendor. The registration was frozen at a
commit before the world was drawn, and it reads a comparison as an interval, never as a
test of superiority.

In the loop, four decisions are each tied to the failure they prevent:

- The event log is the authority: recovery replays it, the audit reads it, and the run's
  export is built from it, so a crashed worker resumes from what was recorded.
- A claim fences a generation: after a new claim, the previous worker authorizes nothing
  and appends no outcome, and a request it had already sent stays unresolved with its
  worst-case allocation retained.
- Budget before inference: every model call is authorized against the budget before it
  is sent, and an attempt that closes without an export lists its known consumption, its
  retained liability and their total.
- The evaluator is isolated: it runs under its own identity, reads exports and never
  re-reads a vendor.

Before any reported run the worker was killed at every boundary two reference runs
cross, 469 rows in all, and recovered as forecast once two forecasts had been corrected.
The runs themselves went through the deployed lifecycle: a workflow sends each step to
the instance, a human approves in a private session when the policy asks for one, and
the export is published where the evaluator reads it. The host, its network and the
deploy role are code in the platform repository.
