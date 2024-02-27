
// {
//   id: '1-educacao-e-formacao-9',
//   title: 'Educação e Formação / Começar Cedo: a Educação dos 0 aos 6 Anos de Idade / 9',
//   data: {
//     section: Educação e Formação',
//     sub_section: Começar Cedo: a Educação dos 0 aos 6 Anos de Idade',
//     fulfilled_date: null,
//     links_to_news_articles: null
//   },
//   content: 'Produzir orientações para o período 0-6 anos e proporcionar às instituições o acesso a materiais educativos adequados ao desenvolvimento nas áreas das linguagens (oral, escrita, artísticas e digitais), da matemática, das ciências e da motricidade;'
// }

import Link from 'next/link'

export default function PromessaSmall({ hideSection = false, urlPath, data: { fulfilled_date, section, sub_section }, content }) {
  return (
    <div className="promessa mb-6">
      <div className="flex flex-row items-center">
        <Link href={urlPath} className="p-4">{fulfilled_date ? '✅' : '❌'}</Link>
        <div>
          <div className="text-base text-gray-400 dark:text-gray-400 text-sm">
            {!hideSection && <Link href={`/s/${section}`} className="font-bold">{section}</Link>}
            <p>{sub_section}</p>
          </div>
          <div className="">
            <p className="" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  )
}
