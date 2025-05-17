'use client'

import { Trash2 } from 'lucide-react'
import React from 'react'
import { Product } from '@/payload-types'
import { useCart } from '@/providers/Cart'
import { cn } from '@/utilities/cn'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = (props) => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product.id)

  if (!productIsInCart) {
    return null
  }

  return (
    <button
      onClick={() => {
        deleteItemFromCart(product.id)
      }}
      className={cn(className, 'clear text-red-500')}
    >
      <Trash2 />
    </button>
  )
}
