"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Compass, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  destinationsIntro,
  popularDestinations,
  beyondPakistan,
} from "@/data/destinationsContent";

export default function DestinationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
            {destinationsIntro.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
            {destinationsIntro.description}
          </p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-16">
            {popularDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center bg-card border border-border p-8 md:p-12 hover:shadow-xl transition-all duration-300`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[400px] bg-muted border border-border">
                  <Image
                    src="/assets/home/hero-1.jpg"
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-background border border-border px-4 py-2 rounded-full shadow-lg">
                    <span className="font-semibold text-primary flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Destination
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {dest.name}
                  </h2>
                  <p className="text-muted-foreground font-light text-lg leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-display font-bold text-xl mb-4 flex items-center text-primary">
                      <Compass className="w-5 h-5 mr-2" />
                      Key Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dest.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-foreground/80 font-light"
                        >
                          <CheckCircle className="w-4 h-4 mr-2 mt-1 text-primary shrink-0" />
                          <span className="text-base">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-muted-foreground font-light italic text-lg border-l-4 border-primary pl-4">
                    "{dest.appeal}"
                  </p>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-display font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">
                      Suggested Tours
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dest.suggestedTours.map((tour, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tour}
                        </span>
                      ))}
                    </div>
                    <Link href={`/tours`}>
                      <Button className="px-8 py-5">View Related Tours</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Pakistan Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
          <Compass className="w-12 h-12 mx-auto text-primary" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground">
            {beyondPakistan.title}
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            {beyondPakistan.description}
          </p>
          <p className="text-lg text-foreground font-light italic">
            "{beyondPakistan.closing}"
          </p>
          <Link href="/tours">
            <Button size="lg" className="px-10 py-6">
              Explore Silk Road Tours
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
