"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Medal, Users, MapPin, Headphones, Leaf } from "lucide-react"

// Map icons dynamically
const iconsMap: Record<string, any> = {
  shield: Shield,
  users: Users,
  mapPin: MapPin,
  headphones: Headphones,
  leaf: Leaf,
  medal: Medal,
}

// Full list of reasons (all from your list)
export const whyChoose = {
  title: "Why Choose Mountain Travels Pakistan",
  reasons: [
    { id: "tailor-made", title: "Tailor-Made, Private & Small-Group Journeys", icon: "users", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    { id: "private", title: "Private & Small-Group Journeys",  icon: "users", color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
    { id: "comfort", title: "Comfort-Focused Camps, Lodges & Logistics", icon: "shield", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
    { id: "cultural-access", title: "Cultural Access Beyond the Ordinary", icon: "mapPin", color: "from-green-500 to-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
    { id: "discreet-support", title: "Discreet, Attentive On-Ground Support", icon: "headphones", color: "from-red-500 to-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
    { id: "flexible-pacing", title: "Flexible Pacing & Personalized Experiences", icon: "leaf", color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
    { id: "experience", title: "Decades of High-Altitude & Remote-Area Experience", icon: "medal", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    { id: "guides-staff", title: "Highly Trained Guides, Porters & Support Staff", icon: "users", color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
    { id: "safety-protocols", title: "Robust Safety Protocols & Emergency Planning", icon: "shield", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
    { id: "knowledge", title: "Deep Knowledge of Terrain, Weather & Routes", icon: "mapPin", color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
    { id: "trusted", title: "Trusted by International Tour Designers / International Expedition Teams & High-End Clients", icon: "medal", color: "from-red-400 to-red-500", bgColor: "bg-red-50", borderColor: "border-red-200" },
    { id: "internationals", title: "International Expedition Teams & High-End Clients", icon: "medal", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },

  ],
}

export default function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {whyChoose.title}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyChoose.reasons.map((reason) => {
            const Icon = iconsMap[reason.icon]
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                className={`group relative bg-white p-5 rounded-xl border ${reason.borderColor} hover:shadow-lg transition-all duration-300 overflow-hidden`}
                whileHover={{ y: -3, scale: 1.01 }}
              >
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${reason.color} rounded-full mb-3 group-hover:scale-105 transition-transform duration-300`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {reason.title}
                </h3>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
