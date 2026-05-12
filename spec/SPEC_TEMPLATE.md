# <title>

> Status: draft | active | archived
> Owner: <name>
> Created: YYYY-MM-DD
> Related: <PR #, links to other specs in spec/archive/ or spec/active/, issues>

## Context

What is the situation today? Link to relevant code (`path/to/file.ts:42`),
docs (`docs/architecture.md`), or prior specs. Keep it factual; do not
restate the goal here.

## Goal

One or two sentences. What will be true after this ships that is not true
today?

## Non-goals

What this spec is *not* doing. Explicit non-goals prevent scope creep more
than any other section.

## Approach

The plan, at the level of detail needed for someone (human or Claude) to
implement it without re-deriving the design.

- Affected components / files (list, with paths).
- Schema or data-model changes, if any. Include the GraphQL diff.
- API surface changes (new endpoints, changed contracts).
- Migration / backfill strategy, if data is reshaped.
- UI changes (sketch in ASCII or link to a screenshot).
- Open questions — call them out, don't bury them.

If alternatives were considered and rejected, list them in one or two lines
each with the reason.

## Verification

How will we know it works?

- Manual: the exact click-path or CLI command, ideally one a non-author can
  follow.
- Automated: which tests cover it. If no tests will be added, say so.
- Rollout: feature flag? phased? Direct ship?

## Outcome

*(Filled in when moving to `spec/archive/`.)*

- Shipped in: #PR / commit
- Notes / surprises encountered:
- Follow-ups: links to next specs or TODOs left behind.
