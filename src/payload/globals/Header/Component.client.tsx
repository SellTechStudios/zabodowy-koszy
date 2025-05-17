/* eslint-disable @next/next/no-img-element */
'use client'

import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,  { useEffect,  useState } from 'react'
import { CartLink } from '@/components/Cart/CartLink'
import { Container } from '@/components/Container'
import LocaleSwitcher from '@/components/LocaleSwicher'
import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { HeartIcon,  UserIcon } from '@heroicons/react/24/outline'

export const HeaderClient: React.FC = () => {
  const { user } = useAuth()
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const t = useTranslations('Header')

  const mainNavItems = [
    { label: t('home'), path: '/' },
    { label: t('all'), path: '/products/all' },
    { label: t('blog'), path: '/blog' },
    { label: t('contact'), path: '/contact' },
  ]

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="py-4">
      <Container className="flex flex-row justify-between items-center">
        <Link prefetch={false} href="/">
          <img src="/logo.svg" alt="Company Logo" width={120} height={0} />
        </Link>

        <form
          action={'/products/quicksearch'}
          className="hidden md:block relative w-full max-w-[300px]"
        >
          <input
            type="text"
            name="searchString"
            placeholder="Search..."
            className="px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none w-full text-sm"
          />
          <button type="submit" className="top-1/2 right-3 absolute -translate-y-1/2 transform">
            <SearchIcon className="w-5 text-gray-500" />
          </button>
        </form>

        <div className="flex flex-row items-center gap-6 text-sm uppercase">
          <LocaleSwitcher />

          <CartLink />

          {user && (
            <Link href="/favourites" className="flex items-center gap-1">
              <div className="relative">
                <HeartIcon className="size-5" />

                <span className="-top-3 left-2 absolute bg-red-500 p-0.5 px-2 rounded-full text-red-50 text-sm scale-75">
                  {user?.favourites?.length ?? 0}
                </span>
              </div>
            </Link>
          )}

          {user && (
            <Link prefetch={false} href="/account" className="flex items-center gap-1">
              <UserIcon className="size-5" />
            </Link>
          )}

          {!user && (
            <Link prefetch={false} href="/login" className="flex items-center gap-1">
              <UserIcon className="size-5" />
            </Link>
          )}
        </div>
      </Container>

      <div className="left-1/2 relative flex flex-row justify-center bg-gray-800 mt-4 w-dvw max-w-none text-gray-100 -translate-x-1/2">
        <nav className="flex flex-row justify-center items-center h-full uppercase">
          {mainNavItems.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              prefetch={false}
              className={cn(
                pathname === nav.path ? 'bg-gray-700' : '',
                'px-6 py-4 hover:bg-gray-700',
              )}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
