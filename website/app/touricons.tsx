"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mountain, Compass, Landmark, Binoculars, Bike, Snowflake } from "lucide-react"

// Define your categories
const categories = [
  {
    id: "trekking",
    name: "Trekking",
    icon: Mountain,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "expeditions",
    name: "Expeditions",
    icon: Compass,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "cultural-tour",
    name: "Cultural Tour",
    icon: Landmark,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: "safari",
    name: "Safari",
    icon: Binoculars,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: "mountain-biking",
    name: "Mountain Biking",
    icon: Bike,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "skiing",
    name: "Skiing",
    icon: Snowflake,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
]

export default function TourIcons() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Tour Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <Link key={cat.id} href={`/tours?category=${cat.id}`}>
                <motion.div
                  className={`group relative bg-white rounded-2xl border-2 ${cat.borderColor} p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-500`}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cat.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    {cat.name}
                  </h3>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
