/* Amplify Params - DO NOT EDIT
	API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT
	API_APINISABA_GRAPHQLAPIIDOUTPUT
	API_APINISABA_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */const { HttpRequest } = require("@aws-sdk/protocol-http");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { Sha256 } = require("@aws-crypto/sha256-js");
const fetch = require("node-fetch"); // v2 required for graphql-request
const { parse } = require("url");

const listSurveys = `
  query ListSurveys {
    listSurveys {
      items {
        id
        archived
      }
    }
  }
`;

const updateSurvey = `
  mutation UpdateSurvey($input: UpdateSurveyInput!) {
    updateSurvey(input: $input) {
      id
      status
      archived
    }
  }
`;

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

exports.handler = async (event) => {
  const endpoint = process.env.API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT;
  const region = process.env.AWS_REGION;

  if (!endpoint) {
    throw new Error("API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT environment variable is not set");
  }
  if (!region) {
    throw new Error("AWS_REGION environment variable is not set");
  }

  try {
    // Get all surveys
    const data = await makeSignedRequest(endpoint, region, listSurveys);
    const surveys = data.listSurveys.items;

    // Update each survey
    const results = await Promise.all(
      surveys.map(async (survey) =>
        makeSignedRequest(endpoint, region, updateSurvey, {
          input: {
            id: survey.id,
            archived: survey.archived,
          },
        })
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully migrated ${results.length} surveys`,
        results,
      }),
    };
  } catch (error) {
    console.error("Migration failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Migration failed",
        error: error.message,
      }),
    };
  }
};



