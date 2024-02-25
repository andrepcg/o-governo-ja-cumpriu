'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function HomeLink() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Link href="/" className="underline text-gray-400 text-sm mb-6">Home</Link>
  )
}
