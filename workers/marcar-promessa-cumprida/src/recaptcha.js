
export async function verifyCaptcha(env, recaptchaToken, ip) {
	if (!recaptchaToken) {
		return new Response('reCAPTCHA token missing', { status: 400 })
	}

	try {
    const valid = await apiRequest(env.RECAPTCHA_SECRET_KEY, recaptchaToken, ip)

    if (!valid) {
      return new Response('reCAPTCHA failed', { status: 400 })
    }
		return false
  } catch(err) {
    console.error(err)
    return new Response(err.stack, { status: 500 })
  }
}

async function apiRequest(secret_key, token, ip) {
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}&remoteip=${ip}`,
    {
      method: 'POST'
    }
  )
  const recaptchaBody = await recaptchaResponse.json()
  console.log("captcha response", recaptchaBody)
  return recaptchaBody.success
}
