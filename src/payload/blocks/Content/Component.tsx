import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  return props.richText ? <RichText data={props.richText} /> : null
}
