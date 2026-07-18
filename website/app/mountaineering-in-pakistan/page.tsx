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
  Mountain,
  Sun,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const placeholderImages = [
  "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&q=80",
];

const expeditionFacts = [
  { icon: Mountain, label: "Peaks Supported", value: "15+ Expeditions" },
  { icon: AlertTriangle, label: "Highest Peak", value: "K2 — 8,611m" },
  { icon: Sun, label: "Best Season", value: "June – August" },
  { icon: Users, label: "Team Sizes", value: "2 to 8 Climbers" },
];

const peakCategories = [
  {
    range: "8,000m Peaks",
    peaks: [
      "K2 (8,611m)",
      "Broad Peak (8,051m)",
      "Gasherbrum I (8,080m)",
      "Gasherbrum II (8,034m)",
      "Nanga Parbat (8,126m)",
    ],
    color: "#45919c",
  },
  {
    range: "7,000m Peaks",
    peaks: [
      "Rakaposhi (7,788m)",
      "Spantik (7,027m)",
      "Masherbrum (7,821m)",
      "Distaghil Sar (7,885m)",
      "Tirich Mir (7,708m)",
    ],
    color: "#2596be",
  },
  {
    range: "6,000m Peaks",
    peaks: [
      "Laila Peak (6,096m)",
      "Diran (7,266m)",
      "Ultar Sar (7,388m)",
      "Lady Finger (6,000m)",
      "Passu Sar (7,478m)",
    ],
    color: "#1a6f8a",
  },
];

export default function MountaineeringPage() {
  const [expeditions, setExpeditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpeditions() {
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`);
        const all = res.data?.data || [];
        const expTours = all.filter(
          (t: any) =>
            t.category?.toLowerCase().includes("expedition") ||
            t.category?.toLowerCase().includes("mountaineer") ||
            t.category?.toLowerCase().includes("climb"),
        );
        setExpeditions(expTours);
      } catch (err) {
        console.error("Failed to fetch expeditions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExpeditions();
  }, []);

  const getImage = (tour: any, idx: number) =>
    placeholderImages[idx % placeholderImages.length];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a2030 0%, #1a4f5a 40%, #45919c 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469521669194-babb45599def?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,32,48,0.9) 0%, rgba(69,145,156,0.55) 100%)",
          }}
        />
        <div className="container mx-auto px-4 z-10 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-[#45919c] text-sm font-medium">
              Mountaineering & Expeditions
            </span>
          </div>

          <Badge className="mb-4 text-sm px-4 py-1 border-white/20 text-white bg-white/10">
            Pakistan's 8,000m Giants — Karakoram · Himalaya
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
            Mountaineering &<br />
            <span style={{ color: "#45919c" }}>Expeditions</span>
          </h1>
          <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl mb-10">
            Pakistan is home to five of the world's fourteen 8,000-meter
            mountains — more per square kilometre than any region on Earth.
            Mountain Travels Pakistan has been supporting international climbing
            teams since 1990.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {expeditionFacts.map((fact, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/10"
              >
                <fact.icon
                  className="w-5 h-5 mx-auto mb-2"
                  style={{ color: "#45919c" }}
                />
                <div className="text-white font-bold text-sm">{fact.value}</div>
                <div className="text-white/50 text-xs">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakistan's 8000m section */}
      <section className="py-14 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Pakistan's Mountains by Category
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            From the Savage Mountain to accessible 6,000m technical peaks —
            Mountain Travels Pakistan provides logistics support for the full
            spectrum of climbing objectives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {peakCategories.map((cat, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 hover:shadow-lg transition-shadow"
                style={{ borderColor: cat.color + "40" }}
              >
                <div
                  className="flex items-center gap-2 mb-4 text-base font-bold"
                  style={{ color: cat.color }}
                >
                  <Layers className="w-5 h-5" />
                  {cat.range}
                </div>
                <ul className="space-y-2">
                  {cat.peaks.map((peak, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      {peak}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expedition Packages from API */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Expedition Packages
              </h2>
              <p className="text-muted-foreground mt-1">
                Full logistics, permits, HAPs, and Base Camp services since 1990
              </p>
            </div>
            <Link href="/tours?pillar=trekking-expeditions">
              <span
                className="flex items-center gap-1 hover:gap-2 transition-all text-sm font-semibold"
                style={{ color: "#45919c" }}
              >
                All Treks & Expeditions <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div
                className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: "#45919c",
                  borderTopColor: "transparent",
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expeditions.map((exp, idx) => (
                <Link
                  key={exp._id}
                  href={`/tours/detail/${exp._id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#45919c]/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImage(exp, idx)}
                        alt={exp.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-xs font-semibold text-white px-2.5 py-1 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #45919c, #2596be)",
                          }}
                        >
                          Expedition
                        </span>
                      </div>
                      {exp.price && (
                        <div className="absolute top-3 right-3">
                          <span
                            className="text-sm font-bold text-white px-3 py-1 rounded-full"
                            style={{ background: "#45919c" }}
                          >
                            From ${exp.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-base line-clamp-1">
                          {exp.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {exp.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(exp.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {exp.rating} ({exp.reviews})
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3">
                        {exp.shortDescription}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                        <div className="flex items-center gap-1">
                          <Calendar
                            className="w-3.5 h-3.5"
                            style={{ color: "#45919c" }}
                          />
                          <span>{exp.days} Days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users
                            className="w-3.5 h-3.5"
                            style={{ color: "#45919c" }}
                          />
                          <span>{exp.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <Sun
                            className="w-3.5 h-3.5"
                            style={{ color: "#45919c" }}
                          />
                          <span>{exp.bestTime}</span>
                        </div>
                      </div>
                      <div
                        className="mt-4 flex items-center font-semibold text-sm"
                        style={{ color: "#45919c" }}
                      >
                        View Expedition <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-3">
            Our Expedition Services
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Mountain Travels Pakistan provides comprehensive services for
            climbing teams of all sizes, from independent alpinists to
            fully-supported commercial expeditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "📋",
                title: "Permits & Licensing",
                desc: "All government climbing permits, royalty fees, and liaison officer arrangements handled efficiently.",
              },
              {
                icon: "✈️",
                title: "Logistics & Transport",
                desc: "Airport transfers, domestic flights, jeep convoys, porter recruitment, and cargo clearance.",
              },
              {
                icon: "🏕️",
                title: "Base Camp Services",
                desc: "Premium BC setup with dining tent, kitchen, toilet facilities, and cook staff throughout the expedition.",
              },
              {
                icon: "🧗",
                title: "High-Altitude Porters (HAPs)",
                desc: "Experienced, certified high-altitude porters from Gilgit-Baltistan with proven track records on 8,000m peaks.",
              },
              {
                icon: "📡",
                title: "Communication & Weather",
                desc: "Satellite phone facilities, weather forecasting service, and daily BC-team communication support.",
              },
              {
                icon: "🚁",
                title: "Emergency & Rescue",
                desc: "Emergency protocols, helicopter rescue coordination, and 24/7 crisis management from our Islamabad office.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-6 hover:border-[#45919c]/40 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #1a4f5a 0%, #2596be 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Planning an Expedition to Pakistan?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Our team has over 35 years of experience supporting international
            climbing teams. Contact us to discuss your expedition requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tours?pillar=trekking-expeditions">
              <span
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full transition-colors hover:opacity-90"
                style={{ background: "#45919c" }}
              >
                Browse Expeditions <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors">
                Contact Our Team
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
