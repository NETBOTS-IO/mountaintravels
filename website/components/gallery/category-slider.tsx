"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@/data/galleryData"
import { GalleryCard } from "./gallery-card"
import { Button } from "@/components/ui/button"
import { Lightbox } from "./lightbox"

interface CategorySliderProps {
  title: string
  description?: string
  images: GalleryImage[]
}

export function CategorySlider({ title, description, images }: CategorySliderProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((image, index) => (
          <div key={image.id} className="flex-shrink-0 w-72 snap-start">
            <GalleryCard image={image} onClick={() => setSelectedImageIndex(index)} className="h-full" />
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <Lightbox images={images} initialIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} />
      )}
    </div>
  )
}

