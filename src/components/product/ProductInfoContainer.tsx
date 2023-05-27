'use client'

import { useRef, useState } from 'react'
import { AddToCart, BuyNow, LearnMore } from './Buttons'
import { SelectVariantOptions } from './SelectVariantOptions'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/utils/lib/axios'
import { queryGetProductsByCollectionHandle } from '@/utils/graphql/querys'

interface Props {
  title: string
  priceValue: string
  currencySymbol: string
  options: any[]
  productId: string
  productHttpData: any
}

export function ProductInfoContainer({
  currencySymbol,
  options,
  priceValue,
  title,
  productId,
  productHttpData,
}: Props) {
  const [buttonWasClicked, setButtonWasClicked] = useState(false)
  const [price, setPrice] = useState(priceValue)
  const [queryData, setQueryData] = useState(priceValue)
  const [productData, setProductData] = useState(undefined)

  const [optionSelected, setOptionSelected] = useState(
    options.map((option: any) => {
      return {
        name: option.name,
        currentValue: 'Selecione',
      }
    }),
  )

  const { data, isLoading } = useQuery(
    ['todo'],
    async () => {
      const response = await api.post('/graphql.json', {
        query: queryGetProductsByCollectionHandle('mais-vendidos'),
      })

      return response.data
    },
    {
      enabled: price === 'loading',
    },
  )

  console.log('optionSelected', optionSelected)
  console.log('productId', productId)

  return (
    <div>
      <div
        className={`
        flex flex-col items-start
        w-full gap-y-2.5
      `}
      >
        <h3 className="text-lg text-gray-yellow-cc-850 font-semibold">
          {title}
        </h3>

        {options.length > 0 &&
          options.map((option: any) => {
            return (
              <SelectVariantOptions
                key={option.name}
                option={option}
                setProductData={setProductData}
                buttonWasClicked={buttonWasClicked}
                productId={productId}
                setOptionSelected={setOptionSelected}
                options={optionSelected}
                setQueryData={setQueryData}
              />
            )
          })}

        <div>
          <p className="text-sm font-semibold text-gray-yellow-cc-700">
            A partir de:
          </p>
          {price !== 'loading' && (
            <p className="text-lg text-gray-yellow-cc-900 font-bold">
              {currencySymbol} {price}
            </p>
          )}
          {price === 'loading' && (
            <p className="text-lg text-gray-yellow-cc-900 font-bold">{price}</p>
          )}
        </div>
      </div>
      <div
        className={`
      flex flex-col gap-1.5 grow-0
      
      `}
      >
        <AddToCart
          setButtonWasClicked={setButtonWasClicked}
          productData={productData}
          optionSelected={optionSelected}
        />
        <BuyNow
          setButtonWasClicked={setButtonWasClicked}
          productData={productData}
          optionSelected={optionSelected}
        />
        <LearnMore productData={productHttpData} />
      </div>
    </div>
  )
}
