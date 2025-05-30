import React, { cache } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Metadata } from 'next'
import NotFound from '../not-found'
import PageClient from './page.client'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/payload/blocks/RenderBlocks'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/payload/utilities/generateMeta'
import { getPayload } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const page: PageType | null = await queryPageBySlug({
    slug,
  })

  if (!page) return <NotFound />

  const { layout } = page

  return (
    <article>
      <PageClient />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
