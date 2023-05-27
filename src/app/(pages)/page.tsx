import { Carousel } from '@/components/Home/Carousel'
import { Separator } from '@/components/Separator/Separator'
import { ProductsGrid } from '@/components/product/ProductsGrid'

export default async function Home() {
  return (
    <div
      className={`
    
    flex flex-col gap-10
    `}
    >
      <div className={`h-80 `}>
        {/* @ts-expect-error -> Async Server Component */}
        <Carousel />
      </div>
      <div
        className={`
          flex flex-col gap-6
      `}
      >
        {/* @ts-expect-error -> Async Server Component */}
        <Separator text="Mais Vendidos" />
        {/* @ts-expect-error -> Async Server Component */}
        <ProductsGrid collectionHandle="todos-produtos" />
      </div>
    </div>
  )
}
