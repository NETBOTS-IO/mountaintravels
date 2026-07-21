"use client";
import {
  Shield,
  Medal,
  Leaf,
  Compass,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TourIcons from "@/app/touricons";
import CustomItineraryModal from "@/components/customItineraryModal";

import {
  heroSection,
  whyChoose,
  featuredExperiences,
  aboutPreview,
  silkRoadSection,
  tailorMadeSection,
  responsibleTourismPreview,
  faqSection,
} from "@/data/homeContent";
import { BASE_URL } from "@/app/Var";

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
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
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
  const [destinations, setDestinations] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [destsLoading, setDestsLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  // Keep a single loading flag for legacy compatibility (hero etc.)
  const loading = toursLoading && destsLoading;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  useEffect(() => {
    // ── Tours ──────────────────────────────────────────────
    axios
      .get(`${BASE_URL}/api/tours`)
      .then((res) => {
        if (Array.isArray(res.data?.data)) setTours(res.data.data);
      })
      .catch((err) => console.error("Tours fetch failed:", err))
      .finally(() => setToursLoading(false));

    // ── Destinations ──────────────────────────────────────
    axios
      .get(`${BASE_URL}/api/destinations`)
      .then((res) => {
        if (Array.isArray(res.data?.data)) setDestinations(res.data.data);
      })
      .catch((err) => console.error("Destinations fetch failed:", err))
      .finally(() => setDestsLoading(false));

    // ── Testimonials ──────────────────────────────────────
    fetch(`${BASE_URL}/api/testimonials`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data))
          setTestimonials(data.data);
      })
      .catch((err) => console.error("Testimonials fetch failed:", err))
      .finally(() => setTestimonialsLoading(false));
  }, []);

  const experiencesRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let expDir = 1;
    let destDir = 1;
    const autoScroll = (ref: any, dir: number) => {
      if (ref && ref.current) {
        const container = ref.current;
        if (
          dir === 1 &&
          container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 10
        ) {
          return -1;
        } else if (dir === -1 && container.scrollLeft <= 10) {
          return 1;
        }
        container.scrollBy({ left: dir * 320, behavior: "smooth" });
      }
      return dir;
    };

    const interval = setInterval(() => {
      expDir = autoScroll(experiencesRef, expDir);
      destDir = autoScroll(destinationsRef, destDir);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slideLeft = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const slideRight = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. Hero Section - Locked to screen height (fit viewport) */}
      <section className="relative h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] flex items-center bg-black overflow-hidden py-6">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/assets/home/hero-1.webp"
            alt="Majestic Karakoram Peaks"
            fill
            className="object-cover opacity-65 scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl space-y-4">
            <RevealStagger delayOffset={0.1}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#ff9800] bg-white/10 backdrop-blur-md border border-white/15">
                Official Tourism Specialist Since 1990
              </span>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {heroSection.headline}
              </h1>
            </RevealStagger>

            <RevealStagger delayOffset={0.3}>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-200 font-light leading-relaxed max-w-xl drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)] line-clamp-2 md:line-clamp-3">
                {heroSection.subheading}
              </p>
            </RevealStagger>

            <RevealStagger delayOffset={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    className="w-full sm:w-auto bg-[#45919c] text-white shadow-lg hover:shadow-[0_0_20px_rgba(69,145,156,0.6)] hover:scale-105 transition-all duration-300 font-bold px-8 py-5 rounded-full text-sm relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {heroSection.ctaPrimary}
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </Button>
                </Link>
                <Link href="/tours" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-white/50 bg-transparent text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 font-bold px-8 py-5 rounded-full backdrop-blur-md text-sm relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {heroSection.ctaSecondary}
                    </span>
                    <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </Button>
                </Link>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Tour Categories Quick Access */}
      <div className="relative -mt-8 md:-mt-10 z-20 container mx-auto px-4 max-w-5xl">
        <div className="bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-xl p-4 md:p-5 hover:shadow-2xl hover:border-[#45919c]/20 transition-all duration-300">
          <TourIcons />
        </div>
      </div>

      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <RevealStagger>
              <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full rounded-lg border border-border overflow-hidden bg-muted">
                <Image
                  src="/assets/home/hero-1.webp"
                  alt="Exploring Silk Road Routes"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>

            <div className="space-y-4">
              <RevealStagger delayOffset={0.1}>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {aboutPreview.title}
                </h2>
              </RevealStagger>

              <RevealStagger delayOffset={0.2}>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
                  {aboutPreview.description}
                </p>
              </RevealStagger>

              <RevealStagger delayOffset={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border mt-4">
                  {aboutPreview.stats.map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.4}>
                <div className="pt-2">
                  <Link href="/about">
                    <Button
                      variant="link"
                      className="text-primary hover:text-[#ff9800] p-0 text-sm font-semibold group transition-colors hover:bg-transparent"
                    >
                      Read Our Complete Story
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-gray-100 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="max-w-2xl mb-8 space-y-3">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {whyChoose.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">
                {whyChoose.description}
              </p>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.reasons.map((reason, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border p-6 h-full flex flex-col justify-between rounded-2xl hover:border-[#45919c]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#45919c]/10 text-[#45919c] group-hover:bg-[#ff9800]/10 group-hover:text-[#ff9800] transition-colors duration-300 flex items-center justify-center">
                      {reason.icon === "medal" && <Medal className="w-6 h-6" />}
                      {reason.icon === "map-pin" && (
                        <MapPin className="w-6 h-6" />
                      )}
                      {reason.icon === "compass" && (
                        <Compass className="w-6 h-6" />
                      )}
                      {reason.icon === "shield" && (
                        <Shield className="w-6 h-6" />
                      )}
                      {reason.icon === "leaf" && <Leaf className="w-6 h-6" />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl space-y-4">
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Featured Experiences
                </h2>
                <p className="text-muted-foreground text-base font-light leading-relaxed">
                  Explore our core pillars of adventure and discovery, carefully
                  designed to introduce you to the ultimate highlights of
                  Pakistan and Central Asia.
                </p>
              </div>
              <div className="flex items-center space-x-3 self-end">
                <button
                  onClick={() => slideLeft(experiencesRef)}
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 shadow-md flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] hover:shadow-lg transition-all duration-300 z-10 relative"
                  aria-label="Slide Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => slideRight(experiencesRef)}
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 shadow-md flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] hover:shadow-lg transition-all duration-300 z-10 relative"
                  aria-label="Slide Right"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </RevealStagger>

          <div
            ref={experiencesRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {featuredExperiences.map((experience, idx) => {
              const linkTarget =
                experience.id === "cultural-tours"
                  ? "/tours?pillar=pakistan-tours&search=Cultural"
                  : experience.id === "northern-pakistan"
                    ? "/tours?pillar=pakistan-tours"
                    : experience.id === "luxury-private"
                      ? "/tours?search=Luxury"
                      : experience.id === "silk-road"
                        ? "/tours?pillar=silk-road-central-asia&search=Silk"
                        : experience.id === "central-asia"
                          ? "/tours?pillar=silk-road-central-asia"
                          : experience.id === "trekking-expeditions"
                            ? "/tours?pillar=trekking-expeditions"
                            : "/tours";

              return (
                <RevealStagger key={idx} delayOffset={idx * 0.05}>
                  <Link
                    href={linkTarget}
                    className="group border border-border flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start hover:shadow-2xl hover:border-[#ff9800]/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between bg-card rounded-2xl overflow-hidden relative block"
                  >
                    {/* Full-card hover overlay */}
                    <div className="absolute inset-0 bg-[#45919c]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 flex flex-col items-center justify-center text-white backdrop-blur-[3px] rounded-2xl pointer-events-none">
                      <span className="font-display text-xl font-bold mb-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 text-white text-center px-4">
                        Click to Explore
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <span className="text-sm text-white/80">
                          View Details
                        </span>
                        <ArrowRight className="w-5 h-5 text-[#ff9800]" />
                      </div>
                    </div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={experience.image || "/assets/home/hero-1.webp"}
                        alt={experience.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <h3 className="absolute bottom-4 left-4 font-display text-lg font-bold text-white pr-4 transition-colors duration-300 z-20">
                        {experience.title}
                      </h3>
                    </div>
                    <div className="p-5 space-y-4 flex flex-col justify-between flex-grow bg-white">
                      <p className="text-muted-foreground font-light text-xs leading-relaxed line-clamp-3">
                        {experience.description}
                      </p>
                      <div className="pt-2 block">
                        <span className="text-primary text-xs font-semibold flex items-center">
                          Explore Options
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealStagger>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl">
                Explore Pakistan's Most Remarkable Destinations
              </h2>
              <div className="flex items-center space-x-3 self-end">
                <button
                  onClick={() => slideLeft(destinationsRef)}
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 shadow-md flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] hover:shadow-lg transition-all duration-300 z-10 relative"
                  aria-label="Slide Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => slideRight(destinationsRef)}
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 shadow-md flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] hover:shadow-lg transition-all duration-300 z-10 relative"
                  aria-label="Slide Right"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </RevealStagger>

          {/* Destinations scroll row */}
          <div
            ref={destinationsRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {/* Skeleton while loading */}
            {destsLoading &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start rounded-2xl overflow-hidden border border-border animate-pulse"
                >
                  <div className="h-44 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="mt-4 pt-3 border-t border-border flex justify-between">
                      <div className="h-3 bg-muted rounded w-20" />
                      <div className="h-3 bg-muted rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}

            {/* Empty state (loaded but no data) */}
            {!destsLoading && destinations.length === 0 && (
              <div className="w-full text-center py-16 text-muted-foreground">
                <p className="text-sm">
                  No destinations found. Please check back later.
                </p>
              </div>
            )}

            {/* Real DB data */}
            {!destsLoading &&
              destinations.map((dest, idx) => {
                const destName = dest?.shortName || dest?.name || "Destination";
                const destDesc = dest?.description || "";
                const destSlug = destName.split("–")[0].trim();
                const destImage = dest?.image || null;
                const destTours = dest?.tours ?? 0;
                return (
                  <RevealStagger
                    key={dest._id || dest.slug || idx}
                    delayOffset={idx * 0.05}
                  >
                    <Link
                      href={`/destinations/${dest._id || dest.slug}`}
                      className="bg-background border border-border flex-shrink-0 w-[280px] sm:w-[320px] snap-start hover:shadow-2xl hover:border-[#ff9800]/50 hover:-translate-y-2 transition-all duration-500 rounded-2xl overflow-hidden group block relative"
                    >
                      {/* Full-card hover overlay */}
                      <div className="absolute inset-0 bg-[#45919c]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 flex flex-col items-center justify-center text-white backdrop-blur-[3px] rounded-2xl pointer-events-none">
                        <span className="font-display text-xl font-bold mb-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 text-white text-center px-4">
                          Click to Explore
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                          <span className="text-sm text-white/80">
                            {destSlug}
                          </span>
                          <ArrowRight className="w-5 h-5 text-[#ff9800]" />
                        </div>
                      </div>
                      <div className="relative h-44 w-full overflow-hidden bg-muted">
                        {destImage ? (
                          <Image
                            src={
                              destImage.startsWith("http")
                                ? destImage
                                : `${BASE_URL}${destImage || ""}`
                            }
                            alt={destName}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <MapPin className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                        <h3 className="absolute bottom-4 left-4 font-display text-lg font-bold text-white transition-colors duration-300 z-20">
                          {destSlug}
                        </h3>
                      </div>
                      <div className="p-5 flex flex-col justify-between bg-white">
                        <p className="text-muted-foreground font-light text-xs leading-relaxed line-clamp-3">
                          {destDesc}
                        </p>
                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {destTours} Packages
                          </span>
                          <div className="text-[10px] font-bold text-primary flex items-center gap-1">
                            View Details
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </RevealStagger>
                );
              })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[#45919c]/5 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6 relative z-10">
          <RevealStagger>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {silkRoadSection.title}
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              {silkRoadSection.text}
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <Link href="/tours">
              <Button className="mt-4 bg-[#45919c] text-white px-8 py-6 text-sm font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(69,145,156,0.6)] transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10">
                  Explore Silk Road Journeys
                </span>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 bg-[#f0f7f8] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <RevealStagger>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {tailorMadeSection.title}
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-base text-primary font-bold uppercase tracking-wider text-[#ff9800]">
              {tailorMadeSection.subtitle}
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              {tailorMadeSection.text}
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.3}>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="mt-4 px-8 py-6 text-sm font-bold border-2 border-primary text-primary bg-transparent hover:bg-transparent hover:shadow-[0_0_15px_rgba(69,145,156,0.4)] hover:scale-105 rounded-full transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get a Custom Itinerary</span>
              <div className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full" />
            </Button>
          </RevealStagger>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-[#45919c]/5 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Voices of Our Guests
              </h2>
              {!testimonialsLoading && testimonials.length > 1 && (
                <div className="flex items-center space-x-3 self-end">
                  <button
                    onClick={() =>
                      setCurrentTestimonialIndex((prev) =>
                        prev === 0 ? testimonials.length - 1 : prev - 1,
                      )
                    }
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300 z-10 shadow-sm bg-background"
                    aria-label="Previous Testimonial"
                  >
                    &larr;
                  </button>
                  <button
                    onClick={() =>
                      setCurrentTestimonialIndex(
                        (prev) => (prev + 1) % testimonials.length,
                      )
                    }
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300 z-10 shadow-sm bg-background"
                    aria-label="Next Testimonial"
                  >
                    &rarr;
                  </button>
                </div>
              )}
            </div>
          </RevealStagger>

          {/* Skeleton while loading */}
          {testimonialsLoading && (
            <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-border bg-muted/30 p-8 animate-pulse">
              <div className="flex flex-col items-center gap-4">
                <div className="h-3 bg-muted rounded w-4/5" />
                <div className="h-3 bg-muted rounded w-3/5" />
                <div className="h-3 bg-muted rounded w-2/5 mt-4" />
                <div className="w-14 h-14 rounded-full bg-muted mt-2" />
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-48" />
              </div>
            </div>
          )}

          {/* Testimonial card from DB */}
          {!testimonialsLoading && testimonials.length > 0 && (
            <div className="relative w-full max-w-4xl mx-auto perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col justify-center bg-gradient-to-br from-[#112a30]/5 via-background to-[#ff9800]/5 border border-[#45919c]/10 rounded-[2rem] p-6 md:p-8 shadow-xl backdrop-blur-md overflow-hidden relative"
                >
                  <div className="absolute -top-6 -left-2 text-[140px] text-[#45919c]/10 font-serif pointer-events-none select-none leading-none">
                    &ldquo;
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
                    <p className="text-sm md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed italic px-4 md:px-12 mb-6">
                      "{testimonials[currentTestimonialIndex]?.feedback}"
                    </p>
                    <div className="flex flex-col items-center gap-3 mt-auto">
                      {testimonials[currentTestimonialIndex]?.image ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-lg ring-4 ring-[#45919c]/10">
                          <Image
                            src={
                              testimonials[
                                currentTestimonialIndex
                              ].image.startsWith("http")
                                ? testimonials[currentTestimonialIndex].image
                                : `${BASE_URL}${testimonials[currentTestimonialIndex].image || ""}`
                            }
                            alt={
                              testimonials[currentTestimonialIndex]?.name ||
                              "Guest"
                            }
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#45919c] to-[#2c5f66] text-white font-bold text-xl flex shrink-0 items-center justify-center shadow-lg ring-4 ring-[#45919c]/10">
                          {(
                            testimonials[currentTestimonialIndex]?.name || "G"
                          ).charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-bold text-foreground text-base md:text-lg">
                          {testimonials[currentTestimonialIndex]?.name}
                        </h4>
                        <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                          {testimonials[currentTestimonialIndex]?.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Empty state */}
          {!testimonialsLoading && testimonials.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-10">
              No testimonials available.
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-100 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <RevealStagger>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {responsibleTourismPreview.title}
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              {responsibleTourismPreview.text}
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <Link href="/about">
              <Button
                variant="link"
                className="text-primary hover:text-[#ff9800] text-sm font-semibold hover:underline p-0 transition-colors hover:bg-transparent"
              >
                Our Commitment to Local Communities →
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground mb-10 text-center">
              {faqSection.title}
            </h2>
          </RevealStagger>

          <RevealStagger delayOffset={0.1}>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqSection.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-border py-1"
                >
                  <AccordionTrigger className="font-display font-semibold text-base hover:text-[#ff9800] hover:no-underline transition-colors text-left py-3">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light text-sm leading-relaxed pt-1 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealStagger>
        </div>
      </section>

      <section
        className="py-24 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #112a30 0%, #1c4b57 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent)]" />
        <div className="container mx-auto px-4 text-center space-y-6 relative z-10 max-w-2xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Start Planning Your Journey
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-gray-300 text-base font-light leading-relaxed mx-auto max-w-xl">
              Whether you dream of exploring Pakistan's rich cultural heritage,
              discovering the spectacular Karakoram Mountains, following the
              ancient Silk Road, or embarking on a challenging trekking
              expedition, our experienced team is ready to help.
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#ff9800] text-white hover:shadow-[0_0_20px_rgba(255,152,0,0.6)] hover:-translate-y-1 font-bold px-8 py-6 rounded-full text-sm transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </Button>
              </Link>
              <a
                href="https://wa.me/923398486900?text=Hi!%20I%20am%20coming%20from%20your%20website%20regarding%20custom%20queries."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="default"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#ff9800] hover:scale-[1.02] text-white text-base font-semibold px-8 py-6 rounded-full backdrop-blur-sm flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4 text-[#ff9800]" />
                  WhatsApp Our Specialists
                </Button>
              </a>
            </div>
          </RevealStagger>
        </div>
      </section>

      <CustomItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
