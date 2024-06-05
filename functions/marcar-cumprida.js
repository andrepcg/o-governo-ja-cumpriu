
import { verifyCaptcha } from "../lib/recaptcha"

function dispatchGithubWorkflow(env, inputs) {
  const url = `https://api.github.com/repos/${env.REPO_OWNER}/${env.REPO}/actions/workflows/${env.WORKFLOW_FILE_NAME}/dispatches`;

  const requestBody = {
    ref: env.REPO_MAIN_BRANCH,
    inputs: inputs
  };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${env.OCTOKIT_TOKEN}`);
  headers.append('Accept', 'application/vnd.github+json');
  headers.append('X-GitHub-Api-Version', '2022-11-28');
  headers.append('User-Agent', 'PR Bot');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  return fetch(url, requestOptions)
}

function parseLinks(data) {
  return data.split(/[\n,]/).map(l => l.trim()).filter(s => s.length > 0);
}

// MAIN LOGIC

export const onRequestPost = async ({ request, env }) => {

  const json = await request.json()

  if (!json.doc_path || !json.fulfilled_date || !json.links) {
    return new Response("Missing inputs", { status: 400 });
  }

  console.log("Received", json);
  const links = parseLinks(json.links);

  if (isNaN(new Date(json.fulfilled_date)) || links.length === 0) {
    return new Response("Invalid inputs", { status: 400 });
  }

  const r = await verifyCaptcha(env, json.recaptchaToken, request.headers.get('CF-Connecting-IP'))
  if (r) return r;

  console.log("Calling github")

  const gh_response = await dispatchGithubWorkflow(
    env,
    {
      doc_path: json.doc_path,
      fulfilled_date: json.fulfilled_date,
      links: links.join(","),
      comment: json.comment
    }
  )

  if (!gh_response.ok) {
    console.log("GH response not ok. Status", gh_response.status)
    console.log("resp", await gh_response.text())
    return new Response("unable to complete", { status: 400 });
  }

  return new Response(null, { status: 204 });
}
