"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Compass, CheckCircle, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  destinationsIntro,
  popularDestinations,
  beyondPakistan,
} from "@/data/destinationsContent";

export default function DestinationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-semibold">Destinations</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative max-w-5xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
            {destinationsIntro.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
            {destinationsIntro.description}
          </p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 gap-12">
            {popularDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center bg-card border border-border p-6 hover:shadow-md transition-all duration-300`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-[300px] bg-muted border border-border rounded-lg overflow-hidden">
                  <Image
                    src="/assets/home/hero-1.jpg"
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-background border border-border px-3 py-1.5 rounded-full shadow-md">
                    <span className="font-semibold text-primary flex items-center text-xs">
                      <MapPin className="w-3 h-3 mr-1.5" />
                      Destination
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {dest.name}
                  </h2>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-display font-bold text-base mb-2 flex items-center text-primary">
                      <Compass className="w-4 h-4 mr-1.5" />
                      Key Highlights
                    </h3>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-foreground/80 font-light">
                      {dest.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-primary shrink-0" />
                          <span className="truncate">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-muted-foreground font-light italic text-sm border-l-4 border-primary pl-3">
                    "{dest.appeal}"
                  </p>

                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dest.suggestedTours.map((tour, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium"
                        >
                          {tour}
                        </span>
                      ))}
                    </div>
                    <Link href={`/tours`}>
                      <Button size="sm" className="px-5 py-3 h-auto">
                        View Related Tours
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Pakistan Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
          <Compass className="w-10 h-10 mx-auto text-primary" />
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            {beyondPakistan.title}
          </h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            {beyondPakistan.description}
          </p>
          <p className="text-sm text-foreground font-light italic">
            "{beyondPakistan.closing}"
          </p>
          <Link href="/tours">
            <Button
              size="default"
              className="px-6 py-4 text-sm font-semibold hover:scale-[1.02] transition-all"
            >
              Explore Silk Road Tours
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
