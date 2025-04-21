'use client'

import {
  Home,
  Settings,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils' // jeśli używasz shadcn/utils

const navItems = [
  { href: '/', label: 'Strona główna', icon: Home },
  { href: '/profil', label: 'Profil', icon: User },
  { href: '/ustawienia', label: 'Ustawienia', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen border-r border-gray-950 flex flex-col bg-yellow-200">

      {/* Kontener: szerokość zmienna */}
      <div className="flex flex-col w-[64px] md:w-[240px] transition-all duration-300">
        <nav className="flex-1 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-accentColor',
                pathname === href ? 'bg-accentColor' : '',
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="ml-3 hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
