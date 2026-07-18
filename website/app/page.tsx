"use client";
import {
  Shield,
  Headphones,
  Medal,
  Leaf,
  Compass,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveCarousel from "@/components/responsivecarousel";
import TourIcons from "@/app/touricons";

import {
  heroSection,
  whyChoose,
  featuredExperiences,
  popularDestinations,
  fallbackTestimonials,
  aboutPreview,
} from "@/data/homeContent";
import { getPublicTravelTips, getTrustedCompaniesPublic } from "@/data/utils";
import { BASE_URL } from "@/app/Var";

// Reusable reveal stagger component
function RevealStagger({
  children,
  delayOffset = 0,
}: {
  children: React.ReactNode;
  delayOffset?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: delayOffset,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const toursRes = await axios.get(`${BASE_URL}/api/tours`);
        if (toursRes.data && toursRes.data.data) {
          setTours(toursRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setError("Failed to load tours.");
      } finally {
        setLoading(false);
      }

      try {
        const testRes = await fetch(`${BASE_URL}/api/testimonials`);
        const testData = await testRes.json();
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
          }));
          setTestimonials(mapped);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoadingTestimonials(false);
      }
    }

    loadInitialData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. Asymmetric Left-Aligned Hero */}
      <section className="relative min-h-[100dvh] flex items-center bg-black overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/hero-1.jpg"
            alt="Majestic Karakoram Peaks"
            fill
            className="object-cover opacity-60 scale-105 animate-[scaleOut_20s_infinite_alternate]"
            priority
          />
          {/* Subtle gradient for text readability, avoiding heavy centering */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl space-y-8">
            <RevealStagger delayOffset={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05]">
                {heroSection.headline}
              </h1>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                {heroSection.subheading}
              </p>
            </RevealStagger>

            <RevealStagger delayOffset={0.3}>
              <div className="flex flex-wrap gap-6 pt-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg px-8 py-6 text-lg font-medium"
                  >
                    {heroSection.ctaPrimary}
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white shadow-lg px-8 py-6 text-lg font-medium backdrop-blur-sm"
                  >
                    {heroSection.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Tour Categories Quick Access - Adjusted to fit new palette */}
      <div className="relative -mt-16 z-20 container mx-auto px-4">
        <div className="bg-background border border-border rounded-2xl shadow-xl p-8">
          <TourIcons />
        </div>
      </div>

      {/* 2. About Preview - Split Screen Editorial */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealStagger>
              <div className="relative h-[600px] w-full rounded-none overflow-hidden">
                <Image
                  src={aboutPreview.image || "/placeholder.svg"}
                  alt="Exploring Silk Road Routes"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>

            <div className="space-y-8">
              <RevealStagger delayOffset={0.1}>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                  {aboutPreview.title}
                </h2>
              </RevealStagger>

              <RevealStagger delayOffset={0.2}>
                <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-prose">
                  {aboutPreview.description}
                </p>
              </RevealStagger>

              <RevealStagger delayOffset={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border mt-8">
                  {aboutPreview.stats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="font-display text-4xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.4}>
                <div className="pt-8">
                  <Link href="/about">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 text-lg font-medium group"
                    >
                      Read Our Complete Story
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us - Asymmetric Bento Grid */}
      <section className="py-32 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <RevealStagger>
            <div className="max-w-3xl mb-20 space-y-6">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                {whyChoose.title}
              </h2>
              <p className="text-muted-foreground text-xl font-light leading-relaxed">
                {whyChoose.description}
              </p>
            </div>
          </RevealStagger>

          {/* Bento Grid: 2 top cards, 3 bottom cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.reasons.map((reason, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.1}>
                <div
                  className={`bg-background border border-border p-10 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-500
                  ${idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                  ${idx === 1 ? "md:col-span-1 lg:col-span-1" : ""}
                `}
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                      {reason.icon === "medal" && <Medal className="w-5 h-5" />}
                      {reason.icon === "map-pin" && (
                        <MapPin className="w-5 h-5" />
                      )}
                      {reason.icon === "compass" && (
                        <Compass className="w-5 h-5" />
                      )}
                      {reason.icon === "shield" && (
                        <Shield className="w-5 h-5" />
                      )}
                      {reason.icon === "leaf" && <Leaf className="w-5 h-5" />}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Experiences */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl space-y-6">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                  Featured Experiences
                </h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Explore our core pillars of adventure and discovery, carefully
                  designed to introduce you to the ultimate highlights of
                  Pakistan and Central Asia.
                </p>
              </div>
              <Link href="/tours">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                >
                  View All Experiences
                </Button>
              </Link>
            </div>
          </RevealStagger>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredExperiences.map((experience, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.15}>
                <div className="group cursor-pointer">
                  <div className="relative h-[400px] mb-6 overflow-hidden bg-muted">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  <span className="text-primary font-medium flex items-center group-hover:underline underline-offset-4">
                    Explore Options
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Popular Destinations */}
      <section className="py-32 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16 max-w-2xl">
              Explore Pakistan's Most Remarkable Destinations
            </h2>
          </RevealStagger>

          <ResponsiveCarousel
            title=""
            items={popularDestinations}
            renderCard={(dest) => (
              <div className="h-[480px] w-[340px] flex flex-col bg-background overflow-hidden group border border-border">
                <div className="relative h-3/5 w-full overflow-hidden">
                  <img
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {dest.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {dest.tours} Packages
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* 6. Testimonials - Minimalist layout */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-20 text-center">
              Voices of Our Guests
            </h2>
          </RevealStagger>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.1}>
                <div className="space-y-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div>
                      <h4 className="font-display font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.tour}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTAs */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 text-center space-y-10 relative z-10 max-w-3xl">
          <RevealStagger>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Start Planning Your Journey
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-primary-foreground/80 text-xl font-light leading-relaxed mx-auto">
              Whether you dream of exploring Pakistan's rich cultural heritage,
              discovering the spectacular Karakoram Mountains, following the
              ancient Silk Road, or embarking on a challenging trekking
              expedition, our experienced team is ready to help.
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-medium px-10 py-7 shadow-2xl"
                >
                  Plan Your Tour
                </Button>
              </Link>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-lg font-medium px-10 py-7 backdrop-blur-sm flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Our Specialists
                </Button>
              </a>
            </div>
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
