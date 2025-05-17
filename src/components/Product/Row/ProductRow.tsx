'use client'
/* eslint-disable @next/next/no-img-element */

import { ProductItem } from '@/db/products/queries.types'
import { formatCurrency } from '@/utilities/formatPrice'

type ProductProps = {
  product: ProductItem
}

export const ProductRow: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const firstImage = product.images?.[0]
  const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url

  return (
    <a
      className="group relative flex flex-row gap-4 hover:bg-slate-100 overflow-hidden"
      href={`/product/${product.slug}`}
    >
      <img src={imageUrl || ''} className="p-2 w-20 h-20 object-scale-down" alt={product.title} />
      <div className="flex flex-col gap-2 py-2">
        <h5 className="text-md line-clamp-1 tracking-tight">{product.title}</h5>
        <span className="font-bold text-sm">{formatCurrency(product.price)}</span>
      </div>
    </a>
  )
}
