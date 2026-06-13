# Promptfoo for AI Lab Security Testing — Evaluation & Integration Decision

A working note on whether to use [promptfoo](https://www.promptfoo.dev/) for AI/LLM
security testing, and how it should relate to **qulib**, our open-source QA-signal MCP.

## TL;DR

- Promptfoo meaningfully raises the quality of LLM security testing as an **automated,
  always-on first layer**. It is a strong baseline, not a replacement for human red teams.
- For qulib, **do not absorb promptfoo wholesale.** Integrate it as an optional adapter
  (or borrow its concepts) and keep qulib's core independent.

## What promptfoo gives you

| Capability | Why it matters |
|---|---|
| **Automated red teaming** | Generates adversarial cases for prompt injection, jailbreaks, PII leakage, harmful content, system-prompt extraction, excessive agency, hallucination — instead of hand-writing every probe. |
| **Framework mapping** | Plugins align to OWASP LLM Top 10, MITRE ATLAS, and NIST AI RMF categories — defensible, standards-referenced reporting. |
| **Eval-as-code** | YAML config in version control, runs in CI, produces graded pass/fail matrices. The real quality win is **regression detection** when a model checkpoint or prompt change reopens a vulnerability. |
| **Provider-agnostic** | Works across Anthropic, OpenAI, local/open-weight models, and custom HTTP endpoints. |

## Where it falls short

- **Baseline, not a ceiling.** Automated generators find *known* vulnerability classes.
  Novel attacks and multi-turn social engineering still need skilled human red teamers.
- **Grader reliability.** LLM-as-judge checks carry their own false-positive/negative rate;
  findings need human triage.
- **Application vs. model layer.** Excels at testing a deployed app/system prompt; deeper
  model-safety evals need purpose-built harnesses.
- **Coverage is not assurance.** Passing the suite means you did not fail *these* tests.

## qulib integration decision

Three options, evaluated:

1. **Encompass / bundle promptfoo inside qulib — rejected.**
   Inherits its dependency weight and release cadence, blurs what qulib is, and creates a
   fork-shaped maintenance burden.

2. **Integrate as an optional adapter — recommended for interop.**
   qulib stays the product; promptfoo becomes one supported backend/exporter (run a qulib
   suite through promptfoo's red-team plugins, or export results to promptfoo format).
   Clean dependency boundary as a peer/optional dependency.

3. **Reimplement the concepts natively — recommended if security testing is qulib's core.**
   If AI-lab security testing is qulib's primary value, leaning on a competitor for the core
   capability is strategically weak. Borrow the ideas (OWASP-LLM mapping, strategy-based
   attacks, eval-as-code); own the implementation.

**Decision rule**

- Security/red-team testing is qulib's *core selling point* → Option 3, with Option 2 for interop.
- It is an *adjacent feature* → Option 2.
- Almost never Option 1.

## Recommended posture

Promptfoo as the automated, always-on first layer, feeding a human red team that focuses on
what automation cannot reach. For qulib, expose promptfoo as an optional adapter rather than
a core dependency.

## Open question

Is AI-lab security testing qulib's core capability, or an adjacent feature? That answer
selects between Option 2 and Option 3 above.
