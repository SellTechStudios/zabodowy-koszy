import type { Product, ProductsShowcaseBlock as ProductsShowcaseProps } from '@/payload-types'

import React from 'react'
import { ProductCard } from '@/components/Product/Card/ProductCard'

type Props = Omit<ProductsShowcaseProps, 'id' | 'blockType' | 'blockName'> & {
  className?: string
}

export const ProductsShowcaseBlock: React.FC<Props> = (props: Props) => {
  const { title, products } = props

  return (
    <div className={props.className}>
      <h3 className="after:block relative after:bg-current after:mx-auto my-8 after:mt-2 after:w-[60px] after:h-0.5 font-thin text-4xl text-center after:content-['']">
        {title}
      </h3>

      <div className="flex flex-row gap-8">
        {Array.isArray(products) &&
          products
            .filter((p) => typeof p === 'object')
            .map((p: Product) => (
              <React.Fragment key={p.id}>
                <ProductCard product={p} />
              </React.Fragment>
            ))}
      </div>
    </div>
  )
}
