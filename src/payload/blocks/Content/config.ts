import type { Block } from 'payload'
import {
    BlocksFeature,  FixedToolbarFeature,  HeadingFeature,  InlineToolbarFeature,  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { ProductsShowcaseBlock } from '../ProductsShowcaseBlock/config'
import { ProductsSliderBlock } from '../ProductsSliderBlock/config'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({
              blocks: [ProductsShowcaseBlock, ProductsSliderBlock],
            }),
          ]
        },
      }),
      label: false,
    },
  ],
}
