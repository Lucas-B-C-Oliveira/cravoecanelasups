'use client'

import { DatePickerInput } from './DatePickerInput'
import { Form } from '@/components/Form'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePersistStore } from '@/store/persistStore'
import { memo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import useStore from '@/store/useStore'
import { setCookie } from 'cookies-next'

function setAccessTokenToCookie(accessToken: string, maxAgeInSeconds: number) {
  setCookie('@ecravoecanela:access_token', accessToken, {
    maxAge: maxAgeInSeconds, // expira em 30 dias
    path: '/',
    // sameSite: 'lax',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

const createUserSchema = z
  .object({
    name: z
      .string()
      .nonempty({
        message: 'O nome é obrigatório',
      })
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      }),
    email: z
      .string()
      .nonempty({
        message: 'O e-mail é obrigatório',
      })
      .email({
        message: 'Formato de e-mail inválido',
      })
      .toLowerCase(),
    cpf: z.string().refine((value) => value.length !== 10, {
      message: 'Digite um CPF válido',
    }),
    birthDate: z.string(),
    phone: z
      .string()
      .refine((value) => value.length !== 10, {
        message: 'Digite um número válido',
      })
      .transform((number) => {
        return '+55' + number
      }),
    password: z
      .string()
      .nonempty({
        message: 'A senha é obrigatória',
      })
      .min(6, {
        message: 'A senha precisa ter no mínimo 6 caracteres',
      }),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: 'As senhas precisam ser iguais',
  })

type CreateUserData = z.infer<typeof createUserSchema>

export const Register = memo(function Register() {
  const userData = useStore(usePersistStore, (state) => state.userData)
  const { setUserData } = usePersistStore()

  const formData = useRef<CreateUserData | undefined>(undefined)
  const {
    // isLoading: isLoadingRegisterNewUser,
    refetch: refetchRegisterNewUser,
    // data: dataRegisterNewUser,
  } = useQuery({
    queryKey: ['registerNewUser'],
    queryFn: async () => {
      if (typeof formData.current === 'undefined') return

      console.log('Antes de enviar pra API', formData.current)

      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/create-customer`,
        {
          method: 'POST',
          body: JSON.stringify(formData.current),
        },
      )

      const result = await response.json()
      console.log('Depois da API result', result)
      return result
    },
    enabled: false,
    onSuccess: (data: any) => {
      if (data.result.authenticated) {
        setAccessTokenToCookie(data.result.accessToken, data.result.expiresAt)
      }
      setUserData({
        ...formData.current,
        id: data?.customerId,
      })
    },
  })

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = createUserForm

  const userPassword = watch('password')
  const isPasswordStrong =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
      userPassword,
    )

  function createUser(data: CreateUserData) {
    formData.current = data
    setUserData({ ...data, id: undefined })
    refetchRegisterNewUser()
  }

  return (
    <FormProvider {...createUserForm}>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-6 w-full max-w-xs items-center"
      >
        <Form.Field>
          <Form.Label htmlFor="name">Nome e Sobrenome</Form.Label>
          <Form.Input
            type="name"
            name="name"
            placeholder="Digite seu nome"
            defaultValue={userData?.name}
          />
          <Form.ErrorMessage field="name" />
        </Form.Field>

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
          <Form.Label htmlFor="cpf">CPF</Form.Label>

          <Form.Input
            type="number"
            name="cpf"
            placeholder="Digite seu CPF"
            defaultValue={userData?.cpf}
          />
          <Form.ErrorMessage field="cpf" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="birthDate">Data de Nascimento</Form.Label>
          <DatePickerInput
            name="birthDate"
            placeholder="Selecione sua data de nascimento"
            defaultValue={userData?.birthDate}
          />
          <Form.ErrorMessage field="birthDate" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="phone">WhatsApp ou Celular</Form.Label>
          <Form.Input
            type="number"
            name="phone"
            placeholder="DDD + Número"
            defaultValue={userData?.phone}
          />
          <Form.ErrorMessage field="phone" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="password">
            Senha
            {isPasswordStrong ? (
              <span className="text-xs text-emerald-600">Senha forte</span>
            ) : (
              <span className="text-xs text-red-500">Senha fraca</span>
            )}
          </Form.Label>
          <Form.Input
            type="password"
            name="password"
            placeholder="Digite uma senha"
          />
          <Form.ErrorMessage field="password" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="confirmPassword">
            Confirmação de senha
          </Form.Label>
          <Form.Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
          />
          <Form.ErrorMessage field="confirmPassword" />
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
          Ir para Entrega
        </button>
      </form>
    </FormProvider>
  )
})
