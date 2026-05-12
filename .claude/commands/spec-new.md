---
description: Draft a new spec under spec/draft/ using SPEC_TEMPLATE.md. Use $ARGUMENTS as the title.
---

Create a new draft spec.

1. Resolve the title:
   - If `$ARGUMENTS` is non-empty, use it as the human-readable title.
   - Else, ask the user for a title in one sentence and stop until answered.

2. Compute the filename: `spec/draft/<YYYY-MM-DD>-<kebab-case-title>.md`,
   where the date is *today* in the repo timezone.

3. Copy the content of `spec/SPEC_TEMPLATE.md` into the new file. Then
   pre-fill what you can from the current conversation:
   - `# <title>` heading
   - `Status: draft`
   - `Owner:` — leave as a placeholder for the user to fill, or use the git
     `user.name` if obvious.
   - `Created:` — today's date.
   - `Context`, `Goal`, `Non-goals`, `Approach` — best-effort first pass
     based on the conversation so far. Mark unknowns with **TODO:** so the
     user can spot them at a glance.

4. Do **not** `git add` or commit. The file lives in the working tree for
   discussion.

5. Tell the user:
   - the path of the new spec,
   - the two or three biggest open questions you flagged with TODO,
   - that you'll iterate with them on the draft before moving it to
     `spec/active/` (the `/spec-activate` step).

Do not start implementing the change yet. Drafting and implementing are
separate steps on purpose.
