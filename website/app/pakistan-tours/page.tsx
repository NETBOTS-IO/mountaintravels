"use client";
import {
  Check,
  Map,
  Compass,
  Gem,
  Tent,
  Milestone,
  Calendar,
  Flame,
  Users,
  ArrowRight,
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

export default function PakistanToursPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <RevealStagger>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
              Pakistan Tours
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
              Explore the Extraordinary Diversity of Pakistan
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.2}>
            <div className="mt-12 max-w-3xl space-y-6 text-lg text-foreground/80 leading-relaxed font-light">
              <p>
                From the snow-capped peaks of the Karakoram and Himalaya to
                ancient civilizations, vibrant cities, historic Silk Road
                settlements, and rich cultural traditions, Pakistan offers one
                of the world's most rewarding travel experiences.
              </p>
              <p>
                For more than 35 years, Mountain Travels Pakistan has been
                helping travelers discover the country's remarkable landscapes,
                heritage, and people through carefully designed cultural tours,
                private journeys, luxury holidays, trekking adventures, and
                tailor-made travel experiences.
              </p>
              <p>
                Whether you are visiting Pakistan for the first time or
                returning to explore more of this fascinating country, our
                specialists can help create the perfect itinerary.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Why Visit Pakistan */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealStagger>
              <div className="space-y-6">
                <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
                  Why Visit Pakistan?
                </h2>
                <p className="text-lg text-muted-foreground font-light">
                  Pakistan is a land of extraordinary contrasts. Along your
                  journey, you can explore:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[
                    "Ancient archaeological sites",
                    "UNESCO World Heritage Sites",
                    "Historic Silk Road routes",
                    "Mughal architecture",
                    "Buddhist heritage",
                    "Vibrant cities",
                    "Traditional mountain communities",
                    "Spectacular landscapes",
                    "Diverse cultures",
                    "Some of the world's highest mountains",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-muted-foreground font-light mt-6">
                  From the Arabian Sea coastline to the glaciers of the
                  Karakoram, Pakistan offers exceptional opportunities for
                  cultural exploration, adventure, photography, wildlife
                  viewing, and meaningful travel experiences.
                </p>
              </div>
            </RevealStagger>
            <RevealStagger delayOffset={0.2}>
              <div className="relative aspect-square rounded-none overflow-hidden bg-muted border border-border">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Why Visit Pakistan"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Our Pakistan Tours */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <RevealStagger>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                Our Pakistan Tours
              </h2>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cultural Tours */}
            <RevealStagger delayOffset={0.05}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Cultural Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Discover the civilizations, cultures, and traditions that have
                  shaped Pakistan for thousands of years.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <div className="text-sm text-foreground/80 font-medium">
                    Featured Stops:
                  </div>
                  <p className="text-sm text-muted-foreground font-light">
                    Lahore, Taxila, Islamabad, Multan, Peshawar, Chitral, Kalash
                    Valleys, Mohenjo-daro, Makli, Thatta, Swat Valley
                  </p>
                  <div className="text-sm text-foreground/80 font-medium mt-4">
                    Popular Itineraries:
                  </div>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>• Grand Pakistan Tour</li>
                    <li>• Best of Pakistan Tour</li>
                    <li>• Heritage Pakistan Tour</li>
                    <li>
                      • Gandhara Civilization Tour / Buddhist Heritage Tour
                    </li>
                    <li>
                      • Indus Valley Civilization Tour / Kalash Culture Tour
                    </li>
                  </ul>
                </div>
              </div>
            </RevealStagger>

            {/* Northern Pakistan Tours */}
            <RevealStagger delayOffset={0.1}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Northern Pakistan Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Northern Pakistan contains some of the most spectacular
                  mountain scenery on Earth.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <div className="text-sm text-foreground/80 font-medium">
                    Featured Stops:
                  </div>
                  <p className="text-sm text-muted-foreground font-light">
                    Hunza Valley, Skardu, Gilgit, Fairy Meadows, Nanga Parbat,
                    Deosai National Park, Khunjerab Pass, Chitral, Swat Valley,
                    Kashmir
                  </p>
                  <div className="text-sm text-foreground/80 font-medium mt-4">
                    Popular Itineraries:
                  </div>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>• Hunza Valley Discovery</li>
                    <li>• Skardu & Baltistan Explorer</li>
                    <li>• Northern Pakistan Highlights</li>
                    <li>• Karakoram Highway Journey</li>
                    <li>• Hunza & Skardu Adventure</li>
                  </ul>
                </div>
              </div>
            </RevealStagger>

            {/* Private Pakistan Tours */}
            <RevealStagger delayOffset={0.15}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Private Pakistan Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Enjoy the flexibility and comfort of a journey designed
                  exclusively for you.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <p className="text-sm text-muted-foreground font-light">
                    Our specialists can design private journeys for couples,
                    families, friends, photographers, and special-interest
                    travelers.
                  </p>
                  <div className="text-sm text-foreground/80 font-medium mt-4">
                    Features:
                  </div>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>✓ Flexible schedules & Personalized itineraries</li>
                    <li>✓ Private transportation & Dedicated guides</li>
                    <li>✓ Enhanced comfort & Greater independence</li>
                  </ul>
                </div>
              </div>
            </RevealStagger>

            {/* Luxury Pakistan Tours */}
            <RevealStagger delayOffset={0.2}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Luxury Pakistan Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Experience Pakistan in comfort and style. Our luxury journeys
                  combine authentic experiences with premium services and
                  accommodations.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <div className="text-sm text-foreground/80 font-medium">
                    Includes:
                  </div>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>✓ Boutique hotels & Heritage properties</li>
                    <li>✓ Premium transportation & Private guides</li>
                    <li>
                      ✓ Exclusive cultural experiences & Personalized services
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground font-light mt-4 italic">
                    Luxury travel allows visitors to experience Pakistan's
                    remarkable destinations while enjoying exceptional comfort
                    and convenience.
                  </p>
                </div>
              </div>
            </RevealStagger>

            {/* Silk Route Tours */}
            <RevealStagger delayOffset={0.25}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Silk Route Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  For centuries, the Silk Road connected Pakistan with China,
                  Central Asia, and beyond.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <div className="text-sm text-foreground/80 font-medium">
                    Follow Legendary Routes through:
                  </div>
                  <p className="text-sm text-muted-foreground font-light">
                    Hunza Valley, Gilgit, Khunjerab Pass, Karakoram Highway,
                    Ancient Caravan Settlements, Historic Trade Routes
                  </p>
                  <p className="text-sm text-muted-foreground font-light italic">
                    These journeys combine stunning scenery with fascinating
                    history and cultural heritage.
                  </p>
                </div>
              </div>
            </RevealStagger>

            {/* Trekking & Adventure */}
            <RevealStagger delayOffset={0.3}>
              <div className="border border-border p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Trekking & Adventure Tours
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Pakistan is home to some of the world's greatest trekking
                  opportunities.
                </p>
                <div className="space-y-4 border-t border-border pt-6 flex-grow">
                  <div className="text-sm text-foreground/80 font-medium">
                    Popular Adventures:
                  </div>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>• K2 Base Camp Trek</li>
                    <li>• Gondogoro La Trek</li>
                    <li>• Snow Lake Trek</li>
                    <li>• Biafo Hispar Trek</li>
                    <li>• Rush Lake Trek</li>
                    <li>• Fairy Meadows / Nanga Parbat Base Camp Trek</li>
                  </ul>
                  <p className="text-sm text-muted-foreground font-light mt-4">
                    Whether you seek moderate trekking or world-class adventure,
                    our experienced team can assist.
                  </p>
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground mb-16 text-center">
              Featured Destinations
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Hunza Valley",
                desc: "Pakistan's most iconic mountain destination, renowned for spectacular scenery, historic forts, and Silk Road heritage.",
              },
              {
                title: "Skardu",
                desc: "Gateway to the Karakoram and home to some of the world's most dramatic mountain landscapes.",
              },
              {
                title: "Chitral & Kalash",
                desc: "Unique cultures, traditional festivals, and breathtaking scenery.",
              },
              {
                title: "Swat Valley",
                desc: "Known for its natural beauty and rich Buddhist heritage.",
              },
              {
                title: "Lahore",
                desc: "The cultural capital of Pakistan and home to magnificent Mughal monuments.",
              },
              {
                title: "Taxila",
                desc: "A UNESCO World Heritage Site and one of Asia's most important archaeological destinations.",
              },
            ].map((dest, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border p-8 h-full">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {dest.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm">
                    {dest.desc}
                  </p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground mb-16 text-center">
              Pakistan Tour Categories
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Heritage & Archaeological Tours",
              "Buddhist Heritage Tours",
              "Photography Tours",
              "Wildlife & Birdwatching Tours",
              "Jeep Safaris",
              "Festival Tours",
              "Family Holidays",
              "Educational Tours",
            ].map((cat, idx) => (
              <RevealStagger
                key={idx}
                delayOffset={idx * 0.05}
                className="bg-muted/10 border border-border p-6 text-center flex flex-col justify-center min-h-[120px]"
              >
                <h4 className="font-display font-bold text-base text-foreground">
                  {cat}
                </h4>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
                Best Time to Visit Pakistan
              </h2>
              <p className="text-muted-foreground font-light mt-4">
                Pakistan is a year-round destination, but the ideal season
                depends on the regions you wish to explore.
              </p>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                season: "Spring (March–May)",
                desc: "Ideal for cultural tours and northern valleys.",
              },
              {
                season: "Summer (June–September)",
                desc: "Best for high mountain regions, Hunza, Skardu, trekking, and expeditions.",
              },
              {
                season: "Autumn (September–November)",
                desc: "Excellent for photography, cultural tours, and mountain landscapes.",
              },
              {
                season: "Winter (December–February)",
                desc: "Ideal for southern Pakistan, cultural journeys, and selected winter experiences.",
              },
            ].map((time, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.1}>
                <div className="bg-background border border-border p-8 flex gap-4">
                  <Calendar className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground mb-2">
                      {time.season}
                    </h4>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {time.desc}
                    </p>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground mb-16 text-center">
              Why Travel with Mountain Travels Pakistan?
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Established in 1990",
                desc: "More than 35 years of experience.",
              },
              {
                title: "Tailor-Made Expertise",
                desc: "Every itinerary can be customized.",
              },
              {
                title: "Local Specialists",
                desc: "Deep knowledge of Pakistan's destinations and cultures.",
              },
              {
                title: "International Clientele",
                desc: "Welcoming travelers from around the world.",
              },
              {
                title: "Professional Support",
                desc: "Reliable planning and personalized service.",
              },
              {
                title: "Responsible Tourism",
                desc: "Supporting local communities and sustainable travel.",
              },
            ].map((item, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="border border-border p-8 h-full bg-muted/10">
                  <h4 className="font-display font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground font-light text-sm">
                    {item.desc}
                  </p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Discover Pakistan with the Specialists Since 1990
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <p className="text-xl text-primary-foreground/90 font-light leading-relaxed mb-12">
              Whether you are interested in cultural heritage, Silk Road
              history, spectacular mountain landscapes, luxury travel, trekking
              adventures, or tailor-made holidays, Mountain Travels Pakistan is
              ready to help you create an unforgettable journey.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-medium px-10 py-7 shadow-2xl"
              >
                Start Planning Your Pakistan Adventure
              </Button>
            </Link>
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
