'use client'

import { ImageCarousel } from './ImageCarousel'

interface Props {
  images: string[]
  alts: string[]
}

export function CarouselContainer({ images, alts }: Props) {
  function handleDrag(event: any) {
    console.log('event', event)
  }

  return (
    <>
      <div className="w-full h-80 overflow-hidden absolute inset-x-0 ">
        <div onDrag={handleDrag} className="w-full h-full">
          {images &&
            images.map((image: string, index: number) => (
              <ImageCarousel
                className="flex w-full h-80"
                key={image}
                url={image}
                alt={alts[index]}
              />
            ))}
        </div>
      </div>
    </>
  )
}
