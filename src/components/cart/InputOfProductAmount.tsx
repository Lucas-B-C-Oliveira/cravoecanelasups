'use client'

import { useGlobalStore } from '@/store/store'
import { type ProductsToBeOrdered } from '@/types'
import { ChangeEvent } from 'react'

interface Props {
  productData: ProductsToBeOrdered
}

export function InputOfProductAmount({ productData }: Props) {
  const productDataAmount = Number(productData.amount)

  const addProductToCart = useGlobalStore((state) => state.addProductToCart)

  const removeProductFromCart = useGlobalStore(
    (state) => state.removeProductFromCart,
  )

  async function addOrRemoveProductsByInput(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const numberValue = Number(event.target.value)
    if (numberValue < productDataAmount) {
      if (numberValue < 1) {
        await removeProductFromCart(productData)
      } else {
        await removeProductFromCart(productData, numberValue)
      }
    } else if (numberValue > productDataAmount) {
      await addProductToCart(productData, numberValue)
    }
  }

  function updateInputValue(event: ChangeEvent<HTMLInputElement>) {
    // setInputValue(Number(event.target.value))
  }

  return (
    <>
      <input
        onChange={updateInputValue}
        onBlur={addOrRemoveProductsByInput}
        value={productDataAmount}
        type="number"
      />
    </>
  )
}
