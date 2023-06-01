"use client";

import { ImageCarousel } from "./ImageCarouselParceiros";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

interface Props {
  images: string[];
}

export function CarouselContainerParceiros({ images }: Props) {
  function handleDrag(event: any) {
    console.log("event", event);
  }

  const screenWidth = window.innerWidth;

  return (
    <>
      <div className="w-full overflow-hidden inset-x-0 -mt-[2rem] -mb-[2rem]">
        <Swiper
          slidesPerView={screenWidth > 750 ? 4 : 2}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <div onDrag={handleDrag}>
            {images &&
              images.map((image: string, index: number) => (
                <SwiperSlide key={image} className="pb-[2rem]">
                  <ImageCarousel
                    className={
                      screenWidth > 750
                        ? "w-[20rem] h-[10rem]"
                        : "w-[25rem] h-[6rem]"
                    }
                    url={image}
                    alt={"nossos parceiros"}
                  />
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
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
