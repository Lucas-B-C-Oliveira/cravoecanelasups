import { mutationCustomerCreate } from '@/utils/graphql/mutations'
// import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
// import { setCookie } from 'nookies'

export async function POST(req: NextRequest) {
  // const { email, password } = await req.json()
  const params = await req.json()

  console.log('params', params)

  const queryResult = await mutationAdmin(mutationCustomerCreate(), {
    input: { email, password },
  })

  // return NextResponse.json(result)
}
