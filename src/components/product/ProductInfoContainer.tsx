'use client'

import {
  ArrowCircleRightBuyNowButtonIcon,
  InfoLearnMoreButtonIcon,
  ShoppingCartAddToCartButtonIcon,
} from '../Icons'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductStateFrontEndData,
  Variant,
  usePersistLocalStorage,
} from '@/store/persistLocalStorage'
import { ProductData, Variants } from '@/types'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

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

  function checkSelect(data: SelectFlavorData, event: any) {
    const { variants, ...restProductData } = productData

    console.log('name', event.target.name)

    if (typeof variants === 'undefined') return

    const variantSelected: Variants | undefined = variants.find(
      (variant: Variants) => variant.selectedOptions[0].value === data?.flavor,
    )

    if (typeof variantSelected === 'undefined') return

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

      if (event.target.name === 'buyNow') {
        router.push(`/checkout`)
      }
    }
  }

  function handleLearnMore() {
    router.push(`/product/${productData.handle}`)
  }

  return (
    <FormProvider {...selectFlavorForm}>
      <form
        // onSubmit={handleSubmit(checkSelect)}
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

          <div key={options[0].name}>
            <label
              htmlFor="select"
              className="text-sm font-semibold text-gray-yellow-cc-700"
            >
              {options[0].name}:
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
              defaultValue={options[0].name}
            >
              <option value="">Selecione</option>

              {options[0]?.values.length > 0 &&
                options[0]?.values.map((optionValue: any) => {
                  return (
                    <option key={optionValue} value={optionValue}>
                      {optionValue}
                    </option>
                  )
                })}
            </select>
          </div>

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
            onClick={handleSubmit(checkSelect)}
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

          <button
            name="buyNow"
            onClick={handleSubmit(checkSelect)}
            disabled={isSubmitting}
            className={`
              rounded-lg 
              flex flex-row flex-nowrap gap-1 w-fit h-fit
              bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500
              text-base font-semibold text-gray-yellow-cc-800
              px-2.5 py-1.5
              items-center      
            `}
          >
            <ArrowCircleRightBuyNowButtonIcon />
            Comprar Agora
          </button>

          <button
            className={`
              rounded-lg 
              flex flex-row flex-nowrap gap-1 w-fit h-fit
              bg-white
              shadow-color-button-more-info-shadow-cc
              shadow-button-more-info-cc
              text-sm font-semibold text-gray-yellow-cc-750
              px-2.5 py-1.5
              items-center      
            `}
            onClick={handleLearnMore}
          >
            <InfoLearnMoreButtonIcon />
            Mais Informações
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
