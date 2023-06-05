import * as Slider from '@radix-ui/react-slider'
import { memo, useState } from 'react'
import { PriceLabel } from './PriceLabel'
import { Minus } from '@/components/Icons'
import { Plus } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'

interface Props {
  priceSaved: {
    min: number
    max: number
  }
}

export const SliderPrice = memo(function SliderPrice({ priceSaved }: Props) {
  const { max: propsPriceMax, min: propsPricemin } = priceSaved

  const defaultPriceMaxString = propsPriceMax.toFixed(2).replace('.', ',')
  const defaultPriceMinString = propsPricemin.toFixed(2).replace('.', ',')

  const [minPrice, setMinPrice] = useState(defaultPriceMinString)
  const [maxPrice, setMaxPrice] = useState(defaultPriceMaxString)
  const { register, setValue } = useFormContext()

  const defaultPriceMax = propsPriceMax
  const defaultPriceMin = propsPricemin

  setValue('price', {
    min: Number(minPrice.replace(',', '.')),
    max: Number(maxPrice.replace(',', '.')),
  })

  function handleSlider(values: number[]) {
    if (values.length > 0) {
      const newPrices = values.map((price: number) =>
        price.toFixed(2).replace('.', ','),
      )

      if (minPrice !== newPrices[0]) setMinPrice(newPrices[0])
      if (maxPrice !== newPrices[1]) setMaxPrice(newPrices[1])

      setValue('price', {
        min: values[0],
        max: values[1],
      })
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div
        className={`
          flex flex-row px-6 w-full justify-between 
        `}
      >
        <PriceLabel currencySymbol="R$" price={minPrice} textLabel="Min" />
        <PriceLabel currencySymbol="R$" price={maxPrice} textLabel="Max" />
      </div>

      <Slider.Root
        onValueChange={handleSlider}
        {...register('price')}
        className="SliderRoot relative flex items-center select-none touch-none w-full h-fit"
        defaultValue={[defaultPriceMin, defaultPriceMax]}
        max={1000}
        step={1}
        aria-label="Volume"
      >
        <Slider.Track className="SliderTrack bg-gray-yellow-cc-550 relative flex-grow rounded-full h-2.5">
          <Slider.Range className="SliderRange absolute bg-hard-yellow-cc-500 rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb
          className={`
          focus:border-none
          SliderThumb shadow-color-slider-price-thumb-cc shadow-slider-price-thumb-cc
          block w-5 h-5 bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500 to-40%
          rounded-2xl
          `}
        >
          <div
            className={`
          flex flex-row items-center w-full h-full justify-center
          `}
          >
            <Minus />
          </div>
        </Slider.Thumb>

        <Slider.Thumb
          className={`
          focus:border-none
          SliderThumb shadow-color-slider-price-thumb-cc shadow-slider-price-thumb-cc
          block w-5 h-5 bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500 to-40%
          rounded-2xl
          `}
        >
          <div
            className={`
          flex flex-row items-center w-full h-full justify-center
          `}
          >
            <Plus />
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  )
})
