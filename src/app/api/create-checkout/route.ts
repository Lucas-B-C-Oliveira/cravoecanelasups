import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { type ProductsToBeOrdered } from '@/types'
import { mutationCreateCheckout } from '@/utils/graphql/mutations'
import { customerMutation, mutation } from '@/utils/shopify/storefrontApi'
import { ShippingAddressData } from '@/app/(pages)/checkout/components/CheckoutForm'
import { ProductInCart } from '@/store/persistLocalStorage'

type ShippingAddressDataAPI = {
  address1: string
  address2?: string
  city: string
  company: string
  country: string
  firstName: string
  lastName: string
  phone: string
  province: string
  zip: string
}

function convertShippingAddressDataToShippingAddressDataApi(
  shippingData: ShippingAddressData,
): ShippingAddressDataAPI {
  const {
    cep,
    street,
    number,
    district,
    city,
    stateCode,
    complement,
    recipient,
  } = shippingData

  const complemento = complement === '' ? '.' : `, complemento ${complement}.`

  const address1 = `Rua ${street}, número ${number}, bairro ${district}${complemento}`

  const splitName = recipient.split(' ')
  const firstName = splitName[0]
  const lastName = splitName[1]

  const shippingAddress: ShippingAddressDataAPI = {
    address1,
    city,
    country: 'Brazil',
    firstName,
    lastName,
    company: '',
    province: stateCode,
    zip: cep,
    phone: '',
    address2: '',
  }

  return shippingAddress
}

type LineItem = {
  customAttributes?: {
    key?: string
    value?: string
  }[]
  quantity?: number
  variantId?: string
}

type CheckoutData = {
  allowPartialAddresses?: boolean
  buyerIdentity: {
    countryCode?: string
  }
  customAttributes: {
    key?: string
    value?: string
  }[]
  email: string
  lineItems: LineItem[]
  note?: string
  shippingAddress: ShippingAddressDataAPI
}

function convertCartDataToCheckoutLineItems(
  cartData: ProductInCart[],
): LineItem[] {
  const newLineItems: LineItem[] = cartData.map(
    (productInCart: ProductInCart) => {
      const newLineItem: LineItem = {
        customAttributes: [
          {
            key: '',
            value: '',
          },
        ],
        quantity: productInCart.quantity,
        variantId: productInCart.variantId,
      }

      return newLineItem
    },
  )

  return newLineItems
}

function createCheckoutData(
  lineItems: LineItem[],
  shippingAddress: ShippingAddressDataAPI,
  email: string,
): CheckoutData {
  const newCheckoutData: CheckoutData = {
    buyerIdentity: {
      countryCode: 'BR',
    },
    customAttributes: [{ key: '', value: '' }],
    email,
    lineItems,
    shippingAddress,
    note: '',
    allowPartialAddresses: true,
  }

  return newCheckoutData
}

export async function POST(req: NextRequest) {
  const {
    shippingAddressData,
    cartData,
  }: {
    shippingAddressData: ShippingAddressData
    cartData: ProductInCart[]
  } = await req.json()

  const { email } = shippingAddressData

  const shippingAddressDataApi =
    convertShippingAddressDataToShippingAddressDataApi(shippingAddressData)
  const lineItems = convertCartDataToCheckoutLineItems(cartData)

  const input = createCheckoutData(lineItems, shippingAddressDataApi, email)

  const response = await mutation(mutationCreateCheckout(), { input })

  const { checkoutCreate } = response
  const { checkout, checkoutUserErrors } = checkoutCreate

  if (checkoutUserErrors.length > 0) {
    return NextResponse.json(checkoutUserErrors)
  }

  return NextResponse.json(checkout)
}
