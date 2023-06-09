"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imageUrl: string;
  alt: string;
  productHandle: string;
}

export function ProductImage({ imageUrl, alt, productHandle }: Props) {
  return (
    <Link
      className=" flex flex-col items-center h-fit w-fit"
      href={`product/${productHandle}`}
    >
      <Image
        className="h-64 w-36"
        src={imageUrl}
        alt={alt}
        width={700}
        height={700}
      />
    </Link>
  );
}
