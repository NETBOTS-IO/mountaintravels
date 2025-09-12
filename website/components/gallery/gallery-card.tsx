"use client"

import Image from "next/image"
import type { GalleryImage } from "@/data/galleryData"
import { cn } from "@/lib/utils"

interface GalleryCardProps {
  image: GalleryImage & {
    location?: string
    photographer?: string
  }
  onClick: () => void
  className?: string
}

export function GalleryCard({ image, onClick, className }: GalleryCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl bg-white border border-gray-200",
        className,
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Details always visible below image */}
      <div className="p-4 text-sm">
        {image.title && (
          <h3 className="font-bold text-lg mb-1">Title : {image.title}</h3>
        )}

        {image.description && (
          <p className="text-muted-foreground mb-2">Description : {image.description}</p>
        )}

        {image.location && (
          <p className="text-orange-500 font-medium">Location 📍: {image.location}</p>
        )}

        {image.photographer && (
          <p className="text-orange-500 font-medium">Photographer 📸: {image.photographer}</p>
        )}
      </div>
    </div>
  )
}
