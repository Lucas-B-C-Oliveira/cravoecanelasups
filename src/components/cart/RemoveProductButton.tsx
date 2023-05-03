'use client'

import { useGlobalStore } from '@/store/store'
import { type ProductsToBeOrdered } from '@/types'

interface Props {
  productData: ProductsToBeOrdered
}

export function RemoveProductButton({ productData }: Props) {
  const removeProductFromCart = useGlobalStore(
    (state) => state.removeProductFromCart,
  )

  async function handleRemoveButton() {
    await removeProductFromCart(productData)
  }

  return (
    <>
      <button onClick={handleRemoveButton}>REMOVER PRODUTO</button>
    </>
  )
}
