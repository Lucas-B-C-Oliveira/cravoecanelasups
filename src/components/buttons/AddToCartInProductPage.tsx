'use client'

import { useGlobalStore } from '@/store/store'
import { ProductData } from '@/types'
// import { setCookie } from 'nookies'

interface Props {
  productData: ProductData
}

export function AddToCartInProductPage({ productData }: Props) {
  const setWasPressed = useGlobalStore(
    (state) => state.setButtonAddToCartWasPressed,
  )
  const addProductToCart = useGlobalStore((state) => state.addProductToCart)
  const getProductOption = useGlobalStore((state) => state.getProductOption)

  async function handleAddToCart() {
    setWasPressed(true)

    const optionOfState = getProductOption()

    if (optionOfState !== '') {
      await addProductToCart(productData)
    }
  }

  return (
    <>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </>
  )
}
