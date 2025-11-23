# Migration Scripts - IAM Setup Instructions

## Overview

The migration scripts (`migrate-schema-changes.mjs` and `migrate-s3-paths.mjs`) now use AWS IAM credentials instead of Cognito authentication. This allows them to process all organizations automatically in a single run.

## Using Existing AWS CLI Credentials

If you have AWS CLI configured with admin credentials, you can use them directly. The scripts will automatically use the default credential provider chain, which includes:

1. Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
2. AWS credentials file (`~/.aws/credentials`)
3. IAM role (if running on EC2/ECS/Lambda)

### Verify Your Credentials

Before running the migration, verify your AWS credentials are configured:

```bash
aws sts get-caller-identity
```

This should return your AWS account ID, user ARN, and user ID.

### Test with Dry Run

Always test with the `--dry-run` flag first:

```bash
# Schema migration dry run
node src/migrate-schema-changes.mjs --dry-run

# S3 paths migration dry run
node src/migrate-s3-paths.mjs --dry-run
```

## Required IAM Permissions

If your existing credentials don't have sufficient permissions, you'll need to ensure the IAM user/role has the following permissions:

### AppSync (GraphQL API) Permissions

```json
{
  "Effect": "Allow",
  "Action": [
    "appsync:GraphQL"
  ],
  "Resource": "arn:aws:appsync:REGION:ACCOUNT_ID:apis/API_ID/*"
}
```

Replace:
- `REGION`: Your AWS region (e.g., `eu-central-1`)
- `ACCOUNT_ID`: Your AWS account ID
- `API_ID`: Your AppSync API ID (can be found in `aws-exports.js` as part of the GraphQL endpoint URL)

### S3 Permissions

```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:PutObject",
    "s3:DeleteObject",
    "s3:ListBucket"
  ],
  "Resource": [
    "arn:aws:s3:::BUCKET_NAME",
    "arn:aws:s3:::BUCKET_NAME/*"
  ]
}
```

Replace `BUCKET_NAME` with your S3 bucket name (found in `aws-exports.js` as `aws_user_files_s3_bucket`).

### DynamoDB Permissions (if needed)

If the GraphQL API requires direct DynamoDB access, you may also need:

```json
{
  "Effect": "Allow",
  "Action": [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  ],
  "Resource": "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/TABLE_NAME"
}
```

However, if you're using AppSync with IAM authentication, the AppSync permissions above should be sufficient.

## Running the Migrations

### Schema Migration

```bash
# Dry run (recommended first)
node src/migrate-schema-changes.mjs --dry-run

# Actual migration
node src/migrate-schema-changes.mjs
```

This will:
1. List all organizations
2. For each organization:
   - Update Survey records: Add `status="ACTIVE"` if missing
   - Update ExecutedSurvey records: Add `useForAnalytics=true` if missing

### S3 Paths Migration

```bash
# Dry run (recommended first)
node src/migrate-s3-paths.mjs --dry-run

# Actual migration
node src/migrate-s3-paths.mjs
```

This will:
1. List all organizations
2. For each organization:
   - Move survey picture files (remove `interventionFiles/{interventionID}/` prefix)
   - Move question picture files
   - Move question option picture files (if applicable)
   - Move question answer picture files (remove `appliedInterventionFiles/{appliedInterventionID}/` prefix)
   - Move question answer audio files (preserving original format: .mp3 or .aac)

## Error Handling

The scripts are configured to **stop on any error**. If an error occurs:
- The script will log the error and exit
- No partial migrations will be committed
- You can fix the issue and re-run the script

## Troubleshooting

### "Access Denied" Errors

If you get access denied errors:
1. Verify your credentials: `aws sts get-caller-identity`
2. Check that your IAM user/role has the required permissions listed above
3. Ensure you're using the correct AWS region

### "Endpoint not found" Errors

If you get endpoint errors:
1. Verify `aws-exports.js` exists and is up to date
2. Check that the AppSync endpoint is correct
3. Ensure you're in the correct directory (`backend/`)

### GraphQL Errors

If you get GraphQL errors:
1. Check that the GraphQL schema matches what the scripts expect
2. Verify the queries/mutations in `graphql/queries.js` and `graphql/mutations.js` are up to date
3. Run with `--dry-run` first to see what operations would be performed

## Notes

- The scripts process organizations sequentially (one at a time)
- Progress is logged for each organization
- Files that don't exist are skipped (not an error)
- The S3 migration uses `CopyObject` and `DeleteObject` operations (atomic move)

