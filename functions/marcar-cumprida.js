
import { verifyCaptcha } from "../lib/recaptcha"

async function dispatchGithubWorkflow(env, inputs) {
  const url = `https://api.github.com/repos/${env.REPO_OWNER}/${env.REPO}/actions/workflows/${env.WORKFLOW_FILE_NAME}/dispatches`;

  const requestBody = {
    ref: env.REPO_MAIN_BRANCH,
    inputs: inputs
  };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${env.OCTOKIT_TOKEN}`);
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/vnd.github+json');
  headers.append('X-GitHub-Api-Version', '2022-11-28');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  const response = await fetch(url, requestOptions)
  console.log("Github response:", response)
  return response
}

// MAIN LOGIC

export const onRequestPost = async ({ request, env }) => {

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

  console.log("Calling github")

  await dispatchGithubWorkflow(
    env,
    {
      doc_path: json.doc_path,
      fulfilled_date: json.fulfilled_date,
      links: json.links,
      comment: json.comment
    }
  )

  return new Response(null, { status: 204 });
}
