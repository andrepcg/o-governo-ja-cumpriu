import { notFound } from "next/navigation";

import { getPromessasData, getPromessa } from '../../../lib/promessas';

export default async function Promessa({ params: { id }}) {
  const promessa = await getPromessa(id)

  if (!promessa) {
    return notFound();
  }

  const { title, data: { accomplished_at, link_to_news_article, section, sub_section }, html } = promessa;
  return (
    <article>
      <h1>{id}</h1>
      <h4>{title}</h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

export async function generateStaticParams() {
  const promessas = await getPromessasData()

  return promessas.map(promessa => ({
    id: promessa.id,
  }))
}

// export async function generateMetadata({ params: { id } }) {
//   const { title } = await getPromessa(id)
//   return {
//     title,
//   }
// }