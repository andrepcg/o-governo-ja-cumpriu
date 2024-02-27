import { notFound } from "next/navigation";

import { getPromessasBySection, getSections } from '@/lib/promessas';
import PromessaSmall from '@/app/_components/promessa-small';

export default function Section({ params: { slug }}) {
  const sections = getSections()
  const sectionName = sections[slug]
  const promessas = getPromessasBySection()[slug]

  if (!promessas) {
    return notFound();
  }

  const fulfilled = promessas.filter((promessa) => promessa.data.fulfilled_date).length

  return (
    <div>
      <h1 className="text-3xl mb-12">
        <span className="font-bold">{sectionName}</span>
        <span className="text-lg text-gray-400">{` ${fulfilled} / ${promessas.length}`}</span>
      </h1>

      <div>
        {promessas.map((promessa) => (
          <PromessaSmall key={promessa.id} {...promessa} hideSection />
        ))}
      </div>
    </div>
  )

}

export function generateStaticParams() {
  return Object.entries(getSections()).map(([slug, name]) => ({
    name,
    slug
  }))
}

export function generateMetadata({ params: { slug } }) {
  return {
    title: getSections()[slug],
  }
}