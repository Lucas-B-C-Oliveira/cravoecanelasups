import { ProductData } from '@/types'

import { Product } from './Product'
import { query } from '@/utils/shopify/storefrontApi'
import { queryGetProductsByCollectionHandle } from '@/utils/graphql/querys'

interface Props {
  collectionHandle: string
}

export async function ProductsGrid({
  collectionHandle = 'mais-vendidos',
}: Props) {
  const queryResult = await query(
    queryGetProductsByCollectionHandle(collectionHandle),
  )

  const { nodes } = queryResult.collection.products

  const products: ProductData[] = nodes.map((product: ProductData) => {
    const { url, altText } = product.featuredImage

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      currencySymbol: 'R$',
      altText: `${altText}`,
      image: url,
      price: product.priceRange.minVariantPrice.amount,
      options: product.options,
    }
  })

  return (
    <div
      className={`
      flex
      justify-center
      `}
    >
      <ul
        role="list"
        className={`

      flex flex-auto flex-row gap-6  flex-wrap justify-center
        
      `}
      >
        {products &&
          products.map((product: ProductData) => {
            return (
              <li
                key={product.id}
                className="col-span-1 flex flex-col divide-y"
              >
                {/* @ts-expect-error -> Async Server Component */}
                <Product productData={product} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
