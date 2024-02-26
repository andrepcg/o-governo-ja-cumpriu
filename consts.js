
const PARTY = process.env.NEXT_PUBLIC_PARTY || process.env.PARTY;
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL || process.env.REPO_URL;

const PARTIES = {
  ps: 'Partido Socialista',
  ad: 'Aliança Democrática',
}
const PARTY_NAME = PARTIES[PARTY];

export {
  PARTY,
  PARTIES,
  PARTY_NAME,
  REPO_URL
}
