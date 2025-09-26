import * as dotenv from "dotenv";
dotenv.config();
import { Auth, Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import * as mutations from "./graphql/mutations.js";
import * as queries from "./graphql/queries.js";
import { createInterface } from 'readline';

// Simplified delete mutations that only return ID to avoid relation errors
const deleteSurveySimple = /* GraphQL */ `
  mutation DeleteSurveySimple($input: DeleteSurveyInput!) {
    deleteSurvey(input: $input) {
      id
    }
  }
`;

const deleteInterventionSimple = /* GraphQL */ `
  mutation DeleteInterventionSimple($input: DeleteInterventionInput!) {
    deleteIntervention(input: $input) {
      id
    }
  }
`;

const deleteEntitySimple = /* GraphQL */ `
  mutation DeleteEntitySimple($input: DeleteEntityInput!) {
    deleteEntity(input: $input) {
      id
    }
  }
`;

const deleteAppliedInterventionSimple = /* GraphQL */ `
  mutation DeleteAppliedInterventionSimple($input: DeleteAppliedInterventionInput!) {
    deleteAppliedIntervention(input: $input) {
      id
    }
  }
`;

const deleteExecutedSurveySimple = /* GraphQL */ `
  mutation DeleteExecutedSurveySimple($input: DeleteExecutedSurveyInput!) {
    deleteExecutedSurvey(input: $input) {
      id
    }
  }
`;

const deleteLevelInterventionRelationSimple = /* GraphQL */ `
  mutation DeleteLevelInterventionRelationSimple($input: DeleteLevelInterventionRelationInput!) {
    deleteLevelInterventionRelation(input: $input) {
      id
    }
  }
`;

const deleteLevelSimple = /* GraphQL */ `
  mutation DeleteLevelSimple($input: DeleteLevelInput!) {
    deleteLevel(input: $input) {
      id
    }
  }
`;

// Set Amplify logging to INFO level
Amplify.Logger.LOG_LEVEL = 'INFO';

Amplify.configure(awsconfig);

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("Please provide username and password as command line arguments");
  console.error("Usage: node clear-admin-data.mjs <username> <password>");
  process.exit(1);
}

// Generate a random 6-digit confirmation code
function generateConfirmationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create readline interface for user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise-based question function
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function clearAdminData() {
  try {
    // Sign in with Cognito
    await Auth.signIn(username, password);
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
    console.log("Authenticated user:", user.username);
    
    const attributes = await Auth.userAttributes(user);
    console.log("User attributes:", attributes);
    
    // Extract organization_id from user attributes
    const organizationId = attributes.find(attr => attr.Name === 'custom:organization_id')?.Value;
    if (!organizationId) {
      throw new Error('Organization ID not found in user attributes');
    }
    console.log('Using organization_id:', organizationId);
    
    // Configure API with organization_id
    API.configure({
      ...awsconfig,
      graphql_headers: async () => {
        try {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken();
          return { 
            Authorization: token,
            'x-organization-id': organizationId 
          };
        } catch (error) {
          console.error('Error getting session:', error);
          return {};
        }
      },
    });

    console.log("\n=== DANGER: DATA CLEARING OPERATION ===");
    console.log("⚠️  WARNING: This operation will PERMANENTLY DELETE ALL DATA in your organization!");
    console.log("⚠️  This includes:");
    console.log("   - All levels and their custom data");
    console.log("   - All entities and their custom data");
    console.log("   - All interventions");
    console.log("   - All surveys and questions");
    console.log("   - All applied interventions");
    console.log("   - All executed surveys and answers");
    console.log("   - All level-intervention relations");
    console.log("   - All other related data");
    console.log("\n⚠️  THIS ACTION CANNOT BE UNDONE!");
    console.log("⚠️  Make sure you have backups if needed!");

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();
    console.log(`\n🔐 To proceed, you must enter this confirmation code: ${confirmationCode}`);

    // Ask for confirmation
    const userConfirmation = await askQuestion("\nEnter the confirmation code to proceed (or 'cancel' to abort): ");
    
    if (userConfirmation.toLowerCase() === 'cancel') {
      console.log("❌ Operation cancelled by user.");
      rl.close();
      return;
    }

    if (userConfirmation !== confirmationCode) {
      console.log("❌ Invalid confirmation code. Operation aborted.");
      rl.close();
      return;
    }

    // Final confirmation
    const finalConfirmation = await askQuestion("\n⚠️  Are you absolutely sure you want to delete ALL data? Type 'DELETE ALL DATA' to confirm: ");
    
    if (finalConfirmation !== 'DELETE ALL DATA') {
      console.log("❌ Final confirmation failed. Operation aborted.");
      rl.close();
      return;
    }

    console.log("\n🗑️  Starting data clearing operation...");

    // Check if queries are available
    console.log("\n🔍 Checking available queries...");
    console.log("Available queries:", Object.keys(queries));
    console.log("Available mutations:", Object.keys(mutations));

    // Get all existing data first
    console.log("\n📋 Fetching existing data...");
    
    const [
      executedSurveysResponse,
      appliedInterventionsResponse,
      levelInterventionRelationsResponse,
      entitiesResponse,
      surveysResponse,
      interventionsResponse,
      levelsResponse
    ] = await Promise.all([
      API.graphql({
        query: `
          query ListExecutedSurveys {
            listExecutedSurveys(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListAppliedInterventions {
            listAppliedInterventions(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListLevelInterventionRelations {
            listLevelInterventionRelations(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListEntities {
            listEntities(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListSurveys {
            listSurveys(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListInterventions {
            listInterventions(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      }),
      API.graphql({
        query: `
          query ListLevels {
            listLevels(filter: { _deleted: { ne: true } }) {
              items {
                id
                _version
              }
            }
          }
        `
      })
    ]);

    const counts = {
      executedSurveys: executedSurveysResponse.data.listExecutedSurveys.items.length,
      appliedInterventions: appliedInterventionsResponse.data.listAppliedInterventions.items.length,
      levelInterventionRelations: levelInterventionRelationsResponse.data.listLevelInterventionRelations.items.length,
      entities: entitiesResponse.data.listEntities.items.length,
      surveys: surveysResponse.data.listSurveys.items.length,
      interventions: interventionsResponse.data.listInterventions.items.length,
      levels: levelsResponse.data.listLevels.items.length
    };

    console.log("📊 Found the following data to delete:");
    console.log(`   - ${counts.executedSurveys} executed surveys`);
    console.log(`   - ${counts.appliedInterventions} applied interventions`);
    console.log(`   - ${counts.levelInterventionRelations} level-intervention relations`);
    console.log(`   - ${counts.entities} entities`);
    console.log(`   - ${counts.surveys} surveys`);
    console.log(`   - ${counts.interventions} interventions`);
    console.log(`   - ${counts.levels} levels`);

    const totalItems = Object.values(counts).reduce((sum, count) => sum + count, 0);
    console.log(`\n📈 Total items to delete: ${totalItems}`);

    if (totalItems === 0) {
      console.log("✅ No data found to delete. Organization is already clean.");
      rl.close();
      return;
    }

    // Delete in correct order to respect dependencies
    console.log("\n🗑️  Deleting data in dependency order...");

    // 1. Delete executed surveys first (they depend on applied interventions and surveys)
    console.log("\n1️⃣ Deleting executed surveys...");
    for (const executedSurvey of executedSurveysResponse.data.listExecutedSurveys.items) {
      try {
        console.log(`   🗑️  Attempting to delete executed survey: ${executedSurvey.id} (version: ${executedSurvey._version})`);
        await API.graphql({
          query: deleteExecutedSurveySimple,
          variables: { 
            input: { 
              id: executedSurvey.id,
              _version: executedSurvey._version
            }
          }
        });
        console.log(`   ✅ Deleted executed survey: ${executedSurvey.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete executed survey ${executedSurvey.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 2. Delete applied interventions
    console.log("\n2️⃣ Deleting applied interventions...");
    for (const appliedIntervention of appliedInterventionsResponse.data.listAppliedInterventions.items) {
      try {
        console.log(`   🗑️  Attempting to delete applied intervention: ${appliedIntervention.id} (version: ${appliedIntervention._version})`);
        await API.graphql({
          query: deleteAppliedInterventionSimple,
          variables: { 
            input: { 
              id: appliedIntervention.id,
              _version: appliedIntervention._version
            }
          }
        });
        console.log(`   ✅ Deleted applied intervention: ${appliedIntervention.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete applied intervention ${appliedIntervention.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 3. Delete level-intervention relations
    console.log("\n3️⃣ Deleting level-intervention relations...");
    for (const relation of levelInterventionRelationsResponse.data.listLevelInterventionRelations.items) {
      try {
        console.log(`   🗑️  Attempting to delete level-intervention relation: ${relation.id} (version: ${relation._version})`);
        await API.graphql({
          query: deleteLevelInterventionRelationSimple,
          variables: { 
            input: { 
              id: relation.id,
              _version: relation._version
            }
          }
        });
        console.log(`   ✅ Deleted level-intervention relation: ${relation.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete level-intervention relation ${relation.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 4. Delete entities
    console.log("\n4️⃣ Deleting entities...");
    for (const entity of entitiesResponse.data.listEntities.items) {
      try {
        console.log(`   🗑️  Attempting to delete entity: ${entity.id} (version: ${entity._version})`);
        await API.graphql({
          query: deleteEntitySimple,
          variables: { 
            input: { 
              id: entity.id,
              _version: entity._version
            }
          }
        });
        console.log(`   ✅ Deleted entity: ${entity.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete entity ${entity.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 5. Delete surveys (before interventions)
    console.log("\n5️⃣ Deleting surveys...");
    for (const survey of surveysResponse.data.listSurveys.items) {
      try {
        console.log(`   🗑️  Attempting to delete survey: ${survey.id} (version: ${survey._version})`);
        await API.graphql({
          query: deleteSurveySimple,
          variables: { 
            input: { 
              id: survey.id,
              _version: survey._version
            }
          }
        });
        console.log(`   ✅ Deleted survey: ${survey.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete survey ${survey.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 6. Delete interventions (after surveys)
    console.log("\n6️⃣ Deleting interventions...");
    for (const intervention of interventionsResponse.data.listInterventions.items) {
      try {
        console.log(`   🗑️  Attempting to delete intervention: ${intervention.id} (version: ${intervention._version})`);
        await API.graphql({
          query: deleteInterventionSimple,
          variables: { 
            input: { 
              id: intervention.id,
              _version: intervention._version
            }
          }
        });
        console.log(`   ✅ Deleted intervention: ${intervention.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete intervention ${intervention.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    // 7. Delete levels last
    console.log("\n7️⃣ Deleting levels...");
    for (const level of levelsResponse.data.listLevels.items) {
      try {
        console.log(`   🗑️  Attempting to delete level: ${level.id} (version: ${level._version})`);
        await API.graphql({
          query: deleteLevelSimple,
          variables: { 
            input: { 
              id: level.id,
              _version: level._version
            }
          }
        });
        console.log(`   ✅ Deleted level: ${level.id}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete level ${level.id}:`, error);
        console.warn(`   Error details:`, JSON.stringify(error, null, 2));
        if (error.errors) {
          console.warn(`   GraphQL errors:`, error.errors);
        }
      }
    }

    console.log("\n✅ Data clearing operation completed!");
    console.log("🎉 Organization data has been successfully cleared.");
    console.log("💡 You can now run the seed script to populate with fresh data.");

  } catch (error) {
    console.error("❌ Error during data clearing operation:", error);
    throw error;
  } finally {
    rl.close();
  }
}

clearAdminData();
