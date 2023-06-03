"use client";

import Image from "next/image";

interface Props {
  url: string;
  alt?: string;
  className: string;
}

export function ImageCarousel({ alt = "", url, className }: Props) {
  return (
    <Image
      className={className}
      src={url}
      alt={alt}
      width={5000}
      height={5000}
    />
  );
}
