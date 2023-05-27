import { Separator } from '@/components/Separator/Separator'

export async function CarouselProductsContainer() {
  return (
    <div
      className={`
        flex flex-col w-full h-full bg-red-500

      `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <Separator text="Outros Produtos" />
    </div>
  )
}
