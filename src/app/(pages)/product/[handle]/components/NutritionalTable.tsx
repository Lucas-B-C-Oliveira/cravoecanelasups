import { Separator } from "@/components/Separator/Separator";
import Image from "next/image";

interface Props {
  images: any[];
}

export async function NutritionalTable({ images }: Props) {
  console.log("image", images);
  return (
    <div className={`flex flex-col gap-6`}>
      <div id="nutrition-table">
        {/* @ts-expect-error -> Async Server Component */}
        <Separator text="Tabela Nutricional" />
      </div>

      <div
        className={`
      flex h-fit w-full  justify-items-center justify-center
      max-[950px]:flex-col 
    
    `}
      >
        {images.length > 0 &&
          images.map((image) => (
            <Image
              key={image.url}
              alt={image.alt}
              src={image.url}
              width={500}
              height={500}
            />
          ))}
      </div>
    </div>
  );
}
