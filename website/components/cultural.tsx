"use client"

import { X } from "lucide-react"

interface CultureModalProps {
  open: boolean
  onClose: () => void
}

export default function CultureModal({ open, onClose }: CultureModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[90%] max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-orange-500 text-white hover:bg-red-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[80vh] px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            CULTURE & RESPONSIBLE TRAVEL
          </h2>

          <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
            We work closely with local communities, respect cultural traditions and operate
            with a strong commitment to environmental responsibility. Our journeys create
            meaningful connections while preserving the landscapes and heritage we love.
          </p>
        </div>
      </div>
    </div>
  )
}
