/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_KEY
Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const USER_POOL_ID = process.env.AUTH_AUTHNISABA_USERPOOLID;

/**
 * @param {import('@types/aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<import('@types/aws-lambda').APIGatewayProxyResult>}
 */
const createUser = async (event) => {
  // Get the phoneNumber from the request body
  const { phoneNumber, group } = JSON.parse(event.body);

  // validation
  if (!phoneNumber || !group) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ error: "phoneNumber and group are required" }),
    };
  }

  const groupRegex = /^(admin|analytics|mobile)$/;
  if (!groupRegex.test(group)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ error: "Invalid group" }),
    };
  }

  // Get the custom claim `custom:organization_id` from event.requestContext.authorizer.claims
  const { claims } = event.requestContext.authorizer;
  const organization_id = claims["custom:organization_id"];

  // random password
  const temporaryPassword = `${Math.random().toString(36).slice(-8)}Aa0!`;
  const finalPassword = `${Math.random().toString(36).slice(-8)}Aa0!`;

  /** @type {import('aws-sdk').CognitoIdentityServiceProvider.AdminCreateUserRequest} */
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: phoneNumber,
    UserAttributes: [
      {
        Name: "phone_number",
        Value: phoneNumber,
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "custom:organization_id",
        Value: organization_id,
      },
    ],
    TemporaryPassword: temporaryPassword,
  };

  try {
    const user = await cognitoIdentityServiceProvider
      .adminCreateUser(params)
      .promise();

    await cognitoIdentityServiceProvider
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: phoneNumber,
        GroupName: group,
      })
      .promise();

    await cognitoIdentityServiceProvider
      .adminSetUserPassword({
        UserPoolId: USER_POOL_ID,
        Username: phoneNumber,
        Password: finalPassword,
        Permanent: true,
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "User created successfully",
        user: user,
        finalPassword,
      }),
    };
  } catch (e) {
    if (e.name === "MissingRequiredParameter") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          message: "User created successfully",
          user: user,
          finalPassword,
        }),
      };
    }
    if (e.name === "UsernameExistsException") {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          error: e.name,
          message: "User already exists",
        }),
      };
    }
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        error: e,
        message: "Something went wrong",
      }),
    };
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Get the HTTP method
  const { httpMethod } = event;

  if (httpMethod === "POST") {
    return await createUser(event);
  } else {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Method not allowed",
      }),
    };
  }
};
