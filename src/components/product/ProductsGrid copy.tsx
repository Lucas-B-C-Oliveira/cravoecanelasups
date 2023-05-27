import { ProductData } from '@/types'
import { ProductComponent } from './ProductComponent'
import { env } from '@/utils/env'

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

  return (
    <div>
      {products &&
        products.map((product: ProductData) => {
          return (
            <ProductComponent
              productData={product}
              showAddToCartButton={collectionHandle === 'mais-vendidos'}
              showBuyNowButton={collectionHandle === 'mais-vendidos'}
              showLearnMoreButton
              key={product.id}
            />
          )
        })}
    </div>
  )
}
