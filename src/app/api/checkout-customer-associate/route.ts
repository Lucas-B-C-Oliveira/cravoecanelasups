import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mutationCheckoutAssociate } from '@/utils/graphql/mutations'
import { customerMutation } from '@/utils/shopify/storefrontApi'

export async function POST(req: NextRequest) {
  const { checkoutId } = await req.json()

  const { value: accessToken } = cookies().get('@ecravoecanela:access_token')
  console.log('accessToken', accessToken)

  const mutationVariables = {
    checkoutId,
    customerAccessToken: accessToken,
  }

  const response = await customerMutation(
    mutationCheckoutAssociate(),
    mutationVariables,
    accessToken,
  )

  const { checkoutCustomerAssociateV2 } = response

  return NextResponse.json(checkoutCustomerAssociateV2)
}
