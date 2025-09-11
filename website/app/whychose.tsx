"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Medal, Users, MapPin, Headphones, Leaf } from "lucide-react"

// Map your icons dynamically
const iconsMap: Record<string, any> = {
  shield: Shield,
  users: Medal,
  mapPin: MapPin,
  headphones: Headphones,
  leaf: Leaf,
  medal: Users,
}

export const whyChoose = {
  title: "Why Choose Mountain Travels Pakistan",
  reasons: [
    {
      id: "safety",
      title: "Safety First",
      description:
        "Your safety is our top priority with certified guides, comprehensive insurance coverage, and rigorous safety protocols.",
      icon: "shield",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "guides",
      title: "Expert Guides",
      description:
        "Local experts with years of experience, deep destination knowledge, and passion for sharing their culture.",
      icon: "users",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "exclusive",
      title: "Exclusive Access",
      description:
        "Access to exclusive destinations, hidden gems, and off-the-beaten-path locations around the world.",
      icon: "mapPin",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "support",
      title: "24/7 Support",
      description:
        "Round-the-clock assistance before, during, and after your journey with dedicated support team.",
      icon: "headphones",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: "sustainability",
      title: "Sustainable Travel",
      description:
        "Committed to responsible tourism that benefits local communities and preserves natural environments.",
      icon: "leaf",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      id: "smallgroup",
      title: "Small Groups",
      description:
        "Enjoy personalized experiences in intimate groups with meaningful connections.",
      icon: "medal",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ],
}

export default function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {whyChoose.title}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whyChoose.reasons.map((reason, idx) => {
            const Icon = iconsMap[reason.icon]
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                className={`group relative bg-white p-8 rounded-2xl border-2 ${reason.borderColor} hover:shadow-xl transition-all duration-500 overflow-hidden`}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Circle Background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${reason.bgColor} rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Circle Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${reason.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Text */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
