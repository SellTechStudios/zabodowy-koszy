import React from 'react'
import { Container } from '@/components/Container'
import { TagsCloud } from './_components/PostsTagsCloud'
import { PostsTrendingList } from './_components/PostsTrendingList'

const PostsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container className="pt-18 md:pt-22">
      <div className="flex md:flex-row flex-col gap-x-4 min-h-screen">
        <main className="flex-none w-2/3">{children}</main>
        <aside className="flex-col flex-none gap-12 bg-gray-200 p-4 w-1/3">
          <h5 className="text-header5">Trending posts</h5>
          <PostsTrendingList />

          <h5 className="text-header5">Browse other tags</h5>
          <TagsCloud />
        </aside>
      </div>
    </Container>
  )
}

export default PostsLayout
