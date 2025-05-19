import type { Block } from 'payload'

export const YellowBannerBlock: Block = {
  slug: 'yellowBanner',
  interfaceName: 'YellowBannerBlock',
  labels: {
    singular: 'Yellow Banner',
    plural: 'Yellow Banner',
  },
  fields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
