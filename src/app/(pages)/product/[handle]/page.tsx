import { ProductData } from '@/types'
import { queryGetProductByHandle } from '@/utils/graphql/querys'
import { query } from '@/utils/shopify/storefrontApi'
import { ProductContainer } from './components/ProductContainer'
import { NutritionalTable } from './components/NutritionalTable'
import { CarouselProductsContainer } from './components/CarouselProductsContainer'

interface Params {
  params: {
    handle: string
  }
}

export default async function LearnMoreProduct({ params }: Params) {
  const { handle } = params //! TODO: use ZOD to valid that

  const queryResult = await query(queryGetProductByHandle(handle))

  const { product } = queryResult as { product: any } //! TODO: check this out -> remove that

  const { title, id, description, featuredImage, variants, images, options } =
    product
  const { nodes } = variants
  const nodesImages = images.nodes.filter(
    (image: any, index: number) => index > 0,
  )
  const variant = nodes[0]

  console.log('product', product)

  const newProduct = {
    title,
    id,
    producHandle: product.handle,
    description,
    currencySymbol: 'R$',
    image: featuredImage.url,
    nutritionalTableImages: nodesImages,
    price: variant.price.amount,
    altText: `${featuredImage.altText}`,
    variantId: variant.id,
    currencyCode: variant.price.currencyCode,
    options,
  }

  console.log('newProduct', newProduct)

  return (
    <div
      className={`

      flex flex-col  py-6 gap-12
    
    `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <ProductContainer productData={newProduct} />
      {/* @ts-expect-error -> Async Server Component */}
      <NutritionalTable images={nodesImages} />
      {/* @ts-expect-error -> Async Server Component */}
      <CarouselProductsContainer />
    </div>
  )
}
