"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Compass, Mountain, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { destinationsIntro, popularDestinations, beyondPakistan } from "@/data/destinationsContent"

export default function DestinationsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{destinationsIntro.title}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {destinationsIntro.description}
          </p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:gap-16">
            {popularDestinations.map((dest, index) => (
              <div 
                key={dest.id} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-stretch bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[400px]">
                  <Image 
                    src={dest.image || "/placeholder.svg"} 
                    alt={dest.name} 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="font-semibold text-primary flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Destination
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{dest.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dest.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center text-primary">
                      <Compass className="w-5 h-5 mr-2" />
                      Key Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dest.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-gray-700 italic mb-8 border-l-4 border-primary pl-4">
                    "{dest.appeal}"
                  </p>

                  <div className="mt-auto">
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 uppercase tracking-wider">Suggested Tours</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dest.suggestedTours.map((tour, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {tour}
                        </span>
                      ))}
                    </div>
                    <Link href={`/tours`}>
                      <Button className="w-full sm:w-auto">View Related Tours</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Pakistan Section */}
      <section className="py-20 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Mountain className="w-12 h-12 mx-auto text-primary mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{beyondPakistan.title}</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {beyondPakistan.description}
          </p>
          <p className="text-lg text-gray-900 font-medium italic mb-8">
            "{beyondPakistan.closing}"
          </p>
          <Link href="/tours">
            <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-white">
              Explore Silk Road Tours
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
