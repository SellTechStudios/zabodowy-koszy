import { CollectionConfig } from 'payload'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { admins } from '../../../access/admins'
import { slugField } from '../../../fields/slug'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'

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
              name: 'code',
              type: 'text',
              required: true,
            },
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
              name: 'description',
              type: 'richText',
              editor: defaultLexical,
            },
            {
              name: 'specialOffer',
              label: 'Special Offer',
              type: 'checkbox',
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
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
