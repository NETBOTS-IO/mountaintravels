"use client"

import { useEffect, useState } from "react"
import { CategorySlider } from "@/components/gallery/category-slider"
import { FeaturedGallery } from "@/components/gallery/featured-gallery"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GalleryCard } from "@/components/gallery/gallery-card"
import { Lightbox } from "@/components/gallery/lightbox"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/api/gallery`)
        const data = await res.json()
        if (data.success && Array.isArray(data.photos)) {
          setGalleryImages(data.photos) // ✅ real photos array
        } else {
          setError("Failed to load gallery")
        }
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Derive categories dynamically
  const galleryCategories = Array.from(
    new Map(
      galleryImages.map((img) => [
        img.category,
        { id: img.category, title: img.category, description: "" },
      ])
    ).values()
  )

  // Featured images → you can mark via API if needed (right now none in response)
  const featuredImages = galleryImages.filter((img) => img.featured)

  // Get images by category
  const getImagesByCategory = (categoryId: string) => {
    return galleryImages.filter((img) => img.category === categoryId)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  if (loading) {
    return <p className="text-center py-12 text-lg">Loading gallery...</p>
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore breathtaking landscapes, rich culture, and thrilling adventures through our curated gallery.
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          onClick={() => setActiveCategory(null)}
          className="rounded-full"
        >
          All Categories
        </Button>
        {galleryCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="rounded-full"
          >
            {category.title}
          </Button>
        ))}
      </motion.div>

      {/* Featured + category sliders */}
      {activeCategory === null && (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {featuredImages.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-6">Featured Images</h2>
              <FeaturedGallery images={featuredImages} />
            </motion.div>
          )}

          {galleryCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategorySlider
                title={category.title}
                description={category.description}
                images={getImagesByCategory(category.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Category-specific gallery */}
      {activeCategory !== null && (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {galleryCategories
            .filter((category) => category.id === activeCategory)
            .map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getImagesByCategory(category.id).map((image, index) => (
                    <motion.div key={image._id} variants={itemVariants} className="overflow-hidden rounded-lg">
                      <GalleryCard
                        image={{
                          ...image,
                          src: `${BASE_URL}${image.src[0]}`, // ✅ use first src
                        }}
                        onClick={() => setSelectedImageIndex(index)}
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Lightbox */}
      {selectedImageIndex !== null && activeCategory !== null && (
        <Lightbox
          images={getImagesByCategory(activeCategory).map((img) => ({
            ...img,
            src: `${BASE_URL}${img.src[0]}`, // ✅ fix for array
          }))}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  )
}
