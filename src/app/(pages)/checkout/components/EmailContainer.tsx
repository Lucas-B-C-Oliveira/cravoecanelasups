'use client'

import { Form } from '@/components/Form'
import { usePersistStore } from '@/store/persistStore'
import useStore from '@/store/useStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { memo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const createUserEmailSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
})

type UserEmailData = z.infer<typeof createUserEmailSchema>

export const EmailContainer = memo(function EmailContainer() {
  const userData = useStore(usePersistStore, (state) => state.userData)
  const { setUserData } = usePersistStore()
  const emailValue = useRef('')

  const createUserEmailForm = useForm<UserEmailData>({
    resolver: zodResolver(createUserEmailSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserEmailForm

  const { isLoading, refetch } = useQuery({
    queryKey: ['userDataByEmail'],
    queryFn: async () => {
      console.log('emailValue.current', emailValue.current)

      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/check-if-customer-exists-by-email?email=${emailValue.current}`,
      )

      const result = await response.json()

      return result
    },
    enabled: false,
    onSuccess: (data) => {
      const existingUser = data.some(
        (element: any) => typeof element.email !== 'undefined',
      )

      console.log('data', data)
      console.log('existingUser', existingUser)
      console.log('existingUser', typeof existingUser)

      const currentData = data[0]

      console.log('emailValue.current', emailValue.current)


      setUserData({
        existingUser,
        email: emailValue.current,
        id: existingUser ? currentData.id : undefined,
      })
    },
  })

  function checkEmail(data: UserEmailData) {
    emailValue.current = data.email
    refetch()
  }

  return (
    <FormProvider {...createUserEmailForm}>
      <form
        onSubmit={handleSubmit(checkEmail)}
        className="flex flex-col gap-6 w-full max-w-xs items-center"
      >
        <Form.Field>
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            defaultValue={userData?.email}
          />
          <Form.ErrorMessage field="email" />
        </Form.Field>
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
          Continuar
          {emailValue.current !== '' && isLoading && <p>Loading</p>}
        </button>
      </form>
    </FormProvider>
  )
})
