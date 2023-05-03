import { ProductsGrid } from '@/components/product/ProductsGrid'

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error -> Async Server Component */}
      <ProductsGrid collectionHandle="mais-vendidos" />
      {/* @ts-expect-error -> Async Server Component */}
      <ProductsGrid collectionHandle="outros-produtos" />
    </>
  )
}
