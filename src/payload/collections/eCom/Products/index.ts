import { CollectionConfig } from 'payload'
import { admins } from '../../../access/admins'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { slugField } from '../../../fields/slug'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [deleteProductFromCarts],
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Details',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
            },
            {
              name: 'pricePrevious',
              type: 'number',
            },
            {
              name: 'color',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'rating',
              type: 'select',
              options: [
                {
                  label: '1',
                  value: '1',
                },
                {
                  label: '2',
                  value: '2',
                },
                {
                  label: '3',
                  value: '3',
                },
                {
                  label: '4',
                  value: '4',
                },
                {
                  label: '5',
                  value: '5',
                },
              ],
            },
            {
              name: 'keywords',
              type: 'text',
            },
            {
              name: 'bestseller',
              type: 'checkbox',
            },
            {
              name: 'specialOffer',
              label: 'Special Offer',
              type: 'checkbox',
            },
            {
              name: 'mediaImages',
              label: 'Images',
              type: 'array',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'isMain',
                  type: 'checkbox',
                  required: true,
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Related Products',
          fields: [
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'seoDescription',
              label: 'description',
              type: 'textarea',
            },
            {
              name: 'seoImageUrl',
              label: 'Image Url',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      label: 'Category',
      name: 'Category',
      type: 'relationship',
      relationTo: 'product-category',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}

export default Products
