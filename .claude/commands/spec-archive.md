---
description: Move an active spec into spec/archive/ with an Outcome line. Use $ARGUMENTS to pick which one.
---

Archive a spec — either because it shipped or because it was abandoned.

1. Identify the spec:
   - If `$ARGUMENTS` matches exactly one file in `spec/active/`, use that.
   - Otherwise list `spec/active/` and ask. Stop until answered.

2. Ask the user (in a single question) which outcome applies:
   - `shipped` — what PR / commit? Get the reference.
   - `abandoned` — one-line reason.
   Skip this step only if `$ARGUMENTS` already contains a clear outcome
   (e.g. `spec-archive my-feature shipped #123`).

3. Update the spec:
   - Frontmatter `Status: active` → `Status: archived`.
   - Fill in the `## Outcome` section:
     - `Shipped in:` PR/commit reference, or `Abandoned: <reason>`.
     - `Notes / surprises:` brief, factual. Pull from the conversation if
       you have context; otherwise leave a `TODO:` for the user.
     - `Follow-ups:` link to any new specs or known TODOs.

4. Move it: `git mv spec/active/<file>.md spec/archive/<file>.md`.
   Do **not** create a commit.

5. Report the new path and the outcome line you wrote. If `Notes /
   surprises` is a TODO, remind the user to fill it before merging.

Archived specs are not edited again. They are the historical record.
