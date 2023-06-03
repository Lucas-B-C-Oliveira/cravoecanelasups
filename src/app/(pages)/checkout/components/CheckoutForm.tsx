'use client'

import { Form } from '@/components/Form'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePersistLocalStorage } from '@/store/persistLocalStorage'
import useStore from '@/store/useStore'
import { useRouter } from 'next/navigation'

const createAddressSchema = z.object({
  cep: z.string().refine((value) => value.length !== 7, {
    message: 'Digite um CEP válido',
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
  street: z.string().nonempty({
    message: 'O rua é obrigatório',
  }),
  number: z.string().nonempty({
    message: 'O número é obrigatório',
  }),
  district: z.string().nonempty({
    message: 'O bairro é obrigatório',
  }),
  city: z.string().nonempty({
    message: 'A cidade é obrigatória',
  }),
  stateCode: z
    .string()
    .nonempty({
      message: 'A UF é obrigatória',
    })
    .refine((value) => value.length !== 1, {
      message: 'Digite uma UF válida',
    }),
  complement: z.string(),
  recipient: z
    .string()
    .nonempty({
      message: 'O destinatário é obrigatório',
    })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
})

export type ShippingAddressData = z.infer<typeof createAddressSchema>

export const CheckoutForm = memo(function CheckoutForm() {
  const shippingAddressData = useRef<ShippingAddressData | undefined>(undefined)
  const cartData = useStore(usePersistLocalStorage, (state) => state.cartData)
  const router = useRouter()

  const {
    refetch: createCheckout,
    // isLoading: isLoadingCreateCheckout,
    // data: createCheckoutData,
  } = useQuery({
    queryKey: ['create-checkout'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/create-checkout`,
        {
          method: 'POST',
          body: JSON.stringify({
            shippingAddressData: shippingAddressData.current,
            cartData,
          }),
        },
      )
      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data: any) => {
      router.push(data.webUrl)
    },
  })

  const createAddressForm = useForm<ShippingAddressData>({
    resolver: zodResolver(createAddressSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createAddressForm

  function createAddress(data: ShippingAddressData) {
    shippingAddressData.current = data

    createCheckout()
  }

  return (
    <div className="flex flex-col gap-3.5">
      <h2 className="text-gray-yellow-cc-900 text-lg font-medium">
        Endereço de Entrega
      </h2>
      <FormProvider {...createAddressForm}>
        <form
          onSubmit={handleSubmit(createAddress)}
          className="flex flex-col gap-6 w-full max-w-xs items-center"
        >
          <div className="flex flex-col gap-3 w-full max-w-xs items-center">
            <Form.Field>
              <Form.Label htmlFor="email">E-mail</Form.Label>
              <Form.Input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
              />
              <Form.ErrorMessage field="email" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="recipient">Nome do Destinatário</Form.Label>
              <Form.Input
                type="text"
                name="recipient"
                placeholder="Digite o nome do destinatário(a)"
              />
              <Form.ErrorMessage field="recipient" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="cep">CEP</Form.Label>
              <Form.Input
                type="text"
                name="cep"
                placeholder="Digite apenas os números do CEP"
              />
              <Form.ErrorMessage field="cep" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="street">Rua</Form.Label>
              <Form.Input
                type="text"
                name="street"
                placeholder="Digite o nome da rua"
              />
              <Form.ErrorMessage field="street" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="number">Número</Form.Label>
              <Form.Input
                type="text"
                name="number"
                placeholder="Digite o número do endereço"
              />
              <Form.ErrorMessage field="number" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="district">Bairro</Form.Label>
              <Form.Input
                type="text"
                name="district"
                placeholder="Digite o nome do bairro"
              />
              <Form.ErrorMessage field="district" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="city">Cidade</Form.Label>
              <Form.Input
                type="text"
                name="city"
                placeholder="Digite o nome da cidade"
              />
              <Form.ErrorMessage field="city" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="stateCode">UF</Form.Label>
              <Form.Input
                type="text"
                name="stateCode"
                placeholder="Digite a sigla da UF (Estado)"
              />
              <Form.ErrorMessage field="stateCode" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="complement">Complemento</Form.Label>
              <Form.Input
                type="text"
                name="complement"
                placeholder="APTO + Bloco"
              />
              <Form.ErrorMessage field="complement" />
            </Form.Field>
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
            Continuar
          </button>
        </form>
      </FormProvider>
    </div>
  )
})
