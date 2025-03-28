"use client"

import { useState } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/data/galleryData"
import { Lightbox } from "./lightbox"
import { cn } from "@/lib/utils"

interface FeaturedGalleryProps {
  images: GalleryImage[]
}

export function FeaturedGallery({ images }: FeaturedGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl",
            index === 0 && "md:col-span-2 md:row-span-2",
          )}
          onClick={() => setSelectedImageIndex(index)}
        >
          <div className={cn("relative overflow-hidden", index === 0 ? "aspect-[16/9]" : "aspect-square")}>
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-lg">{image.title}</h3>
              {image.description && <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>}
            </div>
          </div>
        </div>
      ))}

      {selectedImageIndex !== null && (
        <Lightbox images={images} initialIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} />
      )}
    </div>
  )
}

