'use client'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { CategoryCheckbox } from './CategoryCheckbox'
import { PriceContent } from './PriceContent'
import { SearchContent } from './SearchContent'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/Form'

type CheckBoxFilters = {
  productType?: string[]
  price?: {
    min: string
    max: string
  }
}

const createFilterSchema = z.object({
  productType: z.array(z.string()).nullish(),
  price: z.object({
    min: z.string(),
    max: z.string(),
  }),
})

type FilterData = z.infer<typeof createFilterSchema>

const categoriesMock = [
  {
    categoryLabel: 'Top 20',
    filterValue: 'top-20',
  },
  {
    categoryLabel: 'Whey Protein',
    filterValue: 'whey-protein',
  },

  {
    categoryLabel: 'Creatina',
    filterValue: 'creatina',
  },

  {
    categoryLabel: 'Proteína',
    filterValue: 'proteína',
  },

  {
    categoryLabel: 'Omega 3',
    filterValue: 'omega3',
  },

  {
    categoryLabel: 'Hipercalórico',
    filterValue: 'hipercalórico',
  },
]

export function SidebarClientContainer() {
  const filterDataForm = useForm<FilterData>({
    resolver: zodResolver(createFilterSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = filterDataForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productType',
  })

  function sendFilters(data: FilterData) {}

  function checkBoxHandler(event: any) {
    const checkBoxValue = event.target.checked
    const idNumber = Number(event.target.id)

    const filterValue = categoriesMock[idNumber].filterValue

    if (checkBoxValue) {
      append({ filterValue })
    } else {
      console.log('fields', fields)
      console.log('fields', fields)

      const indexToRemove = fields.findIndex(
        (obj) => obj?.filterValue === filterValue,
      )
      console.log('indexToRemove', indexToRemove)
      remove(indexToRemove)
    }
  }

  return (
    <FormProvider {...filterDataForm}>
      <form
        onSubmit={handleSubmit(sendFilters)}
        className="flex flex-col gap-6 w-full max-w-xs items-center"
      >
        <SearchContent />

        <PriceContent />

        <div
          className={`
      flex flex-col w-full gap-y-2
      
      `}
        >
          <h2
            className={`
        text-base text-gray-yellow-cc-750 font-medium
        `}
          >
            Categorias
          </h2>
          <div
            className={`
        flex flex-col gap-y-1
      `}
          >
            {categoriesMock.length > 0 &&
              categoriesMock.map((category: any, index: number) => {
                return (
                  <>
                    <Form.Field key={category.categoryLabel}>
                      <Form.Label htmlFor={category.categoryLabel}>
                        {category.categoryLabel}
                      </Form.Label>
                      <Form.Input
                        id={`${index}`}
                        onClick={checkBoxHandler}
                        type="checkbox"
                        name={category.categoryLabel}
                      />
                    </Form.Field>

                    {/* <CategoryCheckbox
                      key={category.categoryLabel}
                      textLabel={category.categoryLabel}
                    /> */}
                  </>
                )
              })}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
