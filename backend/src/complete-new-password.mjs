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

const email = process.argv[2];
const oldPassword = process.argv[3];
const newPassword = process.argv[4];

async function main() {
  if (!email || !oldPassword || !newPassword) {
    console.log("Please provide email, oldPassword and newPassword as arguments:");
    console.log("npm run complete-new-password <email> <oldPassword> <newPassword>");
    return;
  }

  console.log(
    {
        email,
        oldPassword,
        newPassword,
    }
  );
  let user;
  try {
    user = await Auth.signIn({
      username: email,
      password: oldPassword,
    });
    await Auth.completeNewPassword(user, newPassword);

    console.log("Password completed successfully");
  } catch (error) {
    console.log(error);
  }

}

main();
