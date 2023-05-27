'use client'
import { useGlobalState } from '@/store/globalStore'
import { memo, useRef } from 'react'

interface Props {
  option: any
}

export const SelectVariantOption = memo(function SelectVariantOption({
  option,
}: Props) {
  const optionSelected = useRef('Selecione')

  const { buttonAddToCartOrBuyWasClicked, setVariantOptionSelected } =
    useGlobalState()

  function handleSelect(event: any) {
    console.log('typeof event', typeof event)
    optionSelected.current = event.target.value
    setVariantOptionSelected({
      name: option.name,
      value: event.target.value,
    })
  }

  return (
    <div>
      <label
        htmlFor="select"
        className="text-sm font-semibold text-gray-yellow-cc-700"
      >
        {option.name}:
      </label>
      <select
        onChange={handleSelect}
        className={`
        w-full shadow-select-variant-product-options-cc
        shadow-color-select-variant-product-options-cc rounded-md
        border-0 px-2.5 py-1 text-sm font-medium text-gray-yellow-cc-700
        ring-inset focus:ring-2 focus:ring-hard-yellow-cc-500 sm:text-sm ${
          buttonAddToCartOrBuyWasClicked &&
          optionSelected.current === 'Selecione'
            ? 'ring-red-500 ring-2'
            : ''
        }
          `}
        defaultValue={option.name}
      >
        <option>Selecione</option>

        {option.values.length > 0 &&
          option.values.map((optionValue: any) => {
            return <option key={optionValue}>{optionValue}</option>
          })}
      </select>
    </div>
  )
})
