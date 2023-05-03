import { Product } from '@/types'
import { getUrlParams } from '@/utils/ApiFunctions'
import { queryGetProductsByCollectionHandle } from '@/utils/graphql/querys'
import { query } from '@/utils/shopify/storefrontApi'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { url } = request

  const param = getUrlParams(url) as string //! TODO: Fazer validação com o ZOD

  const queryResult = await query(queryGetProductsByCollectionHandle(param))

  const { nodes } = queryResult.collection.products

  const products: Product[] = nodes.map((product: Product) => {
    const { url, altText } = product.featuredImage

    return {
      id: product.id,
      variantId: product.variants.nodes[0].id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      currencyCode: product.variants.nodes[0].price.currencyCode,
      currencySymbol: 'R$',
      altText: `${altText}`,
      image: url,
      price: product.variants.nodes[0].price.amount,
    }
  })

  return NextResponse.json(products)
}
