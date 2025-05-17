'use client'
/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig,  Heart,  ShoppingCart } from 'lucide-react'
import { Button } from '@/components/FormElements/button'
import { ProductItem } from '@/db/products/queries.types'
import { Product } from '@/payload-types'
import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { CartItem } from '@/providers/Cart/reducer'
import { formatCurrency } from '@/utilities/formatPrice'

type ProductProps = {
  product: ProductItem
}

export const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const { hasFavoriteProduct, toggleFavoriteProduct } = useAuth()

  const isInCart = isProductInCart(product.id)
  const firstImage = product.images?.[0]
  const imageUrl =
    typeof firstImage === 'string' ? firstImage : firstImage?.url || '/media/missing.png'

  const percentageOff =
    product.pricePrevious && product.pricePrevious > product.price
      ? Math.round(((product.pricePrevious - product.price) / product.pricePrevious) * 100)
      : null

  const isFavorite = hasFavoriteProduct(product.id)

  const onFavoriteClick = async () => {
    await toggleFavoriteProduct(product)
  }

  return (
    <div className="relative flex flex-col flex-1">
      <a
        className="group relative flex rounded-xl overflow-hidden"
        href={`/product/${product.slug}`}
      >
        <img
          src={imageUrl}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-100 ease-linear"
          alt={product.title}
        />

        {percentageOff && (
          <span className="top-6 left-0 absolute bg-[#F0C417] px-3 py-1 rounded-tr-md rounded-br-md font-medium text-white text-sm text-center">
            -{percentageOff}%
          </span>
        )}
      </a>
      <div className="p-5">
        <div
          onClick={onFavoriteClick}
          className="top-2 right-2 absolute bg-white hover:bg-slate-200 p-2 rounded-full cursor-pointer"
        >
          <Heart
            className={cn(
              isFavorite ? 'fill-gray-800' : 'fill-white',
              'hover:scale-110 text-slate-900 transition-transform duration-100 ease-linear',
            )}
            size={20}
          />
        </div>
        <a
          href={`/product/${product.slug}`}
          className="flex justify-center items-start h-16 overflow-hidden"
        >
          <h5 className="text-lg line-clamp-2 tracking-tight">{product.title}</h5>
        </a>
        <div className="flex flex-col mt-4 mb-5 text-center">
          <span className="font-thin text-slate-800 text-4xl">{formatCurrency(product.price)}</span>
          <span className="ml-4 text-slate-600 text-sm line-through">
            {formatCurrency(product.pricePrevious)}
          </span>
        </div>
        <Button
          onClick={
            !isInCart
              ? () =>
                  addItemToCart({ product: product as unknown as Product, quantity: 1 } as CartItem)
              : undefined
          }
          href={isInCart ? '/cart' : undefined}
          className="bg-[#F0C417] hover:bg-[#cdb13e] mt-2 w-full text-white"
        >
          {!isInCart && <ShoppingCart className="sm:hidden block xl:block mr-3" />}
          {isInCart && <CircleCheckBig className="sm:hidden block xl:block mr-3" />}
          <span className="hidden sm:block ml-0 xl:ml-2">
            {isInCart ? 'Pokaż w koszyku' : 'Dodaj do koszyka'}
          </span>
        </Button>
      </div>
    </div>
  )
}
