import type { Block } from 'payload'
import { defaultLexical } from '@/payload/fields/defaultLexical'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: defaultLexical,
      label: false,
    },
  ],
}
