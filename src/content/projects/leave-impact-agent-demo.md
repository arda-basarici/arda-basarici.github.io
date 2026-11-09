---
slug: leave-impact-agent-demo
title: 'Served From Its Own Records'
seoTitle: 'Deploying a Measured LLM Agent on AWS: Replays Read From the Event Log, Capped Live Runs, a Sealed Answer Key'
ogSubtitle: The measured agent in public, as replays and capped live runs
ogTags: [LLM Agent, LangGraph, Spend Caps, AWS]
summary: >-
  Is what a visitor sees the system that was measured? Milestone 3 puts the investigator
  behind a public URL on AWS. Thirty recorded runs are served as reports, audit trails and
  timelines, every replay page a read of what its run recorded. A visitor can start a live
  run and then approve or decline the plan it drafts; the run is admitted and logged the
  way an operator's is, reserves $2.17 before its first model call, and settles at about
  seven cents. Live runs are capped at five a day under an $8 spend ceiling, and the site
  shows the ledger.
demonstrates: >-
  An evaluated LLM agent served in public on AWS: report, audit trail and timeline pages
  rendered from each run's export and event log, live runs admitted against a reservation
  ledger with daily and per-address caps, a visitor's approval or decline recorded in the
  run's log, a LangGraph run supervised in a child process the worker can terminate, a
  search of the repository and a crawl of the public pages for the sealed measurement
  world's hashes, and delivery through a reviewed deploy that holds no stored cloud keys.
series: leave-impact-agent
seriesOrder: 3
seriesRole: the demo, in public
seriesNote: >-
  The measured investigator behind a public URL: thirty replays read from the runs' own
  records, and capped live runs a visitor starts and then approves or declines.
links:
  app: https://leave-agent.ardabasarici.dev
  code: https://github.com/arda-basarici/leave-impact-agent
date: 2026-11-09
---

The second milestone measured the investigator against three simpler systems. This one
puts it behind a public URL, at [leave-agent.ardabasarici.dev](https://leave-agent.ardabasarici.dev).
A demo of a measured system invites one question first: is what the visitor sees the
system that was measured, or a presentation built beside it? The answer can be checked
on the site. [The report on one leave with two impacts](https://leave-agent.ardabasarici.dev/replays/scenario-004)
and [its timeline](https://leave-agent.ardabasarici.dev/replays/scenario-004/timeline)
are reads of what one run recorded, and [the ledger](https://leave-agent.ardabasarici.dev/ledger)
shows what visitors' runs have cost in all.

## Every replay page is a record

The demo serves the golden world: the audited synthetic organization of the first
milestone, one of the worlds the investigator was developed on, public whole with its
answer keys. The measurement world, drawn from a secret seed for the registered
comparison, stays sealed. A banner on every page says the served world is a development
world.

The LangGraph investigator, as registered for the comparison and at the base corpus
level, ran once on each of the golden world's thirty scenarios on the production host,
for $2.10 in model calls, every run closing on its first attempt. Each run is public as a report, an audit trail and a
timeline. The report and the trail are built from the run's export. The evidence under a
claim is what the run itself read, and nothing is fetched again for the page. The
timeline is the run's event log replayed through the same state-transition function the
run executed, one line per event, and an open run's page follows that log as a stream of
server-sent events.

In the operator's offline grading, 26 of the thirty replays are correct whole. The four
misses share one shape, a requirement in a policy clause left unstated, which is the
mechanism the measurement found on its own world. That count
describes runs on a world the agent was developed against; it is no second result
beside the 24 of 30 on [the investigator's page](/projects/leave-impact-agent-investigator/),
which was measured on the sealed world.

## A visitor's run

A visitor can start a run from the front page. It goes through the same admission as a
run an operator dispatches, one transaction that freezes the run's inputs and takes its
reservation against a ledger, and it writes the same event log. An operator's run is
stepped by a workflow; a visitor's is picked up by a worker service on the host, and its
plan waits for the visitor.

The worker runs one attempt at a time in a child process it can terminate. Stopping the
LangGraph run inside the worker's own process was the first design, withdrawn when a
probe found the first stop signal lost behind a stuck checkpoint write.

When the plan is drafted the run waits. The visitor who started it holds a cookie scoped
to that attempt and is the only one shown the approve and decline form; anyone else can
read the review. A decline is an ending of its own in the log, and a plan nobody decides
within fifteen minutes is closed by the worker.

Every start is admitted against a ledger kept apart from the measurement's: five runs a
day, two an address, one attempt on the host at a time, under a spend ceiling set by
hand, $8 for the first public month. A run reserves $2.17, computed from its
registered call and token caps, before its first model call, and settles at what it spent:
six to seven cents on each of the six runs settled so far, $0.41 in all. The CPU budget
was fixed before it was measured, and held: eight open streams on a running attempt cost
the application 0.131 s of CPU a second above idle, pooled over two runs, against 0.2.

## What stays sealed

The measurement world is still to be used by the next milestone, so nothing that
identifies it may be public. Before the hostname served the application, the repository
was searched for the two hashes that identify that world, in every form its documents
cite a hash, and they were found nowhere. Once the site was up, a crawl of the 124 pages
then public searched for those hashes and for the patterns of the repository's own
disclosure check. Its first form scanned the raw response bytes and passed while two
forms were hidden from it: the stream's JSON encoder writes the ellipsis of a cited hash
as an escape, and the page templates write an apostrophe in one pattern as an HTML
entity. The crawl now reads every page as the raw body, the HTML-decoded text and the
JSON-decoded stream frames, and found nothing in all 124 under each. Nothing else about
that world has a mechanical check. On the host, the application's AWS role has no access
to the sealed answer key, and a probe after every deploy checks that a list and a read
of it are refused.

## Why AWS, and what runs there

The application runs on AWS and the HR system it reads stays on the self-managed server
that already hosted it. Frappe HR is in the project as a realistic external system, and
reaching it as a remote, authenticated API makes "HR unavailable" a real failure the
agent must degrade through. Three alternatives were rejected: everything on the existing
server shows no cloud deployment, the server plus S3 and Bedrock is not one either, and
everything on AWS pays to host the simulation for no product reason.

On AWS the application, the worker and PostgreSQL are three containers on one small
instance behind a proxy. The deploy job holds no stored keys: after a required review it
assumes a role through GitHub's OIDC trust, and that role may send shell commands only
to instances carrying the application's tag, through Systems Manager. Secrets are read
from Parameter Store. The database is dumped nightly, and the first dump was restored
into a scratch database where the application's own check passed seven of seven. The
instance, its network and its roles are Terraform in
[the platform repository](/projects/platform/).

## What it refuses to claim

The milestone was to end on a stranger using the URL unassisted. That test was not run,
and no use of the site by anyone outside the project is on record; the six live runs
were made in the project's own acceptance sessions, two of them by a probe script. One
acceptance criterion is recorded as not met: an open run's events were to reach a viewer
within 2 s of their recorded times at the 95th percentile, and two runs read 2.00 and
2.09 s, on a measure that includes a clock offset known only to within 1.3 to 1.5 s. The
restore check has run once, started by hand; no rollback has been made on production, and a
recovery would lose up to a day. The host is one small instance running one attempt at a
time on one synthetic organization, so nothing here is a claim about capacity or about
users: eight is the cap on open streams, and seven cents is a live run at the smaller of
the two corpus sizes.
