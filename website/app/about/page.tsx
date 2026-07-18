"use client";
import {
  Shield,
  Headphones,
  Medal,
  Leaf,
  Compass,
  MapPin,
  ArrowRight,
  Quote,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <RevealStagger>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
              About Mountain Travels Pakistan
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
              From K2 to the Silk Route: Extraordinary Journeys Across Pakistan
              & Central Asia
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.2}>
            <div className="mt-12 max-w-3xl space-y-6 text-lg text-foreground/80 leading-relaxed font-light">
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
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealStagger>
              <div className="space-y-6">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
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
                    Today, Mountain Travels Pakistan continues to uphold the
                    same values upon which it was founded: professionalism,
                    integrity, safety, environmental responsibility, and genuine
                    hospitality.
                  </p>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <div className="relative h-[600px] w-full rounded-none overflow-hidden bg-muted">
                <Image
                  src="/assets/home/hero-1.jpg"
                  alt="Karakoram Mountains"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Meet Our Founder */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16">
              Meet Our Founder
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <RevealStagger delayOffset={0.1}>
              <div className="md:col-span-4 relative rounded-none overflow-hidden border border-border bg-muted aspect-[3/4]">
                <Image
                  src="/assets/about/team/ghulam.jpg"
                  alt="Ghulam Ahmad"
                  fill
                  className="object-cover"
                  fallback-src="/placeholder.svg"
                />
              </div>
            </RevealStagger>

            <div className="md:col-span-8 space-y-8">
              <RevealStagger delayOffset={0.2}>
                <div>
                  <h3 className="font-display text-3xl font-bold text-foreground">
                    Ghulam Ahmad
                  </h3>
                  <p className="text-primary font-medium text-lg mt-2">
                    Founder & Chairman
                  </p>
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.3}>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
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
                  <p>
                    Today, his decades of experience in trekking, mountaineering
                    expeditions, cultural tourism, eco-tourism, and adventure
                    travel continue to inspire the values and standards that
                    define Mountain Travels Pakistan.
                  </p>
                </div>
              </RevealStagger>

              <RevealStagger delayOffset={0.4}>
                <blockquote className="border-l-4 border-primary pl-6 py-2 mt-8">
                  <p className="italic text-2xl text-foreground font-light leading-relaxed">
                    "Travel is one of humanity's most powerful tools for
                    building understanding, friendship, and peace across
                    cultures and borders."
                  </p>
                  <footer className="mt-4 text-primary font-medium">
                    — Ghulam Ahmad
                  </footer>
                </blockquote>
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Bento Grid */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16 text-center">
              What Makes Us Different
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Nearly Four Decades of Experience",
                desc: "With almost 40 years of operational experience, we understand the challenges and opportunities of travel in Pakistan better than most. Our knowledge is built on decades of practical field experience across mountains, valleys, deserts, and cultural regions.",
              },
              {
                title: "Local Expertise",
                desc: "Our team consists of experienced local guides, mountaineers, logistics specialists, and travel professionals who possess an intimate understanding of the landscapes, cultures, languages, and traditions of the regions we operate in.",
              },
              {
                title: "Safety First",
                desc: "Adventure travel requires expertise and careful planning. Every itinerary is designed with safety, risk management, emergency preparedness, and guest wellbeing as our highest priorities.",
              },
              {
                title: "Personalized Service",
                desc: "No two travelers are alike. We tailor every journey to suit the interests, fitness levels, schedules, and expectations of our guests.",
              },
              {
                title: "Responsible Tourism",
                desc: "We are committed to protecting fragile mountain environments and supporting local communities through responsible and sustainable tourism practices.",
              },
              {
                title: "International Trust",
                desc: "Our long-standing relationships with international travelers, educational institutions, documentary teams, embassies, and expedition groups reflect our commitment to excellence and reliability.",
              },
            ].map((feature, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.1}>
                <div className="bg-background border border-border p-10 h-full flex flex-col hover:shadow-lg transition-shadow duration-500">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light flex-grow">
                    {feature.desc}
                  </p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16 text-center">
              Our Services
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealStagger delayOffset={0.1}>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-primary border-b border-border pb-4">
                  Trekking Adventures
                </h3>
                <ul className="space-y-3 text-muted-foreground font-light text-lg">
                  <li>• K2 Base Camp Trek</li>
                  <li>• Baltoro Glacier Trek</li>
                  <li>• Gondogoro La Trek</li>
                  <li>• Fairy Meadows & Nanga Parbat Trek</li>
                  <li>• Snow Lake Trek</li>
                  <li>• Biafo & Hispar Glacier Trek</li>
                  <li>• Rakaposhi Base Camp Trek</li>
                  <li>• Patundas Trek</li>
                  <li>• Rush Lake Trek</li>
                  <li>• Customized Trekking Programs</li>
                </ul>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-primary border-b border-border pb-4">
                  Mountaineering Expeditions
                </h3>
                <ul className="space-y-3 text-muted-foreground font-light text-lg">
                  <li>• Peak Permit Arrangements</li>
                  <li>• Expedition Logistics</li>
                  <li>• Liaison Officer Coordination</li>
                  <li>• Base Camp Management</li>
                  <li>• High-Altitude Support Staff</li>
                  <li>• Transportation & Equipment Logistics</li>
                </ul>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.3}>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-primary border-b border-border pb-4">
                  Cultural & Heritage Tours
                </h3>
                <ul className="space-y-3 text-muted-foreground font-light text-lg">
                  <li>• Hunza Valley</li>
                  <li>• Skardu & Baltistan</li>
                  <li>• Lahore Heritage Tours</li>
                  <li>• Gandhara Civilization Tours</li>
                  <li>• Kalash Valley</li>
                  <li>• Silk Route Journeys</li>
                  <li>• Customized Cultural Experiences</li>
                </ul>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.4}>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-primary border-b border-border pb-4">
                  Special Interest Travel
                </h3>
                <ul className="space-y-3 text-muted-foreground font-light text-lg">
                  <li>• Documentary & Film Production Support</li>
                  <li>• Photography Tours</li>
                  <li>• Educational Expeditions</li>
                  <li>• Research & Study Tours</li>
                  <li>• Corporate & Incentive Travel</li>
                </ul>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <div className="text-center mb-16 max-w-3xl mx-auto space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                Trusted by Travelers Worldwide Since 1986
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                For nearly four decades, Mountain Travels Pakistan has been
                guiding adventurers, mountaineers, filmmakers, photographers,
                educational institutions, and cultural explorers through the
                breathtaking landscapes of Pakistan, the Silk Route, and Central
                Asia. Our commitment to safety, professionalism, local
                expertise, and personalized service has earned the trust of
                travelers from around the globe.
              </p>
            </div>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "The complete success of our expedition has to be credited to the overall quality of the preparation done by Mountain Travels Pakistan.",
                author: "Michel Troillet",
                role: "Swiss Expedition Leader",
              },
              {
                text: "Without the kind assistance of Mountain Travels Pakistan, renowned Japanese photographer Hiroki Fujita could not have accomplished his work in the high-altitude mountains of Pakistan.",
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
                role: "Trek Coordinator, International School of Islamabad",
              },
              {
                text: "The quality of the service and knowledge of the guides was excellent.",
                author: "Reinhold Messner",
                role: "World-Renowned Mountaineer",
              },
              {
                text: "Without hesitation, I recommend them to anyone.",
                author: "Peter Laurenson",
                role: "New Zealand Tourist Board",
              },
              {
                text: "Mountain Travels Pakistan surprised us with a very well organized trek to Baltoro and Gondogoro La. You have found the perfect combination between professionalism and local insight and culture.",
                author: "Hester Noyon",
                role: "The Netherlands",
              },
              {
                text: "The whole team is exceptionally wonderful and caring of every possible detail.",
                author: "Kamila Jeevanjee",
                role: "Los Angeles, USA",
              },
            ].map((quote, idx) => (
              <RevealStagger key={idx} delayOffset={idx * 0.05}>
                <div className="bg-background border border-border p-8 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary/30 mb-6" />
                  <p className="text-lg text-foreground font-light leading-relaxed flex-grow italic">
                    "{quote.text}"
                  </p>
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="font-display font-bold text-foreground">
                      {quote.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {quote.role}
                    </p>
                  </div>
                </div>
              </RevealStagger>
            ))}
          </div>

          <RevealStagger delayOffset={0.2}>
            <p className="text-center text-muted-foreground font-light text-lg mt-16 max-w-4xl mx-auto">
              Over the years, Mountain Travels Pakistan has proudly served
              clients from Switzerland, Japan, the United States, New Zealand,
              Germany, Austria, Italy, the Netherlands, the United Kingdom, and
              many other countries, helping them experience Pakistan's
              mountains, cultures, and people in a safe, authentic, and
              unforgettable way.
            </p>
          </RevealStagger>
        </div>
      </section>

      {/* Our Commitment & Final CTA */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <RevealStagger>
              <div className="space-y-8">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
                  Our Commitment
                </h2>
                <div className="space-y-6 text-primary-foreground/90 font-light text-lg leading-relaxed">
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
                  <ul className="space-y-3 font-medium">
                    <li>✓ Professional Excellence</li>
                    <li>✓ Guest Safety & Wellbeing</li>
                    <li>✓ Authentic Local Experiences</li>
                    <li>✓ Environmental Responsibility</li>
                    <li>✓ Community Empowerment</li>
                    <li>✓ Cultural Respect & Understanding</li>
                  </ul>
                  <p>
                    We take pride in helping travelers discover the true spirit
                    of Pakistan while ensuring that local communities benefit
                    from tourism in a sustainable and meaningful way.
                  </p>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <div className="bg-background/5 border border-white/10 p-12 backdrop-blur-sm flex flex-col justify-center h-full space-y-8">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
                  Begin Your Adventure
                </h2>
                <p className="text-primary-foreground/90 font-light text-lg leading-relaxed">
                  Whether you are planning a challenging expedition, a
                  life-changing trek, a cultural discovery tour, or a
                  documentary project, Mountain Travels Pakistan is ready to
                  help turn your vision into reality.
                </p>
                <p className="text-primary-foreground/90 font-light text-lg leading-relaxed">
                  Join thousands of travelers who have trusted us to guide them
                  through some of the world's most spectacular landscapes and
                  cultural experiences.
                </p>
                <div className="pt-8 space-y-2 border-t border-white/20">
                  <p className="font-bold text-xl">Mountain Travels Pakistan</p>
                  <p className="text-primary-foreground/80 font-light italic">
                    Your Trusted Partner for Adventure, Culture & Discovery
                    Since 1986.
                  </p>
                </div>
                <div className="pt-6">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-medium px-10 py-7 shadow-2xl"
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
