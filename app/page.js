import Head from 'next/head';

import { getPromessasData } from '../lib/promessas';
import { PARTY_NAME } from '../consts';
import PromessaSmall from './_components/promessa-small';

export default async function Home() {
  const allPromessasData = await getPromessasData();

  return allPromessasData.map((promessa) => (
    <PromessaSmall key={promessa.id} {...promessa} />
  ))
}

// export async function getStaticProps() {
//   return {
//     props: {
//       allPromessasData,
//     },
//   };
// }
