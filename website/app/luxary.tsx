"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/app/Var"

export default function FeaturedSignatureTours() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cards, setCards] = useState<any[]>([])

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`)
        const tours = res.data.data || []

        const featured = tours.filter(t => t.featured === true)

        const getTourByType = (type: string[]) =>
          featured.find(t =>
            type.includes(t.tourType?.toLowerCase().trim())
          )

        const luxuryTour = getTourByType(["luxury", "luxary"])
        const hardcoreTour = getTourByType(["hardcore"])

        setCards([
          {
            id: "luxury",
            title: "LUXURY COLLECTION",
            hasData: Boolean(luxuryTour),
            description:
              luxuryTour?.shortDescription ||
              "Sorry, right now there is no data in this collection.",
            image:
              luxuryTour?.images?.[0]
                ? `${BASE_URL}${luxuryTour.images[0]}`
                : "assets/home/hero-230.jpg",
            navigateTo: "/luxary/luxary", // ✅ path param instead of query
          },
          {
            id: "hardcore",
            title: "EXPEDITION & HARDCORE",
            hasData: Boolean(hardcoreTour),
            description:
              hardcoreTour?.shortDescription ||
              "Sorry, right now there is no data in this collection.",
            image:
              hardcoreTour?.images?.[0]
                ? `${BASE_URL}${hardcoreTour.images[0]}`
                : "assets/home/one.jpg",
            navigateTo: "/luxary/hardcore", // ✅ path param instead of query
          },
        ])
      } catch (err) {
        console.error(err)
        setError("Failed to load signature tours.")
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  if (loading) {
    return <div className="py-16 text-center">Loading signature tours...</div>
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => card.hasData && router.push(card.navigateTo)}
              className={`rounded-xl overflow-hidden shadow transition-all
                ${card.hasData
                  ? "cursor-pointer bg-gray-50 hover:shadow-lg hover:translate-x-1"
                  : "cursor-not-allowed bg-gray-100 opacity-75"
                }`}
            >
              <div className="relative h-52">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>

                <p className="text-sm text-gray-600 mb-4">
                  {card.description}
                </p>

                {card.hasData ? (
                  <span className="text-orange-600 font-semibold text-sm">
                    Explore Collection →
                  </span>
                ) : (
                  <span className="text-gray-400 font-semibold text-sm">
                    No tours available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
