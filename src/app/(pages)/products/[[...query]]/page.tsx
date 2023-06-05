import { ProductsGrid } from '@/components/product/ProductsGrid'
import { Pagination } from '@/components/productsPage/Pagination/Pagination'
import { Sidebar } from '@/components/productsPage/Sidebar/Sidebar'
import { ProductData } from '@/types'
import { queryGetProductsByFilters } from '@/utils/graphql/querys'
import { query } from '@/utils/shopify/storefrontApi'

export type PriceFrontEnd = {
  min: string
  max: string
}

type CheckBoxFilters = {
  productType?: string[]
  price?: PriceFrontEnd
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

export interface ProductsProps {
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

const categoriesMock = [
  {
    categoryLabel: 'Top 20',
    filterValue: 'top-20',
    checked: false,
  },
  {
    categoryLabel: 'Whey Protein',
    filterValue: 'whey-protein',
    checked: false,
  },

  {
    categoryLabel: 'Creatina',
    filterValue: 'creatina',
    checked: false,
  },

  {
    categoryLabel: 'Proteína',
    filterValue: 'proteina',
    checked: false,
  },

  {
    categoryLabel: 'Omega 3',
    filterValue: 'omega3',
    checked: false,
  },

  {
    categoryLabel: 'Hipercalórico',
    filterValue: 'hipercalorico',
    checked: false,
  },
]

async function filterByParam(query: string) {
  const productType = (query?.length > 2 ? query?.slice(2) : []) as string[]
  const clientFiltersTeste: ClientFilters = {
    checkBoxFilters: {
      price: {
        min: query[0] ? query[0] : '',
        max: query[1],
      },
      productType,
    },
  }

  const response = await getProductsByFilters(clientFiltersTeste)
  const products = transformApiDataToProductData(response)

  return products
}

function makeCheckboxFilters(query: string) {
  const productType = query?.slice(2) as string[]

  const checkBoxFiltersSaved = categoriesMock.map((element) => {
    const isChecked = productType.some(
      (el: string) => el === element.filterValue,
    )

    const newElement = {
      ...element,
      checked: isChecked,
    }
    return newElement
  })

  return checkBoxFiltersSaved
}

function makePriceFilters(query: string) {
  let minDefault = 200
  let maxDefault = 900

  if (query?.length > 0) {
    if (!isNaN(Number(query[0]))) {
      minDefault = Number(query[0])
    }
  }

  if (query?.length > 1) {
    if (!isNaN(Number(query[1]))) {
      maxDefault = Number(query[1])
    }
  }
  const priceSaved = {
    min: minDefault,
    max: maxDefault,
  }
  return priceSaved
}

function makeFilters(query: string) {
  const priceSaved = makePriceFilters(query)
  const checkBoxFiltersSaved =
    query?.length > 2 ? makeCheckboxFilters(query) : categoriesMock

  return {
    priceSaved,
    checkBoxFiltersSaved,
  }
}

export default async function Products({ params }: ProductsProps) {
  const { query } = params
  const { products } = filterByParam(query)
  const { priceSaved, checkBoxFiltersSaved } = makeFilters(query)

  return (
    <div
      className={`
        flex flex-row gap-6 justify-between pt-6
      `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <Sidebar
        checkBoxFiltersSaved={checkBoxFiltersSaved}
        priceSaved={priceSaved}
      />
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
        <Pagination hasNextPage={true} hasPreviousPage={true} />
      </div>
    </div>
  )
}
