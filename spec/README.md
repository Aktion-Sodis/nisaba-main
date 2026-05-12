# Specs

Lightweight spec workflow for any non-trivial change in this repo. The aim is
to make it easy to discuss a change with Claude *before* code is written, and
to leave a useful trail after it ships.

## Lifecycle

```
spec/draft/      → being written / discussed
spec/active/     → agreed, currently being implemented
spec/archive/    → shipped (merged to main) or abandoned
```

A spec is a single Markdown file named `YYYY-MM-DD-kebab-case-title.md`. It
moves between folders by `git mv` — its history travels with it.

### 1. Draft

Copy `SPEC_TEMPLATE.md` into `spec/draft/`:

```bash
cp spec/SPEC_TEMPLATE.md spec/draft/$(date +%Y-%m-%d)-my-feature.md
```

Fill in *Context*, *Goal*, *Non-goals*, *Approach*. Iterate with Claude until
the approach is concrete enough to implement. Drafts are cheap; throw them
away if the idea dies.

### 2. Active

Once the approach is agreed:

```bash
git mv spec/draft/2026-05-12-my-feature.md spec/active/
```

While a spec sits in `spec/active/`, Claude treats it as the **source of
truth** for the work in progress. Update the spec as decisions change —
don't let it drift from reality.

A spec in `active/` should answer:
- what changes (files / modules / endpoints)
- what does *not* change
- how it will be verified (manually or by tests, if any)

### 3. Archive

When the change is merged (or the work is abandoned):

```bash
git mv spec/active/2026-05-12-my-feature.md spec/archive/
```

Add a short *Outcome* line at the top: shipped in #PR, abandoned because X.
No further edits — the archive is the historical record.

## How Claude uses this

- On any non-trivial task, **check `spec/active/` first**. If a spec exists
  that matches the request, follow it.
- For a request that obviously deserves a spec (multi-file change,
  architectural choice, schema change, new external dependency), Claude
  proposes one rather than diving in.
- Tiny changes (a typo, a one-line fix, a doc tweak) do not need a spec.

## Conventions

- Filename: `YYYY-MM-DD-short-kebab-title.md`. The date is the day the draft
  was created; do not change it on transitions.
- Length: aim for one or two screens. If you need more, split into multiple
  specs or link to deeper notes in `docs/`.
- Cross-link related specs by relative path: `[..](../archive/2026-04-…md)`.
- Specs are not commit messages and not PR descriptions; they describe
  *intent* and *plan*, not the diff.
