import * as dotenv from "dotenv";
dotenv.config();
import { Auth, Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import * as mutations from "./graphql/mutations.js";
import * as queries from "./graphql/queries.js";
import { v4 as uuidv4 } from 'uuid';

// Simplified create mutations that only return ID to avoid relation errors
const createSurveySimple = /* GraphQL */ `
  mutation CreateSurveySimple($input: CreateSurveyInput!) {
    createSurvey(input: $input) {
      id
    }
  }
`;

const createInterventionSimple = /* GraphQL */ `
  mutation CreateInterventionSimple($input: CreateInterventionInput!) {
    createIntervention(input: $input) {
      id
    }
  }
`;

const createEntitySimple = /* GraphQL */ `
  mutation CreateEntitySimple($input: CreateEntityInput!) {
    createEntity(input: $input) {
      id
    }
  }
`;

const createAppliedInterventionSimple = /* GraphQL */ `
  mutation CreateAppliedInterventionSimple($input: CreateAppliedInterventionInput!) {
    createAppliedIntervention(input: $input) {
      id
    }
  }
`;

const createExecutedSurveySimple = /* GraphQL */ `
  mutation CreateExecutedSurveySimple($input: CreateExecutedSurveyInput!) {
    createExecutedSurvey(input: $input) {
      id
    }
  }
`;

const createLevelInterventionRelationSimple = /* GraphQL */ `
  mutation CreateLevelInterventionRelationSimple($input: CreateLevelInterventionRelationInput!) {
    createLevelInterventionRelation(input: $input) {
      id
    }
  }
`;

const createLevelSimple = /* GraphQL */ `
  mutation CreateLevelSimple($input: CreateLevelInput!) {
    createLevel(input: $input) {
      id
    }
  }
`;

// Set Amplify logging to INFO level
Amplify.Logger.LOG_LEVEL = 'INFO';

Amplify.configure(awsconfig);

const username = process.argv[2];
const password = process.argv[3];
const clearData = process.argv[4] === '--clear';

if (!username || !password) {
  console.error("Please provide username and password as command line arguments");
  console.error("Usage: node seed-admin-data.mjs <username> <password> [--clear]");
  console.error("  --clear: Optional flag to clear existing data before seeding");
  process.exit(1);
}

async function seedAdminData() {
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

    // Optionally clear existing data first
    if (clearData) {
      console.log("\n=== Clearing Existing Data ===");
      console.log("⚠️  WARNING: This will delete all existing data in this organization!");
      
      // Import and run the clear script functionality
      const { spawn } = await import('child_process');
      const { promisify } = await import('util');
      const exec = promisify(spawn);
      
      try {
        console.log("Running clear script...");
        const clearProcess = spawn('node', ['clear-admin-data.mjs', username, password], {
          stdio: 'inherit',
          cwd: new URL('.', import.meta.url).pathname
        });
        
        await new Promise((resolve, reject) => {
          clearProcess.on('close', (code) => {
            if (code === 0) {
              console.log("✅ Data clearing completed successfully");
              resolve();
            } else {
              reject(new Error(`Clear script exited with code ${code}`));
            }
          });
        });
      } catch (error) {
        console.error("❌ Error during data clearing:", error.message);
        throw error;
      }
    }

    console.log("\n=== Creating Admin Seed Data ===");

    // Generate UUIDs for all entities
    const uuids = {
      levels: {
        country: uuidv4(),
        region: uuidv4(),
        district: uuidv4()
      },
      customData: {
        population: uuidv4(),
        area: uuidv4(),
        gdp: uuidv4(),
        literacy: uuidv4()
      },
      interventions: {
        waterFilter: uuidv4(),
        education: uuidv4()
      },
      surveys: {
        waterQuality: uuidv4(),
        education: uuidv4(),
        community: uuidv4()
      },
      questions: {
        text: uuidv4(),
        singleChoice: uuidv4(),
        multiChoice: uuidv4(),
        picture: uuidv4(),
        pictureWithTags: uuidv4(),
        audio: uuidv4(),
        int: uuidv4(),
        double: uuidv4(),
        rating: uuidv4()
      },
      questionOptions: {
        singleChoice1: uuidv4(),
        singleChoice2: uuidv4(),
        singleChoice3: uuidv4(),
        multiChoice1: uuidv4(),
        multiChoice2: uuidv4(),
        multiChoice3: uuidv4()
      },
      entities: Array(8).fill().map(() => uuidv4()),
      executedSurveys: Array(10).fill().map(() => uuidv4()),
      appliedInterventions: Array(5).fill().map(() => uuidv4())
    };

    // Create levels with custom data
    console.log("\nCreating levels...");
    const levels = [
      {
        id: uuids.levels.country,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Country Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["National level entities representing entire countries"]
        },
        parentLevelID: null,
        interventionsAreAllowed: false,
        schemeVersion: 0,
        customData: [
          {
            id: uuids.customData.population,
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Population"]
            },
            type: "INT"
          },
          {
            id: uuids.customData.area,
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Area (km²)"]
            },
            type: "STRING"
          }
        ]
      },
      {
        id: uuids.levels.region,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Region Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Regional level entities representing states or provinces"]
        },
        parentLevelID: uuids.levels.country,
        interventionsAreAllowed: true,
        schemeVersion: 0,
        customData: [
          {
            id: uuids.customData.gdp,
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["GDP per capita"]
            },
            type: "STRING"
          }
        ]
      },
      {
        id: uuids.levels.district,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["District Level"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["District level entities representing local administrative areas"]
        },
        parentLevelID: uuids.levels.region,
        interventionsAreAllowed: true,
        schemeVersion: 0,
        customData: [
          {
            id: uuids.customData.literacy,
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Literacy Rate (%)"]
            },
            type: "STRING"
          }
        ]
      }
    ];

    for (const level of levels) {
      console.log(`Creating level: ${level.name.languageTexts[0]}`);
      const result = await API.graphql({
        query: createLevelSimple,
        variables: { input: level }
      });
      console.log(`Created level with ID: ${result.data.createLevel.id}`);
    }

    // Create interventions
    console.log("\nCreating interventions...");
    const interventions = [
      {
        id: uuids.interventions.waterFilter,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Water Filter Installation"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Installation of water filtration systems to improve water quality"]
        },
        interventionType: "TECHNOLOGY",
        schemeVersion: 0
      },
      {
        id: uuids.interventions.education,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Community Education Program"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Educational programs to raise awareness about health and hygiene"]
        },
        interventionType: "EDUCATION",
        schemeVersion: 0
      }
    ];

    for (const intervention of interventions) {
      console.log(`Creating intervention: ${intervention.name.languageTexts[0]}`);
      const result = await API.graphql({
        query: createInterventionSimple,
        variables: { input: intervention }
      });
      console.log(`Created intervention with ID: ${result.data.createIntervention.id}`);
    }


    // Create comprehensive questions for all question types
    console.log("\nCreating questions...");
    const questions = [
      {
        id: uuids.questions.text,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Please describe the current water quality in your area"]
        },
        type: "TEXT",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.singleChoice,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["How would you rate the overall water quality?"]
        },
        type: "SINGLECHOICE",
        questionOptions: [
          {
            id: uuids.questionOptions.singleChoice1,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Excellent"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.singleChoice2,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Good"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.singleChoice3,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Poor"]
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
          languageTexts: ["What water-related issues have you experienced? (Select all that apply)"]
        },
        type: "MULTIPLECHOICE",
        questionOptions: [
          {
            id: uuids.questionOptions.multiChoice1,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Turbidity"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.multiChoice2,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Bad taste"]
            },
            followUpQuestionIDs: []
          },
          {
            id: uuids.questionOptions.multiChoice3,
            text: {
              languageKeys: ["en-US"],
              languageTexts: ["Health problems"]
            },
            followUpQuestionIDs: []
          }
        ],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.picture,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Please take a photo of your water source"]
        },
        type: "PICTURE",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.pictureWithTags,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Please take a photo of the water filter installation and mark any issues"]
        },
        type: "PICTUREWITHTAGS",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.audio,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Please record your thoughts about the water quality improvement"]
        },
        type: "AUDIO",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.int,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["How many people in your household use this water source?"]
        },
        type: "INT",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.double,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["What is the distance to your nearest water source in kilometers?"]
        },
        type: "DOUBLE",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.rating,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Rate your satisfaction with the water filter (1-5 scale)"]
        },
        type: "RATING",
        questionOptions: [],
        isFollowUpQuestion: false
      }
    ];

    // Create surveys with all question types
    console.log("\nCreating surveys...");
    const surveys = [
      {
        id: uuids.surveys.waterQuality,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Water Quality Assessment Survey"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Comprehensive survey to assess water quality and filter effectiveness"]
        },
        questions,
        surveyType: "DEFAULT",
        status: "ACTIVE",
        archived: false,
        interventionSurveysId: uuids.interventions.waterFilter,
        schemeVersion: 0
      },
      {
        id: uuids.surveys.education,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Education Program Evaluation Survey"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Survey to evaluate the effectiveness of community education programs"]
        },
        questions,
        surveyType: "DEFAULT",
        status: "ACTIVE",
        archived: false,
        interventionSurveysId: uuids.interventions.education,
        schemeVersion: 0
      },
      {
        id: uuids.surveys.community,
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Community Impact Survey"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["General survey to assess overall community impact of interventions"]
        },
        questions,
        surveyType: "DEFAULT",
        status: "ACTIVE",
        archived: false,
        interventionSurveysId: uuids.interventions.waterFilter,
        schemeVersion: 0
      }
    ];

    for (const survey of surveys) {
      console.log(`Creating survey: ${survey.name.languageTexts[0]}`);
      const result = await API.graphql({
        query: createSurveySimple,
        variables: { input: survey }
      });
      console.log(`Created survey with ID: ${result.data.createSurvey.id}`);
    }

    // Create entities distributed across levels
    console.log("\nCreating entities...");
    const entities = [
      // Country level entities
      {
        id: uuids.entities[0],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Kenya"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["East African country with diverse water challenges"]
        },
        parentEntityID: null,
        entityLevelId: uuids.levels.country,
        location: {
          latitude: -0.0236,
          longitude: 37.9062
        },
        customData: [
          {
            customDataID: uuids.customData.population,
            type: "INT",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Population"]
            },
            intValue: 53000000
          },
          {
            customDataID: uuids.customData.area,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Area (km²)"]
            },
            stringValue: "580367.0"
          }
        ],
        schemeVersion: 0
      },
      {
        id: uuids.entities[1],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Tanzania"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["East African country with significant rural water access challenges"]
        },
        parentEntityID: null,
        entityLevelId: uuids.levels.country,
        location: {
          latitude: -6.3690,
          longitude: 34.8888
        },
        customData: [
          {
            customDataID: uuids.customData.population,
            type: "INT",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Population"]
            },
            intValue: 61000000
          },
          {
            customDataID: uuids.customData.area,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Area (km²)"]
            },
            stringValue: "945087.0"
          }
        ],
        schemeVersion: 0
      },
      // Region level entities
      {
        id: uuids.entities[2],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Central Province"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Central region of Kenya with mixed urban and rural areas"]
        },
        parentEntityID: uuids.entities[0],
        entityLevelId: uuids.levels.region,
        location: {
          latitude: -0.7500,
          longitude: 37.0000
        },
        customData: [
          {
            customDataID: uuids.customData.gdp,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["GDP per capita"]
            },
            stringValue: "3200.0"
          }
        ],
        schemeVersion: 0
      },
      {
        id: uuids.entities[3],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Dodoma Region"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Central region of Tanzania with rural focus"]
        },
        parentEntityID: uuids.entities[1],
        entityLevelId: uuids.levels.region,
        location: {
          latitude: -6.1630,
          longitude: 35.7516
        },
        customData: [
          {
            customDataID: uuids.customData.gdp,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["GDP per capita"]
            },
            stringValue: "1800.0"
          }
        ],
        schemeVersion: 0
      },
      // District level entities
      {
        id: uuids.entities[4],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Kiambu District"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["District in Central Province with good infrastructure"]
        },
        parentEntityID: uuids.entities[2],
        entityLevelId: uuids.levels.district,
        location: {
          latitude: -1.1667,
          longitude: 36.8333
        },
        customData: [
          {
            customDataID: uuids.customData.literacy,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Literacy Rate (%)"]
            },
            stringValue: "85.5"
          }
        ],
        schemeVersion: 0
      },
      {
        id: uuids.entities[5],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Murang'a District"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Rural district in Central Province with water access challenges"]
        },
        parentEntityID: uuids.entities[2],
        entityLevelId: uuids.levels.district,
        location: {
          latitude: -0.7167,
          longitude: 37.1500
        },
        customData: [
          {
            customDataID: uuids.customData.literacy,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Literacy Rate (%)"]
            },
            stringValue: "78.2"
          }
        ],
        schemeVersion: 0
      },
      {
        id: uuids.entities[6],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Dodoma Urban District"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Urban district in Dodoma Region"]
        },
        parentEntityID: uuids.entities[3],
        entityLevelId: uuids.levels.district,
        location: {
          latitude: -6.1630,
          longitude: 35.7516
        },
        customData: [
          {
            customDataID: uuids.customData.literacy,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Literacy Rate (%)"]
            },
            stringValue: "82.1"
          }
        ],
        schemeVersion: 0
      },
      {
        id: uuids.entities[7],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Kondoa District"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Rural district in Dodoma Region with significant water challenges"]
        },
        parentEntityID: uuids.entities[3],
        entityLevelId: uuids.levels.district,
        location: {
          latitude: -4.9000,
          longitude: 35.7833
        },
        customData: [
          {
            customDataID: uuids.customData.literacy,
            type: "STRING",
            name: {
              languageKeys: ["en-US"],
              languageTexts: ["Literacy Rate (%)"]
            },
            stringValue: "65.8"
          }
        ],
        schemeVersion: 0
      }
    ];

    for (const entity of entities) {
      console.log(`Creating entity: ${entity.name.languageTexts[0]}`);
      const result = await API.graphql({
        query: createEntitySimple,
        variables: { input: entity }
      });
      console.log(`Created entity with ID: ${result.data.createEntity.id}`);
    }

    // Create level-intervention relations
    console.log("\nCreating level-intervention relations...");
    const levelInterventionRelations = [
      {
        levelId: uuids.levels.region,
        interventionId: uuids.interventions.waterFilter
      },
      {
        levelId: uuids.levels.district,
        interventionId: uuids.interventions.waterFilter
      },
      {
        levelId: uuids.levels.region,
        interventionId: uuids.interventions.education
      },
      {
        levelId: uuids.levels.district,
        interventionId: uuids.interventions.education
      }
    ];

    for (const relation of levelInterventionRelations) {
      console.log(`Creating level-intervention relation`);
      const result = await API.graphql({
        query: createLevelInterventionRelationSimple,
        variables: { input: relation }
      });
      console.log(`Created relation with ID: ${result.data.createLevelInterventionRelation.id}`);
    }


    // Create applied interventions
    console.log("\nCreating applied interventions...");
    const appliedInterventions = [
      {
        id: uuids.appliedInterventions[0],
        entityAppliedInterventionsId: uuids.entities[4], // Kiambu District
        appliedInterventionWhoDidItId: user.attributes.sub,
        appliedInterventionInterventionId: uuids.interventions.waterFilter,
        location: {
          latitude: -1.1667,
          longitude: 36.8333
        },
        isOkay: true,
        schemeVersion: 0
      },
      {
        id: uuids.appliedInterventions[1],
        entityAppliedInterventionsId: uuids.entities[5], // Murang'a District
        appliedInterventionWhoDidItId: user.attributes.sub,
        appliedInterventionInterventionId: uuids.interventions.waterFilter,
        location: {
          latitude: -0.7167,
          longitude: 37.1500
        },
        isOkay: true,
        schemeVersion: 0
      },
      {
        id: uuids.appliedInterventions[2],
        entityAppliedInterventionsId: uuids.entities[6], // Dodoma Urban District
        appliedInterventionWhoDidItId: user.attributes.sub,
        appliedInterventionInterventionId: uuids.interventions.education,
        location: {
          latitude: -6.1630,
          longitude: 35.7516
        },
        isOkay: true,
        schemeVersion: 0
      },
      {
        id: uuids.appliedInterventions[3],
        entityAppliedInterventionsId: uuids.entities[7], // Kondoa District
        appliedInterventionWhoDidItId: user.attributes.sub,
        appliedInterventionInterventionId: uuids.interventions.education,
        location: {
          latitude: -4.9000,
          longitude: 35.7833
        },
        isOkay: false,
        schemeVersion: 0
      },
      {
        id: uuids.appliedInterventions[4],
        entityAppliedInterventionsId: uuids.entities[7], // Kondoa District
        appliedInterventionWhoDidItId: user.attributes.sub,
        appliedInterventionInterventionId: uuids.interventions.waterFilter,
        location: {
          latitude: -4.9000,
          longitude: 35.7833
        },
        isOkay: true,
        schemeVersion: 0
      }
    ];

    for (const appliedIntervention of appliedInterventions) {
      console.log(`Creating applied intervention`);
      const result = await API.graphql({
        query: createAppliedInterventionSimple,
        variables: { input: appliedIntervention }
      });
      console.log(`Created applied intervention with ID: ${result.data.createAppliedIntervention.id}`);
    }

    // Create executed surveys (10 for the water quality survey)
    console.log("\nCreating executed surveys...");
    const executedSurveys = [];
    const waterQualitySurveyId = uuids.surveys.waterQuality;
    const appliedInterventionId = uuids.appliedInterventions[0]; // Use first applied intervention

    for (let i = 0; i < 10; i++) {
      const executedSurvey = {
        id: uuids.executedSurveys[i],
        appliedInterventionExecutedSurveysId: appliedInterventionId,
        executedSurveySurveyId: waterQualitySurveyId,
        executedSurveyWhoExecutedItId: user.attributes.sub,
        surveyID: waterQualitySurveyId,
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(), // Spread over 10 days
        location: {
          latitude: -1.1667 + (Math.random() - 0.5) * 0.1,
          longitude: 36.8333 + (Math.random() - 0.5) * 0.1
        },
        answers: [
          {
            id: uuidv4(),
            questionID: uuids.questions.text,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "TEXT",
            text: `Water quality response ${i + 1}: The water has improved significantly since the filter installation.`
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.singleChoice,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "SINGLECHOICE",
            questionOptions: [
              {
                id: uuids.questionOptions.singleChoice2, // "Good"
                text: {
                  languageKeys: ["en-US"],
                  languageTexts: ["Good"]
                },
                followUpQuestionIDs: []
              }
            ]
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.multiChoice,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "MULTIPLECHOICE",
            questionOptions: [
              {
                id: uuids.questionOptions.multiChoice1, // "Turbidity"
                text: {
                  languageKeys: ["en-US"],
                  languageTexts: ["Turbidity"]
                },
                followUpQuestionIDs: []
              }
            ]
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.picture,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "PICTURE",
            text: null // Empty as requested
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.pictureWithTags,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "PICTUREWITHTAGS",
            text: null, // Empty as requested
            markings: [
              {
                x: 100,
                y: 150,
                rx: 20,
                ry: 20,
                text: "Filter location"
              }
            ]
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.audio,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "AUDIO",
            text: null // Empty as requested
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.int,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "INT",
            intValue: 4 + Math.floor(Math.random() * 4) // Random between 4-7
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.double,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "DOUBLE",
            doubleValue: 0.5 + Math.random() * 2.0 // Random between 0.5-2.5 km
          },
          {
            id: uuidv4(),
            questionID: uuids.questions.rating,
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            type: "RATING",
            rating: 3 + Math.floor(Math.random() * 3) // Random between 3-5
          }
        ],
        schemeVersion: 0
      };
      executedSurveys.push(executedSurvey);
    }

    for (const executedSurvey of executedSurveys) {
      console.log(`Creating executed survey ${executedSurvey.id}`);
      const result = await API.graphql({
        query: createExecutedSurveySimple,
        variables: { input: executedSurvey }
      });
      console.log(`Created executed survey with ID: ${result.data.createExecutedSurvey.id}`);
    }

    console.log("\n=== Admin Seed Data Creation Complete ===");
    console.log("Created:");
    console.log("- 3 levels (Country, Region, District) with custom data");
    console.log("- 2 interventions (Water Filter, Education)");
    console.log("- 3 surveys (all active) with all question types");
    console.log("- 8 entities distributed across levels with custom data");
    console.log("- 4 level-intervention relations");
    console.log("- 5 applied interventions");
    console.log("- 10 executed surveys with comprehensive answers");
    console.log("\nGenerated UUIDs:", JSON.stringify(uuids, null, 2));

  } catch (error) {
    console.error("Error seeding admin data:", error);
    throw error;
  }
}

seedAdminData();
