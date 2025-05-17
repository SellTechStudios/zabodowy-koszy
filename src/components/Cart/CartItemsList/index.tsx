'use client'

import React from 'react'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import { useCart } from '@/providers/Cart'
import EmptyCart from './CartEmpty'
import CartItem from './CartItem'

const CartItemsList = () => {
  const { hasInitializedCart, cart, cartIsEmpty, addItemToCart } = useCart()

  if (!hasInitializedCart) {
    return (
      <div className="my-8">
        <LoadingShimmer />
      </div>
    )
  }

  if (cartIsEmpty) {
    return <EmptyCart />
  }

  return (
    <div>
      {/* CART LIST HEADER */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-[100px_3fr_1fr_1fr_1fr] mb-2">
        <p>Produkt</p>
        <p></p>
        <p className="text-center">Ilość</p>
        <p className="text-center">Łącznie</p>
        <p className="text-center">Usuń</p>
      </div>
      {/* CART ITEM LIST */}
      <ul className="border-gray-300 border-t">
        {cart?.items?.map((item) => {
          if (item.product && typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title },
            } = item

            return (
              <CartItem
                key={id}
                product={product}
                title={title}
                image={''}
                qty={quantity}
                addItemToCart={addItemToCart}
              />
            )
          }
          return null
        })}
      </ul>
    </div>
  )
}

export default CartItemsList
