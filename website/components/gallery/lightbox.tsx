"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Info } from "lucide-react"
import type { GalleryImage } from "@/data/galleryData"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LightboxProps {
  images: GalleryImage[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [showInfo, setShowInfo] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)

  const currentImage = images[currentIndex]

  const handlePrev = useCallback(() => {
    setIsAnimating(true)
    setZoomLevel(1)
    setRotation(0)
    setDragOffset({ x: 0, y: 0 })
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length])

  const handleNext = useCallback(() => {
    setIsAnimating(true)
    setZoomLevel(1)
    setRotation(0)
    setDragOffset({ x: 0, y: 0 })
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragOffset({
        x: dragOffset.x + (e.clientX - dragStart.x),
        y: dragOffset.y + (e.clientY - dragStart.y),
      })
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setDragOffset({
        x: dragOffset.x + (e.touches[0].clientX - dragStart.x),
        y: dragOffset.y + (e.touches[0].clientY - dragStart.y),
      })
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrev()
          break
        case "ArrowRight":
          handleNext()
          break
        case "Escape":
          onClose()
          break
        case "+":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "r":
          handleRotate()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev, onClose])

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center">
      {/* Top controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
      >
        <div
          className={cn("relative transition-transform duration-300", isAnimating && "animate-fade-in")}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
            transformOrigin: "center",
          }}
        >
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="max-h-[80vh] w-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Image info */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h2 className="text-xl font-bold">{currentImage.title}</h2>
          {currentImage.description && <p className="text-sm text-white/80">{currentImage.description}</p>}
        </div>
      )}

      {/* Side navigation */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-full">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleZoomOut}>
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleZoomIn}>
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleRotate}>
          <RotateCw className="h-5 w-5" />
        </Button>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

