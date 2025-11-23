import * as dotenv from "dotenv";
dotenv.config();
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";
import fetch from "node-fetch";
import { parse } from "url";
import awsconfig from "./aws-exports.js";
import * as queries from "./graphql/queries.js";
import * as mutations from "./graphql/mutations.js";

const dryRun = process.argv[2] === '--dry-run';

console.log('Dry run mode:', dryRun ? 'YES' : 'NO');
console.log('');

const endpoint = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region || awsconfig.aws_project_region;

if (!endpoint) {
  console.error('❌ AppSync endpoint not found in aws-exports.js');
  process.exit(1);
}

if (!region) {
  console.error('❌ AWS region not found in aws-exports.js');
  process.exit(1);
}

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
 * Migration script to add new schema fields:
 * 1. Add 'status' field to Survey records (default: "ACTIVE")
 * 2. Add 'useForAnalytics' field to ExecutedSurvey records (default: true)
 */
async function migrateSchemaChanges() {
  console.log('=== Fetching all organizations ===');
  const organizations = await getAllOrganizations();
  console.log(`Found ${organizations.length} organization(s)\n`);

  if (organizations.length === 0) {
    console.log('No organizations found. Exiting.');
    return;
  }

  let totalOrgsProcessed = 0;
  let totalOrgsFailed = 0;

  for (let i = 0; i < organizations.length; i++) {
    const org = organizations[i];
    console.log(`\n[${i + 1}/${organizations.length}] Processing organization: ${org.id} (${org.nameVerbose || org.nameCamelCase})`);
    
    try {
      // 1. Migrate Survey records - add 'status' field
      console.log('  === Migrating Survey records ===');
      await migrateSurveys(org.id);
      
      // 2. Migrate ExecutedSurvey records - add 'useForAnalytics' field
      console.log('  === Migrating ExecutedSurvey records ===');
      await migrateExecutedSurveys(org.id);
      
      totalOrgsProcessed++;
      console.log(`  ✅ Organization ${org.id} migration completed`);
    } catch (error) {
      totalOrgsFailed++;
      console.error(`  ❌ Organization ${org.id} migration failed:`, error.message);
      throw error; // Stop on error as requested
    }
  }

  console.log(`\n\n✅ Migration completed!`);
  console.log(`   Organizations processed: ${totalOrgsProcessed}`);
  if (totalOrgsFailed > 0) {
    console.log(`   Organizations failed: ${totalOrgsFailed}`);
  }
}

async function migrateSurveys(organizationId) {
  // Modified query to include status field
  const listSurveysWithStatus = `
    query ListSurveys($filter: ModelSurveyFilterInput, $limit: Int, $nextToken: String) {
      listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          status
          _version
        }
        nextToken
      }
    }
  `;

  let nextToken = null;
  let totalUpdated = 0;
  let totalSkipped = 0;
  
  do {
    const response = await makeSignedRequest(listSurveysWithStatus, {
      filter: {
        organization_id: { eq: organizationId }
      },
      limit: 100,
      nextToken: nextToken
    });
    
    const surveys = response.listSurveys.items;
    nextToken = response.listSurveys.nextToken;
    
    for (const survey of surveys) {
      // Check if survey already has status field
      if (survey.status) {
        console.log(`    Survey ${survey.id} already has status: ${survey.status} - skipping`);
        totalSkipped++;
        continue;
      }
      
      // Default status to ACTIVE for existing surveys
      const updateInput = {
        id: survey.id,
        status: 'ACTIVE',
        _version: survey._version || 1
      };
      
      if (dryRun) {
        console.log(`    [DRY RUN] Would update Survey ${survey.id}: add status="ACTIVE"`);
        totalUpdated++;
      } else {
        await makeSignedRequest(mutations.updateSurvey, {
          input: updateInput
        });
        console.log(`    ✅ Updated Survey ${survey.id}: added status="ACTIVE"`);
        totalUpdated++;
      }
    }
  } while (nextToken);
  
  console.log(`    Summary: ${totalUpdated} updated, ${totalSkipped} skipped`);
}

async function migrateExecutedSurveys(organizationId) {
  // Modified query to include useForAnalytics field
  const listExecutedSurveysWithUseForAnalytics = `
    query ListExecutedSurveys($filter: ModelExecutedSurveyFilterInput, $limit: Int, $nextToken: String) {
      listExecutedSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          useForAnalytics
          _version
        }
        nextToken
      }
    }
  `;

  let nextToken = null;
  let totalUpdated = 0;
  let totalSkipped = 0;
  
  do {
    const response = await makeSignedRequest(listExecutedSurveysWithUseForAnalytics, {
      filter: {
        organization_id: { eq: organizationId }
      },
      limit: 100,
      nextToken: nextToken
    });
    
    const executedSurveys = response.listExecutedSurveys.items;
    nextToken = response.listExecutedSurveys.nextToken;
    
    for (const executedSurvey of executedSurveys) {
      // Check if executedSurvey already has useForAnalytics field
      if (executedSurvey.useForAnalytics !== undefined && executedSurvey.useForAnalytics !== null) {
        console.log(`    ExecutedSurvey ${executedSurvey.id} already has useForAnalytics: ${executedSurvey.useForAnalytics} - skipping`);
        totalSkipped++;
        continue;
      }
      
      // Default useForAnalytics to true if not set
      const updateInput = {
        id: executedSurvey.id,
        useForAnalytics: true,
        _version: executedSurvey._version || 1
      };
      
      if (dryRun) {
        console.log(`    [DRY RUN] Would update ExecutedSurvey ${executedSurvey.id}: add useForAnalytics=true`);
        totalUpdated++;
      } else {
        await makeSignedRequest(mutations.updateExecutedSurvey, {
          input: updateInput
        });
        console.log(`    ✅ Updated ExecutedSurvey ${executedSurvey.id}: added useForAnalytics=true`);
        totalUpdated++;
      }
    }
  } while (nextToken);
  
  console.log(`    Summary: ${totalUpdated} updated, ${totalSkipped} skipped`);
}

// Run migration
migrateSchemaChanges().catch((error) => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
