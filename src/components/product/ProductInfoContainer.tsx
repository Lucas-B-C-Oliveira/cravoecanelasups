'use client'

import { ShoppingCartAddToCartButtonIcon } from '../Icons'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductStateFrontEndData,
  Variant,
  usePersistLocalStorage,
} from '@/store/persistLocalStorage'
import { ProductData, Variants } from '@/types'

interface Props {
  productData: ProductData
}

const selectFlavorSchema = z.object({
  flavor: z.string().refine((field) => field !== ''),
})

type SelectFlavorData = z.infer<typeof selectFlavorSchema>

export function ProductInfoContainer({ productData }: Props) {
  const { title, currencySymbol, options, price } = productData
  const { addProduct } = usePersistLocalStorage()

  const priceWithTwoZeros = Number(price).toFixed(2)
  const priceWithComma = priceWithTwoZeros.replace('.', ',')

  const selectFlavorForm = useForm<SelectFlavorData>({
    resolver: zodResolver(selectFlavorSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = selectFlavorForm

  function checkSelect(data: SelectFlavorData) {
    const { variants, ...restProductData } = productData

    if (typeof variants === 'undefined') return

    const variantSelected: Variants | undefined = variants.find(
      (variant: Variants) => variant.selectedOptions[0].value === data?.flavor,
    )

    if (typeof variantSelected === 'undefined') return

    console.log('variantSelected', variantSelected)

    const newVariant: Variant = {
      selectedOption: {
        name: variantSelected.selectedOptions[0].name,
        value: variantSelected.selectedOptions[0].value,
      },
      variantId: variantSelected.id,
    }

    const newProduct: ProductStateFrontEndData = {
      ...restProductData,
      variant: newVariant,
    }

    if (typeof addProduct !== 'undefined') {
      addProduct(newProduct)
    }
  }

  return (
    <FormProvider {...selectFlavorForm}>
      <form
        onSubmit={handleSubmit(checkSelect)}
        className="flex flex-col gap-6 w-full max-w-xs items-center"
      >
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
                    {...register('flavor')}
                    className={`
                    w-full shadow-select-variant-product-options-cc
                    shadow-color-select-variant-product-options-cc rounded-md
                    border-0 px-2.5 py-1 text-sm font-medium text-gray-yellow-cc-700
                    ring-inset sm:text-sm ${
                      errors.flavor
                        ? 'focus:ring-red-500 focus:ring-2 ring-2 ring-red-500'
                        : 'focus:ring-hard-yellow-cc-500'
                    }

                  `}
                    defaultValue={option.name}
                  >
                    <option value="">Selecione</option>

                    {option.values.length > 0 &&
                      option.values.map((optionValue: any) => {
                        return (
                          <option key={optionValue} value={optionValue}>
                            {optionValue}
                          </option>
                        )
                      })}
                  </select>
                </div>
              )
            })}

          <div>
            <p className="text-sm font-semibold text-gray-yellow-cc-700">
              A partir de:
            </p>
            <p className="text-lg text-gray-yellow-cc-900 font-bold">
              {currencySymbol} {priceWithComma}
            </p>
          </div>
        </div>
        <div
          className={`
        flex flex-col gap-1.5 grow-0
      
      `}
        >
          <button
            name="addToCart"
            type="submit"
            disabled={isSubmitting}
            className={`
            rounded-lg 
            flex flex-row flex-nowrap gap-1
            bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500
            text-base font-semibold text-gray-yellow-cc-800
            px-2.5 py-1.5
            items-center      
          `}
          >
            <ShoppingCartAddToCartButtonIcon />
            Adicionar ao Carrinho
          </button>

          {/* <AddToCart
            setButtonWasClicked={setButtonWasClicked}
            productData={productData}
            optionSelected={optionSelected}
          />
          <BuyNow
            setButtonWasClicked={setButtonWasClicked}
            productData={productData}
            optionSelected={optionSelected}
          />
          <LearnMore productData={productHttpData} /> */}
        </div>
      </form>
    </FormProvider>
  )
}
