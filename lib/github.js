const { Octokit } = require("octokit");
var memoize = require('lodash/memoize');

const octokit = new Octokit({ auth: process.env.OCTOKIT_TOKEN })

const LABEL = "MARCAR-CUMPRIDA";

const openedPullRequestsWithLabel = memoize(async () => {
  const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO,
    state: "open",
    per_page: 100,
  });

  let prs = []

  for await (const { data: pulls } of iterator) {
    for (const pr of pulls) {
      if (pr.labels.find(label => label.name === LABEL)) {
        prs.push(pr)
      }
    }
  }

  return prs;
});

export async function pullRequestsForDocument(docPath) {
  const data = await openedPullRequestsWithLabel()
  return data.filter(pr => pr.title.includes(docPath) || pr.body?.includes(docPath))
}
