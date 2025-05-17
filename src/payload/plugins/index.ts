import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from '@/payload-types'

import { Plugin } from 'payload'
import { getServerSideURL } from '@/payload/utilities/getURL'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { seoPlugin } from '@payloadcms/plugin-seo'

// import { beforeSyncWithSearch } from '@/search/beforeSync'

// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { redirectsPlugin } from '@payloadcms/plugin-redirects'
// import { revalidateRedirects } from '@/payload/hooks/revalidateRedirects'
// import { searchFields } from '@/search/fieldOverrides'
// import { searchPlugin } from '@payloadcms/plugin-search'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  // redirectsPlugin({
  //   collections: ['pages', 'posts'],
  //   overrides: {
  //     // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
  //     fields: ({ defaultFields }) => {
  //       return defaultFields.map((field) => {
  //         if ('name' in field && field.name === 'from') {
  //           return {
  //             ...field,
  //             admin: {
  //               description: 'You will need to rebuild the website when changing this field.',
  //             },
  //           }
  //         }
  //         return field
  //       })
  //     },
  //     hooks: {
  //       afterChange: [revalidateRedirects],
  //     },
  //   },
  // }),
  nestedDocsPlugin({
    collections: ['product-category'],
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  // searchPlugin({
  //   collections: ['posts'],
  //   beforeSync: beforeSyncWithSearch,
  //   searchOverrides: {
  //     fields: ({ defaultFields }) => {
  //       return [...defaultFields, ...searchFields]
  //     },
  //   },
  // }),
  // payloadCloudPlugin(),
]
