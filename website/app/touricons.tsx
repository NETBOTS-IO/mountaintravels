"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/app/Var"

/* ===============================
   CATEGORY LIST (SOURCE OF TRUTH)
================================ */

const categoryList = [
  "Trekking",
  "Expeditions",
  "Cultural Tours",
  "Mountain Biking",
  "Skiing",
  "Safari",
  "Trips",
]

/* ===============================
   UI LABELS (RENAME)
================================ */

const CATEGORY_LABELS = {
  Trips: "Luxury Trips",
}

/* ===============================
   CATEGORY FALLBACK IMAGES
================================ */

const CATEGORY_FALLBACK_IMAGES = {
  Trekking: "/assets/home/trekking.jpg",
  Expeditions: "/assets/home/expeditions.jpg",
  "Cultural Tours": "/assets/home/culture.jpg",
  "Mountain Biking": "/assets/home/mountain-biking.jpg",
  Skiing: "/assets/home/skiing.jpg",
  Safari: "/assets/home/safari.jpg",
  Trips: "/assets/home/luxury-trips.jpg",
}

/* ===============================
   CATEGORY FALLBACK DESCRIPTIONS
================================ */

const CATEGORY_FALLBACK_DESCRIPTIONS = {
  "Cultural Tours":
    "Cultural & Heritage Tours – Gandhara, Silk Road & living traditions",
  Trekking:
    "Trekking & Hiking – From gentle walks to legendary high-altitude treks",
  Expeditions:
    "Mountaineering & Expeditions – 6000m–8000m peaks with expert support",
  "Mountain Biking":
    "Cycling Adventures – Epic mountain roads & cultural routes",
  Skiing:
    "Skiing Adventures – Snow-covered slopes & alpine experiences",
  Safari:
    "Safari & Wildlife Tours – Explore Pakistan’s natural reserves and wildlife",
  Trips:
    "Special Interest Tours – Photography, archaeology, festivals & more",
}


/* ===============================
   COMPONENT
================================ */

export default function FeaturedTourCategories() {
  const router = useRouter()

  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      setError("")

      try {
        const res = await axios.get(`${BASE_URL}/api/tours`)
        const featuredTours = res.data.data.filter((t: any) => t.featured)

        const apiCategoryMap = new Map()
        featuredTours.forEach((tour: any) => {
          const key = tour.category?.toLowerCase()
          if (!apiCategoryMap.has(key)) {
            apiCategoryMap.set(key, tour)
          }
        })

        const finalCategories = categoryList.map(cat => {
          const key = cat.toLowerCase()
          const apiTour = apiCategoryMap.get(key)

          return {
            key,
            category: cat,
            label: CATEGORY_LABELS[cat] || cat,
            hasData: Boolean(apiTour),
            description:
              apiTour?.description ||
              CATEGORY_FALLBACK_DESCRIPTIONS[cat] ||
              "New adventures coming soon. Stay tuned!",
            image: apiTour?.images?.[0]
              ? `${BASE_URL}${apiTour.images[0]}`
              : CATEGORY_FALLBACK_IMAGES[cat] ||
                "/assets/home/default.jpg",
          }
        })

        finalCategories.sort((a, b) => {
          if (a.hasData === b.hasData) return 0
          return a.hasData ? -1 : 1
        })

        setCategories(finalCategories)
      } catch (err) {
        console.error("Failed to fetch tours:", err)
        setError("Failed to load categories.")
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const handleCardClick = (cat: any) => {
    if (!cat.hasData) return
    router.push(`/tours?category=${cat.category}`, { scroll: false })
  }

  if (loading)
    return (
      <div className="py-20 text-center text-gray-600">
        Loading categories…
      </div>
    )

  if (error)
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    )

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14">
         Choose Your Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map(cat => (
            <div
              key={cat.key}
              onClick={() => handleCardClick(cat)}
              className={`group rounded-3xl overflow-hidden transition-all duration-300
                ${
                  cat.hasData
                    ? "cursor-pointer bg-white shadow-md hover:shadow-xl"
                    : "cursor-not-allowed bg-gray-100 opacity-70"
                }
              `}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className={`w-full h-full object-cover transition-transform duration-500
                    ${cat.hasData ? "group-hover:scale-110" : ""}
                  `}
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  {cat.label}
                </h3>

                <p className="text-gray-600 line-clamp-3">
                  {cat.description}
                </p>

                {cat.hasData ? (
                  <div className="mt-5 text-orange-600 font-semibold">
                    Explore Tours →
                  </div>
                ) : (
                  <div className="mt-5 text-gray-400 font-medium">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
