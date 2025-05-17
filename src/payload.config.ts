import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { en } from '@payloadcms/translations/languages/en'
import { pl } from '@payloadcms/translations/languages/pl'
import { Orders } from './payload/collections/eCom/Orders'
import ProductCategory from './payload/collections/eCom/ProductCategory'
import Products from './payload/collections/eCom/Products'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { PostCategories } from './payload/collections/PostCategories'
import { Posts } from './payload/collections/Posts'
import { Users } from './payload/collections/Users'
import { Settings } from './payload/globals/Settings/Settings'
import { plugins } from './payload/plugins'
import { getServerSideURL } from './payload/utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      pl,
    },
  },
  localization: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // Global editor config
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, PostCategories, Users, Orders, Products, ProductCategory],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Settings],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
