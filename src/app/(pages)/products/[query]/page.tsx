import { ProductsGrid } from '@/components/product/ProductsGrid'
import { Pagination } from '@/components/productsPage/Pagination/Pagination'
import { Sidebar } from '@/components/productsPage/Sidebar/Sidebar'
import { ProductData } from '@/types'
import { queryGetProductsByFilters } from '@/utils/graphql/querys'
import { query } from '@/utils/shopify/storefrontApi'

type CheckBoxFilters = {
  productType?: string[]
  price?: {
    min: string
    max: string
  }
}

type ClientFilters = {
  textInput?: string
  checkBoxFilters?: CheckBoxFilters
}

type ProductType = {
  productType: string
}

type Price = {
  price: {
    min: number
    max: number
  }
}

type ApiFilter = {
  filters: Array<ProductType & Price> | Array<Price> | Array<ProductType>
}

interface ProductsProps {
  params: {
    clientFilters?: ClientFilters
  }
}

// function makeApiFilter(
//   clientFilters: ClientFilters,
//   checkBoxFilters: CheckBoxFilters,
//   textInput: string,
// ): ApiFilter {}

function makeApiFilterByCheckBoxFilters(
  checkBoxFilters: CheckBoxFilters,
): ApiFilter {
  const { price: prices, productType } = checkBoxFilters

  let productTypes: ProductType[]
  const price = {}

  const filters: any = []

  if (productType) {
    productTypes = productType.map((productTypeValue: string) => ({
      productType: productTypeValue,
    }))

    filters.push(...productTypes)
  }

  if (prices) {
    const min = Number(prices.min)
    const max = Number(prices.max)

    Object.defineProperty(price, 'price', {
      value: { min, max },
      writable: true,
      enumerable: true,
      configurable: true,
    })

    filters.push(price)
  }

  const newApiFilter: ApiFilter = {
    filters,
  }

  return newApiFilter
}

async function getProductsByFilters(
  clientFilters?: ClientFilters,
): Promise<any> {
  if (!clientFilters) {
    return 'mais-vendidos'
  } else {
    const { textInput, checkBoxFilters } = clientFilters

    let queryContent: string = ''

    if (checkBoxFilters && textInput) {
      queryContent = 'a'
    } else if (textInput) {
      queryContent = 'b'
    } else if (checkBoxFilters) {
      const { filters } = makeApiFilterByCheckBoxFilters(checkBoxFilters)
      queryContent = queryGetProductsByFilters('todos-produtos', 40, filters)
    }

    const queryResult = await query(queryContent)

    const { nodes } = queryResult?.collection?.products

    return nodes
  }
}

function transformApiDataToProductData(data: any): ProductData[] {
  const products: ProductData[] = data.map((product: ProductData) => {
    const { url, altText } = product?.featuredImage
    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      currencyCode: product?.priceRange?.minVariantPrice.currencyCode,
      currencySymbol: 'R$',
      altText: `${altText}`,
      image: url,
      variants: product.variants?.nodes,
      price: product?.priceRange?.minVariantPrice.amount,
      options: product.options,
    }
  })
  return products
}

export default async function Products({ params }: ProductsProps) {
  const { clientFilters } = params

  const clientFiltersTeste: ClientFilters = {
    checkBoxFilters: {
      price: {
        max: '150',
        min: '100',
      },
      productType: ['creatina', 'hipercalórico'],
    },
  }

  const response = await getProductsByFilters(clientFiltersTeste)
  const products = transformApiDataToProductData(response)

  //! TODO: Fazer a paginação aqui => e enviar por props pro componente de paginação

  console.log('products', products)

  return (
    <div
      className={`
      flex flex-row gap-6 justify-between pt-6
      
      `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <Sidebar />
      <div
        className={`
        flex flex-col
        w-full
        h-fit
        gap-6
        
      
      `}
      >
        {/* @ts-expect-error -> Async Server Component */}
        <ProductsGrid collectionHandle="todos-produtos" />
        {/* <Pagination hasNextPage={true} hasPreviousPage={true} /> */}
      </div>
    </div>
  )
}
