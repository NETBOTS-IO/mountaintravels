"use client";
import { Quote, Home, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function RevealStagger({
  children,
  delayOffset = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayOffset?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
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

import {
  CheckCircle2,
  Shield,
  Heart,
  Award,
  Users,
  Compass,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-semibold">About Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pb-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative max-w-5xl">
          <RevealStagger>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#ff9800] bg-[#ff9800]/10 border border-[#ff9800]/20 mb-4">
              Our Journey Since 1990
            </span>
          </RevealStagger>
          <RevealStagger delayOffset={0.05}>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight">
              About Mountain Travels Pakistan
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
              From K2 to the Silk Route: Extraordinary Journeys Across Pakistan
              & Central Asia
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.15}>
            <div className="mt-8 max-w-3xl space-y-4 text-base text-foreground/80 leading-relaxed font-light">
              <p>
                For nearly four decades, Mountain Travels Pakistan has been
                helping travelers discover some of the world's greatest mountain
                landscapes, ancient civilizations, and unforgettable cultural
                experiences across Pakistan, the historic Silk Route, and
                Central Asia.
              </p>
              <p>
                From the mighty Karakoram and Himalaya to the legendary trade
                routes that connected East and West for centuries, we have
                dedicated ourselves to creating journeys that inspire adventure,
                cultural understanding, and lifelong memories.
              </p>
              <p>
                Behind this journey stands a simple yet powerful vision: to
                introduce the beauty, heritage, and diversity of this remarkable
                region to the world.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-50/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealStagger>
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                  Our Story
                </h2>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed font-light">
                  <p>
                    Mountain Travels Pakistan was founded on a simple belief:
                    that Pakistan is one of the world's most remarkable travel
                    destinations and deserves to be experienced through
                    authentic, professionally managed, and responsible tourism.
                  </p>
                  <p>
                    The company emerged from decades of firsthand experience in
                    Pakistan's mountains and tourism sector. At a time when
                    adventure tourism in the country was still developing, we
                    recognized the extraordinary potential of the Karakoram,
                    Himalaya, Hindukush, and Silk Route regions to attract
                    travelers seeking genuine adventure and cultural discovery.
                  </p>
                  <p>
                    Since our establishment, we have successfully organized
                    expeditions, treks, cultural tours, educational journeys,
                    documentary projects, photography tours, and
                    special-interest travel programs for guests from across the
                    globe.
                  </p>
                  <p>
                    Over the years, our teams have guided travelers through some
                    of Pakistan's most iconic destinations, including: K2 Base
                    Camp, Baltoro Glacier, Concordia, Gondogoro La, Nanga Parbat
                    & Fairy Meadows, Snow Lake, Biafo & Hispar Glaciers, Hunza
                    Valley, Shimshal, Deosai National Park, Skardu & Baltistan,
                    and The Ancient Silk Route.
                  </p>
                  <p>
                    What began as a passion for introducing visitors to
                    Pakistan's mountains has evolved into one of the country's
                    most respected adventure and cultural travel companies.
                  </p>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.1}>
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden bg-muted border border-border shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Karakoram Mountains"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Meet Our Founder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
              Meet Our Founder
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <RevealStagger delayOffset={0.05} className="md:col-span-4">
              <div className="relative rounded-2xl overflow-hidden border border-border bg-muted aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/assets/about/team/ghulam.jpg"
                  alt="Ghulam Ahmad"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112a30]/30 via-transparent to-transparent" />
              </div>
            </RevealStagger>

            <div className="md:col-span-8 space-y-6">
              <RevealStagger delayOffset={0.1}>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Ghulam Ahmad
                  </h3>
                  <p className="text-primary font-semibold text-base mt-1">
                    Founder & Chairman
                  </p>
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.15}>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    Born and raised in the breathtaking mountain region of
                    Baltistan, Ghulam Ahmad developed a profound appreciation
                    for nature, culture, and exploration from an early age.
                  </p>
                  <p>
                    After graduating from the prestigious Government College
                    Rawalpindi, he joined the Civil Service in 1975. During his
                    service, he frequently interacted with foreign visitors and
                    travelers, an experience that inspired him to dedicate his
                    life to the promotion of tourism and cultural exchange.
                  </p>
                  <p>
                    In the early 1980s, he committed himself fully to the
                    tourism industry and soon became recognized for his
                    professionalism, leadership, and passion for showcasing
                    Pakistan to the world. Driven by a vision to promote
                    Pakistan as a premier adventure and cultural destination, he
                    established Mountain Travels Pakistan and built a team of
                    highly skilled guides, porters, and tourism professionals
                    who shared his dedication to excellence.
                  </p>
                  <p>
                    A strong advocate of tourism as a force for international
                    understanding, Ghulam Ahmad believes that travel has the
                    power to transcend social, economic, and cultural boundaries
                    and bring people closer together. This vision was reflected
                    in his address at the Annual Convention on Adventure Tourism
                    in New Delhi, India, in 2004, where he spoke about the role
                    of tourism in fostering regional cooperation and
                    people-to-people connections.
                  </p>
                  <p>
                    One of the most challenging moments of his career occurred
                    in 1991 while leading an innovative kayaking expedition on
                    the Indus River with three Japanese nationals. During the
                    journey, the group was kidnapped in southern Pakistan and
                    endured a month-long ordeal. Throughout the crisis, Ghulam
                    Ahmad demonstrated exceptional courage, leadership, and
                    commitment to the safety of his guests. His actions earned
                    formal appreciation from the Japanese Embassy, while the
                    Japanese participants later expressed that they owed their
                    lives to his calm leadership and determination during the
                    incident.
                  </p>
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.2}>
                <blockquote className="border-l-4 border-primary pl-4 py-1 mt-6">
                  <p className="italic text-lg text-foreground font-light leading-relaxed">
                    "Travel is one of humanity's most powerful tools for
                    building understanding, friendship, and peace across
                    cultures and borders."
                  </p>
                  <footer className="mt-2 text-primary text-sm font-semibold">
                    — Ghulam Ahmad
                  </footer>
                </blockquote>
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Bento Grid */}
      <section className="py-20 bg-slate-50/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
              What Makes Us Different
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Nearly Four Decades of Experience",
                desc: "With almost 40 years of operational experience, we understand the challenges and opportunities of travel in Pakistan better than most. Our knowledge is built on decades of field experience.",
                icon: Award,
              },
              {
                title: "Local Expertise",
                desc: "Our team consists of experienced local guides, mountaineers, logistics specialists, and travel professionals who possess an intimate understanding of Baltistan and the Silk Route valleys.",
                icon: Users,
              },
              {
                title: "Safety First",
                desc: "Adventure travel requires expertise and careful planning. Every itinerary is designed with safety, risk management, emergency preparedness, and guest wellbeing as our highest priorities.",
                icon: Shield,
              },
              {
                title: "Personalized Service",
                desc: "No two travelers are alike. We customize every journey to suit the interests, fitness levels, budgets, and expectations of our international guests.",
                icon: Heart,
              },
              {
                title: "Responsible Tourism",
                desc: "We are committed to protecting fragile mountain environments and supporting local communities through responsible, eco-friendly, and sustainable tourism practices.",
                icon: Compass,
              },
              {
                title: "International Trust",
                desc: "Our long-standing relationships with international travelers, educational institutions, documentary teams, and embassies reflect our commitment to excellence.",
                icon: Globe,
              },
            ].map((feature, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border p-6 h-full flex flex-col hover:shadow-xl hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300 rounded-2xl group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-[#ff9800]/10 group-hover:text-[#ff9800] transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-xs flex-grow">
                    {feature.desc}
                  </p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
              Our Services
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Trekking Adventures",
                list: [
                  "K2 Base Camp Trek",
                  "Baltoro Glacier Trek",
                  "Gondogoro La Trek",
                  "Fairy Meadows & Nanga Parbat Trek",
                  "Snow Lake Trek",
                  "Biafo & Hispar Glacier Trek",
                  "Rakaposhi Base Camp Trek",
                  "Patundas Trek",
                  "Rush Lake Trek",
                  "Customized Trekking Programs",
                ],
              },
              {
                title: "Mountaineering Expeditions",
                list: [
                  "Peak Permit Arrangements",
                  "Expedition Logistics",
                  "Liaison Officer Coordination",
                  "Base Camp Management",
                  "High-Altitude Support Staff",
                  "Transportation & Equipment Logistics",
                ],
              },
              {
                title: "Cultural & Heritage Tours",
                list: [
                  "Hunza Valley",
                  "Skardu & Baltistan",
                  "Lahore Heritage Tours",
                  "Gandhara Civilization Tours",
                  "Kalash Valley",
                  "Silk Route Journeys",
                  "Customized Cultural Experiences",
                ],
              },
              {
                title: "Special Interest Travel",
                list: [
                  "Documentary & Film Production Support",
                  "Photography Tours",
                  "Educational Expeditions",
                  "Research & Study Tours",
                  "Corporate & Incentive Travel",
                ],
              },
            ].map((service, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <h3 className="font-display text-lg font-bold text-primary border-b border-border pb-3 mb-4 flex items-center justify-between">
                    {service.title}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-muted-foreground font-light text-xs">
                    {service.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff9800] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground animate-pulse">
                Trusted by Travelers Worldwide Since 1990
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                For nearly four decades, Mountain Travels Pakistan has been
                guiding adventurers, filmmakers, and cultural explorers. Our
                commitment to safety, professionalism, and local expertise has
                earned the trust of travelers globally.
              </p>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                text: "The complete success of our expedition has to be credited to the overall quality of the preparation done by Mountain Travels Pakistan.",
                author: "Michel Troillet",
                role: "Swiss Expedition Leader",
              },
              {
                text: "Without the kind assistance of Mountain Travels Pakistan, Mr. Hiroki Fujita could not have accomplished his work in the high-altitude mountains of Pakistan.",
                author: "Katsutoshi Kanai",
                role: "Director, Gyosei Corporation, Japan",
              },
              {
                text: "Ghulam brings energy and excitement to any outdoor adventure. His enthusiasm is infectious, keeping his fellow travelers in high spirits.",
                author: "Dan Mozena",
                role: "Political Attaché, American Embassy, Islamabad",
              },
              {
                text: "With Ghulam and his friendly and efficient team at Mountain Travels Pakistan in charge, I'm always 100% confident. They really provide the best.",
                author: "Evan Brigham",
                role: "Trek Coordinator, ISI",
              },
            ].map((quote, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border p-6 h-full flex flex-col justify-between hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-2 right-4 text-6xl text-primary/10 font-serif pointer-events-none select-none">
                    &ldquo;
                  </div>
                  <div>
                    <p className="text-xs text-foreground font-light leading-relaxed italic relative z-10">
                      "{quote.text}"
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center shadow-inner">
                      {quote.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">
                        {quote.author}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {quote.role}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment & Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealStagger>
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  Our Commitment
                </h2>
                <div className="space-y-4 text-primary-foreground/90 font-light text-sm leading-relaxed">
                  <p>
                    At Mountain Travels Pakistan, we believe that travel is far
                    more than simply visiting new places. It is about creating
                    meaningful experiences, building lasting friendships,
                    fostering cultural understanding, and inspiring a deeper
                    appreciation for our planet's natural and cultural heritage.
                  </p>
                  <p>
                    Every journey we organize is guided by our commitment to:
                  </p>
                  <ul className="space-y-2 font-medium">
                    <li>✓ Professional Excellence</li>
                    <li>✓ Guest Safety & Wellbeing</li>
                    <li>✓ Authentic Local Experiences</li>
                    <li>✓ Environmental Responsibility</li>
                    <li>✓ Community Empowerment</li>
                    <li>✓ Cultural Respect & Understanding</li>
                  </ul>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.1}>
              <div className="bg-background/5 border border-white/10 p-8 backdrop-blur-sm flex flex-col justify-center h-full space-y-6">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  Begin Your Adventure
                </h2>
                <p className="text-primary-foreground/90 font-light text-sm leading-relaxed">
                  Whether you are planning a challenging expedition, a
                  life-changing trek, a cultural discovery tour, or a
                  documentary project, Mountain Travels Pakistan is ready to
                  help turn your vision into reality.
                </p>
                <div className="pt-4 space-y-1 border-t border-white/20">
                  <p className="font-bold text-base">
                    Mountain Travels Pakistan
                  </p>
                  <p className="text-primary-foreground/80 font-light italic text-xs">
                    Your Trusted Partner for Adventure, Culture & Discovery
                    Since 1986.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button
                      size="default"
                      className="bg-secondary hover:bg-secondary/95 text-secondary-foreground text-sm font-semibold px-6 py-4 shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      Contact Us Today
                    </Button>
                  </Link>
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>
    </div>
  );
}
