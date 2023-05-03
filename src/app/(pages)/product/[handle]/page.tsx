import { AddToCartInProductPage } from '@/components/buttons'
import { ProductVariantOptions } from '@/components/product/ProductVariantOptions'
import { Product } from '@/types'
import { env } from '@/utils/env'
import Image from 'next/image'

interface Params {
  params: {
    handle: string
  }
}

export default async function LearnMoreProduct({ params }: Params) {
  const { handle } = params //! TODO: use ZOD to valid that

  const response = await fetch(
    `${env.APPLICATION_PATH}${env.APPLICATION_API_PATH}/get-product-by-handle?handle=${handle}`,
    {
      cache: 'no-store', //! TODO: Use the correct cache
    },
  )

  const productData: Product = await response.json()

  const { description, currencySymbol, image, price, title, altText } =
    productData

  return (
    <>
      <h2>{title}</h2>

      <Image alt={altText} src={image} width={550} height={550} />

      <p>{description}</p>
      <p>
        {currencySymbol} {price}
      </p>

      <ProductVariantOptions />
      <AddToCartInProductPage productData={productData} />
    </>
  )
}
