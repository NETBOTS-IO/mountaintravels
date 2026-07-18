"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Calendar, Users, Map, Sun, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const pillars = [
  { id: "all", label: "All Packages" },
  { id: "pakistan-tours", label: "Pakistan Tours" },
  { id: "silk-road-central-asia", label: "Silk Road & Central Asia" },
  { id: "trekking-expeditions", label: "Trekking & Expeditions" }
];

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePillar, setActivePillar] = useState("all");
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const pillar = searchParams.get("pillar");
    if (pillar) {
      setActivePillar(pillar);
    } else {
      setActivePillar("all");
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);
        // Fetch all tours so user can explore the entire catalog
        if (response.data && response.data.data) {
          setTours(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  useEffect(() => {
    if (activePillar === "all") {
      setFilteredTours(tours);
    } else {
      setFilteredTours(
        tours.filter((tour) => {
          const category = tour.category?.toLowerCase() || "";
          if (activePillar === "pakistan-tours") {
            return category.includes("tour") || category.includes("safari") || category.includes("cultural");
          }
          if (activePillar === "silk-road-central-asia") {
            return category.includes("silk") || category.includes("asia") || category.includes("central");
          }
          if (activePillar === "trekking-expeditions") {
            return category.includes("trek") || category.includes("expedition") || category.includes("climb");
          }
          return category === activePillar;
        })
      );
    }
  }, [activePillar, tours]);

  const handlePillarChange = (pillarId: string) => {
    setActivePillar(pillarId);
    router.push(`/tours?pillar=${pillarId}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge className="bg-primary/10 text-primary border-none">Our Catalog</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {activePillar === "all" ? "Explore Our Journeys" : pillars.find(p => p.id === activePillar)?.label}
          </h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Crafting extraordinary itineraries across the Karakoram, Himalayas, and the historic trade corridors connecting South and Central Asia.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {pillars.map((pillar) => (
            <Button
              key={pillar.id}
              onClick={() => handlePillarChange(pillar.id)}
              variant={activePillar === pillar.id ? "default" : "outline"}
              className="text-base px-6 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {pillar.label}
            </Button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading journeys...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12 text-destructive">
            <p className="text-2xl">{error}</p>
          </div>
        )}

        {/* Tour List */}
        {!loading && filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <Link key={tour._id} href={`/tours/detail/${tour._id}`} className="group">
                <div className="bg-card rounded-2xl overflow-hidden border border-muted-foreground/10 hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-60">
                    <Image
                      src={`${BASE_URL}${tour.images?.[0]}` || "/placeholder.svg"}
                      alt={tour.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white text-base font-bold px-3 py-1 shadow-md">
                        ${tour.price}
                      </Badge>
                    </div>
                    {tour.difficulty && (
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="text-sm font-semibold px-3 py-1 shadow-md">
                          {tour.difficulty}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {tour.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {tour.description || tour.shortDescription}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <Map className="w-4 h-4 text-primary" />
                        <span className="truncate">{tour.country || "Pakistan"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{tour.days || 10} Days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{tour.groupSize || "2-12 people"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-primary" />
                        <span>{tour.bestTime || "Year-Round"}</span>
                      </div>
                    </div>

                    <Button className="w-full text-base mt-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-24 bg-muted/20 rounded-3xl border border-muted-foreground/10">
              <Compass className="w-16 h-16 text-muted-foreground/45 mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                No tours available for the selected category.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
