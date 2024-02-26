// const octokit = new Octokit({
//   auth: 'YOUR-TOKEN'
// })

// await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
//   owner: process.env.REPO_OWNER,
//   repo: process.env.REPO,
//   workflow_id: process.env.WORKFLOW_FILE_NAME,
//   ref: process.env.REPO_MAIN_BRANCH,
//   inputs: {
//     doc_path: 'Mona the Octocat',
//     fulfilled_date: 'San Francisco, CA',
//     links
//   },
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Invalid request");
    }

    const json = await request.json()
    return Response.json(json);

    // return Response.json(data);
  },
};
