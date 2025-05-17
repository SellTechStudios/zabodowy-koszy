import { draftMode } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import { Locale } from '@/i18n/config'
import { getUserLocale } from '@/services/locale'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import NotFound from '../../not-found'
import { RelatedPosts } from '../_components/RelatedPosts'

import type { Metadata } from 'next'
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    locale: 'all',
  })

  const params = posts.docs.map(({ slug }) => ({
    slug,
  }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post(props: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await props.params
  const locale = (await getUserLocale()) as Locale
  const post = await queryPostBySlug({ slug, locale })

  if (!post) {
    return <NotFound />
  }

  const imgUrl = typeof post.heroImage === 'string' ? post.heroImage : post.heroImage?.url

  return (
    <article className="pb-16">
      {draft && <LivePreviewListener />}

      {imgUrl && (
        <div className="relative mb-8 w-full h-[300px] sm:h-[400px] md:h-[600px]">
          <Image src={imgUrl} alt={post.title} className="object-cover" fill sizes="100vw" />
        </div>
      )}
      <div>
        <h1 className="mb-8 text-header1">{post.title}</h1>
        <RichText className="" data={post.content} enableGutter={false} enableProse={false} />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16">
            <h5 className="text-header5">Related posts</h5>
            <RelatedPosts
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-subgrid grid-rows-[2fr] col-span-3 col-start-1 mt-12"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const locale = (await getUserLocale()) as Locale
  const post = await queryPostBySlug({ slug, locale })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
