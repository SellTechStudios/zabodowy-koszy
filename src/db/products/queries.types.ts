import { Product } from '@/payload-types'

export type SearchRequest = {
  searchString?: string
  type: 'all' | 'new' | 'bestseller' | 'quicksearch'
  pageSize: number
  page: number
}

export type ProductSearchResponse = {
  products: ProductItem[]
  total: number
}

export type ProductItem = Pick<
  Product,
  'id' | 'title' | 'price' | 'pricePrevious' | 'slug' | 'images'
>

export type FacetOption = {
  value: string | number | boolean
  count: number
  label: string
}

export type FacetBucket = {
  code: string
  label: string
  type: 'checkboxes'
  options: FacetOption[]
}

export type FacetedNavigation = {
  price?: FacetBucket
  category?: FacetBucket
}
