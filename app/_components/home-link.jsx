'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function HomeLink() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Link href="/" className="text-gray-400 text-sm mb-6 hover:underline">Home</Link>
  )
}
