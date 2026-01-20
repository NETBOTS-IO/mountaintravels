"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface CultureModalProps {
  open: boolean
  onClose: () => void
}

export default function CultureModal({ open, onClose }: CultureModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Example cards data
  const cards = [
    {
      title: "Community Engagement",
      content:
        "We collaborate with local communities to create meaningful tourism experiences.",
    },
    {
      title: "Cultural Preservation",
      content:
        "Respecting traditions and preserving heritage is central to our journeys.",
    },
    {
      title: "Environmental Responsibility",
      content:
        "We operate with sustainability in mind, protecting landscapes and wildlife.",
    },
    {
      title: "Safe & Ethical Travel",
      content:
        "Our itineraries prioritize safety, ethical practices, and local wellbeing.",
    },
  ]

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  if (!mounted || !open) return null

  return createPortal(
    <>
      {isMobile ? (
        // MOBILE APP-LIKE
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h2 className="text-lg font-semibold">
              Culture & Responsible Travel
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-orange-500 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border shadow-sm p-6 text-center bg-gray-50"
              >
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // DESKTOP MODAL
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Box */}
          <div className="relative w-[90%] max-w-4xl max-h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b bg-white">
              <h2 className="text-xl font-bold">
                CULTURE & RESPONSIBLE TRAVEL
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-orange-500 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="rounded-3xl border shadow-sm p-6 text-center bg-gray-50"
                >
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}
