import { ProductsGrid } from '@/components/product/ProductsGrid'
import { Pagination } from '@/components/productsPage/Pagination/Pagination'
import { Sidebar } from '@/components/productsPage/Sidebar/Sidebar'

interface ProductsProps {
  params: {
    query: string
  }
}

export default async function Products({ params }: ProductsProps) {
  const { query } = params

  console.log('query', query)

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
        <Pagination hasNextPage={true} hasPreviousPage={true} />
      </div>
    </div>
  )
}
