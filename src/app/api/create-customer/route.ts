import {
  mutationCustomerCreate,
  mutationCustomerUpdateFields,
  mutationGetAuthenticationTokenByEmailAndPassword,
} from '@/utils/graphql/mutations'
import { mutationAdmin } from '@/utils/shopify/adminApi'
import { mutation } from '@/utils/shopify/storefrontApi'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, name, password, phone, cpf } = await req.json()

  const splitName = name.split(' ')
  const firstName = splitName[0]
  const lastName = splitName[1]

  const createUserMutationResult = await mutation(mutationCustomerCreate(), {
    input: {
      acceptsMarketing: false,
      email,
      firstName,
      lastName,
      password,
      phone,
    },
  })

  console.log('createUserMutationResultaaa', createUserMutationResult)
  console.log(
    'createUserMutationResultaaa',
    createUserMutationResult.customerUserErrors,
  )
  console.log(
    'createUserMutationResultaaa',
    createUserMutationResult?.customerCreate?.customer.id,
  )

  const queryResult = await mutation(
    mutationGetAuthenticationTokenByEmailAndPassword(),
    { input: { email, password } },
  )

  const result = {
    message: '',
    authenticated: false,
    accessToken: '',
    expiresAt: 0,
  }

  const { customerAccessTokenCreate } = queryResult

  if (customerAccessTokenCreate?.customerAccessToken) {
    const { accessToken, expiresAt } =
      customerAccessTokenCreate.customerAccessToken
    const tokenExpirationDate = new Date(Date.parse(expiresAt))
    const now = new Date()

    const maxAgeInSeconds = Math.floor(
      (tokenExpirationDate.getTime() - now.getTime()) / 1000,
    )

    result.message = 'Login realizado com sucesso!'
    result.authenticated = true
    result.accessToken = accessToken
    result.expiresAt = maxAgeInSeconds
  } else {
    result.message = 'Senha incorreta'
    result.authenticated = false
  }

  const mutationResultMetafildUpdate = await mutationAdmin(
    mutationCustomerUpdateFields(),
    {
      input: {
        id: createUserMutationResult?.customerCreate?.customer.id,
        metafields: [
          {
            namespace: 'custom',
            key: 'cpf',
            value: cpf,
            type: 'single_line_text_field',
          },
        ],
      },
    },
  )

  console.log('mutationResultMetafildUpdate', mutationResultMetafildUpdate)

  const { id } = mutationResultMetafildUpdate?.customerUpdate?.customer

  return NextResponse.json({ customerId: id, result })
}
