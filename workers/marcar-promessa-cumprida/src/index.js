import { Octokit, App } from "octokit";


export default {
	async fetch(request, env, ctx) {
		const octokit = new Octokit({ auth: env.OCTOKIT_TOKEN })

		if (request.method !== "POST") {
			return new Response("Invalid request", { status: 400 });
    }

    const json = await request.json()

		if (!json.doc_path || !json.fulfilled_date || !json.links) {
			return new Response("Missing inputs", { status: 400 });
		}

		console.log("Received", json);

		if (isNaN(new Date(json.fulfilled_date)) || json.links.split(",").length === 0) {
			return new Response("Invalid inputs", { status: 400 });
		}

		const gh_response = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
			owner: env.REPO_OWNER,
			repo: env.REPO,
			workflow_id: env.WORKFLOW_FILE_NAME,
			ref: env.REPO_MAIN_BRANCH,
			inputs: json,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		})

    return new Response(null, { status: 204 });
  },
};
