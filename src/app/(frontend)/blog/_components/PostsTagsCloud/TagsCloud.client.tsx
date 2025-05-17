'use client'

import Link from 'next/link'

export type TagsCloudProps = {
  tags: string[]
}

export const TagsCloudClient = (props: TagsCloudProps) => {
  const { tags } = props

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag, i) => {
        return (
          <Link
            key={i}
            href={`/blog?tag=${tag}`}
            className="inline-block bg-gray-100 hover:bg-gray-300 mr-2 px-2 py-1 rounded-full font-mono font-semibold text-gray-800 text-xs"
          >
            {tag}
          </Link>
        )
      })}
    </div>
  )
}
