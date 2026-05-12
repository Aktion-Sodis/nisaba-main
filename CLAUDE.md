# CLAUDE.md

Operating manual for Claude in this repo. Read this every session; then read
only what the task needs.

## What this repo is

Nisaba is a multi-tenant monitoring platform for development-cooperation
projects, consisting of:

- `web-app/` — Vue 3 + Vite admin & analytics SPA (TypeScript, Pinia,
  PrimeVue + Tailwind).
- `mobile-app/` — Flutter field-data app with an offline-first **custom sync
  layer** (not Amplify DataStore).
- `backend/` — AWS Amplify backend (AppSync GraphQL, Cognito, S3, Lambdas)
  and admin/migration scripts.
- `lib/` — cross-language shared bits (S3 path constants, CI helpers).

One deployed environment exists: `release` (eu-central-1).

## Where to read for context

Read these as needed, not all up front:

- `docs/architecture.md` — components, data flow, top-level layout.
- `docs/design-decisions.md` — non-obvious choices (custom sync, single
  backend with three Amplify copies, IAM-on-top-of-Cognito, generated files).
- `docs/commands.md` — every dev / build / migration command that exists today.
- `docs/glossary.md` — domain terms (Entity, Level, Intervention, Survey,
  ExecutedSurvey, AppliedIntervention, …).
- `backend/amplify/backend/api/apinisaba/schema.graphql` — canonical data model.
- `migration_changes.md` — pre-migration analysis of the recent schema +
  S3-path migration. Useful for the *why*, but describes a state that no
  longer matches today's code (the migration has shipped and the three
  runtime S3 path helpers are aligned). See `docs/architecture.md` §"S3
  layout" for the current state.

## Spec workflow (important — applies to *every* request)

Non-trivial changes flow through `spec/`:

- `spec/draft/` — being discussed.
- `spec/active/` — agreed, in progress.
- `spec/archive/` — shipped or abandoned.

**Before doing anything non-trivial, run this check (no slash command needed
— do it for prose requests too):**

1. **Read `spec/active/`.** If a file there matches the user's request,
   follow it as the source of truth. If it conflicts with what the user just
   asked, surface the conflict and ask before diverging.
2. **Decide whether the request itself warrants a new spec.** Propose one
   (in `spec/draft/`, using `spec/SPEC_TEMPLATE.md`) when *any* of these is
   true:
   - touches more than one of `web-app/`, `mobile-app/`, `backend/`,
   - changes `schema.graphql` or any `@auth` rule,
   - adds an external dependency, new Lambda, new S3 path, or new route,
   - changes a public contract (GraphQL field, API Gateway endpoint, S3
     layout),
   - introduces a new pattern that does not already exist in the repo,
   - or you would otherwise need to ask "should I do this the way X is done
     or invent something new?"
3. **Skip the spec** only for: typos, one-line fixes, doc-only tweaks,
   pure renames, dependency bumps, and obvious bug fixes contained to a
   single file. When in doubt, propose a spec and let the user veto it —
   that is cheaper than re-doing the work.

Phrases that should make you reach for the spec workflow even in casual
prose: *"let's build / add / introduce / refactor / migrate / redesign / rewrite",
"can you implement", "I want to support", "we need a", "spec out",
"plan for"*. If the user asks to *implement* something that has no
matching `spec/active/` entry, propose drafting one first rather than
diving into code.

Slash commands `/spec-new`, `/spec-activate`, `/spec-archive`, `/spec-start`
are shortcuts for the same workflow — they do not replace the rule above.
Full details: `spec/README.md`.

## Conventions worth knowing up front

- **Schema source of truth:** edit
  `backend/amplify/backend/api/apinisaba/schema.graphql`. The copies under
  `web-app/amplify/` and `mobile-app/amplify/` are local mirrors for codegen
  and will drift until pulled.
- **Authorization:** every record is scoped by `custom:organization_id`
  Cognito claim (`@auth owner` rule). IAM auth is the escape hatch for
  cross-org workloads (admin scripts, Lambdas).
- **Generated files — never hand-edit:** `web-app/src/API.ts`,
  `web-app/src/models/*`, `mobile-app/lib/models/*.dart`,
  `mobile-app/lib/backend/callableModels/*`. Regenerate via Amplify codegen
  or `flutter pub run build_runner build`.
- **No CI tests today.** Type-checks and lint don't catch feature bugs.
  When a change touches the UI or a Lambda, say so explicitly and describe
  how it was (or could not be) verified manually.
- **Migration scripts are fail-fast and not resumable.** Always
  `--dry-run` first. See `backend/MIGRATION_IAM_SETUP.md`.
- **Web app uses PrimeVue + Tailwind.** Don't introduce a new component
  library; theme through `src/theme/`.
- **Mobile sync layer:** new models need registration in `SyncedDB`,
  `LocalDB`, and `GraphQLDB` model registrations, plus a decision about
  downstream sync. Detail in `docs/design-decisions.md`.

## Working style in this repo

- Prefer editing existing files; the repo has accumulated parallel
  implementations in places (web vs. mobile vs. Lambda S3 paths). Do not add
  a fourth.
- When changing the schema, change exactly one place
  (`backend/amplify/.../schema.graphql`) and call out in the PR / spec what
  the frontends still need (codegen + sync-layer registration).
- Keep changes scoped to the spec or task. If you notice unrelated drift,
  note it in the spec's *Follow-ups*; do not silently bundle it in.
- Avoid emojis in code and docs unless the user explicitly asks.

## Quick commands (full list in `docs/commands.md`)

```bash
# web app
cd web-app && npm run dev          # http://localhost:3000

# mobile app
cd mobile-app && flutter run

# regenerate flutter models after schema change
cd mobile-app && flutter pub run build_runner build --delete-conflicting-outputs

# backend admin scripts (always --dry-run first)
cd backend && node src/migrate-schema-changes.mjs --dry-run
```
