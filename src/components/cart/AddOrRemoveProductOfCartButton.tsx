'use client'

import { useGlobalStore } from '@/store/store'
import { type ProductsToBeOrdered } from '@/types'

interface Props {
  buttonType: '+' | '-'
  productData: ProductsToBeOrdered
}

export function AddOrRemoveProductOfCartButton({
  buttonType,
  productData,
}: Props) {
  const addProductToCart = useGlobalStore((state) => state.addProductToCart)
  const removeProductFromCart = useGlobalStore(
    (state) => state.removeProductFromCart,
  )

  async function handleAddOrRemove() {
    if (buttonType === '+') await addProductToCart(productData)
    else {
      const amountProductsToRemove = 1
      await removeProductFromCart(productData, amountProductsToRemove)
    }
  }

  return (
    <>
      <button onClick={handleAddOrRemove}>{buttonType}</button>
    </>
  )
}
