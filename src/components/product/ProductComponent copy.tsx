import Image from 'next/image'
import { AddToCartInGrid, BuyNow, LearnMore } from '../buttons'
import { ProductData } from '@/types'

interface Props {
  productData: ProductData
  showBuyNowButton: boolean
  showAddToCartButton: boolean
  showLearnMoreButton: boolean
}

export async function ProductComponent({
  showBuyNowButton = false,
  showAddToCartButton = false,
  showLearnMoreButton = false,
  productData,
}: Props) {
  const { title, image, description, price, handle, altText, currencySymbol } =
    productData

  return (
    <>
      <h2>{title}</h2>

      <Image alt={altText} src={image} width={700} height={700} />

      <p>{description}</p>
      <p>
        {currencySymbol} {price}
      </p>

      {showBuyNowButton && <BuyNow />}
      {showAddToCartButton && <AddToCartInGrid productData={productData} />}
      {showLearnMoreButton && <LearnMore handle={handle} />}
    </>
  )
}
