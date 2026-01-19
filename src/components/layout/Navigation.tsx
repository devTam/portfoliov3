'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`font-mono text-sm transition-colors ${
            pathname === item.href
              ? 'text-accent-primary'
              : 'text-text-secondary hover:text-accent-primary'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
