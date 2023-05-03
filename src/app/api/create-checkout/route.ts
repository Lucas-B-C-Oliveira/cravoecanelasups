import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { type ProductsToBeOrdered } from '@/types'
import { mutationCreateCheckout } from '@/utils/graphql/mutations'
import { customerMutation } from '@/utils/shopify/storefrontApi'

export async function POST(req: NextRequest) {
  const { currentOrder, deliveryAddress, customerEmail } = await req.json()

  const { firstName, lastName, address1, city, province, zip, country, phone } =
    deliveryAddress
  const currentOrderJson = JSON.parse(currentOrder)
  const { orderedProducts } = currentOrderJson
  const { products } = orderedProducts

  const { value: accessToken } = cookies().get('@ecravoecanela:access_token')

  const lineItems = products.map((product: ProductsToBeOrdered) => {
    return {
      quantity: Number(product.amount),
      variantId: product.variantId,
    }
  })

  const mutationVariables = {
    input: {
      lineItems,
      shippingAddress: {
        address1,
        city,
        country,
        firstName,
        lastName,
        phone,
        province,
        zip,
      },
      email: customerEmail,
    },
  }

  const response = await customerMutation(
    mutationCreateCheckout(),
    mutationVariables,
    accessToken,
  )

  const { checkoutCreate } = response

  return NextResponse.json(checkoutCreate)
}
