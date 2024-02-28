import { Octokit, App } from "octokit";

import { verifyCaptcha } from "./recaptcha";

const allowedOrigins = ['http://localhost:3000', 'https://ogovernojacumpriu.pt'];


export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			const origin = request.headers.get('Origin');
			if (allowedOrigins.includes(origin)) {
				return new Response(null, {
					status: 204,
					headers: {
						'Access-Control-Allow-Credentials': 'true',
						'Access-Control-Allow-Methods': 'POST, OPTIONS',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Headers': 'Content-Type'
					}
				});
			}
		}

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

		const r = await verifyCaptcha(env, json.recaptchaToken, request.headers.get('CF-Connecting-IP'))
		if (r) return r;

		const gh_response = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
			owner: env.REPO_OWNER,
			repo: env.REPO,
			workflow_id: env.WORKFLOW_FILE_NAME,
			ref: env.REPO_MAIN_BRANCH,
			inputs: {
				doc_path: json.doc_path,
				fulfilled_date: json.fulfilled_date,
				links: json.links,
				comment: json.comment
			},
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		})

    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*' }});
  },
};
