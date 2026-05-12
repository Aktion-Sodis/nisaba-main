# Commands

Only commands that actually exist in the repo today. If a command is not here,
it has not been wired up.

## Web app (`web-app/`)

```bash
cd web-app
npm install            # first-time / after dep change
npm run dev            # Vite dev server, http://localhost:3000
npm run build          # production build into dist/
npm run serve          # preview the production build
npm run lint           # eslint . --ext .vue,.js,.ts
```

Husky + lint-staged run `eslint --cache --fix` on staged `.js,.ts,.vue` files
on commit (`npm run prepare` installs the hook).

The Amplify Hosting build runs `npm ci && npm run build` and serves `dist/`
(`web-app/amplify.yml`).

## Mobile app (`mobile-app/`)

```bash
cd mobile-app
flutter pub get                              # install dependencies
flutter pub run build_runner build           # regenerate models (after schema change)
flutter pub run build_runner build --delete-conflicting-outputs   # force regen
flutter run                                  # run on the selected device/emulator
flutter run -d <deviceId>                    # pick a specific device (flutter devices)
flutter test                                 # unit/widget tests (scaffolded, not exhaustive)
flutter pub run flutter_launcher_icons:main  # regenerate app icons from assets/fixAssets/app_icon.png
./buildcheck.sh                              # Android 16 KB-page-size ELF alignment check (Play Store gate)
```

The `.env` file in `mobile-app/` is loaded at startup via `flutter_dotenv`.

## Backend admin & migration scripts (`backend/`)

```bash
cd backend
npm install            # one-time
aws sts get-caller-identity     # confirm IAM creds are picked up
```

Available scripts (run from `backend/`):

```bash
node src/migrate-schema-changes.mjs --dry-run
node src/migrate-schema-changes.mjs

node src/migrate-s3-paths.mjs --dry-run
node src/migrate-s3-paths.mjs

npm run create-organization
npm run create-user
npm run complete-new-password
npm run seed-test-data            # invokes src/seed-test-data.mjs (note: see backend/src/seed-admin-data.mjs)
node src/seed-admin-data.mjs
node src/clear-admin-data.mjs     # destructive — confirm scope first
```

**Migration safety:** `migrate-*.mjs` stop on the first error and do not
resume. Always run with `--dry-run` first. Required IAM permissions are
documented in `backend/MIGRATION_IAM_SETUP.md`.

## Amplify CLI (any of `backend/`, `web-app/`, `mobile-app/`)

```bash
amplify status         # what's changed vs. cloud
amplify pull           # sync local copy from cloud (use in web-app/ and mobile-app/ after schema changes)
amplify push           # deploy local changes (normally only from backend/, via CI)
amplify codegen        # regenerate API.ts / dart models
amplify env list       # only "release" exists today
```

## Lambda (Python) — `backend/amplify/backend/function/analyticsApp/`

```bash
cd backend/amplify/backend/function/analyticsApp
pipenv install         # uses Pipfile + Pipfile.lock
pipenv shell
python -c "import src.index"   # smoke check
```

There is no local invocation harness yet; the Lambda is exercised via API
Gateway after `amplify push`.

## CI

GitHub Actions in `.github/workflows/`:

- `release.js.yml` — on push to `main`, generates a release tag
  (`lib/cicd/node/release`).
- `prod.js.yml` — on push to `main`, deploys to prod
  (`lib/cicd/node/deploy/deploy.sh`), gated by a label check.

No test or lint job runs in CI today.

## Tips

- `web-app` and `backend` both have generated files near 1 MB
  (`web-app/src/API.ts`, lockfiles); avoid opening them in the editor when
  searching.
- Use `aws sts get-caller-identity` before any backend script to confirm you
  are pointed at the right AWS account.
