'use client'

import { useGlobalState } from '@/store/globalStore'
import { memo } from 'react'

interface Props {
  productData: any
}

export const AddToCart = memo(function AddToCart({ productData }: Props) {
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
      transition duration-300 ease-in-out
      transform hover:-translate-y-1 hover:shadow-lg

    `}
    >
      ADICIONAR AO CARRINHO
    </button>
  )
})
