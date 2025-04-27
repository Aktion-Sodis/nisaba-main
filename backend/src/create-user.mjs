import * as dotenv from "dotenv";
dotenv.config();
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import awsconfig from "./aws-exports.js";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const organizationId = process.argv[2];
const userEmail = process.argv[3];
const tempPassword = process.argv[4];

async function main() {
  if (!accessKeyId || !secretAccessKey) {
    console.log(
      "Configure your environment correctly by creating a .env file by copying .env.interface."
    );
    return;
  }
  if (!organizationId) {
    console.log("Please provide organization ID as first argument.");
    return;
  }
  if (!userEmail) {
    console.log("Please provide user email as second argument.");
    return;
  }
  if (!tempPassword) {
    console.log("Please provide temporary password as third argument.");
    return;
  }

  const client = new CognitoIdentityProviderClient({
    region: awsconfig.aws_cognito_region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    await client.send(
      new AdminCreateUserCommand({
        Username: userEmail,
        UserPoolId: awsconfig.aws_user_pools_id,
        UserAttributes: [
          {
            Name: "custom:organization_id",
            Value: organizationId,
          },
          {
            Name: "email",
            Value: userEmail,
          },
          {
            Name: "email_verified",
            Value: "true",
          },
        ],
        TemporaryPassword: tempPassword,
        MessageAction: "SUPPRESS", // Suppress the welcome email
      })
    );

    await client.send(
      new AdminAddUserToGroupCommand({
        Username: userEmail,
        UserPoolId: awsconfig.aws_user_pools_id,
        GroupName: "admin", // Assuming you have a 'user' group
      })
    );

    console.log(
      `Successfully created user ${userEmail} in organization ${organizationId}.`
    );
  } catch (error) {
    console.log("Error creating user:", error);
  }
}

main();
