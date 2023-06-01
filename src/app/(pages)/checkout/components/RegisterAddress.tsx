'use client'

import { Form } from '@/components/Form'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePersistStore } from '@/store/persistStore'
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import useStore from '@/store/useStore'

const createAddressSchema = z.object({
  cep: z.string().refine((value) => value.length !== 7, {
    message: 'Digite um CEP válido',
  }),
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

type CreateAddressData = z.infer<typeof createAddressSchema>

export const RegisterAddress = memo(function Register() {
  const userData = useStore(usePersistStore, (state) => state.userData)
  const { setUserData } = usePersistStore()

  const { refetch: getAllAddresses, isLoading: isLoadingAllUserData } =
    useQuery({
      queryKey: ['get-delivery-addresses-in-register-address-checkout'],
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
      onSuccess: (data: any) => {
        setUserData({
          addresses: data.addresses.nodes,
          defaultAddress: data.defaultAddress,
          name: data.displayName,
          id: data.id,
        })
      },
    })

  const {
    // isLoading: isLoadingRegisterNewUser,
    refetch: refetchRegisterNewUser,
    // data: dataRegisterNewUser,
  } = useQuery({
    queryKey: ['registerAddress'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/register-address`,
        {
          method: 'POST',
          body: JSON.stringify(userData),
        },
      )

      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data: any) => {
      getAllAddresses()
    },
  })

  const createAddressForm = useForm<CreateAddressData>({
    resolver: zodResolver(createAddressSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createAddressForm

  function createAddress(data: CreateAddressData) {
    setUserData(data)
    refetchRegisterNewUser()
  }

  return (
    <div className="flex flex-col gap-3.5">
      <h2 className="text-gray-yellow-cc-900 text-lg font-medium">
        Cadastrar Endereço
      </h2>
      <FormProvider {...createAddressForm}>
        <form
          onSubmit={handleSubmit(createAddress)}
          className="flex flex-col gap-6 w-full max-w-xs items-center"
        >
          <Form.Field>
            <Form.Label htmlFor="cep">CEP</Form.Label>
            <Form.Input
              type="text"
              name="cep"
              placeholder="Digite apenas os números do CEP"
              defaultValue={userData?.cep}
            />
            <Form.ErrorMessage field="cep" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="street">Rua</Form.Label>
            <Form.Input
              type="text"
              name="street"
              placeholder="Digite o nome da Rua"
              defaultValue={userData?.street}
            />
            <Form.ErrorMessage field="street" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="number">Número</Form.Label>
            <Form.Input
              type="text"
              name="number"
              placeholder="Digite o número do local de entrega"
              defaultValue={userData?.number}
            />
            <Form.ErrorMessage field="number" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="district">Bairro</Form.Label>
            <Form.Input
              type="text"
              name="district"
              placeholder="Digite o nome do Bairro"
              defaultValue={userData?.district}
            />
            <Form.ErrorMessage field="district" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="city">Cidade</Form.Label>
            <Form.Input
              type="text"
              name="city"
              placeholder="Digite a cidade"
              defaultValue={userData?.city}
            />
            <Form.ErrorMessage field="city" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="stateCode">UF</Form.Label>
            <Form.Input
              type="text"
              name="stateCode"
              placeholder="Digite a sigla da UF (Estado)"
              defaultValue={userData?.stateCode}
            />
            <Form.ErrorMessage field="stateCode" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="complement">Complemento</Form.Label>
            <Form.Input
              type="text"
              name="complement"
              placeholder="APTO + Bloco"
              defaultValue={userData?.complement}
            />
            <Form.ErrorMessage field="complement" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="recipient">Nome do Destinatário</Form.Label>
            <Form.Input
              type="text"
              name="recipient"
              placeholder="Digite o nome do Destinatário"
              defaultValue={userData?.recipient}
            />
            <Form.ErrorMessage field="recipient" />
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
            Cadastrar Endereço
          </button>
        </form>
      </FormProvider>
    </div>
  )
})
