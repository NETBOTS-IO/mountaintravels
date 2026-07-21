"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Calendar,
  Users,
  MapPin,
  Sun,
  Compass,
  Star,
  ChevronRight,
  Mountain,
  Search,
  Filter,
  TrendingUp,
  Globe,
  Tent,
} from "lucide-react";
import Animation from "@/components/animations/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const pillars = [
  { id: "all", label: "All Tours", icon: Globe },
  { id: "pakistan-tours", label: "Pakistan Tours", icon: MapPin },
  {
    id: "silk-road-central-asia",
    label: "Silk Road & Central Asia",
    icon: TrendingUp,
  },
  { id: "trekking-expeditions", label: "Trekking & Expeditions", icon: Tent },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Moderate: "bg-blue-100 text-blue-700 border-blue-200",
  Challenging: "bg-orange-100 text-orange-700 border-orange-200",
  Expert: "bg-red-100 text-red-700 border-red-200",
};

const categoryColors: Record<string, string> = {
  Trekking: "from-[#2d6870] to-[#1a4f5a]",
  Expedition: "from-[#1a4f5a] to-[#0d2f38]",
  "Cultural Tour": "from-[#45919c] to-[#2596be]",
  "Silk Road Tour": "from-[#2596be] to-[#1a6f8a]",
};

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePillar, setActivePillar] = useState("all");
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const pillar = searchParams.get("pillar");
    setActivePillar(pillar || "all");
    const searchVal = searchParams.get("search");
    if (searchVal) {
      setSearchQuery(searchVal);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);
        if (response.data?.data) {
          setTours(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  useEffect(() => {
    let result = tours;

    if (activePillar !== "all") {
      result = result.filter((tour) => {
        const cat = tour.category?.toLowerCase() || "";
        if (activePillar === "pakistan-tours")
          return (
            (cat || "").includes("tour") ||
            (cat || "").includes("safari") ||
            (cat || "").includes("cultural")
          );
        if (activePillar === "silk-road-central-asia")
          return (
            (cat || "").includes("silk") ||
            (cat || "").includes("asia") ||
            (cat || "").includes("central")
          );
        if (activePillar === "trekking-expeditions")
          return (
            (cat || "").includes("trek") ||
            (cat || "").includes("expedition") ||
            (cat || "").includes("climb")
          );
        return cat === activePillar;
      });
    }

    if (searchQuery.trim()) {
      const q = (searchQuery || "").toLowerCase();
      result = result.filter(
        (t) =>
          (t.name || "").toLowerCase().includes(q) ||
          (t.destination || "").toLowerCase().includes(q) ||
          (t.location || "").toLowerCase().includes(q) ||
          (t.category || "").toLowerCase().includes(q) ||
          (t.tags || []).some((tag: string) =>
            (tag || "").toLowerCase().includes(q),
          ),
      );
    }

    setFilteredTours(result);
  }, [activePillar, tours, searchQuery]);

  const handlePillarChange = (pillarId: string) => {
    setActivePillar(pillarId);
    router.push(`/tours?pillar=${pillarId}`, { scroll: false });
  };

  const placeholderImages: Record<string, string> = {
    Trekking:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    Expedition:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    "Cultural Tour":
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
    "Silk Road Tour":
      "https://images.unsplash.com/photo-1612700734789-1d8e3b7f4c0f?w=600&q=80",
    default:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
  };

  const getImage = (tour: any) => {
    if (tour.images?.[0]) {
      const img = tour.images[0];
      if (img.startsWith("http")) return img;
      // Only prepend BASE_URL for backend-served paths (uploads)
      if (img.startsWith("/uploads/")) return `${BASE_URL}${img}`;
      // Local frontend static paths - return as-is
      return img;
    }
    return placeholderImages[tour.category] || placeholderImages.default;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a4f5a 0%, #2d6870 40%, #2596be 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-white/10 text-white border-white/20 mb-4 text-sm px-4 py-1">
            35+ Years of Excellence Since 1990
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Explore Our <span className="text-primary">Journeys</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Extraordinary itineraries across the Karakoram, Himalayas, and the
            legendary Silk Road. Trekking, expeditions, cultural tours, and
            bespoke adventures.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tours, destinations, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Pillar Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarChange(pillar.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105"
                    : "bg-card text-foreground border-border hover:border-primary hover:text-primary hover:shadow-md"
                }`}
              >
                <Icon className="w-4 h-4" />
                {pillar.label}
              </button>
            );
          })}
        </div>

        {/* Stats Bar */}
        {!loading && filteredTours.length > 0 && (
          <div className="flex items-center justify-between mb-8 px-1">
            <p className="text-muted-foreground text-sm">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredTours.length}
              </span>{" "}
              tours
              {searchQuery && (
                <>
                  {" "}
                  for "<span className="text-primary">{searchQuery}</span>"
                </>
              )}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>
                {activePillar === "all"
                  ? "All categories"
                  : pillars.find((p) => p.id === activePillar)?.label}
              </span>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-40 h-40">
              <Animation type="safari" />
            </div>
            <p className="text-muted-foreground text-sm font-medium animate-pulse">
              Loading adventures...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12 bg-destructive/10 rounded-2xl border border-destructive/20">
            <p className="text-destructive text-lg font-medium">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {/* Tour Grid */}
        {!loading && filteredTours.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {filteredTours.map((tour) => (
              <Link
                key={tour._id}
                href={`/tours/detail/${tour._id}`}
                className="group block"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-400 flex flex-col h-full hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image
                      src={getImage(tour)}
                      alt={tour.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category badge top-left */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColors[tour.category] || "from-gray-600 to-gray-800"}`}
                      >
                        <Mountain className="w-3 h-3" />
                        {tour.category}
                      </span>
                    </div>

                    {/* Price badge top-right */}
                    {tour.price && (
                      <div className="absolute top-3 right-3">
                        <span className="text-sm font-bold text-white bg-primary px-3 py-1 rounded-full shadow-lg">
                          From ${tour.price.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Featured badge */}
                    {tour.featured && (
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-400 px-2.5 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Difficulty badge bottom-right */}
                    {tour.difficulty && (
                      <div className="absolute bottom-3 right-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[tour.difficulty] || "bg-gray-100 text-gray-700"}`}
                        >
                          {tour.difficulty}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 space-y-3">
                    {/* Rating */}
                    {tour.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(tour.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {tour.rating} ({tour.reviews || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {tour.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed flex-1">
                      {tour.shortDescription}
                    </p>

                    {/* Meta details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">
                          {tour.country || "Pakistan"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>{tour.days} Days</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">
                          {tour.groupSize || "2-12 people"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">
                          {tour.bestTime || "Year-Round"}
                        </span>
                      </div>
                    </div>

                    {/* Highlights preview */}
                    {tour.highlights?.length > 0 && (
                      <div className="pt-1 space-y-1">
                        {tour.highlights
                          .slice(0, 2)
                          .map((h: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-muted-foreground"
                            >
                              <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      size="sm"
                      className="w-full mt-auto text-sm font-semibold group-hover:bg-primary/90 transition-colors"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredTours.length === 0 && (
          <div className="text-center py-24 bg-muted/20 rounded-3xl border border-border">
            <Compass className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tours found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? `No tours match "${searchQuery}". Try a different search.`
                : "No tours available for the selected category."}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                handlePillarChange("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && filteredTours.length > 0 && (
          <div
            className="mt-16 text-center rounded-3xl p-10 text-white"
            style={{
              background: "linear-gradient(135deg, #1a4f5a 0%, #2596be 100%)",
            }}
          >
            <h2 className="text-3xl font-bold mb-3">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Every journey with Mountain Travels Pakistan can be tailor-made to
              your exact interests, dates, and group size. Contact our
              specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tailor-made-tours">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                  Tailor-Made Tours
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
