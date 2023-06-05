'use client'
import { useFormContext } from 'react-hook-form'
import { Form } from '@/components/Form'
import { memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SliderPrice } from './SliderPrice'

interface Props {
  checkBoxFiltersSaved: { categoryLabel: string; filterValue: string }[]
  priceSaved: {
    min: number
    max: number
  }
}

export const SidebarClientContainer = memo(function SidebarClientContainer({
  checkBoxFiltersSaved,
  priceSaved,
}: Props) {
  const router = useRouter()
  const { getValues } = useFormContext()

  const [searchContent, setSearchContent] = useState('')

  function handleSendFilters() {
    const { price, ...rest } = getValues()

    const priceValuesArray = Object.values(price)

    let priceFiltersUrl = ''
    let priceFiltersContent = ''
    priceValuesArray.forEach((element) => {
      priceFiltersUrl = priceFiltersUrl + '/' + `${element}`
      priceFiltersContent = priceFiltersContent + ' ' + `${element}`
    })

    const checkboxFormData = Object.entries(rest)

    let checkboxFiltersUrl = ''
    let checkboxFiltersContent = ''

    checkboxFormData.forEach((element: any) => {
      const isChecked = element[1]

      if (isChecked) {
        const filterValue = element[0]
        checkboxFiltersUrl = checkboxFiltersUrl + '/' + filterValue
        checkboxFiltersContent = checkboxFiltersContent + ' ' + filterValue
      }
    })

    // setSearchContent(`${checkboxFiltersContent} ${priceFiltersContent}`)

    router.push(`/products${priceFiltersUrl}/${checkboxFiltersUrl}`)
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-xs items-center">
      <div className=" w-full">
        {/* <h2
          className={`
            text-gray-yellow-cc-850
            font-semibold
            text-base
          `}
        >
          Conteúdo da Busca:
        </h2>
        <p
          className={`
              text-gray-yellow-cc-800
              font-regular
              text-base
            `}
        >
          {searchContent}
        </p> */}
        <button
          type="button"
          onClick={handleSendFilters}
          className={`
              group whitespace-nowrap  text-base px-2.5 py-1.5
              flex flex-row  gap-1.5  active:text-hard-yellow-cc-500 hover:text-hard-yellow-cc-500
              text-gray-yellow-cc-800 font-semibold items-center
              bg-gradient-to-t from-gradient-yellow-cc-600 from-10% to-gradient-yellow-cc-500 to-90% rounded-lg
            `}
        >
          Buscar Produtos
          {/* {icon &&
          cloneElement(icon, {
            className:
              'stroke-yellow-cc-200 w-5 h-5 group-hover:stroke-hard-yellow-cc-500 group-active:stroke-hard-yellow-cc-500',
          })} */}
        </button>
      </div>

      <div className="w-full">
        <h2
          className={`
      text-gray-yellow-cc-750 font-medium text-base
      `}
        >
          Preço:
        </h2>

        <SliderPrice priceSaved={priceSaved} />
      </div>

      <div className={`flex flex-col w-full gap-y-2`}>
        <h2 className={`text-base text-gray-yellow-cc-750 font-medium`}>
          Categorias
        </h2>
        <div className={`flex flex-col gap-y-3`}>
          {checkBoxFiltersSaved.length > 0 &&
            checkBoxFiltersSaved.map((category: any, index: number) => {
              return (
                <Form.Field
                  key={category.filterValue}
                  className="flex flex-row gap-3"
                >
                  <Form.Input
                    className={`
                      rounded-md bg-white text-gray-yellow-cc-750 w-6 h-6
                      shadow-inputs-checkouts-cc shadow-color-inputs-checkout-cc
                      focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
                      outline-none border-0
                    `}
                    id={`${index}`}
                    defaultChecked={category.checked}
                    type="checkbox"
                    name={category.filterValue}
                  />
                  <Form.Label htmlFor={category.filterValue}>
                    {category.categoryLabel}
                  </Form.Label>
                </Form.Field>
              )
            })}
        </div>
      </div>
    </div>
  )
})
