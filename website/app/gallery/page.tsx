"use client"

import { useState } from "react"
import { galleryCategories, galleryImages } from "@/data/galleryData"
import { CategorySlider } from "@/components/gallery/category-slider"
import { FeaturedGallery } from "@/components/gallery/featured-gallery"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GalleryCard } from "@/components/gallery/gallery-card"
import { Lightbox } from "@/components/gallery/lightbox"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Get featured images
  const featuredImages = galleryImages.filter((img) => img.featured)

  // Get images by category
  const getImagesByCategory = (categoryId: string) => {
    return galleryImages.filter((img) => img.category === categoryId)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the breathtaking landscapes, rich cultural heritage, and thrilling adventures of Pakistan through our
          curated collection of images.
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

      {/* Featured gallery (shown when no category is selected) */}
      {activeCategory === null && (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6">Featured Images</h2>
            <FeaturedGallery images={featuredImages} />
          </motion.div>

          {/* Category sliders */}
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
                    <motion.div key={image.id} variants={itemVariants} className="overflow-hidden rounded-lg">
                      <GalleryCard image={image} onClick={() => setSelectedImageIndex(index)} className="h-full" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}

      {selectedImageIndex !== null && activeCategory !== null && (
        <Lightbox
          images={getImagesByCategory(activeCategory)}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  )
}

