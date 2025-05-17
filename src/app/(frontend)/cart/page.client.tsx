'use client'

import React from 'react'
import CartItemsList from '@/components/Cart/CartItemsList'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

export const CartPage: React.FC = () => {
  const { user } = useAuth()
  const { cartTotal } = useCart()

  return (
    <div className="gap-16 grid grid-cols-1 lg:grid-cols-[65%_1fr] my-8">
      <CartItemsList />

      <div className="flex flex-col gap-4 p-6 border border-gray-300">
        <div className="flex justify-between items-center pb-4 border-gray-300 border-b">
          <h6 className="font-semibold text-lg">Podsumowanie</h6>
        </div>

        <div className="flex justify-between items-center pb-4 border-gray-300 border-b">
          <p className="text-lg">Dostawa</p>
          <p className="text-lg">0 zł</p>
        </div>

        <div className="flex justify-between items-center pb-4 border-gray-300 border-b">
          <p className="text-lg">Łącznie</p>
          <p className="font-semibold text-lg">{cartTotal.formatted}</p>
        </div>

        <a href={user ? '/checkout' : '/login?redirect=%2Fcheckout'} className="w-full">
          {user ? 'Przejdź do płatności' : 'Zaloguj się, aby kontynuować'}{' '}
        </a>
      </div>
    </div>
  )
}
