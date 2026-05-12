---
description: Begin a task by reconciling the user's request with spec/active/ — follow an existing spec, propose a new one, or proceed without a spec.
---

You are starting work on a request from the user. Before touching any code,
run the spec-workflow check defined in `CLAUDE.md` and `spec/README.md`:

1. **List `spec/active/`.** Read every file there. If any matches the user's
   current request (by title or by content), treat it as the source of
   truth and follow it. Surface any conflict between the spec and the
   user's latest ask before diverging.

2. **Decide spec-worthiness** of the request, using the criteria in
   `CLAUDE.md` → "Spec workflow". If yes, propose a draft via the
   `/spec-new` flow (do *not* silently start coding). Wait for user
   confirmation on the approach before moving the spec to `spec/active/`.

3. **If no spec is needed** (typo, one-line fix, doc tweak, etc.), say so in
   one sentence and proceed.

Inputs:
- `$ARGUMENTS` — optional free-text description of the task. If empty, use
  the most recent user message as the task description.

Output to the user:
- The matched spec filename (or "no matching spec found").
- Your decision: follow spec / propose new spec / proceed without spec.
- One sentence on why.
