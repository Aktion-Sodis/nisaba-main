const AWS = require('aws-sdk');
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { API_GRAPHQLAPIENDPOINTOUTPUT, API_GRAPHQLAPIKEYOUTPUT } = process.env;
    
    // Ensure we have a valid API endpoint
    if (!API_GRAPHQLAPIENDPOINTOUTPUT) {
        throw new Error('API_GRAPHQLAPIENDPOINTOUTPUT environment variable is not set');
    }

    // Make sure the endpoint starts with https://
    const apiEndpoint = API_GRAPHQLAPIENDPOINTOUTPUT.startsWith('https://') 
        ? API_GRAPHQLAPIENDPOINTOUTPUT 
        : `https://${API_GRAPHQLAPIENDPOINTOUTPUT}`;
    
    console.log(`Using API endpoint: ${apiEndpoint}`);
    
    const client = new GraphQLClient(apiEndpoint, {
        headers: {
            'x-api-key': API_GRAPHQLAPIKEYOUTPUT,
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
                        archived: survey.archived, // This will trigger the status update
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
