import { Octokit } from "octokit";
import { owner, repo } from "./constants.mjs";

const secret = process.argv[2];

const octokit = new Octokit({
  auth: secret,
});

/**
 * @typedef {import("@octokit/types").Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"]} Commit
 * @typedef {import("@octokit/types").Endpoints["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"]["response"]["data"]} PullRequests
 * @typedef {import("@octokit/types").Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"]} Release
 * /

/** @param {Octokit} octokit */
async function main(octokit) {
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

  const sprintPrOfLastCommit =
    pullRequestsOfLastCommit.length > 0 &&
    pullRequestsOfLastCommit.find(({ labels }) =>
      labels.some(({ name }) => name === "sprint-pr")
    );

  // STEP 3: Prepare the release version, name, tag and body

  let releaseTagName = "";
  let releaseName = "";
  let releaseBody = "";

  /** @type {Release} */
  const latestRelease = (
    await octokit.request(`GET /repos/${owner}/${repo}/releases/latest`)
  ).data;

  const latestReleaseVersion = {
    patch: parseInt(latestRelease.name.split(".")[2]),
    minor: Number(latestRelease.name.split(".")[1]),
    major: latestRelease.name.split(".")[0],
  };

  if (sprintPrOfLastCommit) {
    // increment MINOR version once.
    releaseTagName = `${latestReleaseVersion.major}.${
      latestReleaseVersion.minor + 1
    }.${0}`;
    releaseName = releaseTagName;
    releaseBody = `# ${sprintPrOfLastCommit.title} \n ${sprintPrOfLastCommit.body}`;
  } else {
    // increment PATCH version once.
    releaseTagName = `${latestReleaseVersion.major}.${
      latestReleaseVersion.minor
    }.${latestReleaseVersion.patch + 1}`;
    releaseName = releaseTagName;
    releaseBody = `See the changelog [here](https://github.com/Aktion-Sodis/software-main/commit/${sha}).`;
  }

  // STEP 4: Publish the release
  await octokit.request(`POST /repos/${owner}/${repo}/releases`, {
    tag_name: releaseTagName,
    name: releaseName,
    body: releaseBody,
    draft: false,
    prerelease: false,
    generate_release_notes: false,
  });
}

main(octokit).catch((e) => console.error(e.stack));
