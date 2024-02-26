import { notFound } from "next/navigation";

import { getPromessasData, getPromessa } from '@/lib/promessas';
import { REPO_URL } from '@/consts';

function gitEditUrl(docPath) {
  return `${REPO_URL}/edit/main${docPath}`;
}

export default async function Promessa({ params: { id }}) {
  const promessa = await getPromessa(id)

  if (!promessa) {
    return notFound();
  }

  const { data: { fulfilled_date, links_to_news_articles, section, sub_section }, content, docPath } = promessa;
  return (
    <article>
      <h1 className="text-3xl font-bold">{section}</h1>
      {sub_section && <h4 className="text-xl text-gray-400">{sub_section}</h4>}

      <blockquote className="my-6 p-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <p className="italic font-medium leading-relaxed text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: content }}/>
      </blockquote>

      <p><strong>Cumprida?</strong> {fulfilled_date ? `✅ (${fulfilled_date.toDateString()})` : '❌'}</p>
      {!fulfilled_date &&
        <a className="hover:underline text-blue-400" href={gitEditUrl(docPath)}>A promessa foi cumprida? Contribui com informação!</a>
      }

      {fulfilled_date && (
        <>
          <p><strong>Notícias:</strong></p>
          <ul className="pl-4">
            {links_to_news_articles && links_to_news_articles.map((article, i) => (
              <li key={article}>
                <a href={article} target="_blank" rel="noreferrer" className="hover:underline">Link {i + 1}</a>
              </li>
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
  const { data: { title, fulfilled_date } } = await getPromessa(id)
  return {
    title: `${fulfilled_date ? '✅' : '❌'} ${title}`,
  }
}
