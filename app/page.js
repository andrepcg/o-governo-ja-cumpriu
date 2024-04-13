import { getSections } from '@/lib/promessas';
import { PARTY_NAME } from '../consts';
import Section from '@/app/_components/section';

export default async function Home() {
  const sections = getSections();

  return (
    <div>
      <div className='text-center mb-12'>
        <h1 className='text-4xl mb-4'>Parabéns, <strong>{PARTY_NAME}</strong> 2024!</h1>
        <a className='underline' href="/programas/programa.pdf">Programa</a>
      </div>

      <div>
        {Object.entries(sections).map(([slug, name]) => (
          <Section key={slug} slug={slug} name={name} hidePromessas />
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: "O Governo Já Cumpriu?",
  }
}
