---
title: "What Makes a Benchmark Worth Its Score"
seoTitle: "What to Check Before Trusting an LLM or Agent Benchmark Score"
ogTags: [LLM Evaluation, Benchmarks, AI Agents]
description: >-
  Eight things a score has to earn before it can compare two models or agents, from where
  the right answers came from to whether the comparison was fixed in advance, with one
  results table of my own read against them.
date: 2026-11-11
---

Say you build a test for an agent and it scores 90 out of 100. That's a high score, and by itself it means nothing. You don't know what a much simpler system would score on the same test, whether the same agent would score 90 again tomorrow, or what the ten failures have in common.

For the last few months I've been building two projects on top of language models, and in both the measuring took far more work than I expected. In one of them the first month produced no agent, only the test world and the answer key the agent would later be graded against. This is what I ran into, put in one place, in an order where each idea builds on the ones before it. I'm new to the field, and where a paper says it better I point to the paper.

One limit on scope. This is about measurement for comparison: benchmarks and evaluation sets, where the question is which model, agent or method is better, and by how much. Unit tests and pass/fail checks before a release serve a different purpose, even when they reuse the same cases, and I leave them aside.

## 1. Start with what the score is for

A measurement answers a question, and the question comes from a decision. Which of two models do I ship? Is the agent worth its extra cost over a single model call? Did last week's change help? Each of these fixes a few things: the tasks that matter, the conditions the system will run under (its budget, its time, the tools it gets), what would count as better, and how much better is enough to act on.

Most of what follows is easier once this is written down. Whether a test is too easy, whether a difference is large enough, whether a limit in the setup is unfair: none of these has an answer until you know what the score is supposed to decide.

## 2. A score is only as good as the answers behind it

To score an output you need something to score it against. Often that's a set of right answers, written by people labeling by hand, by a script, or by another model. Sometimes there isn't one right answer, and the reference is a set of acceptable outcomes, a check that can be run, or a rubric. Either way someone made it, and whatever mistakes went into it are now inside every score the test gives. Nothing in the score shows them. The usual names are ground truth or gold labels.

It also matters who made the reference, and how. If the person who built the system also wrote the answers, the two can share the same blind spots. If a model helped write them, that model's score on the test stops being independent evidence.

I ran into both in SteamLens, a project that reads Steam game reviews and extracts which aspects of a game each one talks about, like music, performance or updates. The gold set there is 250 reviews whose labels were drafted by a model and then adjudicated one by one by me. That's one person's judgment, with no second labeler to check it against. And when I later compared models against it, the highest score in the table belonged to the model that had drafted the labels. I can't tell how much of that score is skill and how much is the model matching answers it helped shape, so it stays in the table as a reference and competes with nobody.

The same goes for whatever does the scoring. If a model grades the outputs, the grader is part of the measurement, and it needs its own check against people's judgment on a sample.

So one of the first questions about any score is where the reference came from and what checked it.

## 3. A score needs something next to it

90 out of 100 starts to mean something when you know what else scores on the same test. What does a system that does nothing clever get? What does always giving the most common answer get? What does a person get? These are baselines: reference points to read your score against. The distance between a simple baseline and your system is how much your system improves on it, on this test and by this metric. A person's score, or a much stronger model's, is a reference point at the other end.

Baselines sometimes show that a test is easier than it looks. In natural language inference, a model reads two sentences and says whether the second follows from the first, contradicts it, or neither. Gururangan and co-authors [trained a classifier that was shown only the second sentence](https://arxiv.org/abs/1803.02324). It got about 67% right on a standard dataset, where always guessing the most common of the three labels gets about 34%. The way the data had been written left clues in the second sentence alone. That doesn't say how much any particular model leaned on those clues. It says a large part of the score was reachable without doing the task, and without that baseline the score gave no sign of it.

## 4. A test has to be able to show a difference when there is one

Say you try several agents or models on your test and they all get full marks. Or they all fail. Or they all land in the same place in the middle. Each of these tells you something. If everything gets full marks, the simplest system is enough for these cases, and that's worth knowing. What it can't tell you is whether the systems are equally good, or whether the test just can't see the difference between them.

That second part is what I care about here. The point of scoring isn't to beat the model, and it isn't to hand it something it can solve. A test is good for comparison if it can differentiate between models, between methods, between approaches, when they differ in a way that matters for the decision.

Two things decide whether a test can do that. The first is difficulty. When everything scores at the top it's called a ceiling effect, and at the bottom a floor effect. Both come from a mismatch between how hard the test is and how capable the systems are, and the mismatch moves over time: a test written for last year's models can be too easy for this year's. For public benchmarks this is called saturation, and the room left above the best score is called headroom. A plateau below full marks can also come from the reference. If some answers in the key are wrong or ambiguous, no system gets past them.

The second is size. A test with few questions can only show large differences. With thirty questions, two systems that are a few points apart can't be told from two that are equal, so "the test didn't separate them" doesn't mean "they're the same".

The same thing happens inside a single test. If one part of the task is easy for every system and another part is hard, the easy part can still confirm that nothing is broken, but only the hard part can help you choose between them. A total that mixes the two makes the difference look smaller than it is.

What I take from this is to check what a test can show before relying on it. Run the cheapest system that might actually be good. This is a different check from the simple baseline in the last section: there you ran something weak to see what the test gives away, and here you run something strong and cheap to see whether the test leaves any room above it. If it already gets everything right, you've learned that it's enough for these cases, and that this test can't show whether anything else is better.

## 5. A difference has to be read against its uncertainty

Suppose the test does show a difference: A scores 82 and B scores 80. Before reading anything into it, you need to know how sure you can be of that difference.

Scores are uncertain for more than one reason, and the reasons are worth keeping apart. Run the same system on the same questions again and the score can change, because models sample their outputs, and hosted models don't always return the same answer twice even when sampling is turned down. That's run-to-run variation. Separately, the questions in a test are a sample of the questions you could have asked, and a different sample would give a different score. And where training is involved, a different random seed gives a different model.

A confidence interval is a range around a number, computed by treating some of these sources as random, and it should say which ones. On thirty questions the range is wide: a score of 24 out of 30 comes with a 95% interval of roughly 63% to 90%. If each question was run once, an interval across questions already has the run-to-run noise mixed into it. What it can't tell you is how much of the spread is noise and how much is real difference between questions. Separating the two takes repeated runs.

For a comparison, what matters is the uncertainty of the difference between the two systems, which isn't the same thing as the uncertainty of each score. When both systems answered the same questions, compare them question by question. The two usually find the same questions hard, and comparing per question accounts for that shared difficulty, so the difference is often known more precisely than either score. With right-or-wrong questions it comes down to the questions the two disagree on. The ones both got right, or both got wrong, say nothing about which is better.

I learned this on my own data. Two of my candidate models had heavily overlapping intervals, and I read that as no real difference. Compared review by review on the same gold reviews, with both models set up the same way, the other model was measurably better: the interval on the difference no longer included zero. Against the cheaper model at the setting I ended up shipping, the gap was smaller and its interval included zero. The better model also cost about twelve times as much, so I chose the cheaper one. But I had nearly made that choice on a reading of the error bars that was wrong. Overlapping error bars are not a test of whether two systems differ.

Run-to-run variation can be large for agents. [τ-bench](https://arxiv.org/abs/2406.12045) runs each task several times and reports how often an agent succeeds on every try. That's a measure of reliability, which is a different thing from the uncertainty on a score. I mention it because it shows how far one agent can differ from itself: in its retail domain, a model that passed about 61% of the tasks on a single try passed fewer than 25% of them on all eight tries.

## 6. One number hides where the system is weak

A difference you can trust still doesn't tell you what it's made of. A single score averages over everything. Two systems with the same score can fail in completely different places. And when you change something in your system, you want to know which part moved and by how much, which a single pass or fail can't tell you. A test should show the strong sides and the weak sides.

In practice that means breaking the score down: by kind of question, by difficulty, by stage of the pipeline. In SteamLens I had two models label the same 1,000 reviews and scored how well their labels matched, as an F1 over the aspects each one found. Overall it was 0.79. By aspect it ran from 0.97 on music down to 0.61 on updates. That's agreement between two models and says nothing about which one is right. But the overall number didn't tell me where to look, and the breakdown did.

Cost belongs next to the score for the same reason. Two systems with the same score at very different prices are not the same result.

There's a price for breaking a score down. Each slice has fewer questions than the whole test, so each number in a breakdown is less precise than the total. And with many slices, the highest and the lowest look more extreme than they are, partly by chance. Unless a slice was chosen in advance as the thing to test, I treat a breakdown as a way to find where to look, and I'm careful about claims built on it.

## 7. A difference can come from something other than what you meant to measure

Everything so far can hold and the result can still mislead, because the difference comes from something other than what the score is named for. The word for this is validity: whether the score measures the ability it claims to.

I know of a few ways it goes wrong.

The test's questions, or its answers, may have been in a model's training data. That's contamination, and what matters is whether the test was public before the model was trained. GSM8K is a public set of grade-school math problems. Zhang and co-authors [wrote 1,205 new problems by hand](https://arxiv.org/abs/2405.00332), matched to it in style and difficulty. Some models scored up to eight percentage points lower on the new ones, while the strongest showed little sign of it. The authors note that contamination is likely not the full story behind the drop.

The second way is a shortcut: the test can be passed by something easier than the task, as in the two-sentence example earlier.

The third is the setup. Every test runs inside some setup with limits and defaults: how long an answer may be, how many steps an agent gets, how each system is prompted. A limit like that isn't wrong in itself. If the question is how complete systems do under a stated budget, the limit is part of what's being measured. If the question is which approach is more capable, a limit that binds on one system and not on the other answers a different question from the one asked. Which of these you're in goes back to section 1. This is the one I ran into, and it's in the table below.

The last is the one closest to anyone building their own test. The cases in the test can differ from the cases the system will meet in use: easier, cleaner, or mixed differently. Then the score is right about the test and wrong about the job.

## 8. Keep exploring and confirming apart

The last section is about the person doing the measuring. With enough runs, prompts, breakdowns and metrics, there's usually some comparison in which your system looks good. And every time you adjust a prompt because of a failed test question, the system learns a little about that test.

That's normal. Development results are supposed to shape the system, and the test too. The trouble starts when the same results are then reported as the test of a claim. Two habits keep the two apart. One is a holdout: test data that neither the system nor you have tuned on. It stays a holdout only until its results feed back into the system, and after that it's development data. The other is writing down, before the run, which comparison is the claim and how it will be read. Other sciences call that preregistration.

Comparisons made afterwards are still worth making, as long as they're reported as exploration. And fixing a comparison in advance protects it from being bent by its own results. It doesn't make the conditions you chose typical of real use.

## 9. One table from my own work

Leave Impact Agent takes an employee's planned leave, reads a company's HR system, issue tracker, calendar and documents, and reports what the leave affects and who can cover it. The benchmark is thirty leave scenarios in a synthetic company that a program generates together with its answer key. The records are planted directly, and the documents are written by a language model from the planted facts, accepted only when a second model can extract exactly those facts back. Reports are graded against the key by code. Four systems answered the scenarios, all on the same model (Claude Haiku 4.5) where a model is used, at two sizes of the document corpus: the company's own documents, and the same documents padded with filler. A scenario counts only when the whole report is right against the key.

| System | Base | Padded |
|---|---:|---:|
| Agent, a tool loop that reads in turns | 24 of 30 | 24 of 30 |
| Full context, one call shown every document | 30 of 30 | 14 of 30 |
| Single shot, one search then one call | 22 of 30 | 10 of 30 |
| Rules only, no model | 10 of 30 | 10 of 30 |

Rules with no model get 10 of 30, exactly the ten scenarios built to be answerable from records alone. The other twenty are where reading documents can matter.

The padded column exists because of something I saw before any of the model systems were built. One call given the whole corpus reached the top score, which would leave an agent no room to do better. The base column confirms it: at this size one call is more accurate than the agent and cheaper, about 3 cents a run against 7. So a larger size was added, to ask what happens when the corpus grows.

At the base size the interval on the difference between the agent's 24 and single shot's 22 includes zero. With thirty scenarios, each run once, the test couldn't have separated a gap that small, so it says little either way.

The large difference is full context falling from 30 to 14. Every system had the same limit on how much one call may write, 8,192 tokens. The one-call reader has to list every fact in everything it was shown, so its answer grows with the corpus, while the agent lists only what its searches returned. 24 of the 30 padded calls ended at that limit, and 15 of the 16 failed scenarios had such a call. So this compares complete systems under a per-call limit that binds the single call and not the agent. It can't separate what the model can read from what one call may write, and I didn't test a larger limit.

The one comparison I claim is the agent against full context at the padded size: a difference of 33 points, with a 95% interval of 20 to 47. It was written down before the test company was generated. The padded size was picked earlier, on a development company, as the smallest of three candidates at which the single call failed. So it's a stress condition I chose, and the result says nothing about other corpus sizes. The full account is in the [report](/reports/where-the-single-call-stops.pdf).

## What I'd ask of any score

- What decision is this score for?
- Where did the reference answers come from, and what checked them?
- What does a simple baseline score on the same test?
- Could this test, with this many questions, have shown a difference between these systems if there were one?
- How uncertain is the difference, and what does that uncertainty include?
- Where in the test is each system weak, and what did each cost?
- Could the difference come from something other than the ability being measured?
- Was the comparison fixed before the results were known?

Some of this has changed how I work. Before I trust a comparison I run the cheapest strong system first. I look at the difference between two systems and its uncertainty, and not at their two scores side by side. And I write down what I'm going to claim before the run.

I haven't settled the rest. The table above still rests on one run per scenario. Creating a test environment and measuring an agent or a model is a piece of work of its own, one that needs a lot of focus and thought. It isn't just saying this agent can do this and can't do that.

## Further reading

- Northcutt, Athalye, Mueller, [Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks](https://arxiv.org/abs/2103.14749) (2021): wrong labels in the test sets of ten widely used datasets.
- Wang and co-authors, [SuperGLUE](https://arxiv.org/abs/1905.00537) (2019): a harder benchmark built because scores on its predecessor had passed non-expert humans.
- Miller, [Adding Error Bars to Evals](https://arxiv.org/abs/2411.00640) (2024): the statistics of scoring one model and comparing two.
- Henderson, Islam, Bachman, Pineau, Precup, Meger, [Deep Reinforcement Learning that Matters](https://arxiv.org/abs/1709.06560) (2017): ten training runs of one algorithm, differing only in the random seed, split into two groups that differ significantly.
- Ribeiro, Wu, Guestrin, Singh, [Beyond Accuracy: Behavioral Testing of NLP Models with CheckList](https://arxiv.org/abs/2005.04118) (2020): separate tests per capability in place of one accuracy number.
- Recht, Roelofs, Schmidt, Shankar, [Do ImageNet Classifiers Generalize to ImageNet?](https://arxiv.org/abs/1902.10811) (2019): scores fell on a newly collected test set, for a reason other than overfitting to the old one.
- Kapoor, Stroebl, Siegel, Nadgir, Narayanan, [AI Agents That Matter](https://arxiv.org/abs/2407.01502) (2024): cost, holdouts and shortcuts in agent benchmarks.

