import * as dotenv from "dotenv";
dotenv.config();
import { Auth, Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import * as mutations from "./graphql/mutations.js";
import * as queries from "./graphql/queries.js";
import { v4 as uuidv4 } from 'uuid';

// Set Amplify logging to INFO level
Amplify.Logger.LOG_LEVEL = 'INFO';

Amplify.configure(awsconfig);

const username = process.argv[2];
const password = process.argv[3];
const shouldCreate = process.argv[4] === 'create';

if (!username || !password) {
  console.error("Please provide username and password as command line arguments");
  console.error("Optionally add 'create' as third argument to create test data");
  process.exit(1);
}

async function listExistingData() {
  try {
    console.log("\n=== Listing Existing Levels ===");
    const listLevelsResponse = await API.graphql({
      query: `
        query ListLevels {
          listLevels(filter: { _deleted: { ne: true } }) {
            items {
              id
              name {
                languageKeys
                languageTexts
              }
              description {
                languageKeys
                languageTexts
              }
              parentLevelID
              interventionsAreAllowed
              schemeVersion
              customData
            }
          }
        }
      `
    });
    console.log("Levels:", JSON.stringify(listLevelsResponse.data.listLevels.items, null, 2));

    console.log("\n=== Listing Existing Interventions ===");
    const listInterventionsResponse = await API.graphql({
      query: `
        query ListInterventions {
          listInterventions(filter: { _deleted: { ne: true } }) {
            items {
              id
              name {
                languageKeys
                languageTexts
              }
              description {
                languageKeys
                languageTexts
              }
              interventionType
              schemeVersion
            }
          }
        }
      `
    });
    console.log("Interventions:", JSON.stringify(listInterventionsResponse.data.listInterventions.items, null, 2));

    console.log("\n=== Listing Existing Surveys ===");
    const listSurveysResponse = await API.graphql({
      query: `
        query ListSurveys {
          listSurveys(filter: { _deleted: { ne: true } }) {
            items {
              id
              name {
                languageKeys
                languageTexts
              }
              description {
                languageKeys
                languageTexts
              }
              questions {
                id
                text {
                  languageKeys
                  languageTexts
                }
                type
                questionOptions {
                  id
                  text {
                    languageKeys
                    languageTexts
                  }
                  followUpQuestionIDs
                }
                isFollowUpQuestion
              }
              tags {
                items {
                  id
                }
                nextToken
              }
              surveyType
              schemeVersion
              archived
              interventionSurveysId
            }
          }
        }
      `
    });
    console.log("Surveys:", JSON.stringify(listSurveysResponse.data.listSurveys.items, null, 2));
  } catch (error) {
    console.error("Error listing existing data:", error);
  }
}

async function clearExistingData() {
  try {
    console.log("\n=== Clearing Existing Data ===");

    // First get all existing data
    console.log("Fetching existing data...");
    const listSurveysResponse = await API.graphql({
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
    });
    const listInterventionsResponse = await API.graphql({
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
    });
    const listLevelsResponse = await API.graphql({
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
    });
    const listEntitiesResponse = await API.graphql({
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
    });
    const listLevelInterventionRelationsResponse = await API.graphql({
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
    });

    // Delete in correct order to respect dependencies
    console.log("\nDeleting surveys...");
    for (const survey of listSurveysResponse.data.listSurveys.items) {
      try {
        // First get the latest version of the survey
        const getSurveyResponse = await API.graphql({
          query: queries.getSurvey,
          variables: { id: survey.id }
        });
        const latestVersion = getSurveyResponse.data.getSurvey._version;
        
        await API.graphql({
          query: mutations.deleteSurvey,
          variables: { 
            input: { 
              id: survey.id,
              _version: latestVersion
            }
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not delete survey ${survey.id}:`, error);
      }
    }

    console.log("Deleting level-intervention relations...");
    for (const relation of listLevelInterventionRelationsResponse.data.listLevelInterventionRelations.items) {
      try {
        // First get the latest version of the relation
        const getRelationResponse = await API.graphql({
          query: queries.getLevelInterventionRelation,
          variables: { id: relation.id }
        });
        const latestVersion = getRelationResponse.data.getLevelInterventionRelation._version;
        
        await API.graphql({
          query: mutations.deleteLevelInterventionRelation,
          variables: { 
            input: { 
              id: relation.id,
              _version: latestVersion
            }
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not delete relation ${relation.id}:`, error);
      }
    }

    console.log("Deleting interventions...");
    for (const intervention of listInterventionsResponse.data.listInterventions.items) {
      try {
        // First get the latest version of the intervention
        const getInterventionResponse = await API.graphql({
          query: queries.getIntervention,
          variables: { id: intervention.id }
        });
        const latestVersion = getInterventionResponse.data.getIntervention._version;
        
        await API.graphql({
          query: mutations.deleteIntervention,
          variables: { 
            input: { 
              id: intervention.id,
              _version: latestVersion
            }
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not delete intervention ${intervention.id}:`, error);
      }
    }

    console.log("Deleting entities...");
    for (const entity of listEntitiesResponse.data.listEntities.items) {
      try {
        // First get the latest version of the entity
        const getEntityResponse = await API.graphql({
          query: queries.getEntity,
          variables: { id: entity.id }
        });
        const latestVersion = getEntityResponse.data.getEntity._version;
        
        await API.graphql({
          query: mutations.deleteEntity,
          variables: { 
            input: { 
              id: entity.id,
              _version: latestVersion
            }
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not delete entity ${entity.id}:`, error);
      }
    }

    console.log("Deleting levels...");
    for (const level of listLevelsResponse.data.listLevels.items) {
      try {
        // First get the latest version of the level
        const getLevelResponse = await API.graphql({
          query: queries.getLevel,
          variables: { id: level.id }
        });
        const latestVersion = getLevelResponse.data.getLevel._version;
        
        await API.graphql({
          query: mutations.deleteLevel,
          variables: { 
            input: { 
              id: level.id,
              _version: latestVersion
            }
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not delete level ${level.id}:`, error);
      }
    }

    console.log("Data cleared successfully");
  } catch (error) {
    console.error("Error clearing existing data:", error);
    throw error; // Re-throw to stop the creation process
  }
}

async function seedTestData() {
  try {
    // Sign in with Cognito
    await Auth.signIn(username, password);
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
    console.log(user);
    const attributes = await Auth.userAttributes(user);
    console.log(attributes);
    
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

    // First list existing data
    await listExistingData();

    // Only proceed with creation if 'create' argument is provided
    if (!shouldCreate) {
      console.log("\nTo create test data, run the script with 'create' as the third argument");
      return;
    }

    console.log("\n=== Creating Test Data ===");

    // Clear existing data before creating new data
    await clearExistingData();

    // Generate UUIDs for all entities
    const uuids = {
      levels: {
        top: uuidv4(),
        middle: uuidv4(),
        bottom: uuidv4()
      },
      interventions: {
        tech: uuidv4(),
        edu1: uuidv4(),
        edu2: uuidv4()
      },
      surveys: {
        tech: uuidv4(),
        edu: uuidv4()
      },
      questions: {
        text: uuidv4(),
        singleChoice: uuidv4(),
        multiChoice: uuidv4(),
        picture: uuidv4(),
        audio: uuidv4(),
        int: uuidv4(),
        double: uuidv4(),
        rating: uuidv4()
      },
      questionOptions: {
        singleChoice1: uuidv4(),
        singleChoice2: uuidv4(),
        multiChoice1: uuidv4(),
        multiChoice2: uuidv4()
      },
      entities: Array(10).fill().map(() => uuidv4())
    };

    // Create levels
    const levels = [
      {
        id: uuids.levels.top,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Top Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["The top level of the hierarchy"]
        },
        parentLevelID: null,
        interventionsAreAllowed: false,
        schemeVersion: 0,
        customData: []
      },
      {
        id: uuids.levels.middle,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Middle Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["The middle level of the hierarchy"]
        },
        parentLevelID: uuids.levels.top,
        interventionsAreAllowed: true,
        schemeVersion: 0,
        customData: []
      },
      {
        id: uuids.levels.bottom,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["The bottom level of the hierarchy"]
        },
        parentLevelID: uuids.levels.middle,
        interventionsAreAllowed: true,
        schemeVersion: 0,
        customData: []
      }
    ];

    // Create interventions
    const interventions = [
      {
        id: uuids.interventions.tech,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Technology Intervention"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["A technology-based intervention"]
        },
        interventionType: "TECHNOLOGY",
        schemeVersion: 0
      },
      {
        id: uuids.interventions.edu1,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Education Intervention 1"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["First education-based intervention"]
        },
        interventionType: "EDUCATION",
        schemeVersion: 0
      },
      {
        id: uuids.interventions.edu2,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Education Intervention 2"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Second education-based intervention"]
        },
        interventionType: "EDUCATION",
        schemeVersion: 0
      }
    ];

    // Create surveys with questions
    const questions = [
      {
        id: uuids.questions.text,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Text Question"]
        },
        type: "TEXT",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.singleChoice,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Single Choice Question"]
        },
        type: "SINGLECHOICE",
        questionOptions: [
          {
            id: uuids.questionOptions.singleChoice1,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Option 1"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.singleChoice2,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Option 2"]
            },
            followUpQuestionIDs: []
          }
        ],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.multiChoice,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Multiple Choice Question"]
        },
        type: "MULTIPLECHOICE",
        questionOptions: [
          {
            id: uuids.questionOptions.multiChoice1,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Option A"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.multiChoice2,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Option B"]
            },
            followUpQuestionIDs: []
          }
        ],
        isFollowUpQuestion: false
      }
    ];

    const surveys = [
      {
        id: uuids.surveys.tech,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Technology Survey"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["A survey for technology interventions"]
        },
        questions,
        surveyType: "DEFAULT",
        status: "DRAFT",
        archived: false,
        interventionSurveysId: uuids.interventions.tech,
        schemeVersion: 0
      },
      {
        id: uuids.surveys.edu,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Education Survey"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["A survey for education interventions"]
        },
        questions,
        surveyType: "DEFAULT",
        status: "DRAFT",
        archived: false,
        interventionSurveysId: uuids.interventions.edu1,
        schemeVersion: 0
      }
    ];

    // Create entities
    const entities = [
      {
        id: uuids.entities[0],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Top Entity 1"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["First entity at top level"]
        },
        parentEntityID: null,
        entityLevelId: uuids.levels.top,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        customData: [],
        schemeVersion: 0
      },
      {
        id: uuids.entities[1],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Top Entity 2"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Second entity at top level"]
        },
        parentEntityID: uuids.entities[0],
        entityLevelId: uuids.levels.top,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        customData: [],
        schemeVersion: 0
      }
    ];

    // Create level-intervention relations
    const levelInterventionRelations = [
      {
        levelId: uuids.levels.middle,
        interventionId: uuids.interventions.tech
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.tech
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.edu1
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.edu2
      }
    ];

    // Create all items in sequence
    console.log("\nCreating levels...");
    for (const level of levels) {
      console.log(`Creating level with ID: ${level.id}`);
      const result = await API.graphql({
        query: mutations.createLevel,
        variables: { input: level }
      });
      console.log(`Created level:`, JSON.stringify(result, null, 2));
    }

    console.log("\nCreating interventions...");
    for (const intervention of interventions) {
      console.log(`Creating intervention with ID: ${intervention.id}`);
      const result = await API.graphql({
        query: mutations.createIntervention,
        variables: { input: intervention }
      });
      console.log(`Created intervention:`, JSON.stringify(result, null, 2));
    }

    // Verify interventions exist before creating surveys
    console.log("\nVerifying interventions exist...");
    const verifyInterventionsResponse = await API.graphql({
      query: queries.listInterventions
    });
    console.log("Existing interventions:", JSON.stringify(verifyInterventionsResponse.data.listInterventions.items, null, 2));

    console.log("\nCreating surveys...");
    for (const survey of surveys) {
      console.log(`Creating survey with ID: ${survey.id} for intervention: ${survey.interventionSurveysId}`);
      try {
        const result = await API.graphql({
          query: `
            mutation CreateSurvey($input: CreateSurveyInput!) {
              createSurvey(input: $input) {
                id
                name {
                  languageKeys
                  languageTexts
                }
                description {
                  languageKeys
                  languageTexts
                }
                questions {
                  id
                  text {
                    languageKeys
                    languageTexts
                  }
                  type
                  questionOptions {
                    id
                    text {
                      languageKeys
                      languageTexts
                    }
                    followUpQuestionIDs
                  }
                  isFollowUpQuestion
                }
                tags {
                  items {
                    id
                  }
                  nextToken
                }
                surveyType
                schemeVersion
                archived
                createdAt
                updatedAt
                interventionSurveysId
                organization_id
              }
            }
          `,
          variables: { input: survey }
        });
        console.log(`Created survey:`, JSON.stringify(result, null, 2));
      } catch (error) {
        console.error(`Error creating survey ${survey.id}:`, error);
        throw error;
      }
    }

    console.log("\nCreating entities...");
    for (const entity of entities) {
      console.log(`Creating entity with ID: ${entity.id}`);
      const result = await API.graphql({
        query: mutations.createEntity,
        variables: { input: entity }
      });
      console.log(`Created entity:`, JSON.stringify(result, null, 2));
    }

    console.log("\nCreating level-intervention relations...");
    for (const relation of levelInterventionRelations) {
      console.log(`Creating relation between level ${relation.levelId} and intervention ${relation.interventionId}`);
      const result = await API.graphql({
        query: mutations.createLevelInterventionRelation,
        variables: { input: relation }
      });
      console.log(`Created relation:`, JSON.stringify(result, null, 2));
    }

    console.log("Successfully seeded test data");
    console.log("Generated UUIDs:", uuids);
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
}

seedTestData(); 