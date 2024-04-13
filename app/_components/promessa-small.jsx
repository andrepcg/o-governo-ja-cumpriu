
import Link from 'next/link'

export default function PromessaSmall({ urlPath, data: { fulfilled_date, sub_section }, content }) {
  return (
    <Link href={urlPath} prefetch={false} className="promessa mb-6 py-2 block rounded-md border border-transparent group hover:border-gray-200">
      <div className="flex flex-row items-center">
        <div href={urlPath} className="p-4">{fulfilled_date ? '✅' : '❌'}</div>
        <div className="grow">
          {sub_section && (
            <p className="text-base text-gray-400 dark:text-gray-400 text-sm">
              {sub_section}
            </p>
          )}
          <p className="" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="p-4 text-gray-400 block invisible group-hover:visible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
