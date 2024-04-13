import { notFound } from "next/navigation";

import { getPromessasBySection, getSections } from '@/lib/promessas';
import PromessaSmall from '@/app/_components/promessa-small';

function generateJsonLd(title, slug) {
  if (!title || !slug) return;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": title,
        "item": `https://ogovernojacumpriu.pt/s/${slug}`
      }
    ]
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

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
          <PromessaSmall key={promessa.globalId} {...promessa} hideSection />
        ))}
      </div>
      {generateJsonLd(sectionName, slug)}
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