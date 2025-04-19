/* Amplify Params - DO NOT EDIT
	API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT
	API_APINISABA_GRAPHQLAPIIDOUTPUT
	API_APINISABA_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { HttpRequest } = require("@aws-sdk/protocol-http");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { Sha256 } = require("@aws-crypto/sha256-js");
const fetch = require("node-fetch");
const { parse } = require("url");
const { v4: uuidv4 } = require('uuid');

const makeSignedRequest = async (endpoint, region, query, variables = {}) => {
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
    throw new Error(JSON.stringify(data));
  }
  return data.data;
};

const createLevel = `
  mutation CreateLevel($input: CreateLevelInput!) {
    createLevel(input: $input) {
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
    }
  }
`;

const createIntervention = `
  mutation CreateIntervention($input: CreateInterventionInput!) {
    createIntervention(input: $input) {
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
`;

const createSurvey = `
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
      surveyType
      schemeVersion
    }
  }
`;

const createEntity = `
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      id
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      parentEntityID
      level {
        id
      }
      location {
        latitude
        longitude
      }
      schemeVersion
    }
  }
`;

const createLevelInterventionRelation = `
  mutation CreateLevelInterventionRelation($input: CreateLevelInterventionRelationInput!) {
    createLevelInterventionRelation(input: $input) {
      id
      levelId
      interventionId
    }
  }
`;

exports.handler = async (event) => {
  const endpoint = process.env.API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT;
  const region = process.env.AWS_REGION;
  const organizationId = event.organizationId;

  if (!endpoint) {
    throw new Error("API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT environment variable is not set");
  }
  if (!region) {
    throw new Error("AWS_REGION environment variable is not set");
  }
  if (!organizationId) {
    throw new Error("organizationId is required in the event");
  }

  try {
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
        organization_id: organizationId
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
        organization_id: organizationId
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
        organization_id: organizationId
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
        schemeVersion: 0,
        organization_id: organizationId
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
        schemeVersion: 0,
        organization_id: organizationId
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
        schemeVersion: 0,
        organization_id: organizationId
      }
    ];

    // Create surveys with all question types
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
      },
      {
        id: uuids.questions.picture,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Picture Question"]
        },
        type: "PICTURE",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.audio,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Audio Question"]
        },
        type: "AUDIO",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.int,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Integer Question"]
        },
        type: "INT",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.double,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Double Question"]
        },
        type: "DOUBLE",
        questionOptions: [],
        isFollowUpQuestion: false
      },
      {
        id: uuids.questions.rating,
        text: {
          languageKeys: ["en-US"],
          languageTexts: ["Rating Question"]
        },
        type: "RATING",
        questionOptions: [],
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
        intervention: uuids.interventions.tech,
        questions,
        surveyType: "DEFAULT",
        schemeVersion: 0,
        organization_id: organizationId
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
        intervention: uuids.interventions.edu1,
        questions,
        surveyType: "DEFAULT",
        schemeVersion: 0,
        organization_id: organizationId
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
        level: uuids.levels.top,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
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
        level: uuids.levels.top,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[2],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Top Entity 3"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Third entity at top level"]
        },
        parentEntityID: uuids.entities[1],
        level: uuids.levels.top,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[3],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Middle Entity 1"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["First entity at middle level"]
        },
        parentEntityID: uuids.entities[2],
        level: uuids.levels.middle,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[4],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Middle Entity 2"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Second entity at middle level"]
        },
        parentEntityID: uuids.entities[3],
        level: uuids.levels.middle,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[5],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Entity 1"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["First entity at bottom level"]
        },
        parentEntityID: uuids.entities[4],
        level: uuids.levels.bottom,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[6],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Entity 2"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Second entity at bottom level"]
        },
        parentEntityID: uuids.entities[5],
        level: uuids.levels.bottom,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[7],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Entity 3"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Third entity at bottom level"]
        },
        parentEntityID: uuids.entities[6],
        level: uuids.levels.bottom,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[8],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Entity 4"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Fourth entity at bottom level"]
        },
        parentEntityID: uuids.entities[7],
        level: uuids.levels.bottom,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      },
      {
        id: uuids.entities[9],
        name: {
          languageKeys: ["en-US"],
          languageTexts: ["Bottom Entity 5"]
        },
        description: {
          languageKeys: ["en-US"],
          languageTexts: ["Fifth entity at bottom level"]
        },
        parentEntityID: uuids.entities[8],
        level: uuids.levels.bottom,
        location: {
          latitude: 0.0,
          longitude: 0.0
        },
        schemeVersion: 0,
        organization_id: organizationId
      }
    ];

    // Create level-intervention relations
    const levelInterventionRelations = [
      {
        levelId: uuids.levels.middle,
        interventionId: uuids.interventions.tech,
        organization_id: organizationId
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.tech,
        organization_id: organizationId
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.edu1,
        organization_id: organizationId
      },
      {
        levelId: uuids.levels.bottom,
        interventionId: uuids.interventions.edu2,
        organization_id: organizationId
      }
    ];

    // Create all items in sequence
    for (const level of levels) {
      await makeSignedRequest(endpoint, region, createLevel, { input: level });
    }

    for (const intervention of interventions) {
      await makeSignedRequest(endpoint, region, createIntervention, { input: intervention });
    }

    for (const survey of surveys) {
      await makeSignedRequest(endpoint, region, createSurvey, { input: survey });
    }

    for (const entity of entities) {
      await makeSignedRequest(endpoint, region, createEntity, { input: entity });
    }

    for (const relation of levelInterventionRelations) {
      await makeSignedRequest(endpoint, region, createLevelInterventionRelation, {
        input: relation
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully seeded test data",
        uuids
      }),
    };
  } catch (error) {
    console.error("Seeding failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Seeding failed",
        error: error.message,
      }),
    };
  }
}; 