"use client";
import {
  Check,
  Shield,
  Map,
  Compass,
  Users,
  Leaf,
  Star,
  Globe,
  Award,
  HeartHandshake,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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

export default function WhyChooseUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <RevealStagger>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
              Why Travel With Mountain Travels Pakistan
            </h1>
          </RevealStagger>
          <RevealStagger delayOffset={0.1}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
              Discover Pakistan, the Silk Road & Central Asia with the
              Specialists Since 1990
            </p>
          </RevealStagger>

          <RevealStagger delayOffset={0.2}>
            <div className="mt-12 max-w-3xl space-y-6 text-lg text-foreground/80 leading-relaxed font-light">
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
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-32">
          {/* Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealStagger>
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
                  More Than 35 Years of Experience
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
                  <p>
                    Established in 1990, Mountain Travels Pakistan is among the
                    country's most experienced travel companies. Over the
                    decades, we have organized cultural tours, private holidays,
                    trekking adventures, mountaineering expeditions, photography
                    tours, and special-interest journeys for travelers from
                    around the world.
                  </p>
                  <p>Our experience allows us to:</p>
                  <ul className="space-y-3 mt-4">
                    {[
                      "Design efficient and well-balanced itineraries",
                      "Anticipate travel challenges before they arise",
                      "Provide valuable local insights",
                      "Ensure smooth logistics",
                      "Deliver professional support throughout your journey",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 italic">
                    When you travel with us, you benefit from knowledge gained
                    through decades of practical experience.
                  </p>
                </div>
              </div>
            </RevealStagger>
            <RevealStagger delayOffset={0.2}>
              <div className="relative aspect-square rounded-none overflow-hidden bg-muted border border-border">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <RevealStagger delayOffset={0.2}>
              <div className="relative aspect-square rounded-none overflow-hidden bg-muted border border-border lg:order-2">
                <Image
                  src="/assets/home/gallery-1.jpg"
                  alt="Specialists"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealStagger>
            <RevealStagger>
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl">
                  <Map className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
                  Specialists in Pakistan, the Silk Road & Central Asia
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                  <p>
                    Unlike many travel companies that focus on a single
                    destination, Mountain Travels Pakistan offers expertise
                    across a broader region connected by history, culture, and
                    geography.
                  </p>
                  <div className="space-y-4">
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
                    <div>
                      <strong className="text-foreground">
                        Trekking & Mountaineering Expeditions:
                      </strong>{" "}
                      Explore some of the world's greatest mountain regions with
                      experienced support and logistical expertise.
                    </div>
                  </div>
                </div>
              </div>
            </RevealStagger>
          </div>

          {/* Tailor Made */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealStagger>
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl">
                  <Compass className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
                  Tailor-Made Travel Experts
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
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
                  <p>Our tailor-made services include:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      "Private tours",
                      "Family holidays",
                      "Luxury journeys",
                      "Educational travel",
                      "Photography tours",
                      "Heritage tours",
                      "Birdwatching tours",
                      "Special-interest programs",
                      "Multi-country Silk Road journeys",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 italic">
                    Whether you have a detailed plan or only a general idea, our
                    specialists can help create the ideal itinerary.
                  </p>
                </div>
              </div>
            </RevealStagger>
            <RevealStagger delayOffset={0.2}>
              <div className="relative aspect-square rounded-none overflow-hidden bg-muted border border-border">
                <Image
                  src="/assets/home/gallery-2.jpg"
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Deep Local Knowledge */}
            <RevealStagger delayOffset={0.1}>
              <div className="space-y-6 p-8 border border-border bg-muted/10 h-full hover:shadow-xl transition-shadow duration-300">
                <Globe className="w-10 h-10 text-primary" />
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Deep Local Knowledge
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  One of the greatest advantages of traveling with a local
                  specialist is access to genuine insight and expertise. Our
                  team possesses extensive knowledge of:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-muted-foreground font-light text-lg">
                  <li>• Regional cultures</li>
                  <li>• Historical sites</li>
                  <li>• Local traditions</li>
                  <li>• Scenic routes</li>
                  <li>• Seasonal conditions</li>
                  <li>• Hidden attractions</li>
                  <li>• Travel logistics</li>
                  <li>• Community experiences</li>
                </ul>
                <p className="text-muted-foreground font-light italic">
                  This local knowledge allows us to create journeys that go
                  beyond standard sightseeing and provide meaningful connections
                  with the places you visit.
                </p>
              </div>
            </RevealStagger>

            {/* Safety is Our Priority */}
            <RevealStagger delayOffset={0.2}>
              <div className="space-y-6 p-8 border border-border bg-muted/10 h-full hover:shadow-xl transition-shadow duration-300">
                <Shield className="w-10 h-10 text-primary" />
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Safety is Our Priority
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  Travel should be exciting, not stressful. We work diligently
                  to ensure every journey is carefully planned and
                  professionally managed.
                </p>
                <ul className="space-y-2 text-muted-foreground font-light text-lg">
                  {[
                    "Reliable transportation",
                    "Experienced guides",
                    "Quality accommodations",
                    "Comprehensive trip planning",
                    "Local support networks",
                    "Up-to-date destination information",
                    "Emergency response procedures",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-light italic">
                  Whether you are visiting cultural sites in Punjab, exploring
                  remote valleys in Gilgit-Baltistan, or trekking through the
                  Karakoram, your safety and well-being remain our highest
                  priorities.
                </p>
              </div>
            </RevealStagger>

            {/* Authentic Cultural Experiences */}
            <RevealStagger delayOffset={0.3}>
              <div className="space-y-6 p-8 border border-border bg-muted/10 h-full hover:shadow-xl transition-shadow duration-300">
                <HeartHandshake className="w-10 h-10 text-primary" />
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Authentic Cultural Experiences
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  We believe the most rewarding travel experiences involve
                  meaningful connections with local people and cultures. Our
                  itineraries emphasize:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-muted-foreground font-light text-lg">
                  <li>• Cultural understanding</li>
                  <li>• Historical context</li>
                  <li>• Local traditions</li>
                  <li>• Community interactions</li>
                  <li>• Regional cuisine</li>
                  <li>• Heritage preservation</li>
                  <li>• Responsible tourism</li>
                </ul>
                <p className="text-muted-foreground font-light italic">
                  These experiences help travelers gain deeper insights into the
                  destinations they visit while creating lasting memories.
                </p>
              </div>
            </RevealStagger>

            {/* Responsible Tourism */}
            <RevealStagger delayOffset={0.4}>
              <div className="space-y-6 p-8 border border-border bg-muted/10 h-full hover:shadow-xl transition-shadow duration-300">
                <Leaf className="w-10 h-10 text-primary" />
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Responsible Tourism
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  We are committed to promoting tourism that benefits local
                  communities and protects cultural and natural heritage.
                </p>
                <ul className="space-y-2 text-muted-foreground font-light text-lg">
                  {[
                    "Supporting local businesses",
                    "Encouraging cultural respect",
                    "Promoting sustainable practices",
                    "Minimizing environmental impact",
                    "Preserving local traditions",
                    "Creating positive community benefits",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-light italic">
                  We believe responsible tourism contributes to a better
                  experience for travelers and host communities alike.
                </p>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Trekking & Clients */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealStagger>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Professional Trekking & Expedition Support
                </h3>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
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
                  <p className="text-foreground font-medium mt-6">
                    Our services include:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mt-4">
                    {[
                      "Trekking logistics",
                      "Expedition planning",
                      "Permit assistance",
                      "Experienced support staff",
                      "Transportation arrangements",
                      "Equipment coordination",
                      "Professional guidance",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-base">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-foreground font-medium mt-6">
                    Popular programs include:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mt-4 text-base">
                    <li>• K2 Base Camp Trek</li>
                    <li>• Gondogoro La Trek</li>
                    <li>• Snow Lake Trek</li>
                    <li>• Biafo Hispar Trek</li>
                    <li>• Rush Lake Trek</li>
                    <li>• Nanga Parbat Base Camp Trek</li>
                    <li className="col-span-2">• Mountaineering Expeditions</li>
                  </ul>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delayOffset={0.2}>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Strong International Client Base
                </h3>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
                  <p>Over the years, we have welcomed travelers from:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-base font-medium text-foreground/80 mt-4">
                    <span>• Australia</span>
                    <span>• Canada</span>
                    <span>• United States</span>
                    <span>• United Kingdom</span>
                    <span>• Germany</span>
                    <span>• France</span>
                    <span>• Italy</span>
                    <span>• Spain</span>
                    <span>• Japan</span>
                    <span>• South Korea</span>
                    <span>• China</span>
                    <span>• Singapore</span>
                    <span>• New Zealand</span>
                    <span className="col-span-2">
                      and many other countries.
                    </span>
                  </div>
                  <p className="mt-8 italic">
                    Many of our guests come through recommendations, referrals,
                    and repeat visits, reflecting the trust we have built
                    through consistent service and successful travel
                    experiences.
                  </p>
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Bento Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16 text-center">
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
              <RevealStagger key={idx} delayOffset={idx * 0.1}>
                <div className="bg-muted/10 border border-border p-10 h-full flex flex-col hover:shadow-lg transition-shadow duration-500">
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

      {/* Final CTA */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <RevealStagger>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Begin Your Journey with Confidence
            </h2>
          </RevealStagger>
          <RevealStagger delayOffset={0.2}>
            <p className="text-xl text-primary-foreground/90 font-light leading-relaxed mb-12">
              Whether you are planning your first visit to Pakistan, a Silk Road
              exploration, a Central Asia adventure, or a high-altitude trekking
              expedition, our team is ready to help. We invite you to travel
              with a company that combines local expertise, international
              experience, personalized service, and a genuine passion for
              sharing the remarkable destinations of Pakistan and the wider Silk
              Road region.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-medium px-10 py-7 shadow-2xl"
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
