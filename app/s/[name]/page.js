import { notFound } from "next/navigation";

import { getSectionPromessas, getSections } from '@/lib/promessas';
import PromessaSmall from '@/app/_components/promessa-small';

export default async function Section({ params: { name }}) {
  const sectionName = decodeURIComponent(name);
  const promessas = await getSectionPromessas(sectionName)

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

export async function generateStaticParams() {
  const sections = await getSections()

  return sections.map(section => ({
    name: section,
  }))
}

export function generateMetadata({ params: { name } }) {
  const sectionName = decodeURIComponent(name);

  return {
    title: sectionName,
  }
}