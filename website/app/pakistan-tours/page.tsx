"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Map,
  Compass,
  Gem,
  Tent,
  Milestone,
  Calendar,
  Flame,
  Users,
  ArrowRight,
  Search,
  ShieldCheck,
  Sun,
  Star,
  MapPin,
  ChevronRight,
  Home,
  Eye,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const defaultTourCategories = [
  {
    title: "Cultural Tours",
    desc: "Discover the civilizations, cultures, and traditions that have shaped Pakistan for thousands of years.",
    stops:
      "Lahore, Taxila, Islamabad, Multan, Peshawar, Chitral, Kalash Valleys, Swat Valley",
    tours: [
      "Grand Pakistan Tour",
      "Best of Pakistan Tour",
      "Buddhist Heritage of Pakistan Tour",
    ],
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
    url: "/tours?pillar=pakistan-tours",
  },
  {
    title: "Northern Pakistan Tours",
    desc: "Explore stunning alpine scenery, turquoise lakes, Hunza hospitality, and the Karakoram giants.",
    stops:
      "Hunza Valley, Skardu, Gilgit, Fairy Meadows, Nanga Parbat, Deosai National Park, Khunjerab Pass",
    tours: [
      "Northern Pakistan Highlights Tour",
      "Best of Pakistan Tour",
      "Grand Pakistan Tour",
    ],
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80",
    url: "/tours?pillar=pakistan-tours",
  },
  {
    title: "Trekking & Adventure",
    desc: "Pakistan is home to the world's greatest concentration of high mountains and glaciers.",
    stops:
      "K2 Base Camp, Concordia, Gondogoro La Pass, Snow Lake, Fairy Meadows, Rush Lake",
    tours: [
      "K2 Base Camp Trek",
      "Gondogoro La Trek",
      "Snow Lake Trek (Biafo-Hispar)",
    ],
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    url: "/tours?pillar=trekking-expeditions",
  },
];

export default function PakistanToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axios.get(`${BASE_URL}/api/tours`);
        const allTours = res.data?.data || [];
        // Only show Pakistan specific tours
        const pakTours = allTours.filter((t: any) =>
          t.country?.toLowerCase().includes("pakistan"),
        );
        setTours(pakTours);
        setFilteredTours(pakTours);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTours(tours);
    } else {
      const q = query.toLowerCase();
      setFilteredTours(
        tours.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.shortDescription.toLowerCase().includes(q),
        ),
      );
    }
  };

  const getTourImage = (tour: any, idx: number) => {
    if (tour.images?.[0] && !tour.images[0].includes("/uploads/tours/")) {
      return tour.images[0].startsWith("http")
        ? tour.images[0]
        : `${BASE_URL}${tour.images[0]}`;
    }
    const unsplashFallbacks = [
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80",
      "https://images.unsplash.com/photo-1624313511990-675902801899?w=600&q=80",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
    ];
    return unsplashFallbacks[idx % unsplashFallbacks.length];
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
            <span className="text-white font-semibold">Pakistan Tours</span>
          </nav>

          <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1.5 text-xs">
            <Globe className="w-3.5 h-3.5 mr-1.5 inline text-[#2596be]" />
            Official Tourism Specialist Since 1990
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
            Pakistan Tours & <span className="text-primary">Adventures</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Experience the cultural heritage of Lahore, ancient civilization at
            Taxila, the unique Kalash valleys, and the spectacular Karakoram
            peaks with the local pioneers.
          </p>

          {/* Search bar option */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search Pakistan tour packages..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Browse by Tour Style
            </h2>
            <p className="text-muted-foreground mt-2">
              Find the travel experience that fits your personal journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultTourCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="relative h-48">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="text-xs font-medium text-foreground/80 border-t pt-3">
                    Stops:{" "}
                    <span className="text-muted-foreground font-light">
                      {cat.stops}
                    </span>
                  </div>
                  <Link href={cat.url}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs font-semibold group mt-4"
                    >
                      Explore Category
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakistan Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Pakistan Tour Packages
              </h2>
              <p className="text-xs text-muted-foreground">
                Select from our vetted local itineraries
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {filteredTours.length} Packages
            </Badge>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div
                className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: "#45919c",
                  borderTopColor: "transparent",
                }}
              />
            </div>
          ) : filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour, idx) => (
                <Link
                  key={tour._id}
                  href={`/tours/detail/${tour._id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#45919c]/30 hover:shadow-xl transition-all flex flex-col h-full transform hover:-translate-y-1">
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <Image
                        src={getTourImage(tour, idx)}
                        alt={tour.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-gradient-to-r from-[#45919c] to-[#2596be]">
                          {tour.category}
                        </span>
                      </div>
                      {tour.price && (
                        <div className="absolute top-3 right-3">
                          <span className="text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full">
                            From ${tour.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1 mb-1">
                          {tour.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {tour.shortDescription}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span>{tour.days} Days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#45919c] flex-shrink-0" />
                          <span className="truncate">
                            {tour.groupSize || "2-12 people"}
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
                No matching tours found
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

      {/* Best Time to Visit */}
      <section className="py-16 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Best Time to Visit Pakistan
            </h2>
            <p className="text-muted-foreground mt-2">
              Plan your travel season according to your desired region
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Spring (March–May)",
                desc: "Excellent for blossom season in Hunza, cultural trips, and archaeological tours.",
              },
              {
                title: "Summer (June–September)",
                desc: "Perfect for trekking, mountaineering, and exploring the high Baltoro and Karakoram valleys.",
              },
              {
                title: "Autumn (September–November)",
                desc: "Ideal for landscape photography, autumn foliage in the north, and Silk Road tours.",
              },
              {
                title: "Winter (December–February)",
                desc: "Best for historical explorations in southern cities (Lahore, Karachi, Multan) and visa tours.",
              },
            ].map((season, i) => (
              <div
                key={i}
                className="bg-card border p-6 rounded-2xl flex items-start gap-4"
              >
                <Calendar className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-base mb-1">{season.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {season.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose Mountain Travels Pakistan?
            </h2>
            <p className="text-muted-foreground text-sm">
              Providing exceptional ground operations and local support since
              1990
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Licensed Operator",
                desc: "Fully registered and licensed tourism specialists with decades of experience.",
              },
              {
                icon: Compass,
                title: "Custom Flexibility",
                desc: "Every tour package is fully adaptable to suit your group size, budget, and dates.",
              },
              {
                icon: Star,
                title: "Karakoram Experts",
                desc: "Unmatched ground presence and localized knowledge in all mountain sectors.",
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
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a4f5a 0%, #2596be 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Start Your Custom Adventure Today
          </h2>
          <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
            Our destination managers are ready to tailor any package to match
            your dates, group specifications, and budget. Get in touch with us
            today.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#45919c] hover:bg-[#45919c]/90 text-white font-semibold rounded-full px-8 py-4 text-sm shadow-xl"
              >
                Customize Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
