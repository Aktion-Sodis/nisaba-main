# Schema and Path Migration Analysis

## Overview
This document compares the GraphQL schema and S3 storage path definitions between the old `admin-app` and the new unified `web-app` to identify migration requirements.

## 1. GraphQL Schema Differences

### 1.1 Authorization Rules
**Location:** `admin-app/frontend/amplify/backend/api/apinisaba/schema.graphql` vs `web-app/amplify/backend/api/apinisaba/schema.graphql`

**Change:** All `@model` types in web-app now include IAM provider authorization rule:
- **Old:** `@auth(rules: [{allow: owner, ownerField: "organization_id", identityClaim: "custom:organization_id"}])`
- **New:** `@auth(rules: [{allow: owner, ownerField: "organization_id", identityClaim: "custom:organization_id"}, {allow: private, provider: iam}])`

**Affected Models:**
- User, Config, Level, Intervention, Content, Survey, Entity, AppliedIntervention, ExecutedSurvey, Task, ContentTag, InterventionTag, SurveyTag, SessionData, TestObject

**Organization Model:**
- **Old:** `@auth(rules: [{allow: private, }])`
- **New:** `@auth(rules: [{allow: private}, {allow: private, provider: iam}])`

### 1.2 Survey Model - New Field
**Location:** `web-app/amplify/backend/api/apinisaba/schema.graphql` line 118

**Added Field:**
```graphql
status: SurveyStatus! @default(value: "DRAFT")
```

**New Enum:**
```graphql
enum SurveyStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}
```

**Migration Impact:** Existing surveys in admin-app will need `status` field set (defaults to "DRAFT" in web-app).

### 1.3 ExecutedSurvey Model - New Field
**Location:** `web-app/amplify/backend/api/apinisaba/schema.graphql` line 210

**Added Field:**
```graphql
useForAnalytics: Boolean @default(value: "true")
```

**Migration Impact:** Existing ExecutedSurvey records need this field (defaults to `true`).

## 2. S3 Storage Path Differences

### 2.1 Path Structure Changes

#### 2.1.1 Survey Picture Path
**Old (admin-app):** `interventionSurveyPicPath`
- Path: `interventionFiles/interventionID/surveyFiles/surveyID/pic.png`
- Parameters: `["interventionID", "surveyID"]`
- **Location:** `admin-app/frontend/src/lib/constants.js:34-37`

**New (web-app):** `surveyPicPath`
- Path: `surveyFiles/surveyID/pic.png`
- Parameters: `["surveyID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:28-31`

**Migration Impact:** Files need to be moved from `interventionFiles/{interventionID}/surveyFiles/{surveyID}/pic.png` to `surveyFiles/{surveyID}/pic.png`

#### 2.1.2 Question Picture Path
**Old (admin-app):** `questionPicPath`
- Path: `interventionFiles/interventionID/surveyFiles/surveyID/questionFiles/questionID/pic.png`
- Parameters: `["interventionID", "surveyID", "questionID"]`
- **Location:** `admin-app/frontend/src/lib/constants.js:38-41`

**New (web-app):** `questionPicPath`
- Path: `surveyFiles/surveyID/questionFiles/questionID/pic.png`
- Parameters: `["surveyID", "questionID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:32-35`

**Migration Impact:** Files need to be moved from `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png` to `surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png`

#### 2.1.3 Question Option Picture Path
**Old (admin-app):** `questionOptionPicPath`
- Path: `interventionFiles/interventionID/surveyFiles/surveyID/questionFiles/questionID/optionFiles/optionID/pic.png`
- Parameters: `["interventionID", "surveyID", "questionID", "optionID"]`
- **Location:** `admin-app/frontend/src/lib/constants.js:42-45`

**New (web-app):** `questionOptionPicPath`
- Path: `surveyFiles/surveyID/questionFiles/questionID/optionFiles/optionID/pic.png`
- Parameters: `["surveyID", "questionID", "optionID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:36-39`

**Migration Impact:** Files need to be moved from `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png` to `surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png`

#### 2.1.4 Question Answer Picture Path
**Old (admin-app):** `questionPicAnswerPath`
- Path: `appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png`
- Parameters: `["appliedInterventionID", "executedSurveyID", "questionID"]`
- **Location:** `admin-app/frontend/src/lib/constants.js:46-49`

**New (web-app frontend):** `questionPicAnswerPath`
- Path: `executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png`
- Parameters: `["executedSurveyID", "questionID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:40-43`

**New (web-app backend):** Still uses `appliedInterventionID` in path
- Path: `organization/organizationID/appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png`
- Parameters: `["organizationID", "appliedInterventionID", "executedSurveyID", "questionID"]`
- **Location:** `web-app/amplify/backend/function/analyticsApp/src/queries/data_store_paths.py:3-7`

**Migration Impact:** 
- Frontend expects files at: `executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png`
- Backend still uses: `appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png`
- **INCONSISTENCY:** Frontend and backend use different paths for the same files

#### 2.1.5 Question Answer Audio Path
**Old (admin-app):** `questionAudioAnswerPath`
- Path: `appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.mp3`
- Parameters: `["appliedInterventionID", "executedSurveyID", "questionID"]`
- **Location:** `admin-app/frontend/src/lib/constants.js:50-53`

**New (web-app frontend):** `questionAudioAnswerPath`
- Path: `executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.aac`
- Parameters: `["executedSurveyID", "questionID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:44-47`

**New (web-app backend):** Still uses `appliedInterventionID` and `.aac` format
- Path: `organization/organizationID/appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.aac`
- Parameters: `["organizationID", "appliedInterventionID", "executedSurveyID", "questionID"]`
- **Location:** `web-app/amplify/backend/function/analyticsApp/src/queries/data_store_paths.py:9-13`

**Migration Impact:**
- File format changed: `.mp3` → `.aac`
- Path structure changed: removed `appliedInterventionID` from frontend path
- **INCONSISTENCY:** Frontend and backend use different paths

### 2.2 Organization Prefix
**Old (admin-app):** Organization ID passed as parameter to `deriveFilePath` function
- **Location:** `admin-app/frontend/src/lib/utils.js:20-29`
- Function signature: `deriveFilePath(organizationId, wantedDerivative, paramsObj)`
- Returns: `organization/${organizationId}/${path}`

**New (web-app):** Organization ID automatically added in `deriveS3Path`
- **Location:** `web-app/src/utils/s3Paths.ts:73-89`
- Function signature: `deriveS3Path(pathKey, replacements)`
- Automatically prepends: `organization/${authStore.organizationId}/${path}`

**Migration Impact:** Path generation logic changed, but final paths should be the same (both include organization prefix).

### 2.3 New Path Definitions

#### 2.3.1 Failed DB Object Path
**New (web-app only):** `failedDBObject`
- Path: `failedDBObjects/type/failedDBObjectID.json`
- Parameters: `["type", "failedDBObjectID"]`
- **Location:** `web-app/src/utils/s3Paths.ts:64-67`

**Migration Impact:** No migration needed (new feature).

### 2.4 Unchanged Paths
The following paths remain the same:
- `userPicPath`: `userFiles/userID/pic.png`
- `levelPicPath`: `levelFiles/levelID/pic.png`
- `levelCustomDataPicPath`: `levelFiles/levelID/customDataFiles/customDataID/pic.png`
- `interventionPicPath`: `interventionFiles/interventionID/pic.png`
- `docPdfPath`: `documentFiles/documentID/pdf.pdf`
- `docPicPath`: `documentFiles/documentID/pic.png`
- `appliedInterventionPicPath`: `appliedInterventionFiles/appliedInterventionID/pic.png`
- `entityPicPath`: `entityFiles/entityID/pic.png`
- `taskPicPath`: `taskFiles/taskID/pic.png`
- `taskAudioPath`: `taskFiles/taskID/audio.mp3`

## 3. Critical Migration Issues

### 3.1 Path Inconsistency Between Frontend and Backend
**Issue:** Question answer paths (picture and audio) differ between frontend and backend in web-app:
- Frontend expects: `executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/...`
- Backend generates: `organization/{organizationID}/appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/...`

**Impact:** Files may not be found if frontend and backend use different path structures.

### 3.2 Audio Format Change
**Issue:** Question answer audio files changed from `.mp3` to `.aac`
- Old format: `audio.mp3`
- New format: `audio.aac`

**Impact:** Existing `.mp3` files need conversion or path mapping.

## 4. Migration Checklist

### 4.1 GraphQL Schema Migration
- [ ] Add IAM provider authorization rules to all models
- [ ] Add `status` field to all Survey records (default: "DRAFT")
- [ ] Add `useForAnalytics` field to all ExecutedSurvey records (default: `true`)

### 4.2 S3 Path Migration
- [ ] Move survey pictures: `interventionFiles/{interventionID}/surveyFiles/{surveyID}/pic.png` → `surveyFiles/{surveyID}/pic.png`
- [ ] Move question pictures: `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png` → `surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png`
- [ ] Move question option pictures: `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png` → `surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png`
- [ ] Resolve question answer path inconsistency (frontend vs backend)
- [ ] Convert/migrate audio files: `.mp3` → `.aac` or update path references

### 4.3 Code Updates
- [ ] Update all references from `interventionSurveyPicPath` to `surveyPicPath`
- [ ] Update question path generation to remove `interventionID` parameter
- [ ] Align frontend and backend question answer path generation
- [ ] Update audio file format handling

## 5. Path Comparison Summary

| Path Type | Old Path Structure | New Path Structure | Parameters Changed |
|-----------|-------------------|-------------------|-------------------|
| Survey Picture | `interventionFiles/{interventionID}/surveyFiles/{surveyID}/pic.png` | `surveyFiles/{surveyID}/pic.png` | Removed `interventionID` |
| Question Picture | `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png` | `surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png` | Removed `interventionID` |
| Question Option Picture | `interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png` | `surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png` | Removed `interventionID` |
| Question Answer Picture (Frontend) | `appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png` | `executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png` | Removed `appliedInterventionID` |
| Question Answer Picture (Backend) | `appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png` | `organization/{organizationID}/appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png` | Added `organizationID` prefix |
| Question Answer Audio (Frontend) | `appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.mp3` | `executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.aac` | Removed `appliedInterventionID`, changed format |
| Question Answer Audio (Backend) | `appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.mp3` | `organization/{organizationID}/appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.aac` | Added `organizationID` prefix, changed format |

## 6. Files to Review

### Schema Files
- `admin-app/frontend/amplify/backend/api/apinisaba/schema.graphql`
- `web-app/amplify/backend/api/apinisaba/schema.graphql`

### Path Definition Files
- `admin-app/frontend/src/lib/constants.js` (path definitions)
- `admin-app/frontend/src/lib/utils.js` (path generation function)
- `web-app/src/utils/s3Paths.ts` (path definitions and generation)
- `web-app/amplify/backend/function/analyticsApp/src/queries/data_store_paths.py` (backend path generation)
- `lib/utils/s3PathDefinitions/index.js` (shared path definitions)
- `lib/utils/s3PathDefinitions/dataStorePaths.dart` (mobile app path definitions)

