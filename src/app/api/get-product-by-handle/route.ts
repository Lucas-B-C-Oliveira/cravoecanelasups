import { ProductData } from '@/types'
import { getUrlParams } from '@/utils/ApiFunctions'
import { queryGetProductByHandle } from '@/utils/graphql/querys'
import { query } from '@/utils/shopify/storefrontApi'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { url } = request

  const param = getUrlParams(url) as string //! TODO: Fazer validação com o ZOD

  const queryResult = await query(queryGetProductByHandle(param))

  const { product } = queryResult
  const { title, id, handle, description, featuredImage, variants } = product
  const { nodes } = variants
  const variant = nodes[0]

  const newProduct: ProductData = {
    title,
    id,
    handle,
    description,
    currencySymbol: 'R$',
    image: featuredImage.url,
    price: variant.price.amount,
    altText: `${featuredImage.altText}`,
    variantId: variant.id,
    currencyCode: variant.price.currencyCode,
  }

  return NextResponse.json(newProduct)
}
