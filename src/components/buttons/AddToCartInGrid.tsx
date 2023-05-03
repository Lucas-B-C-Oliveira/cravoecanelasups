'use client'

import { Product } from '@/types'
import { useGlobalStore } from '@/store/store'

// import { setCookie } from 'nookies'

interface Props {
  productData: Product
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
