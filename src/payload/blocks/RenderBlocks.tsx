import React,  { Fragment } from 'react'
import { ContentBlock } from '@/payload/blocks/Content/Component'
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import { ProductsShowcaseBlock } from './ProductsShowcaseBlock/Component.Client'
import { ProductsSliderBlock } from './ProductsSliderBlock/Component'

import type { Page } from '@/payload-types'
const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  productsSlider: ProductsSliderBlock,
  productsShowcase: ProductsShowcaseBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={index > 0 ? 'my-12' : ''} key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
