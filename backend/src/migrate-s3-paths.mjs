import * as dotenv from "dotenv";
dotenv.config();
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";
import { S3Client, HeadObjectCommand, CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import fetch from "node-fetch";
import { parse } from "url";
import awsconfig from "./aws-exports.js";
import * as queries from "./graphql/queries.js";

const dryRun = process.argv[2] === '--dry-run';

console.log('Dry run mode:', dryRun ? 'YES' : 'NO');
console.log('');

const endpoint = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region || awsconfig.aws_project_region;
const s3BucketName = awsconfig.aws_user_files_s3_bucket;

if (!endpoint) {
  console.error('❌ AppSync endpoint not found in aws-exports.js');
  process.exit(1);
}

if (!region) {
  console.error('❌ AWS region not found in aws-exports.js');
  process.exit(1);
}

if (!s3BucketName) {
  console.error('❌ S3 bucket name not found in aws-exports.js');
  process.exit(1);
}

// Initialize S3 client
const s3Client = new S3Client({ region, credentials: defaultProvider() });

/**
 * Make a signed GraphQL request using IAM credentials
 */
async function makeSignedRequest(query, variables = {}) {
  const { hostname, pathname } = parse(endpoint);
  const body = JSON.stringify({ query, variables });

  const request = new HttpRequest({
    method: "POST",
    protocol: "https:",
    hostname,
    path: pathname,
    headers: {
      "Content-Type": "application/json",
      host: hostname,
    },
    body,
  });

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    service: "appsync",
    region,
    sha256: Sha256,
  });

  const signed = await signer.sign(request);

  const response = await fetch(endpoint, {
    method: signed.method,
    headers: signed.headers,
    body: signed.body,
  });

  const data = await response.json();
  if (data.errors) {
    console.error("GraphQL errors:", JSON.stringify(data.errors));
    throw new Error(JSON.stringify(data.errors));
  }
  return data.data;
}

/**
 * Get all organizations
 */
async function getAllOrganizations() {
  const organizations = [];
  let nextToken = null;

  do {
    const response = await makeSignedRequest(queries.listOrganizations, {
      limit: 100,
      nextToken: nextToken
    });

    organizations.push(...response.listOrganizations.items);
    nextToken = response.listOrganizations.nextToken;
  } while (nextToken);

  return organizations;
}

/**
 * Migration script to move S3 files from old paths to new paths:
 * 
 * 1. Survey pictures:
 *    OLD: interventionFiles/{interventionID}/surveyFiles/{surveyID}/pic.png
 *    NEW: surveyFiles/{surveyID}/pic.png
 * 
 * 2. Question pictures:
 *    OLD: interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png
 *    NEW: surveyFiles/{surveyID}/questionFiles/{questionID}/pic.png
 * 
 * 3. Question option pictures:
 *    OLD: interventionFiles/{interventionID}/surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png
 *    NEW: surveyFiles/{surveyID}/questionFiles/{questionID}/optionFiles/{optionID}/pic.png
 * 
 * 4. Question answer pictures:
 *    OLD: appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png
 *    NEW: executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/pic.png
 * 
 * 5. Question answer audio:
 *    OLD: appliedInterventionFiles/{appliedInterventionID}/executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.{mp3|aac}
 *    NEW: executedSurveyFiles/{executedSurveyID}/questionFiles/{questionID}/audio.{mp3|aac}
 *    (keeps original format - no conversion)
 */
async function migrateS3Paths() {
  console.log('=== Fetching all organizations ===');
  const organizations = await getAllOrganizations();
  console.log(`Found ${organizations.length} organization(s)\n`);

  if (organizations.length === 0) {
    console.log('No organizations found. Exiting.');
    return;
  }

  let totalOrgsProcessed = 0;

  for (let i = 0; i < organizations.length; i++) {
    const org = organizations[i];
    console.log(`\n[${i + 1}/${organizations.length}] Processing organization: ${org.id} (${org.nameVerbose || org.nameCamelCase})`);
    
    // Migrate survey-related files
    console.log('  === Migrating Survey files ===');
    await migrateSurveyFiles(org.id);
    
    console.log('  === Migrating Question Answer files ===');
    await migrateQuestionAnswerFiles(org.id);
    
    totalOrgsProcessed++;
    console.log(`  ✅ Organization ${org.id} migration completed`);
  }

  console.log(`\n\n✅ S3 path migration completed!`);
  console.log(`   Organizations processed: ${totalOrgsProcessed}`);
  console.log('\n⚠️  Note: This script only moves files that exist. Files that were never uploaded will not be moved.');
}

async function migrateSurveyFiles(organizationId) {
  let nextToken = null;
  let totalMoved = 0;
  let totalSkipped = 0;
  
  do {
    const response = await makeSignedRequest(queries.listSurveys, {
      filter: {
        organization_id: { eq: organizationId }
      },
      limit: 100,
      nextToken: nextToken
    });
    
    const surveys = response.listSurveys.items;
    nextToken = response.listSurveys.nextToken;
    
    for (const survey of surveys) {
      // Get intervention ID from survey
      const interventionId = survey.interventionSurveysId;
      if (!interventionId) {
        console.log(`    Survey ${survey.id} has no intervention - skipping file migration`);
        continue;
      }
      
      // 1. Migrate survey picture
      const oldSurveyPicPath = `organization/${organizationId}/interventionFiles/${interventionId}/surveyFiles/${survey.id}/pic.png`;
      const newSurveyPicPath = `organization/${organizationId}/surveyFiles/${survey.id}/pic.png`;
      
      const surveyPicResult = await moveFileIfExists(oldSurveyPicPath, newSurveyPicPath, `Survey ${survey.id} picture`);
      if (surveyPicResult === 'moved') totalMoved++;
      else if (surveyPicResult === 'skipped') totalSkipped++;
      
      // 2. Migrate question pictures and option pictures
      if (survey.questions && survey.questions.length > 0) {
        for (const question of survey.questions) {
          // Question picture
          const oldQuestionPicPath = `organization/${organizationId}/interventionFiles/${interventionId}/surveyFiles/${survey.id}/questionFiles/${question.id}/pic.png`;
          const newQuestionPicPath = `organization/${organizationId}/surveyFiles/${survey.id}/questionFiles/${question.id}/pic.png`;
          
          const questionPicResult = await moveFileIfExists(oldQuestionPicPath, newQuestionPicPath, `Question ${question.id} picture`);
          if (questionPicResult === 'moved') totalMoved++;
          else if (questionPicResult === 'skipped') totalSkipped++;
          
          // Question option pictures
          // Note: questionOptions may not be included in the listSurveys query response
          // If they're not available, option files will be skipped (they don't exist in the response)
          if (question.questionOptions && question.questionOptions.length > 0) {
            for (const option of question.questionOptions) {
              const oldOptionPicPath = `organization/${organizationId}/interventionFiles/${interventionId}/surveyFiles/${survey.id}/questionFiles/${question.id}/optionFiles/${option.id}/pic.png`;
              const newOptionPicPath = `organization/${organizationId}/surveyFiles/${survey.id}/questionFiles/${question.id}/optionFiles/${option.id}/pic.png`;
              
              const optionPicResult = await moveFileIfExists(oldOptionPicPath, newOptionPicPath, `Question Option ${option.id} picture`);
              if (optionPicResult === 'moved') totalMoved++;
              else if (optionPicResult === 'skipped') totalSkipped++;
            }
          }
        }
      }
    }
  } while (nextToken);
  
  console.log(`    Summary: ${totalMoved} moved, ${totalSkipped} skipped`);
}

async function migrateQuestionAnswerFiles(organizationId) {
  let nextToken = null;
  let totalMoved = 0;
  let totalSkipped = 0;
  
  do {
    const response = await makeSignedRequest(queries.listExecutedSurveys, {
      filter: {
        organization_id: { eq: organizationId }
      },
      limit: 100,
      nextToken: nextToken
    });
    
    const executedSurveys = response.listExecutedSurveys.items;
    nextToken = response.listExecutedSurveys.nextToken;
    
    for (const executedSurvey of executedSurveys) {
      const appliedInterventionId = executedSurvey.appliedInterventionExecutedSurveysId;
      if (!appliedInterventionId) {
        continue;
      }
      
      // Process answers
      if (executedSurvey.answers && executedSurvey.answers.length > 0) {
        for (const answer of executedSurvey.answers) {
          const questionId = answer.questionID;
          const answerType = answer.type;
          
          if (answerType === 'PICTURE' || answerType === 'PICTUREWITHTAGS') {
            // Migrate picture answer
            const oldPicPath = `organization/${organizationId}/appliedInterventionFiles/${appliedInterventionId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/pic.png`;
            const newPicPath = `organization/${organizationId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/pic.png`;
            
            const picResult = await moveFileIfExists(oldPicPath, newPicPath, `Question Answer ${questionId} picture`);
            if (picResult === 'moved') totalMoved++;
            else if (picResult === 'skipped') totalSkipped++;
          } else if (answerType === 'AUDIO') {
            // Migrate audio answer - move from old path to new path (keeping original format)
            const oldAudioPathMp3 = `organization/${organizationId}/appliedInterventionFiles/${appliedInterventionId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/audio.mp3`;
            const oldAudioPathAac = `organization/${organizationId}/appliedInterventionFiles/${appliedInterventionId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/audio.aac`;
            const newAudioPathMp3 = `organization/${organizationId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/audio.mp3`;
            const newAudioPathAac = `organization/${organizationId}/executedSurveyFiles/${executedSurvey.id}/questionFiles/${questionId}/audio.aac`;
            
            // Try to move .mp3 file first, then .aac if .mp3 doesn't exist
            let audioResult = await moveFileIfExists(oldAudioPathMp3, newAudioPathMp3, `Question Answer ${questionId} audio (.mp3)`);
            if (audioResult === 'skipped') {
              // Try .aac if .mp3 doesn't exist
              audioResult = await moveFileIfExists(oldAudioPathAac, newAudioPathAac, `Question Answer ${questionId} audio (.aac)`);
            }
            
            if (audioResult === 'moved') totalMoved++;
            else if (audioResult === 'skipped') totalSkipped++;
          }
        }
      }
    }
  } while (nextToken);
  
  console.log(`    Summary: ${totalMoved} moved, ${totalSkipped} skipped`);
}

async function moveFileIfExists(oldPath, newPath, description) {
  try {
    // Check if old file exists
    let oldFileExists = false;
    let contentType = 'image/png';
    try {
      const headResponse = await s3Client.send(new HeadObjectCommand({
        Bucket: s3BucketName,
        Key: oldPath
      }));
      oldFileExists = true;
      contentType = headResponse.ContentType || contentType;
    } catch (error) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        oldFileExists = false;
      } else {
        throw error;
      }
    }
    
    if (!oldFileExists) {
      return 'skipped';
    }
    
    // Check if new file already exists
    let newFileExists = false;
    try {
      await s3Client.send(new HeadObjectCommand({
        Bucket: s3BucketName,
        Key: newPath
      }));
      newFileExists = true;
    } catch (error) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        newFileExists = false;
      } else {
        throw error;
      }
    }
    
    if (newFileExists) {
      console.log(`    ⚠️  ${description}: New file already exists, skipping move`);
      return 'skipped';
    }
    
    if (dryRun) {
      console.log(`    [DRY RUN] Would move ${description}:`);
      console.log(`      FROM: ${oldPath}`);
      console.log(`      TO:   ${newPath}`);
      return 'moved';
    }
    
    // Copy file to new path
    await s3Client.send(new CopyObjectCommand({
      Bucket: s3BucketName,
      CopySource: `${s3BucketName}/${oldPath}`,
      Key: newPath,
      ContentType: contentType
    }));
    
    // Delete old file
    await s3Client.send(new DeleteObjectCommand({
      Bucket: s3BucketName,
      Key: oldPath
    }));
    
    console.log(`    ✅ Moved ${description}: ${oldPath} -> ${newPath}`);
    return 'moved';
  } catch (error) {
    console.error(`    ❌ Error moving ${description}:`, error.message);
    throw error; // Stop on error as requested
  }
}

// Run migration
migrateS3Paths().catch((error) => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
