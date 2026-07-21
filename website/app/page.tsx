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
import { motion, useReducedMotion } from "framer-motion";
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
  popularDestinations,
  fallbackTestimonials,
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
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const toursRes = await axios.get(`${BASE_URL}/api/tours`);
        if (toursRes.data && toursRes.data.data) {
          setTours(toursRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err);
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
            tour: t.tripName,
            text: t.feedback,
          }));
          setTestimonials(mapped);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials(fallbackTestimonials);
      }
    }

    loadInitialData();
  }, []);

  const experiencesRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const autoScroll = (ref: any) => {
      if (ref && ref.current) {
        const container = ref.current;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 5
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 240, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(() => {
      autoScroll(experiencesRef);
      autoScroll(destinationsRef);
      autoScroll(testimonialsRef);
    }, 4500);

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
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    className="w-full sm:w-auto bg-[#45919c] hover:bg-[#ff9800] text-white shadow-lg shadow-[#45919c]/10 hover:shadow-[#ff9800]/20 hover:scale-[1.03] transition-all duration-300 font-bold px-6 py-4 rounded-full text-xs sm:text-sm"
                  >
                    {heroSection.ctaPrimary}
                  </Button>
                </Link>
                <Link href="/tours" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 bg-white/10 hover:bg-white/20 text-white hover:border-[#ff9800] hover:scale-[1.03] transition-all duration-300 font-semibold px-6 py-4 rounded-full backdrop-blur-md text-xs sm:text-sm"
                  >
                    {heroSection.ctaSecondary}
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

      <section className="py-10 md:py-16 bg-slate-50 border-y border-border">
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
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
                  aria-label="Slide Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => slideRight(experiencesRef)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
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
            {featuredExperiences.map((experience, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="group border border-border flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start hover:shadow-xl hover:border-[#45919c]/40 transition-all duration-300 flex flex-col justify-between bg-card rounded-2xl overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={experience.image || "/assets/home/hero-1.webp"}
                      alt={experience.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-display text-lg font-bold text-white pr-4">
                      {experience.title}
                    </h3>
                  </div>
                  <div className="p-5 space-y-4 flex flex-col justify-between flex-grow">
                    <p className="text-muted-foreground font-light text-xs leading-relaxed line-clamp-3">
                      {experience.description}
                    </p>
                    <Link href="/tours" className="pt-2 block">
                      <span className="text-primary group-hover:text-[#ff9800] text-xs font-semibold flex items-center group-hover:underline underline-offset-4 transition-colors">
                        Explore Options
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl">
                Explore Pakistan's Most Remarkable Destinations
              </h2>
              <div className="flex items-center space-x-3 self-end">
                <button
                  onClick={() => slideLeft(destinationsRef)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
                  aria-label="Slide Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => slideRight(destinationsRef)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
                  aria-label="Slide Right"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </RevealStagger>

          <div
            ref={destinationsRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {popularDestinations.map((dest, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border flex-shrink-0 w-[280px] sm:w-[320px] snap-start hover:shadow-xl hover:border-[#45919c]/40 transition-all duration-300 rounded-2xl overflow-hidden group">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={dest.image || "/assets/home/hero-1.webp"}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-display text-lg font-bold text-white">
                      {dest.name}
                    </h3>
                  </div>
                  <div className="p-5 flex flex-col justify-between">
                    <p className="text-muted-foreground font-light text-xs leading-relaxed line-clamp-3">
                      {dest.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary group-hover:text-[#ff9800] transition-colors">
                        {dest.tours} Packages
                      </span>
                      <Link
                        href="/destinations"
                        className="text-[10px] font-bold text-primary group-hover:text-[#ff9800] hover:underline flex items-center gap-1 transition-colors"
                      >
                        View Details{" "}
                        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealStagger>
            ))}
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
              <Button className="mt-4 bg-[#45919c] hover:bg-[#ff9800] text-white px-8 py-6 text-sm font-bold rounded-full hover:scale-[1.03] transition-all duration-300">
                Explore Silk Road Journeys
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 bg-muted/20 border-y border-border">
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
              className="mt-4 px-8 py-6 text-sm font-bold border-primary text-primary hover:bg-[#ff9800] hover:border-[#ff9800] hover:text-white rounded-full hover:scale-[1.03] transition-all duration-300"
            >
              Get a Custom Itinerary
            </Button>
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Voices of Our Guests
              </h2>
              <div className="flex items-center space-x-3 self-end">
                <button
                  onClick={() => slideLeft(testimonialsRef)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
                  aria-label="Slide Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => slideRight(testimonialsRef)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#ff9800] hover:text-white hover:border-[#ff9800] transition-colors duration-300"
                  aria-label="Slide Right"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </RevealStagger>

          <div
            ref={testimonialsRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {(testimonials.length > 0
              ? testimonials
              : fallbackTestimonials
            ).map((testimonial, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="space-y-4 border border-[#45919c]/10 p-6 flex-shrink-0 w-[290px] sm:w-[340px] snap-start flex flex-col justify-between bg-gradient-to-br from-[#112a30]/5 via-transparent to-[#ff9800]/5 hover:shadow-xl hover:border-[#45919c]/30 transition-all duration-300 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-2 right-4 text-6xl text-[#45919c]/10 font-serif pointer-events-none select-none">
                    &ldquo;
                  </div>
                  <p className="text-xs text-foreground italic font-light leading-relaxed relative z-10">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-border mt-4 flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#45919c] text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
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

      <section className="py-20 bg-muted/20 border-y border-border">
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
                  size="default"
                  className="bg-[#45919c] hover:bg-[#ff9800] hover:scale-[1.02] text-white text-base font-bold px-8 py-6 rounded-full shadow-lg transition-all duration-300"
                >
                  Plan Your Tour
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
