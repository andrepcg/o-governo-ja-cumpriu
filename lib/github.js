const { Octokit } = require("octokit");
var memoize = require('lodash/memoize');

const octokit = new Octokit({
  auth: process.env.OCTOKIT_TOKEN,
  userAgent: 'OGovernoJaCumpriu v1.0',
  log: console
})

const LABEL = "MARCAR-CUMPRIDA";

const openedPullRequestsWithLabel = memoize(async () => {
  const prs = await octokit.paginate(octokit.rest.pulls.list, {
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO,
    state: "open",
    per_page: 100
  });

  const pr_urls = prs.map(pr => pr.url);
  console.log(`🤖 Found ${pr_urls.length} PRs`)
  console.log(`🤖 PRs: ${pr_urls.join(", ")}`)
  return prs.filter(pr => pr.labels.find(label => label.name === LABEL));
});

export async function pullRequestsForDocument(docPath) {
  const data = await openedPullRequestsWithLabel()
  return data.filter(pr => pr.title.includes(docPath) || pr.body?.includes(docPath))
}
