import { mutationGetAuthenticationTokenByEmailAndPassword } from '@/utils/graphql/mutations'
import { mutation } from '@/utils/shopify/storefrontApi'
// import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
// import { setCookie } from 'nookies'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

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

  return NextResponse.json(result)
}
