async function getStats(statsUrl) {
  try {
    const r = await fetch(statsUrl);
    return await r.json();
  } catch (e) {
    console.log("Error getting stats", e)
    return {
      "total": 554,
      "fulfilled": 0,
      "text": "0/554"
    }
  }
}

async function downloadImage(baseImgUrl, stats) {
  const todayDate = new Date().toISOString().split('T')[0]; // 2024-11-28
  const url = new URL(baseImgUrl);
  url.searchParams.append("fulfilled.text", stats.fulfilled);
  url.searchParams.append("total.text", stats.total);
  url.searchParams.append("date", todayDate);

  const r = await fetch(url);
  return await r.blob();
}

async function generateAndUploadImage(bucket, baseImgUrl, statsUrl) {
  // generate image
  // upload to bucket

  const stats = await getStats(statsUrl);
  console.log("Got stats", stats)
  const blob = await downloadImage(baseImgUrl, stats)
  console.log("Got image")

  const uploadedImage = await bucket.put(todaysImageName(), blob, {
    httpMetadata: {
      contentType: "image/png",
    },
  })
  console.log("Image uploaded to bucket")
  return {
    blob,
    object: uploadedImage
  }
}

const EOD = new Date()
EOD.setHours(23, 59, 59, 999)

// return the number of seconds until the end of the day
function secondsUntilEndOfDay() {
  const now = new Date();
  return parseInt((EOD - now) / 1000, 10);
}

function todaysImageName() {
  const todayDate = new Date().toISOString().split('T')[0]; // 2024-11-28
  return `og-${todayDate}.png`;
}

async function getTodaysImage(env) {
  return await env.GOVERNO_BUCKET.get(todaysImageName());
}

export const onRequestGet = async ({ request, env }) => {
  console.log(request.headers)

  let object = await getTodaysImage(env);
  let body;

  if (!object) {
    console.log("Image does not exist, generating")
    let res = await generateAndUploadImage(env.GOVERNO_BUCKET, env.BASE_IMG_URL, env.STATS_URL);
    body = res.blob
    object = res.object
  } else {
    body = object.body
  }

  if (request.headers.get('If-None-Match') === object.httpEtag) {
    return new Response(null, {
      status: 304,
      headers: {
        "ETag": object.httpEtag,
        "Cache-Control": `max-age=${secondsUntilEndOfDay()}`,
        "Expires": EOD.toUTCString(),
        "Access-Control-Allow-Origin": "*",
        "Last-Modified": object.uploaded
      }
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": `max-age=${secondsUntilEndOfDay()}`,
      "Expires": EOD.toUTCString(),
      "ETag": object.httpEtag,
      "Access-Control-Allow-Origin": "*",
      "Last-Modified": object.uploaded
    }
  });
};
