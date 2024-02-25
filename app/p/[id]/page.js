import { notFound } from "next/navigation";

import { getPromessasData, getPromessa } from '../../../lib/promessas';

export default async function Promessa({ params: { id }}) {
  const promessa = await getPromessa(id)

  if (!promessa) {
    return notFound();
  }

  const { data: { fulfilled_date, links_to_news_articles, section, sub_section }, html } = promessa;
  return (
    <article>
      <h1 className="text-3xl font-bold">{section}</h1>
      {sub_section && <h4 className="text-xl text-gray-400">{sub_section}</h4>}

      <div className="my-6" dangerouslySetInnerHTML={{ __html: html }} />

      <p><strong>Cumprida?</strong> {fulfilled_date ? `✅ (${fulfilled_date})` : '❌'}</p>
      {fulfilled_date && (
        <>
          <p>Notícias:</p>
          <ul>
            {links_to_news_articles && links_to_news_articles.map((article) => (
              <li key={article}><a href={article} target="_blank" rel="noreferrer">{article}</a></li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}

export async function generateStaticParams() {
  const promessas = await getPromessasData()

  return promessas.map(promessa => ({
    id: promessa.id,
  }))
}

export async function generateMetadata({ params: { id } }) {
  const { data: { title } } = await getPromessa(id)
  return {
    title,
  }
}
