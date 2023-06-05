'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  children: ReactElement
}

const createFilterSchema = z.object({
  productType: z.array(z.string()).nullish(),
  price: z.object({
    min: z.number(),
    max: z.number(),
  }),
})

type FilterData = z.infer<typeof createFilterSchema>

export function SidebarProvider({ children }: Props) {
  const filterDataForm = useForm<FilterData>({
    resolver: zodResolver(createFilterSchema),
  })

  return <FormProvider {...filterDataForm}>{children}</FormProvider>
}
