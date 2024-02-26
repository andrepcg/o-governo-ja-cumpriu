
import Link from 'next/link'

import { getSectionPromessas } from '../../lib/promessas';
import PromessaSmall from './promessa-small';

export default function Section({ name, slug, hidePromessas = false }) {
  const promessas = getSectionPromessas(slug);

  const fulfilled = promessas.filter((promessa) => promessa.data.fulfilled_date).length

  return (
    <div className="">
      <h2 className='text-2xl mb-6'>
        <Link href={`/s/${slug}`} className=" font-bold hover:underline">{name}</Link>
        <span className="text-lg text-gray-400">{` ${fulfilled} / ${promessas.length}`}</span>
      </h2>

      {!hidePromessas && promessas.map((promessa) => (
        <PromessaSmall hideSection key={promessa.id} {...promessa} />
      ))}
    </div>
  )
}
