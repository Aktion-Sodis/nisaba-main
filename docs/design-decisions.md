# Design decisions

The non-obvious choices that shape how to work in this repo. If you wonder
"why isn't this done the standard way?", check here first.

## Single Amplify backend, three local copies

The backend lives once in `backend/amplify/`. `web-app/amplify/` and
`mobile-app/amplify/` are **local Amplify project copies** of the same
deployed environment, kept so each frontend can run `amplify codegen` for its
own typed client (TypeScript in the web app, Dart in the mobile app).

**Implication:** schema changes go into `backend/amplify/backend/api/apinisaba/schema.graphql`
first. The other two copies will drift until you `amplify pull` (or copy) and
regenerate types in each frontend. Do not edit the schema in the frontends.

## Multi-tenancy via `organization_id` owner field

Every `@model` has
`{allow: owner, ownerField: "organization_id", identityClaim: "custom:organization_id"}`.
The `custom:organization_id` Cognito claim is set by
`authnisabaPreTokenGeneration`. The second `{allow: private, provider: iam}`
rule was added during the migration documented in `migration_changes.md` so
that IAM-authenticated workloads (admin scripts, Lambdas) can operate
cross-organization with AWS credentials.

**Implication:** anything that needs to read across organizations (analytics
aggregation, data migration, admin tooling) must use IAM auth, not Cognito.

## Hand-rolled sync layer in the mobile app

The Flutter app does **not** use `amplify_datastore`. Instead, it composes:

- `LocalDB` — sembast/Hive-backed local store.
- `GraphQLDB` — direct AppSync client.
- `SyncedDB` — wraps both, with a `DBQueue` for offline writes and a
  `Synchronizer` for downstream pulls.

**Why:** Amplify DataStore's conflict resolution and schema-evolution story
did not fit the offline-first field-work use case (long offline periods,
intentional control over which models sync downstream per session, custom
schemeVersion handling).

**Implication:** to add a model on mobile you must (a) add it to the schema,
(b) regenerate dart models via `db_model_generator`, (c) register it in
`SyncedDBModelRegistration` / `LocalDBModelRegistration` / `GraphQGDBModelRegistration`,
and (d) decide whether it needs downstream sync.

## `schemeVersion: Int` on every model

Most models carry `schemeVersion: Int @default(value: "0")`. This is a manual
versioning hook for in-app migrations of records whose shape changed. Bump it
when you migrate records and gate the migration code on the old value.

## I18n strings as a GraphQL type, not a translation file

`type I18nString { languageKeys: [String!]!; languageTexts: [String!]! }` is
embedded in domain models. Translations of *user-authored content* (survey
questions, intervention names, …) live in the database next to the content.
UI strings, by contrast, live in `web-app/src/i18n/` (vue-i18n) and
`mobile-app/lib/frontend/strings.dart`. Don't mix the two.

## Cognito groups → web UI roles

`UserGroup.ts` mirrors the Cognito user-pool groups (`ADMIN`, `ANALYTICS`,
…). Routes declare a `meta.minRole`; the router guard uses
`hasRights(authStore.highestRole, route.meta.minRole)`. Mobile-app
permissions, in contrast, live on the `User` model as a `permissions: [Permission!]!`
list with `PermissionType` enum values — different model, different layer.

## S3 paths are centralised in three places (currently aligned)

Three runtime path helpers exist: `web-app/src/utils/s3Paths.ts` (TS),
`mobile-app/lib/backend/storage/dataStorePaths.dart` (Dart),
`backend/amplify/backend/function/analyticsApp/src/queries/data_store_paths.py`
(Python). The migration in `backend/src/migrate-s3-paths.mjs` brought them
all onto the new `executedSurveyFiles/…/questionFiles/…` layout with
`.aac` audio, and they agree today.

`lib/utils/s3PathDefinitions/dataStorePaths.dart` is a leftover shared
template — its header says it has to be copied into a consuming app to
work, and it still shows the pre-migration layout. It is dead code; refresh
or delete it if you touch this area, but don't read it as authoritative.

`migration_changes.md` documents the *pre-migration* state and is therefore
out of date as a description of current code, but useful as the rationale
log for why the paths look the way they do.

## PrimeVue + Tailwind for the web UI

The web app uses PrimeVue components themed via `tailwindcss-primeui`, with
project-specific theming in `src/theme/`. Use PrimeVue components rather than
introducing a new component library. Tailwind utility classes are fine for
layout; component styling should go through the PrimeVue theme.

## Pinia composition-API stores

All stores in `web-app/src/stores/` use the `defineStore('name', () => { … })`
function form (composition API), not the options form. Some views also have
their own local Pinia stores (`views/surveydetail/surveyDetailStore.ts`,
`views/levelentities/levelEntityStore.ts`). Match the existing style.

## No automated test suite

There is no CI test job and the existing `test/` folders are scaffolds. If
you add tests, do not gate work on them passing in CI — there is no CI for
them yet. State this explicitly in your PR.

## Migration scripts stop on first error

`backend/src/migrate-*.mjs` are intentionally fail-fast and non-resumable.
Always run `--dry-run` first, and only against one environment at a time.

## Generated files that look hand-written

- `web-app/src/API.ts` (~780 kB) — Amplify codegen output. Do not edit.
- `web-app/src/models/index.{js,d.ts}`, `web-app/src/models/schema.{js,d.ts}` —
  also codegen. Do not edit.
- `mobile-app/lib/models/*.dart` — generated by `db_model_generator`.
- `mobile-app/lib/backend/callableModels/*` — generated companion classes.

If a change to one of these is unavoidable, regenerate; don't patch.
