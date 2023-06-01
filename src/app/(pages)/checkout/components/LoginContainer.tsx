'use client'

import { useQuery } from '@tanstack/react-query'
import { memo, useRef } from 'react'
import { setCookie } from 'cookies-next'
import { usePersistStore } from '@/store/persistStore'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/Form'
import useStore from '@/store/useStore'

function setAccessTokenToCookie(accessToken: string, maxAgeInSeconds: number) {
  setCookie('@ecravoecanela:access_token', accessToken, {
    maxAge: maxAgeInSeconds, // expira em 30 dias
    path: '/',
    // sameSite: 'lax',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

const createUserLoginSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
  password: z
    .string()
    .nonempty({
      message: 'A senha é obrigatória',
    })
    .min(6, {
      message: 'A senha precisa ter no mínimo 6 caracteres',
    }),
})

type UserLoginData = z.infer<typeof createUserLoginSchema>

export const Login = memo(function Login() {
  const userData = useStore(usePersistStore, (state) => state.userData)
  const { setUserData } = usePersistStore()
  const userLoginData = useRef<undefined | UserLoginData>(undefined)

  const {
    refetch: getAllUserDataToCheckoutRefetch,
    isLoading: isLoadingAllUserData,
    data: allUserData,
  } = useQuery({
    queryKey: ['get-delivery-address-in-login-checkout'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/get-delivery-address`,
      )
      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data) => {
      console.log('data do Login', data)
      setUserData({
        addresses: data.addresses.nodes,
        defaultAddress: data.defaultAddress,
        name: data.displayName,
        id: data.id,
      })
    },
  })

  const { isLoading: isLoadingLogin, refetch: refetchLogin } = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) + `/sign-in`,
        {
          method: 'POST',
          body: JSON.stringify(userLoginData?.current),
        },
      )
      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data) => {
      if (data.authenticated) {
        setAccessTokenToCookie(data.accessToken, data.expiresAt)
        getAllUserDataToCheckoutRefetch()
      }
    },
  })

  const loginUserForm = useForm<UserLoginData>({
    resolver: zodResolver(createUserLoginSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginUserForm

  function login(data: UserLoginData) {
    userLoginData.current = data
    refetchLogin()
  }

  return (
    <FormProvider {...loginUserForm}>
      <form
        onSubmit={handleSubmit(login)}
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

        <Form.Field>
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Input
            type="password"
            name="password"
            placeholder="Digite uma senha"
          />
          <Form.ErrorMessage field="password" />
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
          Login
          {typeof allUserData === 'undefined' &&
            isLoadingLogin &&
            isLoadingAllUserData && <p>Loading</p>}
        </button>
      </form>
    </FormProvider>
  )
})
