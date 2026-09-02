---
slug: platform
title: "The Layer Under the Products"
seoTitle: "Infrastructure as Code for Two Deployed Projects: Terraform, Ansible, a Timed Rebuild Drill"
ogTags: [Terraform, Ansible, Cloudflare, Recovery Drill]
summary: >-
  Two deployed projects, two hosts, one edge, and one shared operational layer between them.
  It appeared when the second project's ingress changes started landing in the first
  project's repository. That layer was extracted into its own repository behind an explicit
  ownership line, then held to one test per claim: what existed adopted on zero-diff plans,
  the host rebuilt from a blank machine by a playbook, and a rebuild-and-restore drill from
  nothing in about an hour.
demonstrates: >-
  Infrastructure as code across Cloudflare, AWS and a bare VPS (Terraform, Ansible), hand-made
  resources adopted on zero-diff plans, a secrets policy with a tested recovery path, and
  recovery treated as a discipline: a timed rebuild drill, a monthly restore check, an alarm
  path proven by forcing it.
order: 2
links:
  code: https://github.com/arda-basarici/platform
date: 2026-09-02
---

SteamLens was the first service on the VPS, so its repository carried the host: the proxy,
the origin firewall, the provisioning runbook. Reasonable with one tenant. When the second
project's HR system landed on the same box, an ingress change for it became a commit in the
SteamLens repository, and the box's Caddyfile carried three stanzas from two projects. The
shared layer had been there all along; the second application made it visible. This
repository is that layer, extracted from a running system over three days (the cutover cost
one container recreate), then extended to the two places that were still hand-made: the
Cloudflare zone and the host's own construction.

## The ownership line

The repository owns infrastructure whose lifecycle crosses application boundaries or is
managed through a provider API. A Terraform resource is platform; an SDK call is application.
The proxy, the firewall and the DNS records live here; an application's image, Compose file
and migrations stay in its own repository. Each tenant's seam is a short contract written down
once: the hostname flows from the platform, the container name and the durable-data path flow
from the application, and a rename on either side edits both READMEs. Adding a tenant is two
changes on purpose. The application ships itself, the platform wires it, and the shared proxy
configuration is never touched.

## Adopted on zero-diff plans

Existing infrastructure entered code only when the resulting plan was zero-diff. The AWS
stack moved between repositories, and `terraform plan` on the same remote state reported
nothing to add, change or destroy. The Cloudflare zone was imported record by record, each
import landing with zero changes before anything was changed from code; which of the zone's
dozens of settings to adopt was answered by Cloudflare's own modification stamp, which marked
exactly the three that had been set on purpose. Secrets got the same treatment. The first draft
assumed an `ignore_changes` clause kept parameter values out of Terraform state, a `state
pull` showed the values were there, and the fix, write-only values, was proven on a disposable
parameter before it touched production.

The host followed in Ansible's idiom. The provisioning runbook became five roles in
dependency order plus an acceptance script that reads every claim back from the running
system, and the test was a blank cloud host reaching a full pass from the play alone.

## Rebuilt from nothing, timed

**Blank host and blank control node to SteamLens serving its restored production data:
1 h 06 m 41 s. First run, unrehearsed, 2026-08-30.**

Nothing from the old machines was used, only the public repositories, the password vault and
the Google account behind the backups. The play built the host in 88 seconds and changed
nothing on its second run, the acceptance script passed 26 of 26, SteamLens deployed by its
documented path, and the restored data matched the backup's recorded evidence digit for
digit. The runbook was written during the drill and carries every phase with its timestamp.

The drill sits on a recovery routine. The nightly backup is integrity-checked before it ships
and pings a dead-man's switch, so the alert channel is silence. A monthly timer restores the
newest backup and compares four table counts against the live store. The alarm path on the
AWS host was proven by forcing the alarm before it was needed; the first try found a silent
failure in the topic policy, fixed with one statement. Replacing the host's instance was
exercised too: about three minutes, with the data volume re-attached.

## What it refuses to claim

This is a solo operation at small scale: one VPS, one EC2 instance, one zone, two tenants,
one operator applying from a laptop. Nothing here is a claim about running infrastructure at
scale. The live VPS was built by the runbook the play transcribes and has not yet been
replayed by it; the check-mode comparison found ten differences, each explained as
transcription, and "the box matches the play" waits for the replay. Only one of three
databases has a backup; the other two hold placeholder data. The drill host was a cloud
instance rather than the real provider, and the DNS cutover was listed, not exercised.
Everything deliberately unbuilt (Terraform modules, environment sub-levels, a paid edge tier,
a hosted secrets manager) is trigger-gated: each waits for the event that would justify it.
