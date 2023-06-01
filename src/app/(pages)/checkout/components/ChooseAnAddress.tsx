'use client'

import { Form } from '@/components/Form'
import { usePersistStore } from '@/store/persistStore'
import useStore from '@/store/useStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { memo, useRef } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'

const shippingSchema = z.object({
  chosenAddress: z.string(), // z.object({
  //   address1: z.string(),
  //   address2: z.string(),
  //   city: z.string(),
  //   country: z.string(),
  //   id: z.string(),
  //   name: z.string(),
  //   phone: z.string(),
  //   provinceCode: z.string(),
  //   zip: z.string(),
  // }),
})

type ShippingData = z.infer<typeof shippingSchema>

export const ChooseAnAddress = memo(function ChooseAnAddress() {
  const userData = useStore(usePersistStore, (state) => state.userData)
  const { setUserData } = usePersistStore()
  const emailValue = useRef('')

  const shippingForm = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = shippingForm

  const addressIdChosen = watch('chosenAddress')

  // const { fields, insert } = useFieldArray({
  //   control,
  //   name: 'addresses',
  // })

  // if (userData?.addresses?.length > 0 && fields?.length === 0) {
  //   userData?.addresses?.forEach((address: any, index: number) => {
  //     insert(index, address)
  //   })
  // }

  const { isLoading, refetch } = useQuery({
    queryKey: ['userDataByEmail'],
    queryFn: async () => {
      console.log('eae')

      // const response = await fetch(
      //   (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
      //     process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
      //     `/check-if-customer-exists-by-email?email=${emailValue.current}`,
      // )

      // const result = await response.json()

      // return result
      return 'eae'
    },
    enabled: typeof addressIdChosen !== 'undefined' && addressIdChosen !== '',
    onSuccess: (data) => {
      // const existingUser = data.some(
      //   (element: any) => typeof element.email !== 'undefined',
      // )
      // console.log('data', data)
      // console.log('existingUser', existingUser)
      // console.log('existingUser', typeof existingUser)
      // const currentData = data[0]
      // console.log('emailValue.current', emailValue.current)
      // setUserData({
      //   existingUser,
      //   email: emailValue.current,
      //   id: existingUser ? currentData.id : undefined,
      // })
    },
  })

  function checkEmail(data: ShippingData) {
    console.log('data', data)
  }

  return (
    <FormProvider {...shippingForm}>
      <form
        onSubmit={handleSubmit(checkEmail)}
        className="flex flex-col gap-3.5 w-full max-w-xs items-center"
      >
        <div className="flex flex-col gap-3.5">
          <h2 className="text-gray-yellow-cc-900 font-medium text-lg">
            Endereço para entrega
          </h2>
          <div className="flex flex-col gap-6 w-full max-w-xs items-center">
            {userData?.addresses.length > 0 &&
              userData?.addresses.map((address: any) => {
                return (
                  <Form.Field
                    key={address.id}
                    as="label"
                    className="items-center flex flex-row flex-wrap w-72 w-max-72 h-min-[4.5rem] h-fit bg-white rounded-xl p-3  shadow-color-slider-price-thumb-cc shadow-select-variant-product-options-cc"
                  >
                    <div className="items-center flex flex-row h-full w-full gap-3">
                      <Form.Input
                        id={address?.id}
                        type="radio"
                        name={'chosenAddress'}
                        value={address?.id}
                        placeholder="Digite seu e-mail"
                        className="checked:bg-gradient-radial w-5 h-5 bg-gray-yellow-cc-800 "
                      />
                      <Form.Label
                        className="font-semibold text-gray-yellow-cc-850 text-sm h-full w-full break-words whitespace-normal truncate "
                        htmlFor={address?.id}
                      >
                        {address.address1} {address.city} -{' '}
                        {address.provinceCode} {address.name} {address.zip}
                      </Form.Label>
                    </div>
                    <Form.ErrorMessage field={'chosenAddress'} />
                  </Form.Field>
                )
              })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
                font-semibold text-gray-yellow-cc-800 text-lg px-6 py-3 bg-white w-fit h-fit rounded-lg
                hover:bg-yellow-50
                shadow-inputs-checkouts-cc
                shadow-color-inputs-checkout-cc
              `}
        >
          Ir para o pagamento
          {emailValue.current !== '' && isLoading && <p>Loading</p>}
        </button>
      </form>
    </FormProvider>
  )
})
