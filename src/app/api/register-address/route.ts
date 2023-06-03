import {
  mutationCustomerAdressCreate,
  mutationCustomerUpdateAdresses,
} from '@/utils/graphql/mutations'
import { mutationAdmin } from '@/utils/shopify/adminApi'
import { mutation } from '@/utils/shopify/storefrontApi'
import { getCookie } from 'cookies-next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const customerAccessToken = getCookie('@ecravoecanela:access_token')
  const dataReceived = await req.json()

  const {
    cep,
    street,
    number,
    district,
    city,
    stateCode,
    complement,
    recipient,
    phone,
  } = dataReceived

  const complemento = complement === '' ? '.' : `, complemento ${complement}.`

  const address1 = `Rua ${street}, número ${number}, bairro ${district}${complemento}`

  const splitName = recipient.split(' ')
  const firstName = splitName[0]
  const lastName = splitName[1]

  try {
    // const response = await mutationAdmin(mutationCustomerUpdateAdresses(), {
    const response = await mutation(mutationCustomerAdressCreate(), {
      input: {
        customerAccessToken,
        addresses: {
          address1,
          city,
          country: 'Brazil',
          firstName,
          lastName,
          company: '',
          phone,
          province: stateCode,
          zip: cep,
          address2: '',
        },
      },
    })

    console.log('response', response)
    console.log('response', response.customerUpdate.customer)

    return NextResponse.json({
      createAdressId: response?.customerAddressCreate.customerAddress?.id,
    })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({
      error,
    })
  }
}
