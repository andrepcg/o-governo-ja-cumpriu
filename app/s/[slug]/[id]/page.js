import { notFound } from "next/navigation";
import Link from 'next/link'

import { getPromessasData, getSectionPromessa } from '@/lib/promessas';
import { pullRequestsForDocument } from '@/lib/github';

import MarcarPromessaCumprida from '@/app/_components/marcar-promessa-cumprida';

async function GithubPullRequests({ docPath }) {
  const prs = await pullRequestsForDocument(docPath)

  if (prs.length === 0) {
    return <MarcarPromessaCumprida docPath={docPath} />
  }

  return (
    <div className="mt-4">
      <p><strong>Potencialmente marcado como concluído nos seguintes Pull Requests:</strong></p>
      <ul>
        {prs.map(pr => (
          <li key={pr.id}>
            <a className="hover:underline text-blue-400" href={pr.html_url}>#{pr.number} - {pr.created_at}</a>
          </li>
        ))}

      </ul>
    </div>
  )
}

function generateJsonLd(promessa, slug) {
  const { data: { section, sub_section, title }, content } = promessa;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "headline": title,
        "articleBody": content,
        articleSection: `${section} / ${sub_section}`
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
            "@type": "ListItem",
            "position": 1,
            "name": title,
            "item": `https://ogovernojacumpriu.pt/s/${slug}`
          },{
            "@type": "ListItem",
            "position": 2,
            "name": sub_section
          }
        ]
      }
    ]
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default async function Promessa({ params: { slug, id }}) {
  const promessa = getSectionPromessa(slug, id)

  if (!promessa) {
    return notFound();
  }

  const { data: { fulfilled_date, links_to_news_articles, section, sub_section }, content, docPath } = promessa;
  return (
    <article itemtype="https://schema.org/NewsArticle">
      <Link href={`/s/${slug}`}><h1 className="text-3xl font-bold">{section}</h1></Link>
      {sub_section && <h4 className="text-xl text-gray-400">{sub_section} • {id}</h4>}

      <blockquote className="my-6 p-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <p id="main" className="italic font-medium leading-relaxed text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: content }}/>
      </blockquote>

      <p><strong>Cumprida?</strong> {fulfilled_date ? `✅ (${fulfilled_date.toDateString()})` : '❌'}</p>
      {!fulfilled_date && <GithubPullRequests docPath={docPath}/>}

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
      {generateJsonLd(promessa, slug)}
    </article>
  )
}

export async function generateStaticParams() {
  return getPromessasData().map(promessa => ({
    id: promessa.fileId,
    slug: promessa.data.sectionSlug
  }))

}

export async function generateMetadata({ params: { slug, id } }) {
  const { data: { title, fulfilled_date } } = getSectionPromessa(slug, id)
  return {
    title: `${fulfilled_date ? '✅' : '❌'} ${title}`,
  }
}
