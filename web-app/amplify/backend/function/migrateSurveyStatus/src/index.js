const { GraphQLClient } = require('graphql-request');

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

exports.handler = async (event) => {
  const {
    API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT,
    API_APINISABA_GRAPHQLAPIKEYOUTPUT
  } = process.env;

  if (!API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT) {
    throw new Error('API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT environment variable is not set');
  }

  const apiEndpoint = API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT.startsWith('https://')
    ? API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT
    : `https://${API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT}`;

  const client = new GraphQLClient(apiEndpoint, {
    headers: {
      'x-api-key': API_APINISABA_GRAPHQLAPIKEYOUTPUT,
    },
  });

  try {
    // Get all surveys
    const { listSurveys: { items: surveys } } = await client.request(listSurveys);

    // Update each survey
    const results = await Promise.all(
      surveys.map(async (survey) => {
        return client.request(updateSurvey, {
          input: {
            id: survey.id,
            archived: survey.archived,
          },
        });
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully migrated ${results.length} surveys`,
        results,
      }),
    };
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Migration failed',
        error: error.message,
      }),
    };
  }
};
