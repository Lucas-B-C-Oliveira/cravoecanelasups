'use client'

import { useRef, useState } from 'react'
import { AddToCart, BuyNow, LearnMore } from './Buttons'
import { SelectVariantOptions } from './SelectVariantOptions'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/utils/lib/axios'
import { queryGetProductsByCollectionHandle } from '@/utils/graphql/querys'
import { ShoppingCartAddToCartButtonIcon } from '../Icons'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Options = {
  name: string
  values: string[]
}

interface Props {
  title: string
  priceValue: string
  currencySymbol: string
  options: Options[]
  productId: string
  productHttpData: any
}

const selectFlavorSchema = z.object({
  flavor: z.string(),
})

type SelectFlavorData = z.infer<typeof selectFlavorSchema>

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

  const selectFlavorForm = useForm<SelectFlavorData>({
    resolver: zodResolver(selectFlavorSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = selectFlavorForm

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

  return (
    <div>
      <FormProvider {...selectFlavorForm}>
        <div
          className={`
        flex flex-col items-start
        w-full gap-y-2.5
      `}
        >
          <h3 className="text-lg text-gray-yellow-cc-850 font-semibold">
            {title}
          </h3>

          {/* {options.length > 0 &&
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
          })} */}

          {options.length > 0 &&
            options.map((option: any) => {
              return (
                <div key={option.name}>
                  <label
                    htmlFor="select"
                    className="text-sm font-semibold text-gray-yellow-cc-700"
                  >
                    {option.name}:
                  </label>
                  <select
                    onChange={() => console.log('eaeeaeeae')}
                    className={`
                    w-full shadow-select-variant-product-options-cc
                    shadow-color-select-variant-product-options-cc rounded-md
                    border-0 px-2.5 py-1 text-sm font-medium text-gray-yellow-cc-700
                    ring-inset focus:ring-2 focus:ring-hard-yellow-cc-500 sm:text-sm ${
                      buttonWasClicked && optionSelected.current === 'Selecione'
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
              <p className="text-lg text-gray-yellow-cc-900 font-bold">
                {price}
              </p>
            )}
          </div>
        </div>
        <div
          className={`
        flex flex-col gap-1.5 grow-0
      
      `}
        >
          <button
            className={`
            rounded-lg 
            flex flex-row flex-nowrap gap-1
            bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500
            text-base font-semibold text-gray-yellow-cc-800
            px-2.5 py-1.5
            items-center      
          `}
            onClick={() => console.log('eae')}
          >
            <ShoppingCartAddToCartButtonIcon />
            Adicionar ao Carrinho
          </button>

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
      </FormProvider>
    </div>
  )
}
