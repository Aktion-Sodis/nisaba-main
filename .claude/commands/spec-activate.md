---
description: Move a draft spec into spec/active/. Use $ARGUMENTS to pick which one (filename, partial match, or empty to prompt).
---

Promote a draft spec to active (i.e., agreed and being implemented).

1. Identify the spec:
   - If `$ARGUMENTS` matches exactly one file in `spec/draft/`
     (substring match on filename is fine), use that.
   - If it matches zero or multiple, list `spec/draft/` and ask the user
     which one. Stop until answered.

2. Sanity-check the spec content before moving:
   - The *Approach* section is concrete (no large TODOs that block
     implementation).
   - *Verification* is filled in.
   - *Non-goals* exists (even if just "n/a").
   If any of these is missing, surface it and ask the user whether to
   activate anyway or iterate on the draft first.

3. Update the spec's frontmatter line `Status: draft` → `Status: active`.

4. Move it with `git mv spec/draft/<file>.md spec/active/<file>.md`
   (preserves history). Do **not** create a commit.

5. Report:
   - the new path,
   - a one-line summary of the agreed approach,
   - the immediate next steps you'll take to implement it.

After this, treat the active spec as the source of truth while implementing.
