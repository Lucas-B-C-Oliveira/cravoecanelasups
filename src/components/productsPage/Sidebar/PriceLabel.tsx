import React, { memo } from 'react'

interface Props {
  textLabel: string
  currencySymbol: string
  price: string
}

export const PriceLabel = memo(function PriceLabel({
  currencySymbol = '$',
  textLabel = 'Min',
  price,
}: Props) {
  return (
    <div
      className={`
        flex flex-col items-center w-[4.5rem] w-max-[4.5rem]
      `}
    >
      <p
        className={`
        text-gray-yellow-cc-800
        font-semibold
        text-xs
        w-full text-center
      `}
      >
        {textLabel}
      </p>
      <p
        className={`
        text-gray-yellow-cc-800
        font-bold
        text-sm
        w-full
      `}
      >
        {currencySymbol}
        {price}
      </p>
    </div>
  )
})
