"use client";
import {
  Check,
  Map,
  Camera,
  Tent,
  Compass,
  Gem,
  Globe2,
  Bird,
  Landmark,
  MessageCircle,
  FileSearch,
  PenTool,
  ThumbsUp,
  PlaneTakeoff,
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

export default function TailorMadeToursPage() {
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
          <span className="text-foreground font-semibold">
            Tailor-Made Tours
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative max-w-5xl">
          <RevealStagger>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
              Tailor-Made Tours Pakistan
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
              Personalized Journeys Designed Around You
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.2}>
            <div className="mt-8 max-w-3xl space-y-4 text-base text-foreground/80 leading-relaxed font-light">
              <p>No two travelers are the same.</p>
              <p>
                Some travelers dream of exploring ancient civilizations and
                cultural heritage. Others seek spectacular mountain landscapes,
                photography opportunities, wildlife encounters, Silk Road
                history, luxury experiences, or adventure in remote regions.
              </p>
              <p>
                At Mountain Travels Pakistan, we believe your journey should
                reflect your interests, preferences, travel style, and
                aspirations.
              </p>
              <p>
                For more than 35 years, we have been designing tailor-made tours
                across Pakistan, the Silk Road, and Central Asia for travelers
                from around the world. Whether you are planning a private
                holiday, a family journey, a luxury vacation, a photography
                expedition, a cultural exploration, or a multi-country Silk Road
                adventure, our specialists will create an itinerary designed
                specifically for you.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Why Choose a Tailor-Made Tour */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealStagger>
              <div className="space-y-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Why Choose a Tailor-Made Tour?
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-light">
                  <p>
                    A tailor-made journey offers flexibility, personalization,
                    and the opportunity to experience destinations at your own
                    pace.
                  </p>
                  <p>
                    Instead of following a fixed itinerary, you enjoy a travel
                    experience created around your interests and priorities.
                  </p>
                  <p className="font-medium text-foreground mt-4">
                    Benefits include:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Personalized itinerary",
                      "Flexible travel dates",
                      "Private transport",
                      "Preferred stays",
                      "Custom activities",
                      "Special experiences",
                      "Flexible pacing",
                      "Dedicated support",
                      "Local insights",
                      "Greater comfort",
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
                  src="/assets/home/hero-1.webp"
                  alt="Tailor Made Tour"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Designed Around Your Interests */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                Designed Around Your Interests
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Our travel specialists work closely with you to understand what
                matters most and create a journey that reflects your personal
                travel goals.
              </p>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Landmark className="w-6 h-6" />,
                title: "Cultural & Heritage Tours",
                desc: "Discover Pakistan's remarkable history through ancient archaeological sites, Mughal monuments, Buddhist heritage, traditional communities, and vibrant cultural experiences.",
                list: [
                  "Gandhara Civilization",
                  "Buddhist Heritage",
                  "Indus Valley Civilization",
                  "Mughal Architecture",
                  "Sufi Traditions",
                  "Kalash Culture",
                ],
              },
              {
                icon: <Map className="w-6 h-6" />,
                title: "Northern Pakistan Journeys",
                desc: "Explore some of the world's most spectacular mountain landscapes. Whether you prefer leisurely sightseeing, cultural immersion, or outdoor exploration.",
                list: [
                  "Hunza Valley",
                  "Skardu",
                  "Gilgit",
                  "Deosai National Park",
                  "Fairy Meadows",
                  "Nanga Parbat",
                ],
              },
              {
                icon: <Gem className="w-6 h-6" />,
                title: "Luxury Travel Experiences",
                desc: "For travelers seeking comfort, exclusivity, and personalized service. Luxury travel is not simply about accommodation—it is about creating exceptional experiences.",
                list: [
                  "Boutique hotels",
                  "Heritage properties",
                  "Luxury resorts",
                  "Private guides",
                  "Premium transport",
                  "Exclusive experiences",
                ],
              },
              {
                icon: <Compass className="w-6 h-6" />,
                title: "Silk Road Journeys",
                desc: "Follow the routes that connected civilizations across Asia for centuries. Each itinerary is customized according to your interests.",
                list: [
                  "Karakoram Highway",
                  "Hunza Valley",
                  "Khunjerab Pass",
                  "Gandhara Sites",
                  "Trade Routes",
                  "Historic Settlements",
                ],
              },
              {
                icon: <Globe2 className="w-6 h-6" />,
                title: "Central Asia Adventures",
                desc: "Explore the legendary cities, cultures, and landscapes of Central Asia through personalized itineraries.",
                list: [
                  "Uzbekistan",
                  "Kazakhstan",
                  "Kyrgyzstan",
                  "Tajikistan",
                  "Turkmenistan",
                ],
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: "Photography Tours",
                desc: "Pakistan offers extraordinary opportunities for photographers. We can help photographers maximize opportunities.",
                list: [
                  "Mountain Landscapes",
                  "Cultural Portraits",
                  "Architecture",
                  "Festivals",
                  "Wildlife",
                  "Night Photography",
                ],
              },
              {
                icon: <Bird className="w-6 h-6" />,
                title: "Wildlife & Birdwatching Tours",
                desc: "Pakistan's diverse ecosystems support an impressive range of wildlife and bird species.",
                list: [
                  "National Parks",
                  "Wetlands",
                  "Mountain Habitats",
                  "Migration Sites",
                  "Rare Wildlife",
                  "Conservation Areas",
                ],
              },
              {
                icon: <Tent className="w-6 h-6" />,
                title: "Trekking & Adventure Travel",
                desc: "For active travelers, we can create personalized trekking and adventure programs ranging from moderate walks to challenging high-altitude expeditions.",
                list: [
                  "K2 Base Camp Trek",
                  "Gondogoro La Trek",
                  "Rush Lake Trek",
                  "Fairy Meadows Trek",
                  "Snow Lake Trek",
                  "Biafo Hispar Trek",
                ],
              },
            ].map((card, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-muted/10 border border-border p-6 flex flex-col h-full hover:shadow-md transition-all duration-300">
                  <div className="text-primary mb-4 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm mb-4 flex-grow">
                    {card.desc}
                  </p>
                  <ul className="grid grid-cols-2 gap-1.5 border-t border-border pt-4 text-xs text-foreground/80 font-light">
                    {card.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-1">
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

      {/* How Our Process Works */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
              How Our Tailor-Made Planning Process Works
            </h2>
          </RevealStagger>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              {
                icon: <MessageCircle className="w-5 h-5" />,
                title: "Step 1 – Share Your Ideas",
                desc: "Tell us about your interests, travel dates, preferred destinations, travel style, and budget.",
              },
              {
                icon: <FileSearch className="w-5 h-5" />,
                title: "Step 2 – Consultation",
                desc: "Our specialists review your requirements and recommend destinations, experiences, and itinerary options.",
              },
              {
                icon: <PenTool className="w-5 h-5" />,
                title: "Step 3 – Personalized Itinerary Design",
                desc: "We prepare a detailed itinerary tailored specifically to your preferences including daily schedule, stays, transport, and excursions.",
              },
              {
                icon: <ThumbsUp className="w-5 h-5" />,
                title: "Step 4 – Refinement",
                desc: "We work with you to adjust and refine the itinerary until it perfectly meets your expectations.",
              },
              {
                icon: <PlaneTakeoff className="w-5 h-5" />,
                title: "Step 5 – Travel with Confidence",
                desc: "Once your plans are finalized, our team handles the logistics so you can focus on enjoying your journey.",
              },
            ].map((step, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div
                  className={`relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2 -ml-4 md:ml-0 md:-translate-x-1/2">
                    {step.icon}
                  </div>
                  <div
                    className={`w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] bg-background border border-border p-5 ml-12 md:ml-0 hover:shadow-sm transition-shadow ${idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <h3 className="font-display font-bold text-base text-primary mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tailor-Made & Ideas */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Why Travel With Us */}
            <div className="space-y-6">
              <RevealStagger>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Why Tailor-Made Travel with MTP?
                </h2>
              </RevealStagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "More Than 35 Years",
                    desc: "Creating customized experiences since 1990.",
                  },
                  {
                    title: "Local Expertise",
                    desc: "Deep knowledge of Pakistan and the Silk Road.",
                  },
                  {
                    title: "Flexible Planning",
                    desc: "Every itinerary designed around your interests.",
                  },
                  {
                    title: "Personal Service",
                    desc: "Direct communication with travel specialists.",
                  },
                ].map((item, i) => (
                  <RevealStagger
                    key={i}
                    delayOffset={i * 0.05}
                    className="bg-muted/10 border border-border p-4 h-full"
                  >
                    <h4 className="font-display font-bold text-base text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground font-light text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </RevealStagger>
                ))}
              </div>
            </div>

            {/* Popular Ideas */}
            <div className="space-y-6">
              <RevealStagger>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Popular Travel Ideas
                </h2>
              </RevealStagger>
              <div className="space-y-3">
                {[
                  {
                    title: "10-Day Northern Pakistan Discovery",
                    desc: "Hunza, Gilgit, Skardu, and Deosai.",
                  },
                  {
                    title: "14-Day Cultural Pakistan Journey",
                    desc: "Lahore, Taxila, Islamabad, Swat, Chitral, and Kalash.",
                  },
                  {
                    title: "18-Day Silk Road Experience",
                    desc: "Pakistan's historic trade routes, Hunza, and the Karakoram.",
                  },
                ].map((item, i) => (
                  <RevealStagger key={i} delayOffset={i * 0.05}>
                    <div className="flex items-start gap-3 p-4 border border-border bg-background hover:bg-muted/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Map className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground font-light text-xs mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </RevealStagger>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl space-y-6">
          <RevealStagger>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Create Your Perfect Journey
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-base text-primary-foreground/90 font-light leading-relaxed">
              Whether you already know exactly where you want to go or are
              simply seeking inspiration, our specialists are ready to help. Let
              us create a personalized itinerary designed specifically for you.
            </p>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <Link href="/contact">
              <Button
                size="default"
                className="bg-secondary hover:bg-secondary/95 text-secondary-foreground text-sm font-semibold px-8 py-5 shadow-lg"
              >
                Speak with a Travel Specialist
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
