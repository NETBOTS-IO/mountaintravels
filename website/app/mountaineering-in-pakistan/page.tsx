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
  Search,
  Home,
  FileText,
  Plane,
  ShieldCheck,
  Radio,
  LifeBuoy,
} from "lucide-react";
import Animation from "@/components/animations/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [filteredExpeditions, setFilteredExpeditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        setFilteredExpeditions(expTours);
      } catch (err) {
        console.error("Failed to fetch expeditions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExpeditions();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredExpeditions(expeditions);
    } else {
      const q = query.toLowerCase();
      setFilteredExpeditions(
        expeditions.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.shortDescription.toLowerCase().includes(q) ||
            t.location.toLowerCase().includes(q),
        ),
      );
    }
  };

  const getImage = (tour: any, idx: number) => {
    if (tour.images?.[0]) {
      const img = tour.images[0];
      if (img.startsWith("http")) return img;
      if (img.startsWith("/uploads/")) return `${BASE_URL}${img}`;
      return img;
    }
    return placeholderImages[idx % placeholderImages.length];
  };

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
        <div className="container mx-auto px-4 z-10 relative text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-white/60 mb-6">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#45919c] font-semibold">Expeditions</span>
          </nav>

          <Badge className="mb-4 text-sm px-4 py-1.5 border-white/20 text-white bg-white/10">
            Pakistan's 8,000m Giants — Karakoram · Himalaya
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
            Mountaineering &{" "}
            <span style={{ color: "#45919c" }}>Expeditions</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Pakistan is home to five of the world's fourteen 8,000-meter
            mountains — more per square kilometre than any region on Earth.
            Mountain Travels Pakistan has been supporting international climbing
            teams since 1990.
          </p>

          {/* Search bar option */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search expeditions and climbs..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
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

      {/* Categories Breakdown */}
      <section className="py-14 border-b border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Pakistan's Mountains by Category
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto text-sm">
            From the Savage Mountain to accessible 6,000m technical peaks —
            Mountain Travels Pakistan provides logistics support for the full
            spectrum of climbing objectives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {peakCategories.map((cat, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 bg-card hover:shadow-md transition-shadow"
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
                      className="flex items-center gap-2 text-xs text-foreground"
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

      {/* Expeditions Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Expedition Packages
              </h2>
              <p className="text-xs text-muted-foreground">
                Full logistics, permits, HAPs, and Base Camp services since 1990
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {filteredExpeditions.length} Peaks
            </Badge>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-36 h-36">
                <Animation type="expeditions" />
              </div>
              <p className="text-xs text-muted-foreground animate-pulse">
                Loading expedition routes...
              </p>
            </div>
          ) : filteredExpeditions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpeditions.map((exp, idx) => (
                <Link
                  key={exp._id}
                  href={`/tours/detail/${exp._id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#45919c]/30 hover:shadow-xl transition-all flex flex-col h-full transform hover:-translate-y-1">
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <Image
                        src={getImage(exp, idx)}
                        alt={exp.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-gradient-to-r from-[#45919c] to-[#2596be]">
                          Expedition
                        </span>
                      </div>
                      {exp.price && (
                        <div className="absolute top-3 right-3">
                          <span className="text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full">
                            From ${exp.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1 mb-1">
                          {exp.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {exp.shortDescription}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span>{exp.days} Days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span className="truncate">
                            {exp.groupSize || "2-8 climbers"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <Layers className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">
                No matching expeditions found
              </h3>
              <p className="text-muted-foreground text-xs max-w-sm mx-auto mt-1 mb-4">
                We couldn't find any packages matching "{searchQuery}". Try a
                different peak name.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-3">
            Our Expedition Services
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto text-sm">
            Mountain Travels Pakistan provides comprehensive ground handling for
            climbing teams, from independent alpinists to fully-supported
            commercial expeditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: FileText,
                title: "Permits & Licensing",
                desc: "All government climbing permits, royalty fees, and liaison officer arrangements handled efficiently.",
              },
              {
                icon: Plane,
                title: "Logistics & Transport",
                desc: "Airport transfers, domestic flights, jeep convoys, porter recruitment, and cargo clearance.",
              },
              {
                icon: Tent,
                title: "Base Camp Services",
                desc: "Premium BC setup with dining tent, kitchen, toilet facilities, and cook staff throughout the expedition.",
              },
              {
                icon: Mountain,
                title: "High-Altitude Porters (HAPs)",
                desc: "Experienced, certified high-altitude porters from Gilgit-Baltistan with proven track records on 8,000m peaks.",
              },
              {
                icon: Radio,
                title: "Communication & Weather",
                desc: "Satellite phone facilities, weather forecasting service, and daily BC-team communication support.",
              },
              {
                icon: LifeBuoy,
                title: "Emergency & Rescue",
                desc: "Emergency protocols, helicopter rescue coordination, and 24/7 crisis management from our Islamabad office.",
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="bg-card rounded-2xl border border-border p-6 hover:border-[#45919c]/40 hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
                >
                  <Icon className="w-8 h-8 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        className="py-16 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #1a4f5a 0%, #2596be 100%)",
        }}
      >
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold">
            Planning an Expedition to Pakistan?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm">
            Our team has over 35 years of experience supporting international
            climbing teams. Contact us to discuss your expedition requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#45919c] hover:bg-[#45919c]/90 text-white font-semibold rounded-full px-8 py-3 text-sm"
              >
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
