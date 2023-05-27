'use client'

import { useGlobalState } from '@/store/globalStore'
import { useRouter } from 'next/navigation'
import { memo } from 'react'

interface Props {
  productData: any
}

export const Buy = memo(function Buy({ productData }: Props) {
  const router = useRouter()
  const {
    setButtonAddToCartOrBuyWasClicked,
    variantOptionSelected,
    addProductToCart,
  } = useGlobalState()

  function handle() {
    if (variantOptionSelected.value === 'Selecione') {
      setButtonAddToCartOrBuyWasClicked(true)
    } else {
      const productDataWithCorrectOptionSelected = {
        ...productData,
        options: variantOptionSelected,
      }
      addProductToCart(productDataWithCorrectOptionSelected)
      router.push(`/checkout`)
    }
  }

  return (
    <button
      onClick={handle}
      className={`
      text-gray-yellow-cc-800
      font-semibold
      text-lg
      px-6
      py-3
      bg-gradient-to-t from-gradient-yellow-cc-650 to-gradient-yellow-cc-450
      rounded-lg
      w-fit
      h-fit

      hover:from-hover-gradient-yellow-cc-650 hover:to-hover-gradient-yellow-cc-450

    `}
    >
      COMPRAR
    </button>
  )
})
