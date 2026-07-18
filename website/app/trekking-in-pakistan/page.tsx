"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  ArrowRight,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Tent,
  MapPin,
  AlertTriangle,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const placeholderImages = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-blue-100 text-blue-700",
  Challenging: "bg-orange-100 text-orange-700",
  Expert: "bg-red-100 text-red-700",
};

const trekFacts = [
  { icon: MapPin, label: "Routes", value: "7+ Major Treks" },
  {
    icon: AlertTriangle,
    label: "Max Altitude",
    value: "5,585 m (Gondogoro La)",
  },
  { icon: Sun, label: "Best Season", value: "June – September" },
  { icon: Users, label: "Group Sizes", value: "2 to 16 people" },
];

export default function TrekkingPage() {
  const [treks, setTreks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTreks() {
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`);
        const all = res.data?.data || [];
        const trekTours = all.filter(
          (t: any) =>
            t.category?.toLowerCase().includes("trek") ||
            t.category?.toLowerCase().includes("trekking"),
        );
        setTreks(trekTours);
      } catch (err) {
        console.error("Failed to fetch treks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTreks();
  }, []);

  const getImage = (tour: any, idx: number) => {
    if (tour.images?.[0] && !tour.images[0].includes("/uploads/tours/")) {
      return tour.images[0].startsWith("http")
        ? tour.images[0]
        : `${BASE_URL}${tour.images[0]}`;
    }
    return placeholderImages[idx % placeholderImages.length];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d2f38 0%, #1a4f5a 40%, #2596be 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,47,56,0.85) 0%, rgba(37,150,190,0.65) 100%)",
          }}
        />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-primary text-sm font-medium">
              Trekking in Pakistan
            </span>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            Karakoram · Himalaya · Hindu Kush
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
            Trekking in
            <br />
            <span className="text-primary">Pakistan</span>
          </h1>
          <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl mb-10">
            Home to the world's greatest concentration of high mountains,
            Pakistan offers trekking adventures that rival any destination on
            Earth — from the Baltoro Glacier and K2 Base Camp to the remote Snow
            Lake and Fairy Meadows.
          </p>

          {/* Facts strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {trekFacts.map((fact, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/10"
              >
                <fact.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-white font-bold text-sm">{fact.value}</div>
                <div className="text-white/50 text-xs">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treks from API */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Our Trekking Packages
              </h2>
              <p className="text-muted-foreground mt-1">
                Guided expeditions led by Karakoram specialists since 1990
              </p>
            </div>
            <Link href="/tours?pillar=trekking-expeditions">
              <span className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                All Treks & Expeditions <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treks.map((trek, idx) => (
                <Link
                  key={trek._id}
                  href={`/tours/detail/${trek._id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImage(trek, idx)}
                        alt={trek.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {trek.difficulty && (
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[trek.difficulty] || "bg-gray-100 text-gray-700"}`}
                          >
                            {trek.difficulty}
                          </span>
                        </div>
                      )}
                      {trek.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-semibold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        {trek.price && (
                          <span className="text-sm font-bold text-white bg-primary/90 px-3 py-1 rounded-full">
                            From ${trek.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {trek.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(trek.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {trek.rating} ({trek.reviews})
                          </span>
                        </div>
                      )}
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                        {trek.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                        {trek.shortDescription}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{trek.days} Days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-primary" />
                          <span>{trek.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <Sun className="w-3.5 h-3.5 text-primary" />
                          <span>{trek.bestTime}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        View Trek Details{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Major Trekking Routes Info Section */}
      <section className="py-16 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Pakistan's Greatest Trekking Routes
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From the legendary Baltoro Glacier to the remote Snow Lake and
            tranquil Nagar valleys — Pakistan's trekking routes are among the
            finest on the planet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "K2 Base Camp Trek",
                duration: "18–24 Days",
                grade: "Challenging",
                altitude: "5,150m",
                desc: "The legendary Baltoro Glacier journey to the foot of K2 — the world's most spectacular mountain. Passing Trango Towers, Concordia, and the Gasherbrum Group.",
                icon: "⛰️",
              },
              {
                name: "Gondogoro La Trek",
                duration: "20–24 Days",
                grade: "Strenuous",
                altitude: "5,585m",
                desc: "Combining K2 Base Camp with the dramatic sunrise crossing of Gondogoro La — widely regarded as the greatest traverse in Pakistan.",
                icon: "🏔️",
              },
              {
                name: "Snow Lake Trek (Biafo-Hispar)",
                duration: "18–24 Days",
                grade: "Strenuous",
                altitude: "5,150m",
                desc: "One of the last great wilderness expeditions — crossing the mighty Biafo Glacier to reach the vast Snow Lake glacial basin in the heart of the Karakoram.",
                icon: "❄️",
              },
              {
                name: "Nanga Parbat Base Camp Trek",
                duration: "5–8 Days",
                grade: "Moderate",
                altitude: "4,200m",
                desc: "Through the magical Fairy Meadows to the foot of the Killer Mountain — one of Pakistan's most accessible and breathtaking mountain adventures.",
                icon: "🌿",
              },
              {
                name: "Rush Lake Trek",
                duration: "7–10 Days",
                grade: "Moderate",
                altitude: "4,700m",
                desc: "Trek to one of the world's highest alpine lakes in the Nagar Valley with panoramic views of Rakaposhi, Diran, Ultar Sar, and Spantik.",
                icon: "🌊",
              },
              {
                name: "Rakaposhi Base Camp Trek",
                duration: "6–8 Days",
                grade: "Moderate",
                altitude: "3,700m",
                desc: "Trek to the base of Rakaposhi — one of Pakistan's most beautiful and iconic mountains, rising nearly 6,000m above the Hunza Valley.",
                icon: "🗻",
              },
            ].map((route, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{route.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-foreground text-base">
                        {route.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${difficultyColors[route.grade] || "bg-orange-100 text-orange-700"}`}
                      >
                        {route.grade}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tent className="w-3 h-3" />
                        Max {route.altitude}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {route.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #1a4f5a 0%, #2596be 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Trek Pakistan?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Our Karakoram specialists have been guiding trekkers through
            Pakistan's mountains since 1990. Let us plan your perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tours?pillar=trekking-expeditions">
              <span className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                Browse All Treks <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors">
                Get Custom Quote
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
