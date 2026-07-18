"use client";
import { Shield, Headphones, Medal, Leaf, Compass, MapPin, Award, Star, Quote, ArrowRight, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ResponsiveCarousel from "@/components/responsivecarousel"
import TourIcons from "@/app/touricons"

import { heroSection, whyChoose, featuredExperiences, popularDestinations, fallbackTestimonials, aboutPreview } from "@/data/homeContent"
import { getPublicTravelTips, getTrustedCompaniesPublic } from "@/data/utils"
import { BASE_URL } from "@/app/Var"

export default function Home() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [tips, setTips] = useState<any[]>([])
  const [loadingTips, setLoadingTips] = useState(true)
  const [trustedCompanies, setTrustedCompanies] = useState<any[]>([])
  const [loadingCompanies, setLoadingCompanies] = useState(true)

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    async function loadInitialData() {
      try {
        const toursRes = await axios.get(`${BASE_URL}/api/tours`)
        if (toursRes.data && toursRes.data.data) {
          setTours(toursRes.data.data)
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err)
        setError("Failed to load tours.")
      } finally {
        setLoading(false)
      }

      try {
        const testRes = await fetch(`${BASE_URL}/api/testimonials`)
        const testData = await testRes.json()
        if (testData.success && testData.data && testData.data.length > 0) {
          const mapped = testData.data.map((t: any) => ({
            id: t._id,
            name: t.name,
            location: t.location,
            rating: t.rating,
            text: t.feedback,
            image: t.image,
            tour: t.tripName,
            date: new Date(t.tripDate).toLocaleDateString(),
          }))
          setTestimonials(mapped)
        } else {
          setTestimonials(fallbackTestimonials)
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
        setTestimonials(fallbackTestimonials)
      } finally {
        setLoadingTestimonials(false)
      }

      try {
        const tipsData = await getPublicTravelTips()
        setTips(tipsData)
      } catch (err) {
        console.error("Failed to fetch tips:", err)
      } finally {
        setLoadingTips(false)
      }

      try {
        const compData = await getTrustedCompaniesPublic()
        setTrustedCompanies(compData)
      } catch (err) {
        console.error("Failed to fetch companies:", err)
      } finally {
        setLoadingCompanies(false)
      }
    }

    loadInitialData()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(timer)
  }, [testimonials])

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/hero-1.jpg"
            alt="Majestic Karakoram Peaks"
            fill
            className="object-cover opacity-70 scale-105 animate-[scaleOut_20s_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative text-left">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 text-sm rounded-full backdrop-blur-md">
              EST. 1990 — 35+ Years of Trust
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {heroSection.headline}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl">
              {heroSection.subheading}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {heroSection.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tours">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {heroSection.ctaSecondary}
                </Button>
              </Link>
              <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-none shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 fill-white text-green-600" />
                  {heroSection.ctaWhatsApp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Categories Quick Access */}
      <div className="relative -mt-16 z-20 container mx-auto px-4">
        <div className="bg-card/75 border border-muted-foreground/10 rounded-3xl shadow-2xl backdrop-blur-xl p-6">
          <TourIcons />
        </div>
      </div>

      {/* Why Choose Mountain Travels Pakistan */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {whyChoose.title}
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              {whyChoose.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.reasons.map((reason, idx) => (
              <Card key={idx} className="bg-muted/30 border-muted-foreground/10 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {reason.icon === "medal" && <Medal className="w-6 h-6" />}
                    {reason.icon === "map-pin" && <MapPin className="w-6 h-6" />}
                    {reason.icon === "compass" && <Compass className="w-6 h-6" />}
                    {reason.icon === "shield" && <Shield className="w-6 h-6" />}
                    {reason.icon === "leaf" && <Leaf className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-muted/30 border-y border-muted-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-muted-foreground/10">
              <Image
                src={aboutPreview.image || "/placeholder.svg"}
                alt="Exploring Silk Road Routes"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-none">Our Story</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {aboutPreview.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                {aboutPreview.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-muted-foreground/10">
                {aboutPreview.stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Link href="/about">
                  <Button size="lg" className="group">
                    Read Our Complete Story
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Featured Travel Experiences
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Explore our core pillars of adventure and discovery, carefully designed to introduce you to the ultimate highlights of Pakistan and Central Asia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience, idx) => (
              <Card key={idx} className="bg-card border-muted-foreground/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                <div className="relative h-56">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">{experience.title}</h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  <Link href="/tours">
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 font-bold group/btn">
                      Explore Options
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Carousel */}
      <section className="py-24 bg-muted/30 border-y border-muted-foreground/10">
        <div className="container mx-auto px-4">
          <ResponsiveCarousel
            title="Explore Pakistan's Most Remarkable Destinations"
            items={popularDestinations}
            renderCard={(dest) => (
              <div className="h-[430px] w-[360px] p-4 flex flex-col justify-between bg-card border border-muted-foreground/10 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 shadow-sm">
                    <img
                      src={dest.image || "/placeholder.svg"}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{dest.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{dest.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-muted-foreground/10">
                  <span className="text-sm font-medium text-primary">{dest.tours} Core Packages</span>
                  <Link href="/tours">
                    <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute -top-10 -left-10 text-9xl text-primary"><Quote /></div>
          <div className="absolute bottom-10 right-10 text-9xl text-primary transform rotate-180"><Quote /></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-none">Guest Reviews</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              What Our International Guests Say
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              Read real reviews from explorers, photographers, and mountaineers who have traveled with us.
            </p>
          </div>

          <div className="relative bg-muted/20 border border-muted-foreground/10 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm">
            {testimonials.length > 0 && testimonials[currentTestimonialIndex] && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  {[...Array(testimonials[currentTestimonialIndex].rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg md:text-2xl text-foreground italic font-light leading-relaxed">
                  "{testimonials[currentTestimonialIndex].text}"
                </p>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-foreground">
                    {testimonials[currentTestimonialIndex].name}
                  </h4>
                  <p className="text-sm text-primary font-medium">
                    {testimonials[currentTestimonialIndex].tour} ({testimonials[currentTestimonialIndex].location})
                  </p>
                  {testimonials[currentTestimonialIndex].date && (
                    <p className="text-xs text-muted-foreground">{testimonials[currentTestimonialIndex].date}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonialIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailor-Made Travel Section */}
      <section className="py-24 bg-muted/50 border-t border-muted-foreground/10">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-muted-foreground/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent)] hidden lg:block" />
            <div className="max-w-3xl space-y-6 relative z-10">
              <Badge className="bg-primary/10 text-primary border-none">Bespoke Journeys</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Tailor-Made Travel Specialists
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                No two travelers are alike. Whether you are interested in culture, photography, history, trekking, wildlife, archaeology, mountain landscapes, or Silk Road exploration, our specialists will create a customized itinerary designed specifically for you.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-transform hover:-translate-y-1">
                    Request a Custom Itinerary
                  </Button>
                </Link>
                <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 fill-primary text-background" />
                    WhatsApp Us Today
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTAs & Start Planning Your Journey */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent)]" />
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Start Planning Your Journey
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Whether you dream of exploring Pakistan's rich cultural heritage, discovering the spectacular Karakoram Mountains, following the ancient Silk Road, or embarking on a challenging trekking expedition, our experienced team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-sm md:text-base font-bold shadow-2xl transition-transform hover:-translate-y-1">
                Plan Your Tour
              </Button>
            </Link>
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-bold shadow-2xl transition-transform hover:-translate-y-1 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 fill-white text-primary" />
                WhatsApp Our Specialists
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
