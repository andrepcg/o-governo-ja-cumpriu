'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Search from '@/app/_components/search';


export default function NavBar() {
  const pathname = usePathname()

  if (pathname === '/sala-de-espera') return;

  return (
    <navbar className='block mb-6'>
      <Search />
      <ul className='flex flex-row'>
        {pathname !== '/' && <li className='px-2 pl-0'><Link href="/" className="text-gray-400 text-sm mb-6 hover:underline">Home</Link></li>}
        <li className='px-2'><Link href="/sobre" className="text-gray-400 text-sm mb-6 hover:underline">Sobre</Link></li>
        <li className='px-2'><Link href="/como-contribuir" className="text-gray-400 text-sm mb-6 hover:underline">Como contribuir?</Link></li>
      </ul>
    </navbar>
  )
}

