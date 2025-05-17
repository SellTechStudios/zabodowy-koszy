import { Config } from 'payload'
import {
    AlignFeature,  BlockquoteFeature,  BlocksFeature,  BoldFeature,  ChecklistFeature,
    FixedToolbarFeature,  HeadingFeature,  HorizontalRuleFeature,  IndentFeature,
    InlineToolbarFeature,  ItalicFeature,  lexicalEditor,  ParagraphFeature,  SubscriptFeature,
    SuperscriptFeature,  UnderlineFeature
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { ProductsShowcaseBlock } from '../blocks/ProductsShowcaseBlock/config'
import { ProductsSliderBlock } from '../blocks/ProductsSliderBlock/config'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      AlignFeature(),
      BlockquoteFeature(),
      BlocksFeature({
        blocks: [ProductsShowcaseBlock, ProductsSliderBlock, MediaBlock],
      }),
      BoldFeature(),
      ChecklistFeature(),
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      HorizontalRuleFeature(),
      IndentFeature(),
      InlineToolbarFeature(),
      ItalicFeature(),
      ParagraphFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      UnderlineFeature(),
      // LinkFeature({
      //   enabledCollections: ['pages', 'posts'],
      //   fields: ({ defaultFields }) => {
      //     const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
      //       if ('name' in field && field.name === 'url') return false
      //       return true
      //     })

      //     return [
      //       ...defaultFieldsWithoutUrl,
      //       {
      //         name: 'url',
      //         type: 'text',
      //         admin: {
      //           condition: ({ linkType }) => linkType !== 'internal',
      //         },
      //         label: ({ t }) => t('fields:enterURL'),
      //         required: true,
      //       },
      //     ]
      //   },
      // }),
    ]
  },
})
