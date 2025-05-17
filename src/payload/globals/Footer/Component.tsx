/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/payload/utilities/getGlobals'
import { EnvelopeIcon,  MapPinIcon,  PhoneIcon } from '@heroicons/react/24/outline'

import type { Settings } from '@/payload-types'
export async function Footer() {
  const settings: Settings = await getCachedGlobal('settings', 1)()

  return (
    <footer
      className="bg-gray-100 py-24 font-light text-gray-800 text-opacity-75"
      style={{
        backgroundImage: "url('/footer_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="flex flex-col gap-24">
        {/* footer */}
        <nav className="flex flex-row justify-between items-start mx-auto align-top container">
          {/* contact info */}
          <div className="flex flex-col gap-6 text-sm">
            <img src="/logo.svg" width={100} height={0} alt="Logo" />
            <div className="flex flex-row items-center gap-2">
              <MapPinIcon className="size-4" />
              <span>
                {settings.addressLine1}
                <br />
                {settings.addressLine2}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4" />
              <Link
                prefetch={false}
                href={`tel: ${settings.phone}`}
                className="hover:text-orange-700"
              >
                {settings.phone}
              </Link>
            </div>
            <div className="flex flex-row items-center gap-2">
              <EnvelopeIcon className="size-4" />
              <Link
                prefetch={false}
                href={`mailto:${settings.email}`}
                className="hover:text-orange-700"
              >
                {settings.email}
              </Link>
            </div>
          </div>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Pomoc</h5>
            <div className="flex flex-col gap-6 text-sm">
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Zwroty i reklamacje
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Regulamin
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Moje Konto</h5>
            <div className="flex flex-col gap-6 text-sm">
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Twoje Zamówienia
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Twoje Konto
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Ulubione
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Płatności i Dostawa</h5>
            <div className="flex flex-col gap-6 text-sm">
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Formy Płatności
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Czas i koszt dostawy
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Czas realizacji
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Inofrmacje</h5>
            <div className="flex flex-col gap-6 text-sm">
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Polityka prywatności
              </Link>
              <Link
                prefetch={false}
                className="font-light hover:text-orange-700 no-underline"
                href="#"
              >
                Kontakt
              </Link>
            </div>
          </nav>
        </nav>
      </Container>
    </footer>
  )
}
