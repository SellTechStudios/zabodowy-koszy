import React, { Fragment } from 'react'
import { ContentBlock } from '@/payload/blocks/Content/Component'
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import { OurFetauresBlock } from './OurFeatures/Component.Client'
import { ProductsShowcaseBlock } from './ProductsShowcaseBlock/Component.Client'
import { ProductsSliderBlock } from './ProductsSliderBlock/Component'

import type { Page } from '@/payload-types'
export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <div className="flex flex-col gap-16">
        {blocks.map((block, index) => {
          const { blockType } = block

          switch (blockType) {
            case 'content':
              return <ContentBlock {...block} key={index} />
            case 'mediaBlock':
              return <MediaBlock {...block} key={index} />
            case 'productsSlider':
              return <ProductsSliderBlock {...block} key={index} />
            case 'productsShowcase':
              return <ProductsShowcaseBlock {...block} key={index} />
            case 'ourFeatures':
              return <OurFetauresBlock {...block} key={index} />
          }
        })}
      </div>
    )
  }

  return null
}
