"use client";

import { useEffect, useState } from "react";
import { CategorySlider } from "@/components/gallery/category-slider";
import { FeaturedGallery } from "@/components/gallery/featured-gallery";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { Lightbox } from "@/components/gallery/lightbox";
import { BASE_URL } from "@/app/Var";
import { Film, Image as ImageIcon, AlertCircle } from "lucide-react";

const getImageUrl = (photo: any) => {
  if (photo?.src && photo.src.length > 0) {
    const first = photo.src[0];
    if (first.startsWith("http")) return first;

    const ext = first.split(".").pop()?.split("?")[0].toLowerCase();
    const isVideo =
      (ext && ["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext)) ||
      photo.type === "video";

    if (isVideo) {
      return `${BASE_URL}/api/media/stream/${first.split("/").pop()}`;
    }
    return `${BASE_URL}${first}`;
  }
  return "/placeholder.png";
};

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string>("All");
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null,
  );
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Media API
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/media?limit=100`);
        const data = await res.json();
        if (data.success && Array.isArray(data.photos)) {
          setMediaItems(data.photos);
        } else {
          setError("Failed to load media items");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // Filter items by type and active category
  const filteredItems = mediaItems.filter((item) => {
    const matchesCategory =
      activeCategory === null || item.category === activeCategory;
    const matchesType =
      activeType === "All" || item.type === (activeType || "").toLowerCase();
    return matchesCategory && matchesType;
  });

  // Derive categories dynamically from all media items
  const mediaCategories = Array.from(
    new Map(
      mediaItems.map((img) => [
        img.category,
        { id: img.category, title: img.category, description: "" },
      ]),
    ).values(),
  );

  // Featured items
  const featuredItems = filteredItems.filter((img) => img.featured);

  // Get items by category
  const getItemsByCategory = (categoryId: string) => {
    return filteredItems.filter((img) => img.category === categoryId);
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-center py-12 text-lg animate-pulse">
          Loading Media Library...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="bg-red-50 text-red-500 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Media Unavailable
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          We couldn't load the media library at the moment. Please check your
          connection and try again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="rounded-full font-semibold px-6"
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-5xl font-black text-[#112a30] mb-4">
          Media Library
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          Explore breathtaking mountain landscapes, rich cultures, and thrilling
          expeditions through our photography and videos.
        </p>
      </motion.div>

      {/* Media Type Tabs */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-full bg-slate-100 p-1 border shadow-inner">
          {["All", "Image", "Video"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(type);
                setSelectedMediaIndex(null);
              }}
              className={`flex items-center gap-1.5 px-6 py-2 text-sm font-bold rounded-full transition-all ${
                activeType === type
                  ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {type === "Video" && <Film className="w-4 h-4" />}
              {type === "Image" && <ImageIcon className="w-4 h-4" />}
              {type === "All" ? "All" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2.5 mb-8"
      >
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          onClick={() => {
            setActiveCategory(null);
            setSelectedMediaIndex(null);
          }}
          className="rounded-full font-semibold"
        >
          All Categories
        </Button>
        {mediaCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => {
              setActiveCategory(category.id);
              setSelectedMediaIndex(null);
            }}
            className="rounded-full font-semibold"
          >
            {category.title}
          </Button>
        ))}
      </motion.div>

      {/* Featured + category sliders (only for All Categories) */}
      {activeCategory === null && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {featuredItems.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 flex items-center gap-2">
                ✨ Featured Media
              </h2>
              <FeaturedGallery
                images={featuredItems.map((img) => ({
                  ...img,
                  src: getImageUrl(img),
                }))}
              />
            </motion.div>
          )}

          {mediaCategories.map((category) => {
            const itemsInCat = getItemsByCategory(category.id);
            if (itemsInCat.length === 0) return null;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <CategorySlider
                  title={category.title}
                  description={category.description}
                  images={itemsInCat.map((img) => ({
                    ...img,
                    src: getImageUrl(img),
                  }))}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Category-specific grid */}
      {activeCategory !== null && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {mediaCategories
            .filter((category) => category.id === activeCategory)
            .map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getItemsByCategory(category.id).map((item, index) => (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
                    >
                      <GalleryCard
                        image={{
                          ...item,
                          src: getImageUrl(item),
                        }}
                        onClick={() => setSelectedMediaIndex(index)}
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
      {selectedMediaIndex !== null && (
        <Lightbox
          images={(activeCategory !== null
            ? getItemsByCategory(activeCategory)
            : filteredItems
          ).map((img) => ({
            ...img,
            src: getImageUrl(img),
          }))}
          initialIndex={selectedMediaIndex}
          onClose={() => setSelectedMediaIndex(null)}
        />
      )}
    </div>
  );
}
