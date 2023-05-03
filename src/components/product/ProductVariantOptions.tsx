'use client'

import { useGlobalStore } from '@/store/store'
import { ChangeEvent } from 'react'

export function ProductVariantOptions() {
  const wasPressed = useGlobalStore((state) =>
    state.getButtonAddToCartWasPressed(),
  )
  const setOption = useGlobalStore((state) => state.setProductOption)
  const productionOption = useGlobalStore((state) => state.productOption)

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault()
    setOption(event.target.value)
  }

  return (
    <>
      {wasPressed && productionOption === '' ? (
        <select
          value={productionOption}
          onChange={handleChange}
          style={{ backgroundColor: '#ff040440' }}
        >
          <option value="">Escolha um Sabor</option>
          <option value="Banana">Sabor Banana</option>
          <option value="Abacate">Sabor Abacate</option>
          <option value="Jurubeba">Sabor Jurubeba</option>
        </select>
      ) : (
        <select
          value={productionOption}
          onChange={handleChange}
          style={{ backgroundColor: '#8fc70b40' }}
        >
          <option value="">Escolha um Sabor</option>
          <option value="Banana">Sabor Banana</option>
          <option value="Abacate">Sabor Abacate</option>
          <option value="Jurubeba">Sabor Jurubeba</option>
        </select>
      )}
    </>
  )
}
