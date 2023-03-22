import * as dotenv from "dotenv";
dotenv.config();
import { Auth, Amplify, API } from "aws-amplify";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import awsconfig from "./aws-exports.js";
import * as mutations from "./graphql/mutations.js";
import voca from "voca";

Amplify.configure(awsconfig);

const username = process.env.AWS_USERNAME;
const password = process.env.AWS_PASSWORD;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const organizationNameVerbose = process.argv[2];
const emailOfOrganizationAdmin = process.argv[3];

async function main() {
  if (!username || !password || !accessKeyId || !secretAccessKey) {
    console.log(
      "Configure your environment correctly by creating a .env file by copying .env.interface."
    );
    return;
  }
  if (!organizationNameVerbose) {
    console.log("Please provide organization name as first argument.");
    return;
  }
  if (!emailOfOrganizationAdmin) {
    console.log(
      "Please provide email of organization admin as second argument."
    );
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
    await Auth.signIn({
      username,
      password,
    });

    const newOrgaRes = await API.graphql({
      query: mutations.createOrganization,
      variables: {
        input: {
          nameCamelCase: voca.camelCase(organizationNameVerbose),
          nameKebabCase: voca.kebabCase(organizationNameVerbose),
          nameVerbose: organizationNameVerbose,
        },
      },
    });
    const newOrga = newOrgaRes.data.createOrganization;

    await client.send(
      new AdminCreateUserCommand({
        Username: emailOfOrganizationAdmin,
        UserPoolId: awsconfig.aws_user_pools_id,
        UserAttributes: [
          {
            Name: "custom:organization_id",
            Value: newOrga.id,
          },
        ],
      })
    );
    await client.send(
      new AdminAddUserToGroupCommand({
        Username: emailOfOrganizationAdmin,
        UserPoolId: awsconfig.aws_user_pools_id,
        GroupName: "admin",
      })
    );
    // success log
    console.log(
      `Successfully created organization ${newOrga.nameVerbose} with id ${newOrga.id} and added user ${emailOfOrganizationAdmin} as admin.`
    );
  } catch (error) {
    console.log("error signing up:", error);
  }
}

main();
