
const PARTY = process.env.NEXT_PUBLIC_PARTY || process.env.PARTY;
const PARTIES = {
  ps: 'Partido Socialista',
  ad: 'Aliança Democrática',
}
const PARTY_NAME = PARTIES[PARTY];

export {
  PARTY,
  PARTIES,
  PARTY_NAME
}
