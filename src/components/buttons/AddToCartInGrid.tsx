'use client'

import { ProductData } from '@/types'
import { useGlobalStore } from '@/store/store'

// import { setCookie } from 'nookies'

interface Props {
  productData: ProductData
}

export function AddToCartInGrid({ productData }: Props) {
  const addProductToCart = useGlobalStore((state) => state.addProductToCart)

  async function handleAddToCart() {
    const order = await addProductToCart(productData)
  }

  return (
    <>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </>
  )
}
