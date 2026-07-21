"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  MapPin,
  Compass,
  CheckCircle,
  Home,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Globe2,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { destinationsIntro, beyondPakistan } from "@/data/destinationsContent";
import { BASE_URL } from "@/app/Var";

export default function DestinationsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await axios.get(`${BASE_URL}/api/destinations`);
        setDestinations(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setError("Failed to load destinations.");
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name?.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      dest.description
        ?.toLowerCase()
        .includes((searchQuery || "").toLowerCase()) ||
      dest.highlights?.some((h: string) =>
        (h || "").toLowerCase().includes((searchQuery || "").toLowerCase()),
      ),
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d2f38 0%, #1a4f5a 40%, #2596be 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 z-10 relative text-center">
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-white/60 mb-6">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40 shrink-0" />
            <span className="text-white font-semibold">Destinations</span>
          </nav>

          <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1.5 text-xs animate-pulse">
            <Sparkles className="w-3 h-3 mr-1.5 inline text-amber-300" />
            Discover &amp; Explore
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
            {destinationsIntro.title}
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            {destinationsIntro.description}
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search destinations, attractions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid List */}
      <section className="py-16 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">
                Loading destinations…
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((dest, index) => {
                const isHovered = hoveredIndex === index;
                const shortTitle =
                  dest.shortName || dest.name.split("–")[0].trim();
                const subtitle = dest.name.split("–")[1]?.trim() || "";
                const searchLink = `/tours?search=${encodeURIComponent(shortTitle)}`;
                const imageUrl =
                  dest.image ||
                  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80";

                return (
                  <div
                    key={dest._id || dest.slug}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#45919c]/30 transition-all duration-400 flex flex-col h-full transform hover:-translate-y-1"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-muted">
                      <Image
                        src={imageUrl}
                        alt={dest.name}
                        fill
                        unoptimized
                        className={`object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border border-white/20 px-2.5 py-0.5 rounded-full shadow-sm">
                        <span className="font-semibold text-primary flex items-center text-[9px] uppercase tracking-wider">
                          <MapPin className="w-2.5 h-2.5 mr-1 text-[#45919c]" />
                          {dest.region || "Pakistan"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h2 className="font-bold text-base leading-tight tracking-tight">
                          {shortTitle}
                        </h2>
                        {subtitle && (
                          <span className="text-[10px] text-white/80 block mt-0.5 font-light tracking-wide line-clamp-1">
                            {subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <p className="text-muted-foreground font-light text-xs leading-relaxed flex-grow line-clamp-3">
                        {dest.description}
                      </p>

                      {/* Highlights */}
                      {dest.highlights?.length > 0 && (
                        <div className="border-t border-border pt-3">
                          <h3 className="font-bold text-[11px] mb-2 flex items-center text-[#45919c]">
                            <Compass className="w-3 h-3 mr-1" />
                            Key Highlights
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {dest.highlights
                              .slice(0, 3)
                              .map((highlight: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border"
                                >
                                  <CheckCircle className="w-2.5 h-2.5 mr-1 text-[#45919c] shrink-0" />
                                  {highlight}
                                </span>
                              ))}
                            {dest.highlights.length > 3 && (
                              <span className="text-[9px] text-muted-foreground px-1 py-0.5 font-medium">
                                +{dest.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Appeal */}
                      {dest.appeal && (
                        <p className="text-muted-foreground font-light italic text-xs border-l-2 border-primary pl-3 line-clamp-2">
                          &quot;{dest.appeal}&quot;
                        </p>
                      )}

                      {/* Suggested Tours */}
                      {dest.suggestedTours?.length > 0 && (
                        <div className="pt-3 border-t border-border mt-auto">
                          <div className="flex flex-wrap gap-1 mb-3">
                            {dest.suggestedTours.map(
                              (tour: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded text-[9px] font-medium"
                                >
                                  {tour}
                                </span>
                              ),
                            )}
                          </div>
                          <Link href={searchLink}>
                            <Button
                              size="sm"
                              className="w-full text-xs font-semibold group bg-primary hover:bg-primary/95 transition-all"
                            >
                              View Related Tours
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <Globe2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">
                No destinations found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
                No results match &quot;{searchQuery}&quot;. Try something else.
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

      {/* Beyond Pakistan Banner */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <div className="w-14 h-14 bg-[#45919c]/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <Globe2
              className="w-7 h-7 text-primary animate-spin"
              style={{ animationDuration: "20s" }}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            {beyondPakistan.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            {beyondPakistan.description}
          </p>
          <p className="text-xs font-medium italic text-[#45919c]">
            &quot;{beyondPakistan.closing}&quot;
          </p>
          <div className="pt-2">
            <Link href="/tours?pillar=silk-road-central-asia">
              <Button
                size="default"
                className="px-6 py-3 text-xs font-semibold rounded-full group hover:shadow-lg transition-all"
              >
                Explore Silk Road Tours
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
