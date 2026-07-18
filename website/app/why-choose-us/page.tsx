"use client";
import {
  Check,
  Award,
  Map,
  Compass,
  Globe,
  Shield,
  HeartHandshake,
  Leaf,
  Home,
  ChevronRight,
} from "lucide-react";
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

export default function WhyChooseUsPage() {
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
          <span className="text-foreground font-semibold">Why Choose Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative max-w-5xl">
          <RevealStagger>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
              Why Travel With Mountain Travels Pakistan
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
              Discover Pakistan, the Silk Road & Central Asia with the
              Specialists Since 1990
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.2}>
            <div className="mt-8 max-w-3xl space-y-4 text-base text-foreground/80 leading-relaxed font-light">
              <p>
                Choosing the right travel company can make all the difference
                between a good trip and an extraordinary one.
              </p>
              <p>
                At Mountain Travels Pakistan, we understand that travelers seek
                more than transportation and accommodation. They want authentic
                experiences, expert guidance, reliable support, and the
                confidence that every detail has been thoughtfully planned.
              </p>
              <p>
                For more than 35 years, we have been helping travelers explore
                Pakistan, the Silk Road, and Central Asia through carefully
                crafted journeys designed to inspire, educate, and create
                lasting memories. Whether you are planning a cultural holiday, a
                private luxury tour, a Silk Road adventure, or a mountain
                expedition, we are committed to providing exceptional service
                and unforgettable experiences.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Core Reasons (Alternating Layout) */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          {/* Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealStagger>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  More Than 35 Years of Experience
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    Established in 1990, Mountain Travels Pakistan is among the
                    country's most experienced travel companies. Over the
                    decades, we have organized cultural tours, private holidays,
                    trekking adventures, mountaineering expeditions, photography
                    tours, and special-interest journeys for travelers from
                    around the world.
                  </p>
                  <p className="font-medium text-foreground">
                    Our experience allows us to:
                  </p>
                  <ul className="space-y-2 mt-2">
                    {[
                      "Design efficient and well-balanced itineraries",
                      "Anticipate travel challenges before they arise",
                      "Provide valuable local insights",
                      "Ensure smooth logistics",
                      "Deliver professional support throughout your journey",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealStagger>
            <RevealStagger delayOffset={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
          </div>

          {/* Specialists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealStagger className="lg:order-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Specialists"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
            <RevealStagger className="lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 rounded-lg">
                  <Map className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Specialists in Pakistan, the Silk Road & Central Asia
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    Unlike many travel companies that focus on a single
                    destination, Mountain Travels Pakistan offers expertise
                    across a broader region connected by history, culture, and
                    geography.
                  </p>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-foreground">
                        Pakistan Cultural Tours:
                      </strong>{" "}
                      Explore ancient civilizations, Mughal architecture,
                      Buddhist heritage, vibrant cities, and traditional
                      communities.
                    </div>
                    <div>
                      <strong className="text-foreground">
                        Northern Pakistan Adventures:
                      </strong>{" "}
                      Discover Hunza Valley, Skardu, Gilgit-Baltistan, Chitral,
                      Kalash, Swat, Kashmir, and the Karakoram Mountains.
                    </div>
                    <div>
                      <strong className="text-foreground">
                        Silk Road Journeys:
                      </strong>{" "}
                      Follow historic trade routes through spectacular
                      landscapes and centuries of cultural exchange.
                    </div>
                    <div>
                      <strong className="text-foreground">
                        Central Asia Tours:
                      </strong>{" "}
                      Experience Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan,
                      and Turkmenistan through carefully designed itineraries.
                    </div>
                  </div>
                </div>
              </div>
            </RevealStagger>
          </div>

          {/* Tailor Made */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealStagger>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 rounded-lg">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Tailor-Made Travel Experts
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    Every traveler is different. Some travelers seek cultural
                    immersion. Others focus on photography, archaeology,
                    wildlife, architecture, cuisine, history, or adventure.
                  </p>
                  <p>
                    Rather than forcing travelers into rigid programs, we create
                    personalized itineraries that reflect your interests,
                    schedule, travel style, and budget.
                  </p>
                  <p className="font-medium text-foreground">
                    Our tailor-made services include:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Private tours",
                      "Family holidays",
                      "Luxury journeys",
                      "Educational travel",
                      "Photography tours",
                      "Heritage tours",
                      "Birdwatching tours",
                      "Special-interest programs",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealStagger>
            <RevealStagger delayOffset={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Tailor Made"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Grid of Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Globe className="w-6 h-6 text-primary" />,
                title: "Deep Local Knowledge",
                desc: "One of the greatest advantages of traveling with a local specialist is access to genuine insight and expertise.",
                list: [
                  "Regional cultures",
                  "Historical sites",
                  "Local traditions",
                  "Scenic routes",
                  "Seasonal conditions",
                  "Hidden attractions",
                ],
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Safety is Our Priority",
                desc: "Travel should be exciting, not stressful. We work diligently to ensure every journey is carefully planned and professionally managed.",
                list: [
                  "Reliable transportation",
                  "Experienced guides",
                  "Quality accommodations",
                  "Trip planning",
                  "Local support networks",
                  "Emergency response",
                ],
              },
              {
                icon: <HeartHandshake className="w-6 h-6 text-primary" />,
                title: "Authentic Cultural Experiences",
                desc: "We believe the most rewarding travel experiences involve meaningful connections with local people and cultures.",
                list: [
                  "Cultural understanding",
                  "Historical context",
                  "Local traditions",
                  "Community interactions",
                  "Regional cuisine",
                  "Heritage preservation",
                ],
              },
              {
                icon: <Leaf className="w-6 h-6 text-primary" />,
                title: "Responsible Tourism",
                desc: "We are committed to promoting tourism that benefits local communities and protects cultural and natural heritage.",
                list: [
                  "Supporting local businesses",
                  "Encouraging cultural respect",
                  "Sustainable practices",
                  "Minimizing environment impact",
                  "Preserving local traditions",
                  "Community benefits",
                ],
              },
            ].map((value, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="space-y-4 p-6 border border-border bg-muted/10 h-full hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {value.icon}
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {value.desc}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-light pt-2 border-t border-border">
                    {value.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-primary">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Trekking & Clients */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealStagger>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Professional Trekking & Expedition Support
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    Pakistan contains some of the world's most spectacular
                    mountain landscapes and trekking routes.
                  </p>
                  <p>
                    For decades, Mountain Travels Pakistan has assisted
                    trekkers, climbers, researchers, photographers, and
                    adventure travelers exploring the Karakoram, Himalaya, and
                    Hindu Kush mountain ranges.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground/80 pt-2">
                    {[
                      "Trekking logistics",
                      "Expedition planning",
                      "Permit assistance",
                      "Experienced staff",
                      "Transportation",
                      "Equipment coordination",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.1}>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Strong International Client Base
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>Over the years, we have welcomed travelers from:</p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold text-foreground/80">
                    {[
                      "Australia",
                      "Canada",
                      "United States",
                      "United Kingdom",
                      "Germany",
                      "France",
                      "Italy",
                      "Spain",
                      "Japan",
                      "South Korea",
                      "China",
                      "New Zealand",
                    ].map((item, i) => (
                      <span key={i}>• {item}</span>
                    ))}
                  </div>
                  <p className="italic pt-2">
                    Many of our guests come through recommendations, referrals,
                    and repeat visits, reflecting the trust we have built.
                  </p>
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Bento Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-10 text-center">
              What Sets Us Apart?
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Experience Since 1990",
                desc: "More than three decades of expertise.",
              },
              {
                title: "Personalized Service",
                desc: "Every itinerary designed around your interests.",
              },
              {
                title: "Local Specialists",
                desc: "Deep regional knowledge and authentic experiences.",
              },
              {
                title: "Diverse Travel Options",
                desc: "Cultural tours, luxury journeys, Silk Road adventures, trekking, expeditions, and special-interest travel.",
              },
              {
                title: "International Standards",
                desc: "Professional planning and customer service.",
              },
              {
                title: "Trusted Reputation",
                desc: "Built through years of successful journeys and satisfied travelers.",
              },
            ].map((feature, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-muted/10 border border-border p-6 h-full flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-sm flex-grow">
                    {feature.desc}
                  </p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl space-y-6">
          <RevealStagger>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Begin Your Journey with Confidence
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-base text-primary-foreground/90 font-light leading-relaxed">
              Whether you are planning your first visit to Pakistan, a Silk Road
              exploration, a Central Asia adventure, or a high-altitude trekking
              expedition, our team is ready to help. We invite you to travel
              with a company that combines local expertise, international
              experience, and a genuine passion for travel.
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <Link href="/contact">
              <Button
                size="default"
                className="bg-secondary hover:bg-secondary/95 hover:scale-[1.02] text-secondary-foreground text-sm font-semibold px-8 py-5 shadow-lg"
              >
                Contact Our Travel Experts
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
