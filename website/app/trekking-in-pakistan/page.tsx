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
  Search,
  Home,
} from "lucide-react";
import Animation from "@/components/animations/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [filteredTreks, setFilteredTreks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        setFilteredTreks(trekTours);
      } catch (err) {
        console.error("Failed to fetch treks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTreks();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTreks(treks);
    } else {
      const q = query.toLowerCase();
      setFilteredTreks(
        treks.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.shortDescription.toLowerCase().includes(q) ||
            t.location.toLowerCase().includes(q),
        ),
      );
    }
  };

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
            <span className="text-white font-semibold">Trekking</span>
          </nav>

          <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1.5 text-xs">
            Karakoram · Himalaya · Hindu Kush
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
            Trekking in <span className="text-primary">Pakistan</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Home to the world's greatest concentration of high mountains,
            Pakistan offers trekking adventures that rival any destination on
            Earth — from the Baltoro Glacier and K2 Base Camp to the remote Snow
            Lake and Fairy Meadows.
          </p>

          {/* Search bar option */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search trekking packages..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          {/* Facts strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
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

      {/* Trekking Packages Grid */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Our Trekking Packages
              </h2>
              <p className="text-xs text-muted-foreground">
                Guided expeditions led by Karakoram specialists since 1990
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {filteredTreks.length} Routes
            </Badge>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-36 h-36">
                <Animation type="trekking" />
              </div>
              <p className="text-xs text-muted-foreground animate-pulse">
                Loading trekking routes...
              </p>
            </div>
          ) : filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreks.map((trek, idx) => (
                <Link
                  key={trek._id}
                  href={`/tours/detail/${trek._id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#45919c]/30 hover:shadow-xl transition-all flex flex-col h-full transform hover:-translate-y-1">
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <Image
                        src={getImage(trek, idx)}
                        alt={trek.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {trek.difficulty && (
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColors[trek.difficulty] || "bg-gray-100 text-gray-700"}`}
                          >
                            {trek.difficulty}
                          </span>
                        </div>
                      )}
                      {trek.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-semibold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        </div>
                      )}
                      {trek.price && (
                        <div className="absolute bottom-3 left-3">
                          <span className="text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full">
                            From ${trek.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1 mb-1">
                          {trek.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {trek.shortDescription}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span>{trek.days} Days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span className="truncate">
                            {trek.groupSize || "2-12 people"}
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
              <Compass className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">
                No matching treks found
              </h3>
              <p className="text-muted-foreground text-xs max-w-sm mx-auto mt-1 mb-4">
                We couldn't find any packages matching "{searchQuery}". Try a
                different term.
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

      {/* Guides Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Karakoram Mountaineering Guidelines
            </h2>
            <p className="text-muted-foreground text-sm">
              Professional advice to prepare you for the highest trails on Earth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Acclimatization",
                desc: "Our itineraries integrate dedicated rest and adaptation days to reduce high altitude risks.",
              },
              {
                icon: Tent,
                title: "Wilderness Camps",
                desc: "Fully serviced camps with kitchen domes, fresh cooked meals, and safety equipment.",
              },
              {
                icon: Sun,
                title: "Best Timing",
                desc: "Mid-June to late August is the perfect operational window with optimal weather conditions.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="border p-6 rounded-2xl bg-muted/10 text-center space-y-2"
              >
                <v.icon className="w-8 h-8 text-primary mx-auto" />
                <h4 className="font-bold text-base">{v.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
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
          <h2 className="text-3xl font-bold">Ready to Trek Pakistan?</h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm">
            Our Karakoram specialists have been guiding trekkers through
            Pakistan's mountains since 1990. Let us plan your perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#45919c] hover:bg-[#45919c]/90 text-white font-semibold rounded-full px-8 py-3 text-sm"
              >
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
