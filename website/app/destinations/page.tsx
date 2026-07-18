"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Compass,
  CheckCircle,
  Home,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  destinationsIntro,
  popularDestinations,
  beyondPakistan,
} from "@/data/destinationsContent";

export default function DestinationsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Unsplash replacements for stunning destinations visuals
  const destImages: Record<string, string> = {
    "hunza-valley":
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80", // Hunza
    "skardu-baltistan":
      "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80", // Skardu
    "gilgit-baltistan":
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", // Karakoram / GB
    "chitral-kalash":
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // Hindu Kush
    "swat-valley":
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", // Swat
    kashmir:
      "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=800&q=80", // Kashmir
    lahore:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80", // Badshahi Mosque
    taxila:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Ancient ruins placeholder
    "makran-coast":
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", // Coastal beach
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section
        className="relative py-28 overflow-hidden"
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
          {/* Breadcrumbs */}
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
            Voted Top Travel Destination
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 max-w-4xl mx-auto">
            {destinationsIntro.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
            {destinationsIntro.description}
          </p>
        </div>
      </section>

      {/* Destinations Grid List */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((dest, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={dest.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image Section */}
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    <Image
                      src={
                        destImages[dest.id] ||
                        "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80"
                      }
                      alt={dest.name}
                      fill
                      unoptimized
                      className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-110 rotate-1" : "scale-100"}`}
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border border-white/20 px-3 py-1 rounded-full shadow-md">
                      <span className="font-semibold text-primary flex items-center text-[10px] uppercase tracking-wider">
                        <MapPin className="w-3 h-3 mr-1 text-[#45919c]" />
                        Pakistan
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="font-bold text-lg leading-tight tracking-tight">
                        {dest.name.split("–")[0].trim()}
                      </h2>
                      <span className="text-[11px] text-white/80 block mt-0.5 font-light tracking-wide line-clamp-1">
                        {dest.name.split("–")[1]?.trim() || "Land of Wonders"}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <p className="text-muted-foreground font-light text-xs leading-relaxed flex-grow line-clamp-3">
                      {dest.description}
                    </p>

                    {/* Highlights */}
                    <div className="border-t border-border pt-4">
                      <h3 className="font-bold text-xs mb-2.5 flex items-center text-primary">
                        <Compass className="w-3.5 h-3.5 mr-1.5" />
                        Key Highlights
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-[10px] bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border"
                          >
                            <CheckCircle className="w-2.5 h-2.5 mr-1 text-[#45919c] shrink-0" />
                            {highlight}
                          </span>
                        ))}
                        {dest.highlights.length > 3 && (
                          <span className="text-[10px] text-muted-foreground px-1 py-1 font-medium">
                            +{dest.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Appeal text block */}
                    <p className="text-muted-foreground font-light italic text-xs border-l-2 border-primary pl-3 line-clamp-2">
                      "{dest.appeal}"
                    </p>

                    {/* Suggested Trips */}
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dest.suggestedTours.map((tour, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded text-[10px] font-medium"
                          >
                            {tour}
                          </span>
                        ))}
                      </div>
                      <Link href={`/tours`}>
                        <Button
                          size="sm"
                          className="w-full text-xs font-semibold group bg-primary hover:bg-primary/95 transition-all"
                        >
                          Explore Tours
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beyond Pakistan / Silk Road Banner */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <div className="w-16 h-16 bg-[#45919c]/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
            <Globe2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {beyondPakistan.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            {beyondPakistan.description}
          </p>
          <p className="text-sm font-medium italic text-[#45919c]">
            "{beyondPakistan.closing}"
          </p>
          <div className="pt-4">
            <Link href="/tours?pillar=silk-road-central-asia">
              <Button
                size="lg"
                className="px-8 py-4 text-sm font-semibold rounded-full group hover:shadow-lg transition-all"
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
