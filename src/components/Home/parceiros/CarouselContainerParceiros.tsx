"use client";

import { ImageCarousel } from "./ImageCarouselParceiros";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Separator } from "@/components/Separator/Separator";

interface Props {
  images: string[];
}

export function CarouselContainerParceiros({ images }: Props) {
  function handleDrag(event: any) {
    console.log("event", event);
  }

  const screenWidth = window.innerWidth;

  const arrowStyles = {
    color: 'red', // Define a cor das setas como vermelho
  };

  return (
    <>
      <div className="w-full overflow-hidden inset-x-0 -mt-[2rem] -mb-[2rem] min-[750px]:px-[5rem]">
        <Swiper navigation={true} spaceBetween={30} modules={[Navigation]} slidesPerView={screenWidth > 750 ? 3 : 1} className="">
          <div onDrag={handleDrag} >
            {images &&
              images.map((image: string, index: number) => (
                <>
                  <SwiperSlide key={image} style={{
                    'display': 'flex',
                    justifyContent: 'center',
                    color: 'red'
                  }}>
                    <ImageCarousel
                      className={
                        screenWidth > 750
                          ? "w-[300px] h-[150px]"
                          : "w-[15rem] h-[7rem]"
                      }
                      url={image}
                      alt={"nossos parceiros"}
                    />
                  </SwiperSlide>
                </>
              ))}
          </div>
        </Swiper>
      </div >
    </>
  );
}

/* <div className="w-full h-80 overflow-hidden absolute inset-x-0 ">
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
      </div> */
