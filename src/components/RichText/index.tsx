import { ContentBlock } from '@/payload/blocks/Content/Component'
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import { ProductsShowcaseBlock } from '@/payload/blocks/ProductsShowcaseBlock/Component.Client'
import { ProductsSliderBlock } from '@/payload/blocks/ProductsSliderBlock/Component'
import { cn } from '@/payload/utilities/cn'
import { DefaultNodeTypes,  SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
    JSXConvertersFunction,  RichText as RichTextWithoutBlocks
} from '@payloadcms/richtext-lexical/react'

import type {
  MediaBlock as MediaBlockProps,
  ProductsShowcaseBlock as ProductsShowcaseProps,
  ProductsSliderBlock as ProductsSliderProps,
  ContentBlock as ContentProps,
} from '@/payload-types'
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      MediaBlockProps | ProductsShowcaseProps | ProductsSliderProps | ContentProps
    >

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    mediaBlock: ({ node }) => <MediaBlock {...node.fields} />,
    content: ({ node }) => <ContentBlock {...node.fields} />,
    productsSlider: ({ node }) => <ProductsSliderBlock {...node.fields} />,
    productsShowcase: ({ node }) => <ProductsShowcaseBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn('container max-w-none mx-auto', className)}
      {...rest}
    />
  )
}
