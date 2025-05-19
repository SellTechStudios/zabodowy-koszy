import type { Block } from 'payload'

export const OurFeaturesBlock: Block = {
  slug: 'ourFeatures',
  interfaceName: 'OurFeaturesBlock',
  labels: {
    singular: 'Our Fetaures',
    plural: 'Our Features',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
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
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
