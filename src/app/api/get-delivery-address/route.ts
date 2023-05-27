import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { customerQuery } from '@/utils/shopify/storefrontApi'
import { queryGetCustomerAddressByToken } from '@/utils/graphql/querys'

export async function GET(req: NextApiRequest, res: NextResponse) {
  const { value: accessToken } = cookies().get('@ecravoecanela:access_token')

  const queryResponse = await customerQuery(
    queryGetCustomerAddressByToken(accessToken),
    accessToken,
  )

  const { customer } = queryResponse

  return NextResponse.json(customer)
}
