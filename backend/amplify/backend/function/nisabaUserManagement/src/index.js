/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_KEY
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const USER_POOL_ID = process.env.AUTH_AUTHNISABA_USERPOOLID;

const createUser = async (event) => {

    // Get the email from the request body
    const { email, group } = JSON.parse(event.body);

    // validation
    if (!email || !group) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({'error': 'Email and group are required'})
        }
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({'error': 'Invalid email'})
        }
    }

    const groupRegex = /^(admin|analytics|mobile)$/;
    if (!groupRegex.test(group)) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({'error': 'Invalid group'})
        }
    }

    // Get the custom claim `custom:organization_id` from event.requestContext.authorizer.claims
    const { claims } = event.requestContext.authorizer;
    const organization_id = claims['custom:organization_id'];

     const params = {
        UserPoolId: USER_POOL_ID,
        Username: email,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
            {
                Name: 'custom:organization_id',
                Value: organization_id,
            },
        ],
    };

    try {
        const user = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();

        await cognitoIdentityServiceProvider.adminAddUserToGroup({
            UserPoolId: USER_POOL_ID,
            Username: email,
            GroupName: group
        }).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({'message': 'User created successfully', 'user': user})
        }
    } catch (e) {
        
        if(e.name === 'UsernameExistsException') {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    'error': e.name,
                    'message': 'User already exists'
                })
            }
        } else {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    'error': e.name,
                    'message': 'Something went wrong'
                })
            }
        }
    } 

    
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // Get the HTTP method
    const { httpMethod } = event;

    if(httpMethod === 'POST') {
        return await createUser(event);
    }
    else {
        return {
            statusCode: 405,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                message: 'Method not allowed'
            })
        }
    }
};




