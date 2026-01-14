"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/app/Var"

export default function ToursPage() {
  const searchParams = useSearchParams()
  const collection = searchParams.get("collection") // luxary | hardcore

  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Normalize collection value
  const normalizedCollection = (() => {
    if (!collection) return ""
    if (collection.toLowerCase() === "luxary") return "luxury"
    if (collection.toLowerCase() === "hardcore") return "hardcore"
    return ""
  })()

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`)
        const allTours = res.data.data || []

        const filtered = allTours.filter(tour => {
          const type = tour.tourType?.toLowerCase().trim()
        
          if (normalizedCollection === "luxury") {
            return type === "luxary" || type === "luxury"
          }
        
          if (normalizedCollection === "hardcore") {
            return type === "hardcore"
          }
        
          return false
        })
        

        setTours(filtered)
      } catch (err) {
        console.error("Failed to load tours:", err)
        setError("Failed to load tours")
      } finally {
        setLoading(false)
      }
    }

    if (normalizedCollection) {
      fetchTours()
    }
  }, [normalizedCollection])

  if (loading) {
    return <div className="py-20 text-center">Loading tours...</div>
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 uppercase">
          {normalizedCollection === "luxury"
            ? "Luxury Collection"
            : "Hardcore Expeditions"}
        </h1>

        {/* 🚫 NO DATA MESSAGE */}
        {tours.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Sorry, there is no data here
            </p>
            <p className="text-sm text-gray-500">
              Please check back later or explore other collections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map(tour => (
              <div
                key={tour._id}
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={
                    tour.images?.[0]
                      ? `${BASE_URL}${tour.images[0]}`
                      : "/placeholder.jpg"
                  }
                  className="h-52 w-full object-cover"
                  alt={tour.title}
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{tour.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {tour.shortDescription}
                  </p>
                  <Link
        href={`/tours/detail/${tour._id}`}
        className="mt-auto inline-block text-center bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
      >
        More Details →
      </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
