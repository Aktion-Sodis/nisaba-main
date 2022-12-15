import { Octokit } from "octokit";
import { callBlueprint, owner, repo } from "./constants.js";

// get the first param passed from the command line
const environment = process.argv[2];
const githubSecret = process.argv[3];
const awsAccessKeyId = process.argv[4];
const awsSecretAccess = process.argv[5];
const awsDefaultRegion = process.argv[6];

const octokit = new Octokit({
  auth: githubSecret,
});

/**
 * @typedef {import("@octokit/types").Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"]} Commit
 * @typedef {import("@octokit/types").Endpoints["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"]["response"]["data"]} PullRequests
 */

/**
 * @param {Octokit} octokit
 * @param {string} appName
 */
async function main(octokit) {
  if (
    !environment ||
    !githubSecret ||
    !awsAccessKeyId ||
    !awsSecretAccess ||
    !awsDefaultRegion
  )
    throw new Error("Missing parameters. Correct call: \n" + callBlueprint);

  // STEP 1: Authenticate
  await octokit.rest.users.getAuthenticated();

  // STEP 2: Get the last commmit
  /** @type {Commit} */
  const lastCommit = (
    await octokit.request(`GET /repos/${owner}/${repo}/commits/main`)
  ).data;

  const { sha } = lastCommit;

  /** @type {PullRequests} */
  const pullRequestsOfLastCommit = (
    await octokit.request(`GET /repos/${owner}/${repo}/commits/${sha}/pulls`)
  ).data;

  if (pullRequestsOfLastCommit.length === 0) process.exit(1);

  let resArray = [
    environment,
    awsAccessKeyId,
    awsSecretAccess,
    awsDefaultRegion,
  ];

  const shouldDeployBackend = pullRequestsOfLastCommit.includes(({ labels }) =>
    labels.some(({ name }) => name === "deploy:backend")
  );

  if (shouldDeployBackend) return [...resArray, "admin-app", "analytics-app"];

  const shouldDeployAdminApp = pullRequestsOfLastCommit.includes(({ labels }) =>
    labels.some(({ name }) => name === "deploy:admin-app")
  );

  const shouldDeployAnalyticsApp = pullRequestsOfLastCommit.includes(
    ({ labels }) => labels.some(({ name }) => name === "deploy:admin-app")
  );

  if (shouldDeployAdminApp) resArray.push("admin-app");

  if (shouldDeployAnalyticsApp) resArray.push("analytics-app");

  return resArray;
}

main(octokit)
  .then((appsToBeDeployed) => {
    if (appsToBeDeployed.length === 4) process.exit(1);
    process.stdout.write(appsToBeDeployed.join(" "));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
