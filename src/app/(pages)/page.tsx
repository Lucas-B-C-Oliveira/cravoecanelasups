import { Carousel } from "@/components/Home/carousel/Carousel";
import { CarouselParceiros } from "@/components/Home/parceiros/CarouselParceiros";
import { Separator } from "@/components/Separator/Separator";
import { ProductsGrid } from "@/components/product/ProductsGrid";

export default async function Home() {
  return (
    <div
      className={`
    
    flex flex-col gap-10
    `}
    >
      <div>
        {/* @ts-expect-error -> Async Server Component */}
        <Carousel />
      </div>
      <div
        className={`
        flex flex-col gap-10 mt-[30rem] 
        `}
      >
        {/* @ts-expect-error -> Async Server Component */}
        <Separator text="Marcas Parceiras" />
        <div>
          <CarouselParceiros />
        </div>
        {/* @ts-expect-error -> Async Server Component */}
        <Separator text="Mais Vendidos" />
        {/* @ts-expect-error -> Async Server Component */}
        <ProductsGrid collectionHandle="todos-produtos" />
      </div>
    </div>
  );
}
