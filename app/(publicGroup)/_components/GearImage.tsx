"use client"
import Image from "next/image";

export const GearImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
