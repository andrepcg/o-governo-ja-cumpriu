import Link from 'next/link';

import { getSections } from '../lib/promessas';
import { PARTY_NAME, PARTY } from '../consts';
import Section from './_components/section';

export default async function Home() {
  const sections = await getSections();

  return (
    <div>
      <div className='text-center mb-12'>
        <h1 className='text-4xl mb-4'>Parabéns, <strong>{PARTY_NAME}</strong> 2024!</h1>
        <h3 className='text-xl mb-4'>Agora está na altura de cumprir.<br/>Como dizia o outro, <span className='italic'>&quot;<s>Paga</s> Cumpre o que deves!&quot;</span></h3>
        <Link className='underline' href={`/programas/${PARTY}.pdf`}>Programa</Link>
      </div>

      <div>
        {sections.map((section) => (
          <Section key={section} name={section} hidePromessas />
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: { id } }) {
  return {
    title: "O Governo Já Cumpriu?",
  }
}
