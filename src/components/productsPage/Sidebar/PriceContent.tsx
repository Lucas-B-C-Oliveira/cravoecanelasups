'use client'
import { useRef, useState } from 'react'
import { PriceLabel } from './PriceLabel'
import { SliderPrice } from './SliderPrice'

export function PriceContent() {
  return (
    <div>
      <h2
        className={`
      text-gray-yellow-cc-750 font-medium text-base
      `}
      >
        Preço:
      </h2>

      <SliderPrice />
    </div>
  )
}
