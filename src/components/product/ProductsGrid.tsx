import { ProductData } from '@/types'

import { env } from '@/utils/env'
import { Product } from './Product'

interface Props {
  collectionHandle: string
}

export async function ProductsGrid({
  collectionHandle = 'mais-vendidos',
}: Props) {
  const response = await fetch(
    `${env.APPLICATION_PATH}${env.APPLICATION_API_PATH}/get-products-by-collection-handle?collectionHandle=${collectionHandle}`,
    {
      cache: 'no-store', //! TODO: Use the correct cache
    },
  )

  const products = await response.json()
  // w - [66rem]
  return (
    <div
      className={`
        w-full 
        2xl:px-28 
      `}
    >
      <div
        className={`
        grid grid-cols-4 gap-x-6 w-full 
        2xl:px-28 
      `}
      >
        {products &&
          products.map((product: ProductData) => {
            return (
              /* @ts-expect-error -> Async Server Component */
              <Product productData={product} key={product.id} />
            )
          })}
      </div>
    </div>
  )
}
