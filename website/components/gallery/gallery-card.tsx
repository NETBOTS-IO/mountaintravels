"use client"

import Image from "next/image"
import type { GalleryImage } from "@/data/galleryData"
import { cn } from "@/lib/utils"

interface GalleryCardProps {
  image: GalleryImage
  onClick: () => void
  className?: string
}

export function GalleryCard({ image, onClick, className }: GalleryCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl",
        className,
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-bold text-lg">{image.title}</h3>
        {image.description && <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>}
      </div>
    </div>
  )
}

