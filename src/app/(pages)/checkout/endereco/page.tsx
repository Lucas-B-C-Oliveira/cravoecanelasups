// import AddressPage from './AddressPage'
import { cookies } from 'next/headers'
import { env } from '@/utils/env'
import { redirect } from 'next/navigation'
import { AddressPage } from './AddressPage'
import { AddressPageProps } from '@/types'

async function getDeliveryAddress(accessTokenObject: {
  name: string
  value: string
}) {
  const response = await fetch(
    `${env.APPLICATION_PATH}${env.APPLICATION_API_PATH}/get-delivery-address`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Cookie: `${accessTokenObject?.name}=${accessTokenObject?.value}`,
      },
    },
  )

  const responseJson = await response.json()
  const { defaultAddress, email } = responseJson
  return { addresses: [defaultAddress], email }
}

async function createCheckout(
  currentOrder: string,
  customerEmail: string,
  deliveryAddress: any,
  accessTokenObject: {
    name: string
    value: string
  },
) {
  const response = await fetch(
    `${env.APPLICATION_PATH}${env.APPLICATION_API_PATH}/create-checkout`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Cookie: `${accessTokenObject?.name}=${accessTokenObject?.value}`,
      },
      body: JSON.stringify({
        currentOrder,
        deliveryAddress,
        customerEmail,
      }),
    },
  )

  return await response.json()
}

async function checkoutCustomerAssociate(
  checkoutId: string,
  accessTokenObject: {
    name: string
    value: string
  },
) {
  const response = await fetch(
    `${env.APPLICATION_PATH}${env.APPLICATION_API_PATH}/checkout-customer-associate`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Cookie: `${accessTokenObject?.name}=${accessTokenObject?.value}`,
      },
      body: JSON.stringify({
        checkoutId,
      }),
    },
  )

  return await response.json()
}

export default async function Address() {
  const cookieStore = cookies()
  const accessTokenObject = cookieStore.get('@ecravoecanela:access_token')
  const currentOrder = cookieStore.get('@ecravoecanela:currentOrder')

  const customerData = await getDeliveryAddress(accessTokenObject)
  const deliveryAddress = customerData.addresses[0]
  const customerEmail = customerData.email

  const addressData: AddressPageProps = {} as AddressPageProps

  if (deliveryAddress) {
    const { checkout } = await createCheckout(
      currentOrder.value,
      customerEmail,
      deliveryAddress,
      accessTokenObject,
    )

    const response = await checkoutCustomerAssociate(
      checkout.id,
      accessTokenObject,
    )

    addressData.checkout = response.checkout
    addressData.customer = response.customer
    addressData.deliveryAddressFilled = true

    console.log('response', response)
  } else {
    // redirect('/checkout/cadastro')
  }

  return (
    <>
      <h1>Endereço</h1>
      {addressData.deliveryAddressFilled && <AddressPage {...addressData} />}
    </>
  )
}
