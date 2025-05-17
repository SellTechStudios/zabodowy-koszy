import React from 'react'
import { Media } from '../../../components/Media'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import type { StaticImageData } from 'next/image'
type Props = MediaBlockProps & {
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { media, staticImage } = props

  return (
    <Media
      imgClassName="border border-border rounded-[0.8rem]"
      resource={media}
      src={staticImage}
    />
  )
}
