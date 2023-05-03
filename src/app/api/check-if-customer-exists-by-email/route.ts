import { NextResponse } from 'next/server'

import { getUrlParams } from '@/utils/ApiFunctions'
import { queryGetEmailIfCustomerExistsByEmail } from '@/utils/graphql/querys'
import { queryAdmin } from '@/utils/shopify/adminApi'

export async function GET(request: Request) {
  const { url } = request

  const param = getUrlParams(url) as string //! TODO: Fazer validação com o ZOD

  const queryResult = await queryAdmin(
    queryGetEmailIfCustomerExistsByEmail(param),
  )

  const customer = queryResult?.customers?.nodes

  return NextResponse.json(customer)
}
