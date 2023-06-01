"use client";

import { ImageCarousel } from "./ImageCarousel";
import Image from "next/image";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

interface Props {
  images: string[];
  imagesMobile: string[];
  alts?: string[];
}

export function CarouselContainer({ images, imagesMobile }: Props) {
  function handleDrag(event: any) {
    console.log("event", event);
  }
  const screenWidth = window.innerWidth;
  return (
    <>
      <div className="w-full overflow-hidden absolute inset-x-0 ">
        <Swiper
          navigation={true}
          pagination={true}
          keyboard={true}
          modules={[Navigation, Pagination, Keyboard]}
          className="mySwiper"
        >
          <div onDrag={handleDrag} className="w-screen">
            {screenWidth > 750
              ? images &&
                images.map((image: string, index: number) => (
                  <SwiperSlide key={image}>
                    <ImageCarousel
                      className="h-[30rem] w-full"
                      url={image}
                      alt={"produtos"}
                    />
                  </SwiperSlide>
                ))
              : imagesMobile &&
                imagesMobile.map((image: string, index: number) => (
                  <SwiperSlide key={image}>
                    <ImageCarousel
                      className="h-[30rem] w-full"
                      url={image}
                      alt={"produtos"}
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
