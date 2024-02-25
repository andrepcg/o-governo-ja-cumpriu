import { notFound } from "next/navigation";

import { getSectionPromessas, getSections } from '../../../lib/promessas';
import PromessaSmall from '../../_components/promessa-small';

export default async function Section({ params: { name }}) {
  const sectionName = decodeURIComponent(name);
  const promessas = await getSectionPromessas(sectionName)

  if (!promessas) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-12">{sectionName}</h1>

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

export async function generateMetadata({ params: { name } }) {
  const sectionName = decodeURIComponent(name);

  return {
    title: sectionName,
  }
}