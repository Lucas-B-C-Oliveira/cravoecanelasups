'use client'

import { InfoLearnMoreButtonIcon } from '@/components/Icons'
import { ProductData } from '@/types'
import { useRouter } from 'next/navigation'

interface Props {
  productData: ProductData
}

export function LearnMore({ productData }: Props) {
  const router = useRouter()

  // const addProductToCart = useGlobalStore((state) => state.addProductToCart)

  function handleAddToCart() {
    router.push(`/product/${productData.handle}`)

    // const order = await addProductToCart(productData)
  }

  return (
    <button
      className={`
      rounded-lg 
      flex flex-row flex-nowrap gap-1 w-fit h-fit
      bg-white
      shadow-color-button-more-info-shadow-cc
      shadow-button-more-info-cc
      text-sm font-semibold text-gray-yellow-cc-750
      px-2.5 py-1.5
      items-center      
    `}
      onClick={handleAddToCart}
    >
      <InfoLearnMoreButtonIcon />
      Mais Informações
    </button>
  )
}
