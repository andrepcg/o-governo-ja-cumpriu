
const PARTY = process.env.NEXT_PUBLIC_PARTY || process.env.PARTY;
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL || process.env.REPO_URL;

const PARTIES = {
  ps: 'Partido Socialista',
  ad: 'Aliança Democrática',
}
const PARTY_NAME = PARTIES[PARTY];
const MARCAR_CUMPRIDA_URL = process.env.NEXT_PUBLIC_MARCAR_CUMPRIDA_URL
export {
  MARCAR_CUMPRIDA_URL,
  PARTY,
  PARTIES,
  PARTY_NAME,
  REPO_URL,
}
