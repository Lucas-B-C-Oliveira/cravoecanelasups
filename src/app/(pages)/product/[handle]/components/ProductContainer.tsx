import Image from "next/image";
import { ProductMainContent } from "./ProductMainContent";

interface Props {
  productData: any;
}

export async function ProductContainer({ productData }: Props) {
  return (
    <div
      className={`
    
      min-[950px]:flex-colmun w-full h-fit justify-center items-center
    `}
    >
      <p
        className={`
        font-medium text-base text-gray-yellow-cc-800 
        max-[950px]:text-xs 
      `}
      >
        {productData.description}
      </p>

      <Image
        alt={productData.altText}
        src={productData.image}
        width={300}
        height={530}
      />

      {/* @ts-expect-error -> Async Server Component */}
      <ProductMainContent productData={productData} />
    </div>
  );
}
