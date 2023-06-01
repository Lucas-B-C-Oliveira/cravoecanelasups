import { ProductImage } from './ProductImage'
import { ProductData } from '@/types'
import { ProductInfoContainer } from './ProductInfoContainer'

interface Props {
  productData: ProductData
}

export async function Product({ productData }: Props) {
  const { image, handle, altText } = productData

  return (
    <div
      className={`
        flex flex-1 flex-col items-center
        shadow-color-product-shadow-cc
        shadow-product-cc
        p-3 space-y-3
        bg-gradient-to-t from-gradient-yellow-cc-0 from-40% via-gradient-yellow-cc-600 via-60% to-gradient-yellow-cc-500
        h-fit
        rounded-lg
        w-fit
    `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <ProductImage imageUrl={image} productHandle={handle} alt={altText} />

      <ProductInfoContainer productData={productData} />
    </div>
  )
}
