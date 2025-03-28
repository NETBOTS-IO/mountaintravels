"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Calendar,
  Users,
  Mountain,
  Compass,
  Bike,
  Snowflake,
  Landmark,
  Tent,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { featuredTours, aboutPreview } from "@/data/homeContent"
import { tourCategories } from "@/data/tourPackages"

const heroSlides = [
  {
    image: "/assets/home/hero-1.jpg",
    title: "Discover Pakistan's Majestic Mountains",
    description: "Experience the adventure of a lifetime with Mountain Travels Pakistan",
  },
  {
    image: "/assets/home/hero-2.jpg",
    title: "Explore Ancient Cultures",
    description: "Immerse yourself in the rich traditions of Pakistan's diverse regions",
  },
  {
    image: "/assets/home/hero-3.jpg",
    title: "Adventure Awaits",
    description: "From trekking to expeditions, create unforgettable memories",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[calc(100vh-4rem)] flex items-center justify-center">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Tour Categories */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Explore Tour Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {tourCategories
              .filter((category) => category.id !== "all")
              .map((category) => (
                <Link key={category.id} href={`/tours?category=${category.id}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full group">
                    <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-4 group-hover:bg-primary/20 transition-colors">
                        {getIcon(category.icon)}
                      </div>
                      <h3 className="font-bold text-sm md:text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Featured Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredTours.map((tour) => (
              <Link key={tour.id} href={`/tours/detail/${tour.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
                  <div className="relative h-48 md:h-64">
                    <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                      <Badge className="bg-secondary text-white text-xs md:text-sm">{tour.difficulty}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4">{tour.description}</p>
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                      <div className="flex items-center text-xs md:text-sm">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 text-primary" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-xs md:text-sm">
                        <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 text-primary" />
                        <span>Small Group</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg md:text-xl text-primary">${tour.price}</span>
                      <Button
                        variant="outline"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors text-xs md:text-sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link href="/tours">
              <Button size="lg" className="text-sm md:text-base">
                View All Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-64 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={aboutPreview.image || "/placeholder.svg"}
                alt="About Mountain Travels Pakistan"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{aboutPreview.title}</h2>
              <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">{aboutPreview.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {aboutPreview.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button className="group text-sm md:text-base">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Contact us today to start planning your perfect Pakistan adventure
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-colors text-sm md:text-base w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/tours">
              <Button
                size="lg"
                className="bg-secondary text-white hover:bg-secondary/90 transition-colors text-sm md:text-base w-full sm:w-auto"
              >
                Explore Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function getIcon(icon: string) {
  switch (icon) {
    case "hiking":
      return <Compass className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    case "mountain":
      return <Mountain className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    case "bike":
      return <Bike className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    case "skiing":
      return <Snowflake className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    case "landmark":
      return <Landmark className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    case "compass":
      return <Tent className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    default:
      return null
  }
}

