'use client'

import { ShoppingCart } from 'lucide-react'
import React from 'react'
import CartItemsList from '@/components/Cart/CartItemsList'

interface CartSummaryProps {
  onPlaceOrderAction: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onPlaceOrderAction }) => {
  return (
    <aside className="bg-gray-200 p-4 rounded-tr-lg rounded-bl-lg basis-1/4">
      <header className="flex flex-row items-center gap-2 mb-4">
        <ShoppingCart className="size-6" />
        <h4>Koszyk</h4>
      </header>
      <CartItemsList />
      <button onClick={onPlaceOrderAction} className="mt-4 w-full">
        Złóż zamówienie
      </button>
    </aside>
  )
}
