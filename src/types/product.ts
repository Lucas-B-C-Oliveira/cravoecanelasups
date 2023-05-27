export interface ProductData {
  title: string
  price: string
  image: string
  description: string
  handle: string
  id: string
  currencySymbol: string
  currencyCode: string
  altText: string
  options: any[]
}

export interface PriceRange {
  maxVariantPrice?: {
    amount: string
    currencyCode: string
  }
  minVariantPrice?: {
    amount: string
    currencyCode: string
  }
}

export interface ProductDataAPI {
  id: string
  title: string
  description: string
  handle: string
  priceRange?: PriceRange
  variants?: {
    nodes: {
      id: string
      product: {
        priceRange: PriceRange
      }
    }
  }
  featuredImage: {
    url: string
    altText?: string
  }
}
