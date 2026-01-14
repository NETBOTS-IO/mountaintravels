"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/app/Var"
import Link from "next/link"

interface Tour {
  _id: string
  name: string
  tourType: string
  shortDescription?: string
  images?: string[]
}

export default function ToursPage() {
  const params = useParams()
  const collectionParam = params.collection?.toLowerCase() || "" // luxary | hardcore

  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!collectionParam) return

    async function fetchTours() {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`)
        const allTours: Tour[] = res.data.data || []

        // Filter tours by exact type
        const filtered = allTours.filter(tour => {
          const type = (tour.tourType || "").toLowerCase().trim()
          return type === collectionParam
        })

        setTours(filtered)
      } catch (err) {
        console.error("Failed to load tours:", err)
        setError("Failed to load tours.")
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [collectionParam])

  if (loading) return <div className="py-20 text-center">Loading tours...</div>
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 uppercase">
          {collectionParam === "luxary" ? "Luxury Collection" : "Hardcore Expeditions"}
        </h1>

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
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={tour.images?.[0] ? `${BASE_URL}${tour.images[0]}` : "/placeholder.jpg"}
                  className="h-52 w-full object-cover"
                  alt={tour.name}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg">{tour.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{tour.shortDescription}</p>
                </div>

                {/* Orange Button */}
                <div className="p-4 pt-2">
                  <Link
                    href={`/tours/detail/${tour._id}`}
                    className="block text-center bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition"
                  >
                    View Details
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
