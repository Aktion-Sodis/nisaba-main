# Glossary

Domain terms used throughout the schema, web app, and mobile app. When in
doubt, the canonical definition lives in
`backend/amplify/backend/api/apinisaba/schema.graphql`.

## Tenancy

- **Organization** — the tenant. One NGO / project owner. Every record is
  scoped to an organization via the `organization_id` owner field. The user's
  org is carried in the Cognito `custom:organization_id` claim.
- **User** — a member of an organization with a `permissions: [Permission!]!`
  list. Cognito groups (`ADMIN`, `ANALYTICS`, …) gate web-app routes;
  mobile-app gates use `PermissionType` values from the `User` model.

## Project structure (hierarchy of where work happens)

- **Level** — a node type in the project hierarchy (e.g. *Region* → *Village*
  → *Household*). Levels declare what `CustomData` fields apply to entities
  at that level and which `Intervention`s are allowed there.
- **Entity** — a concrete instance of a Level (a specific village, a specific
  household). Entities form a tree via `parentEntityID`, can carry
  `AppliedCustomData` values, and accumulate `AppliedIntervention`s.

## Interventions (what gets done)

- **Intervention** — a template for a unit of work that can be applied to an
  entity (e.g. "install water filter", "literacy workshop"). Carries
  `contents`, `surveys`, and a list of allowed `Level`s.
- **Content** — reusable supporting material (e.g. a manual, a video) linked
  to one or more interventions.
- **AppliedIntervention** — a *concrete execution* of an `Intervention` on an
  `Entity` by a `User` at a location/time. Has `ExecutedSurvey`s attached.

## Surveys (how data is collected)

- **Survey** — a questionnaire template. Has a `SurveyType` (`INITIAL` or
  `DEFAULT`) and a `SurveyStatus` (`DRAFT` / `ACTIVE` / `ARCHIVED`).
  *Initial* surveys run once per entity; *default* surveys are repeatable.
- **Question** — single item inside a survey. `QuestionType` covers text,
  single/multi choice, picture (+ tags / markings), audio, int, double,
  rating.
- **QuestionOption** — a choice in a `SINGLECHOICE` / `MULTIPLECHOICE`
  question, with optional follow-up question ids.
- **Marking** — a labelled point/box drawn on a picture answer.
- **ExecutedSurvey** — a filled-in instance of a Survey, attached to an
  `AppliedIntervention`, carrying `QuestionAnswer`s and a `useForAnalytics`
  flag.
- **QuestionAnswer** — one user's answer to one question inside an
  `ExecutedSurvey`. Pictures/audio are referenced by S3 keys (see
  `s3Paths.ts` / `dataStorePaths.dart`).

## Tags

- **InterventionTag / ContentTag / SurveyTag** — manyToMany labels for the
  three taggable resources. Used for filtering in the admin UI.

## Misc

- **Task** — an actionable to-do assigned to a `User`, optionally linked to
  an `Entity`, `AppliedIntervention`, or `ExecutedSurvey`. Used in the mobile
  app's task form.
- **Config** — the organization's app configuration: name, `ColorTheme`.
  Loaded once on login by `projectConfigStore` (web) and the equivalent
  mobile repository.
- **SessionData** — analytics breadcrumb logged per session
  (`date`, `userID`, `app`, `version`, `buildNumber`, `platform`, …).
- **schemeVersion** — per-record manual version counter for in-app
  migrations. Bump when you migrate a record's shape.
